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
            ? "bg-white text-[#075F91] shadow-[0_5px_14px_rgba(2,48,76,.14)]"
            : "text-blue-50/85 hover:bg-white/10 hover:text-white"
        }`}
      >
        {active && <span className="absolute -left-0.5 h-5 w-[3px] rounded-full bg-[#0782B9]" />}
        <Icon size={16} strokeWidth={active ? 2.2 : 1.8} className={active ? "text-[#0782B9]" : "text-blue-100/75"} />
        <span className="flex-1">{item.label}</span>
      </button>
    );
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col overflow-hidden border-r border-white/10 bg-gradient-to-b from-[#075F91] via-[#086E9C] to-[#064C72] text-white shadow-[6px_0_24px_rgba(20,62,84,.12)] lg:flex">
      <button
        onClick={() => onNavigate("dashboard")}
        className="flex h-[94px] shrink-0 items-center gap-3 border-b border-white/10 bg-[#064F79]/45 px-5 text-left transition hover:bg-white/[0.04]"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-white p-1 shadow-md">
          <img src="/gsis-logo.svg" alt="GSIS" className="h-full w-full object-contain" />
        </div>
        <div className="min-w-0">
          <p className="text-[20px] font-extrabold leading-none tracking-[0.08em] text-white">GSIS</p>
          <p className="mt-1.5 text-[9px] font-bold uppercase leading-[1.4] tracking-[0.11em] text-blue-100/75">
            Record Retrieval System
          </p>
          <p className="mt-0.5 text-[9px] text-blue-100/55">Dumaguete Branch</p>
        </div>
      </button>

      <nav className="min-h-0 flex-1 overflow-hidden px-3 py-3">
        <p className="mb-1.5 px-3 text-[8px] font-bold uppercase tracking-[0.18em] text-blue-100/55">
          Workspace
        </p>
        <div className="space-y-0.5">
          {workspace.map((item) => <NavButton key={item.page} item={item} />)}
        </div>

        <div className="mx-3 my-2 border-t border-white/10" />

        <p className="mb-1.5 px-3 text-[8px] font-bold uppercase tracking-[0.18em] text-blue-100/55">
          Administration
        </p>
        <div className="space-y-0.5">
          {administration.map((item) => <NavButton key={item.page} item={item} />)}
        </div>
      </nav>

      <div className="shrink-0 border-t border-white/10 bg-[#05476C]/45 p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#075F91] text-xs font-bold text-white">
            A
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">Administrator</p>
            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#56A447]" />
              <p className="text-[10px] text-blue-100/60">Full system access</p>
            </div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="mt-1 flex h-9 w-full items-center gap-3 rounded-lg px-3 text-xs font-medium text-blue-100/70 transition hover:bg-white/10 hover:text-white"
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
