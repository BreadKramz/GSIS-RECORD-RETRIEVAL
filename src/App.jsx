import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient.js";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SearchRecords from "./pages/SearchRecords";
import RecordDetails from "./pages/RecordDetails";
import AppSidebar from "./components/AppSidebar";
import Records from "./pages/Records";
import AddRecord from "./pages/AddRecord";
import RetrieveRecord from "./pages/RetrieveRecord";
import Returns from "./pages/Returns";
import ForwardRecord from "./pages/ForwardRecord";
import HistoryPage from "./pages/HistoryPage";
import UserManagement from "./pages/UserManagement";
import SettingsPage from "./pages/SettingsPage";

function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [page, setPage] = useState("dashboard");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [records, setRecords] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const loadProfile = async (userId) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, first_name, middle_name, last_name, role, is_active")
        .eq("id", userId)
        .single();

      if (error || !data?.is_active) {
        await supabase.auth.signOut();
        setSession(null);
        setProfile(null);
        return;
      }

      setProfile(data);
    };

    const initializeAuth = async () => {
      const { data } = await supabase.auth.getSession();
      const currentSession = data.session;
      setSession(currentSession);
      if (currentSession?.user) await loadProfile(currentSession.user.id);
      setAuthLoading(false);
    };

    initializeAuth();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (!nextSession) setProfile(null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { ok:false, message:"Invalid email or password." };

    const { data: userProfile, error: profileError } = await supabase
      .from("profiles")
      .select("id, first_name, middle_name, last_name, role, is_active")
      .eq("id", data.user.id)
      .single();

    if (profileError || !userProfile) {
      await supabase.auth.signOut();
      return { ok:false, message:"Your RRS profile could not be loaded." };
    }

    if (!userProfile.is_active) {
      await supabase.auth.signOut();
      return { ok:false, message:"This account is inactive. Contact an administrator." };
    }

    setSession(data.session);
    setProfile(userProfile);
    return { ok:true };
  };

  const loadStaff = async () => {
    const { data, error } = await supabase.from("profiles").select("id,first_name,last_name,role,is_active").eq("is_active",true);
    if (error) return {ok:false,message:error.message};
    setStaff(data || []);
    return {ok:true};
  };
  const loadTransactions = async () => {
    const { data, error } = await supabase.from("record_transactions")
      .select("id,record_id,action,actor_id,from_location,to_location,from_custodian_id,to_custodian_id,remarks,created_at,records(record_no,member_name)")
      .order("created_at",{ascending:false}).limit(1000);
    if (error) return {ok:false,message:error.message};
    const {data: profiles} = await supabase.from("profiles").select("id,first_name,last_name");
    const names = Object.fromEntries((profiles || []).map(p=>[p.id,[p.first_name,p.last_name].filter(Boolean).join(" ")]));
    setTransactions((data||[]).map(t=>({
      id:t.id,recordId:t.record_id,recordNo:t.records?.record_no||"",
      memberName:t.records?.member_name||"",action:t.action,
      from:t.from_location||"—",to:t.to_location||"—",
      person:names[t.actor_id]||"Unknown user",
      remarks:t.remarks||"",timestamp:new Date(t.created_at).toLocaleString()
    })));
    return {ok:true};
  };
  const refreshData = async () => {
    const results = await Promise.all([loadRecords(),loadTransactions()]);
    const failed = results.find(r=>!r.ok);
    return failed || {ok:true};
  };
  const moveRecord = async (recordId, action, location, custodianId, remarks) => {
    const {error} = await supabase.rpc("rrs_move_record",{
      p_record_id:recordId,p_action:action,p_location:location.trim(),
      p_target_custodian:custodianId||null,p_remarks:remarks?.trim()||""
    });
    if(error) return {ok:false,message:error.message};
    const result=await refreshData();
    if(result.ok) setSelectedRecord(null);
    return result;
  };
  const loadRecords = async () => {
    const { data, error } = await supabase.from("records")
      .select("id,record_no,member_name,category,status,location,remarks,created_at,updated_at,current_custodian_id")
      .order("created_at", { ascending: false });
    if (error) return { ok: false, message: error.message };
    setRecords((data || []).map(r => ({
      id: r.id, recordNo: r.record_no, memberName: r.member_name,
      category: r.category, status: r.status, location: r.location,
      custodianId: r.current_custodian_id,
      custodian: r.current_custodian_id ? (staff.find(p=>p.id===r.current_custodian_id) ? [staff.find(p=>p.id===r.current_custodian_id).first_name,staff.find(p=>p.id===r.current_custodian_id).last_name].filter(Boolean).join(" ") : "Assigned staff") : r.location,
      remarks: r.remarks || "",
      dateAdded: new Date(r.created_at).toLocaleDateString(),
      lastUpdated: new Date(r.updated_at).toLocaleString(),
    })));
    return { ok: true };
  };

  useEffect(() => {
    if (session && profile) {
      Promise.all([refreshData(),loadStaff()]).then(([result]) => {
        if (!result.ok) console.error("Unable to load RRS records:", result.message);
      });
    } else {
      setRecords([]);
      setTransactions([]);
      setStaff([]);
    }
  }, [session?.user?.id, profile?.id]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
    setPage("dashboard");
    setSelectedRecord(null);
  };
  const openRecord = (record) => { setSelectedRecord(record); setPage("record"); };
  const openRecordAction = (action) => { setPage(action); };
  const addRecord = async (form) => {
    const { error } = await supabase.rpc("rrs_add_record", {
      p_record_no: form.recordNo.trim().toUpperCase(),
      p_member_name: form.memberName.trim(),
      p_category: form.category,
      p_location: form.location.trim(),
      p_remarks: form.remarks.trim(),
    });
    if (error) {
      const duplicate = error.code === "23505";
      return { ok: false, message: duplicate ? "That record number is already registered." : error.message };
    }
    return await loadRecords();
  };

  const retrieveRecord = (recordId, form) => moveRecord(recordId,"Retrieved",form.destination,form.requestedBy,form.remarks);
  const forwardRecord = (recordId, form) => moveRecord(recordId,"Forwarded",form.destination,form.forwardedTo,form.remarks);
  const returnRecord = (recordId, form) => moveRecord(recordId,"Returned",form.returnLocation,null,form.remarks);

  if (authLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-[#061522] text-sm font-semibold text-white/70">Loading RRS...</div>;
  }

  if (!session || !profile) return <Login onLogin={handleLogin} />;

  let content;
  if (page === "search") {
    content = <SearchRecords records={records} onBack={() => setPage("dashboard")} onSelectRecord={openRecord} />;
  } else if (page === "record" && selectedRecord) {
    content = <RecordDetails record={selectedRecord} transactions={transactions} onBack={() => setPage("records")} onNavigate={openRecordAction} />;
  } else if (page === "records") {
    content = <Records records={records} onNavigate={setPage} onSelectRecord={openRecord} />;
  } else if (page === "add-record") {
    content = <AddRecord onBack={() => setPage("records")} onAddRecord={addRecord} />;
  } else if (page === "retrieve") {
    content = <RetrieveRecord records={records} onRetrieve={retrieveRecord} staff={staff} profile={profile} initialRecord={selectedRecord?.status === "Available" ? selectedRecord : null} />;
  } else if (page === "forward") {
    content = <ForwardRecord records={records} onForward={forwardRecord} staff={staff} profile={profile} initialRecord={selectedRecord?.status && selectedRecord.status !== "Available" ? selectedRecord : null} />;
  } else if (page === "returns") {
    content = <Returns records={records} onReturn={returnRecord} profile={profile} />;
  } else if (page === "history") {
    content = <HistoryPage transactions={transactions} />;
  } else if (page === "users") {
    content = profile.role === "admin" ? <UserManagement /> : <Dashboard onNavigate={setPage} onOpenRecord={openRecord} records={records} transactions={transactions} />;
  } else if (page === "settings") {
    content = <SettingsPage />;
  } else {
    content = <Dashboard onNavigate={setPage} onOpenRecord={openRecord} records={records} transactions={transactions} />;
  }

  return <><AppSidebar currentPage={page} onNavigate={setPage} onLogout={handleLogout} profile={profile}/><div className="lg:pl-64">{content}</div></>;
}
export default App;
