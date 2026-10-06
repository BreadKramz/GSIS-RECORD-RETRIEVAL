import {
  Archive,
  ChevronRight,
  FileArchive,
  History,
  LayoutDashboard,
  LogOut,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  Users,
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
  const isActive = (page) =>
    currentPage === page ||
    (currentPage === "record" && page === "search") ||
    (currentPage === "add-record" && page === "records");

  const navClass = (active) =>
    `group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition-all duration-200 ${
      active
        ? "bg-white text-[#075F91] shadow-[0_6px_18px_rgba(1,31,50,.16)]"
        : "text-blue-50/85 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col overflow-hidden bg-gradient-to-b from-[#064D76] via-[#075F91] to-[#063C5C] text-white shadow-[8px_0_30px_rgba(12,48,68,.10)] lg:flex">
      <div className="pointer-events-none absolute -left-20 top-16 h-52 w-52 rounded-full bg-[#20A46B]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-28 h-56 w-56 rounded-full bg-[#E2B62F]/10 blur-3xl" />

      <button
        onClick={() => onNavigate("dashboard")}
        className="relative flex h-[106px] w-full items-center gap-3.5 border-b border-white/10 px-5 text-left transition hover:bg-white/[0.04]"
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-[0_8px_22px_rgba(0,0,0,.16)] ring-1 ring-white/30">
          <img src="/gsis-logo.svg" alt="GSIS" className="h-full w-full object-contain" />
        </div>
        <div className="min-w-0">
          <p className="text-[22px] font-bold leading-none tracking-[0.07em]">GSIS</p>
          <p className="mt-2 text-[9px] font-semibold uppercase leading-[1.45] tracking-[0.13em] text-blue-100/75">
            Record Retrieval
            <span className="block">System</span>
          </p>
        </div>
      </button>

      <nav className="relative flex-1 overflow-y-auto px-3.5 py-5">
        <p className="px-3 pb-2.5 text-[9px] font-bold uppercase tracking-[0.2em] text-blue-200/60">
          Records Workspace
        </p>
        <div className="space-y-1">
          {navItems.map(({ label, icon: Icon, page }) => {
            const active = isActive(page);
            return (
              <button key={label} onClick={() => onNavigate(page)} className={navClass(active)}>
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
                  active ? "bg-[#08689F]/10 text-[#08689F]" : "bg-white/[0.06] text-blue-100 group-hover:bg-white/10"
                }`}>
                  <Icon size={17} />
                </span>
                <span className="flex-1">{label}</span>
                {active && <ChevronRight size={14} className="text-[#08689F]/55" />}
              </button>
            );
          })}
        </div>

        <div className="mx-2 my-5 border-t border-white/10" />

        <p className="px-3 pb-2.5 text-[9px] font-bold uppercase tracking-[0.2em] text-blue-200/60">
          Administration
        </p>
        <div className="space-y-1">
          <button onClick={() => onNavigate("users")} className={navClass(currentPage === "users")}>
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
              currentPage === "users" ? "bg-[#08689F]/10 text-[#08689F]" : "bg-white/[0.06] text-blue-100"
            }`}><Users size={17}/></span>
            <span className="flex-1">User Management</span>
            {currentPage === "users" && <ChevronRight size={14} className="text-[#08689F]/55"/>}
          </button>
          <button onClick={() => onNavigate("settings")} className={navClass(currentPage === "settings")}>
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
              currentPage === "settings" ? "bg-[#08689F]/10 text-[#08689F]" : "bg-white/[0.06] text-blue-100"
            }`}><Settings size={17}/></span>
            <span className="flex-1">Settings</span>
            {currentPage === "settings" && <ChevronRight size={14} className="text-[#08689F]/55"/>}
          </button>
        </div>
      </nav>

      <div className="relative border-t border-white/10 bg-[#043C5C]/35 p-3.5">
        <div className="mb-2.5 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.07] p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#08689F] shadow-sm">
            <ShieldCheck size={18}/>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">Administrator</p>
            <p className="mt-0.5 text-[10px] text-blue-100/60">Full system access</p>
          </div>
          <span className="h-2 w-2 rounded-full bg-[#6ED58A] shadow-[0_0_0_3px_rgba(110,213,138,.12)]" />
        </div>
        <button
          onClick={onLogout}
          className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-blue-100/75 transition hover:bg-white/10 hover:text-white"
        >
          <LogOut size={16}/>
          <span className="flex-1 text-left">Sign out</span>
          <ChevronRight size={13} className="opacity-0 transition group-hover:opacity-60"/>
        </button>
      </div>
    </aside>
  );
}

export default AppSidebar;
