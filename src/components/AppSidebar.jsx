import {
  Archive,
  FileArchive,
  History,
  LayoutDashboard,
  LogOut,
  RotateCcw,
  Search,
  Settings,
  Users,
} from "lucide-react";

const workspace = [
  { label: "Dashboard", icon: LayoutDashboard, page: "dashboard" },
  { label: "Search Records", icon: Search, page: "search" },
  { label: "Records", icon: Archive, page: "records" },
  { label: "Retrieve", icon: FileArchive, page: "retrieve" },
  { label: "Returns", icon: RotateCcw, page: "returns" },
  { label: "History", icon: History, page: "history" },
];

const administration = [
  { label: "User Management", icon: Users, page: "users" },
  { label: "Settings", icon: Settings, page: "settings" },
];

function AppSidebar({ currentPage, onNavigate, onLogout }) {
  const activePage = (page) =>
    currentPage === page ||
    (currentPage === "record" && page === "search") ||
    (currentPage === "add-record" && page === "records");

  const NavButton = ({ item }) => {
    const active = activePage(item.page);
    const Icon = item.icon;

    return (
      <button
        onClick={() => onNavigate(item.page)}
        className={`relative flex h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-[13px] font-medium transition-all duration-150 ${
          active
            ? "bg-[#E9F3F8] text-[#075F91]"
            : "text-[#526B79] hover:bg-[#F2F7F9] hover:text-[#075F91]"
        }`}
      >
        {active && <span className="absolute -left-0.5 h-5 w-[3px] rounded-full bg-[#0782B9]" />}
        <Icon size={16} strokeWidth={active ? 2.2 : 1.8} className={active ? "text-[#0782B9]" : "text-[#718894]"} />
        <span className="flex-1">{item.label}</span>
      </button>
    );
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col overflow-hidden border-r border-[#D6E2E8] bg-[#F9FBFC] text-[#263F4D] shadow-[4px_0_18px_rgba(27,67,88,.04)] lg:flex">
      <button
        onClick={() => onNavigate("dashboard")}
        className="flex h-[94px] shrink-0 items-center gap-3 border-b border-[#DDE7EC] bg-white px-5 text-left transition hover:bg-[#FBFDFE]"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#DDE7EC] bg-white p-1 shadow-sm">
          <img src="/gsis-logo.svg" alt="GSIS" className="h-full w-full object-contain" />
        </div>
        <div className="min-w-0">
          <p className="text-[20px] font-extrabold leading-none tracking-[0.08em] text-[#075F91]">GSIS</p>
          <p className="mt-1.5 text-[9px] font-bold uppercase leading-[1.4] tracking-[0.11em] text-[#6D8490]">
            Record Retrieval System
          </p>
          <p className="mt-0.5 text-[9px] text-[#8CA0AA]">Dumaguete Branch</p>
        </div>
      </button>

      <nav className="min-h-0 flex-1 overflow-hidden px-3 py-3">
        <p className="mb-1.5 px-3 text-[8px] font-bold uppercase tracking-[0.18em] text-[#9AAAB2]">
          Workspace
        </p>
        <div className="space-y-0.5">
          {workspace.map((item) => <NavButton key={item.page} item={item} />)}
        </div>

        <div className="mx-3 my-2 border-t border-[#E1E9ED]" />

        <p className="mb-1.5 px-3 text-[8px] font-bold uppercase tracking-[0.18em] text-[#9AAAB2]">
          Administration
        </p>
        <div className="space-y-0.5">
          {administration.map((item) => <NavButton key={item.page} item={item} />)}
        </div>
      </nav>

      <div className="shrink-0 border-t border-[#DDE7EC] bg-white p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#075F91] text-xs font-bold text-white">
            A
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-[#294553]">Administrator</p>
            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#56A447]" />
              <p className="text-[10px] text-[#8A9DA6]">Full system access</p>
            </div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="mt-1 flex h-9 w-full items-center gap-3 rounded-lg px-3 text-xs font-medium text-[#708691] transition hover:bg-[#F3F6F8] hover:text-[#B04747]"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#087DB4] via-[#4F963C] to-[#D8AC29]" />
    </aside>
  );
}

export default AppSidebar;
