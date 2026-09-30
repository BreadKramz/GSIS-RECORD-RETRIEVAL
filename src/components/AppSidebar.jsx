import {
  Archive, FileArchive, History, LayoutDashboard, LogOut, RotateCcw, Search, Settings, Users
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, page: "dashboard" },
  { label: "Search Records", icon: Search, page: "search" },
  { label: "Records", icon: Archive, page: "records" },
  { label: "Retrieve", icon: FileArchive, page: "retrieve" },
  { label: "Returns", icon: RotateCcw, page: "returns" },
  { label: "History", icon: History, page: "history" },
];

function AppSidebar({ currentPage, onNavigate, onLogout }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-[#075A89] text-white lg:flex">
      <button
        onClick={() => onNavigate("dashboard")}
        className="flex h-28 w-full items-center border-b border-white/15 px-4 transition hover:bg-white/5"
      >
        <img
          src="/gsis-new-logo.png.png"
          alt="GSIS Government Service Insurance System"
          className="h-[92px] w-full object-contain"
        />
      </button>
      <nav className="flex-1 px-3 py-6">
        <p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-200">Workspace</p>
        <div className="space-y-1">
          {navItems.map(({ label, icon: Icon, page }) => {
            const active = currentPage === page || (currentPage === "record" && page === "search") || (currentPage === "add-record" && page === "records");
            return <button key={label} onClick={() => onNavigate(page)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${active ? "bg-white text-[#08689F] shadow-sm" : "text-blue-50 hover:bg-white/10"}`}>
              <Icon size={18}/>{label}
            </button>;
          })}
        </div>
        <div className="my-6 border-t border-white/15"/>
        <p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-200">Administration</p>
        <div className="space-y-1">
          <button onClick={() => onNavigate("users")} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${currentPage === "users" ? "bg-white text-[#08689F] shadow-sm" : "text-blue-50 hover:bg-white/10"}`}><Users size={18}/>User Management</button>
          <button onClick={() => onNavigate("settings")} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${currentPage === "settings" ? "bg-white text-[#08689F] shadow-sm" : "text-blue-50 hover:bg-white/10"}`}><Settings size={18}/>Settings</button>
        </div>
      </nav>
      <div className="border-t border-white/15 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-lg bg-white/10 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 font-bold">A</div>
          <div><p className="text-sm font-semibold">Administrator</p><p className="text-xs text-blue-200">Admin account</p></div>
        </div>
        <button onClick={onLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-blue-100 hover:bg-white/10"><LogOut size={17}/>Sign out</button>
      </div>
    </aside>
  );
}
export default AppSidebar;
