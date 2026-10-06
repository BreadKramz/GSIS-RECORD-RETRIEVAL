import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SearchRecords from "./pages/SearchRecords";
import RecordDetails from "./pages/RecordDetails";
import AppSidebar from "./components/AppSidebar";
import Records from "./pages/Records";
import AddRecord from "./pages/AddRecord";
import RetrieveRecord from "./pages/RetrieveRecord";
import Returns from "./pages/Returns";
import HistoryPage from "./pages/HistoryPage";
import UserManagement from "./pages/UserManagement";
import SettingsPage from "./pages/SettingsPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [records, setRecords] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const handleLogout = () => { setIsAuthenticated(false); setPage("dashboard"); setSelectedRecord(null); };
  const openRecord = (record) => { setSelectedRecord(record); setPage("record"); };
  const addRecord = (form) => {
    const recordNo = form.recordNo.trim().toUpperCase();
    if (records.some(r => r.recordNo.toUpperCase() === recordNo)) return { ok:false, message:"That record number is already registered." };
    const now = new Date();
    const newRecord = {
      id: crypto.randomUUID(),
      recordNo,
      memberName: form.memberName.trim(),
      category: form.category,
      status: "Available",
      location: form.location.trim(),
      custodian: form.location.trim(),
      remarks: form.remarks.trim(),
      dateAdded: now.toLocaleDateString(),
      lastUpdated: now.toLocaleString(),
    };
    setRecords(current => [newRecord, ...current]);
    setTransactions(current => [{ id:crypto.randomUUID(), recordId:newRecord.id, recordNo, memberName:newRecord.memberName, action:"Added", from:"—", to:newRecord.location, person:"Administrator", remarks:newRecord.remarks, timestamp:newRecord.lastUpdated }, ...current]);
    return { ok:true };
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

  if (!isAuthenticated) return <Login onLogin={() => setIsAuthenticated(true)} />;

  let content;
  if (page === "search") {
    content = <SearchRecords records={records} onBack={() => setPage("dashboard")} onSelectRecord={openRecord} />;
  } else if (page === "record" && selectedRecord) {
    content = <RecordDetails record={selectedRecord} onBack={() => setPage("records")} />;
  } else if (page === "records") {
    content = <Records records={records} onNavigate={setPage} onSelectRecord={openRecord} />;
  } else if (page === "add-record") {
    content = <AddRecord onBack={() => setPage("records")} onAddRecord={addRecord} />;
  } else if (page === "retrieve") {
    content = <RetrieveRecord records={records} onRetrieve={retrieveRecord} />;
  } else if (page === "returns") {
    content = <Returns records={records} onReturn={returnRecord} />;
  } else if (page === "history") {
    content = <HistoryPage transactions={transactions} />;
  } else if (page === "users") {
    content = <UserManagement />;
  } else if (page === "settings") {
    content = <SettingsPage />;
  } else {
    content = <Dashboard onNavigate={setPage} />;
  }

  return <><AppSidebar currentPage={page} onNavigate={setPage} onLogout={handleLogout}/><div className="lg:pl-64">{content}</div></>;
}
export default App;
