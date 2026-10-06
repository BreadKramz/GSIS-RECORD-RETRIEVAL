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

  const handleLogout = () => { setIsAuthenticated(false); setPage("dashboard"); setSelectedRecord(null); };
  const openRecord = (record) => { setSelectedRecord(record); setPage("record"); };
  const addRecord = (form) => {
    const recordNo = form.recordNo.trim().toUpperCase();
    if (records.some(r => r.recordNo.toUpperCase() === recordNo)) return { ok:false, message:"That record number is already registered." };
    const now = new Date();
    setRecords(current => [{
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
    }, ...current]);
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
    content = <RetrieveRecord />;
  } else if (page === "returns") {
    content = <Returns />;
  } else if (page === "history") {
    content = <HistoryPage />;
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
