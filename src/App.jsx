import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SearchRecords from "./pages/SearchRecords";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [page, setPage] = useState("dashboard");

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPage("dashboard");
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  if (page === "search") {
    return <SearchRecords onBack={() => setPage("dashboard")} />;
  }

  return <Dashboard onLogout={handleLogout} onNavigate={setPage} />;
}

export default App;
