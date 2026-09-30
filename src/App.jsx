import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SearchRecords from "./pages/SearchRecords";
import RecordDetails from "./pages/RecordDetails";

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

  if (page === "search") {
    return <SearchRecords onBack={() => setPage("dashboard")} onSelectRecord={(record) => { setSelectedRecord(record); setPage("record"); }} />;
  }

  if (page === "record" && selectedRecord) {
    return <RecordDetails record={selectedRecord} onBack={() => setPage("search")} />;
  }

  return <Dashboard onLogout={handleLogout} onNavigate={setPage} />;
}

export default App;
