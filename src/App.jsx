import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SearchRecords from "./pages/SearchRecords";
import RecordDetails from "./pages/RecordDetails";
import AppSidebar from "./components/AppSidebar";
import Records from "./pages/Records";
import AddRecord from "./pages/AddRecord";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPage("dashboard");
    setSelectedRecord(null);
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  let content;
  if (page === "search") {
    content = <SearchRecords onBack={() => setPage("dashboard")} onSelectRecord={(record) => { setSelectedRecord(record); setPage("record"); }} />;
  } else if (page === "record" && selectedRecord) {
    content = <RecordDetails record={selectedRecord} onBack={() => setPage("search")} />;
  } else if (page === "records") {
    content = <Records onNavigate={setPage} />;
  } else if (page === "add-record") {
    content = <AddRecord onBack={() => setPage("records")} />;
  } else {
    content = <Dashboard onLogout={handleLogout} onNavigate={setPage} embedded />;
  }

  return (
    <>
      <AppSidebar currentPage={page} onNavigate={setPage} onLogout={handleLogout} />
      <div className="lg:pl-64">{content}</div>
    </>
  );
}

export default App;
