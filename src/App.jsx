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

  const loadRecords = async () => {
    const { data, error } = await supabase.from("records")
      .select("id,record_no,member_name,category,status,location,remarks,created_at,updated_at,current_custodian_id")
      .order("created_at", { ascending: false });
    if (error) return { ok: false, message: error.message };
    setRecords((data || []).map(r => ({
      id: r.id, recordNo: r.record_no, memberName: r.member_name,
      category: r.category, status: r.status, location: r.location,
      custodian: r.current_custodian_id || r.location,
      remarks: r.remarks || "",
      dateAdded: new Date(r.created_at).toLocaleDateString(),
      lastUpdated: new Date(r.updated_at).toLocaleString(),
    })));
    return { ok: true };
  };

  useEffect(() => {
    if (session && profile) {
      loadRecords().then(result => {
        if (!result.ok) console.error("Unable to load RRS records:", result.message);
      });
    } else {
      setRecords([]);
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

  const retrieveRecord = (recordId, form) => {
    const record = records.find(r => r.id === recordId);
    if (!record) return { ok:false, message:"Record not found." };
    if (record.status !== "Available") return { ok:false, message:"Only available records can be retrieved." };
    const now = new Date().toLocaleString();
    setRecords(current => current.map(r => r.id === recordId ? {
      ...r,
      status: "Retrieved",
      location: form.destination.trim(),
      custodian: form.requestedBy.trim(),
      remarks: form.remarks.trim() || r.remarks,
      lastUpdated: now,
    } : r));
    setTransactions(current => [{ id:crypto.randomUUID(), recordId, recordNo:record.recordNo, memberName:record.memberName, action:"Retrieved", from:record.location, to:form.destination.trim(), person:form.requestedBy.trim(), remarks:form.remarks.trim(), timestamp:now }, ...current]);
    setSelectedRecord(current => current?.id === recordId ? {
      ...current,
      status:"Retrieved",
      location:form.destination.trim(),
      custodian:form.requestedBy.trim(),
      lastUpdated:now,
    } : current);
    return { ok:true };
  };

  const forwardRecord = (recordId, form) => {
    const record = records.find(r => r.id === recordId);
    if (!record) return { ok:false, message:"Record not found." };
    if (record.status === "Available") return { ok:false, message:"Retrieve the record before forwarding it." };
    const now = new Date().toLocaleString();
    const destination = form.destination.trim();
    const custodian = form.forwardedTo.trim();
    setRecords(current => current.map(r => r.id === recordId ? { ...r, status:"Forwarded", location:destination, custodian, remarks:form.remarks.trim() || r.remarks, lastUpdated:now } : r));
    setTransactions(current => [{ id:crypto.randomUUID(), recordId, recordNo:record.recordNo, memberName:record.memberName, action:"Forwarded", from:record.location, to:destination, person:`${form.forwardedBy.trim()} → ${custodian}`, remarks:form.remarks.trim(), timestamp:now }, ...current]);
    setSelectedRecord(current => current?.id === recordId ? { ...current, status:"Forwarded", location:destination, custodian, lastUpdated:now } : current);
    return { ok:true };
  };

  const returnRecord = (recordId, form) => {
    const record = records.find(r => r.id === recordId);
    if (!record) return { ok:false, message:"Record not found." };
    if (record.status === "Available") return { ok:false, message:"This record is already available." };
    const now = new Date().toLocaleString();
    const location = form.returnLocation.trim();
    setRecords(current => current.map(r => r.id === recordId ? { ...r, status:"Available", location, custodian:form.receivedBy.trim(), lastUpdated:now } : r));
    setTransactions(current => [{ id:crypto.randomUUID(), recordId, recordNo:record.recordNo, memberName:record.memberName, action:"Returned", from:record.location, to:location, person:form.returnedBy.trim(), remarks:form.remarks.trim(), timestamp:now }, ...current]);
    setSelectedRecord(current => current?.id === recordId ? { ...current, status:"Available", location, custodian:form.receivedBy.trim(), lastUpdated:now } : current);
    return { ok:true };
  };

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
    content = <RetrieveRecord records={records} onRetrieve={retrieveRecord} initialRecord={selectedRecord?.status === "Available" ? selectedRecord : null} />;
  } else if (page === "forward") {
    content = <ForwardRecord records={records} onForward={forwardRecord} initialRecord={selectedRecord?.status !== "Available" ? selectedRecord : null} />;
  } else if (page === "returns") {
    content = <Returns records={records} onReturn={returnRecord} />;
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
