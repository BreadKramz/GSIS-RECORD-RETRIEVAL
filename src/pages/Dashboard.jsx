import {
  Bell,
  ChevronRight,
  Clock3,
  FileArchive,
  FileCheck2,
  Files,
  Search,
  ShieldCheck,
  Plus,
  RotateCcw,
  History,
} from "lucide-react";

const stats = [
  { label: "Total Records", value: "—", detail: "Registered physical files", icon: Files, tone: "bg-blue-50 text-[#08689F]" },
  { label: "Available", value: "—", detail: "Ready for retrieval", icon: FileCheck2, tone: "bg-green-50 text-[#4F8F3A]" },
  { label: "Retrieved", value: "—", detail: "Currently in custody", icon: FileArchive, tone: "bg-sky-50 text-[#0879BD]" },
  { label: "Pending Return", value: "—", detail: "Awaiting return", icon: Clock3, tone: "bg-amber-50 text-[#A47700]" },
];

const categories = [
  ["Policy Envelopes", "—", "bg-[#08689F]"],
  ["Active Files", "—", "bg-[#4F8F3A]"],
  ["Inactive Files", "—", "bg-slate-400"],
  ["Retirement", "—", "bg-[#D9A928]"],
];

function Dashboard({ onNavigate }) {
  return (
    <div className="min-h-screen bg-[#F4F6F8] text-[#203442]">
      <header className="sticky top-0 z-20 border-b border-slate-200/90 bg-white/95 backdrop-blur">
        <div className="flex h-[76px] items-center justify-between px-6 md:px-8 xl:px-10">
          <div>
            <h1 className="text-xl font-bold tracking-[-0.02em] md:text-2xl">Dashboard</h1>
            <p className="mt-0.5 text-xs text-slate-500">GSIS Dumaguete · Record Retrieval System</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50">
              <Bell size={18} />
            </button>
            <div className="hidden h-10 items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 sm:flex">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#08689F]/10 text-[#08689F]"><ShieldCheck size={16}/></span>
              <div className="leading-tight"><p className="text-xs font-semibold">Administrator</p><p className="text-[10px] text-slate-400">Full access</p></div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] p-6 md:p-8 xl:p-10">
        <section className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#08689F]">Records overview</p>
            <h2 className="mt-1.5 text-2xl font-bold tracking-[-0.025em] md:text-[28px]">Good day, Administrator</h2>
            <p className="mt-1 text-sm text-slate-500">Monitor record availability, custody, and recent file movement.</p>
          </div>
          <button onClick={() => onNavigate("add-record")} className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#08689F] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#075A89]">
            <Plus size={17}/>Add New Record
          </button>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, detail, icon: Icon, tone }) => (
            <article key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,.04)]">
              <div className="flex items-start justify-between">
                <div><p className="text-sm font-medium text-slate-500">{label}</p><p className="mt-2 text-[30px] font-bold leading-none tracking-[-0.03em]">{value}</p></div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tone}`}><Icon size={20}/></div>
              </div>
              <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-400">{detail}</p>
            </article>
          ))}
        </section>

        <section className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,.04)] md:p-6">
          <div className="grid items-end gap-5 lg:grid-cols-[minmax(220px,.55fr)_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#08689F]">Quick search</p>
              <h3 className="mt-1 text-lg font-bold">Find a physical record</h3>
              <p className="mt-1 text-sm text-slate-500">Search the registry by member name or record number.</p>
            </div>
            <div className="flex h-12 overflow-hidden rounded-lg border border-slate-300 bg-white transition focus-within:border-[#08689F] focus-within:ring-2 focus-within:ring-[#08689F]/10">
              <Search className="ml-4 self-center text-slate-400" size={18}/>
              <input type="search" placeholder="Enter member name or record number..." className="min-w-0 flex-1 px-3 text-sm outline-none placeholder:text-slate-400"/>
              <button onClick={() => onNavigate("search")} className="m-1 rounded-md bg-[#08689F] px-5 text-sm font-semibold text-white transition hover:bg-[#075A89]">Search</button>
            </div>
          </div>
        </section>

        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,.04)]">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 md:px-6">
              <div><h3 className="font-bold">Recent File Activity</h3><p className="mt-0.5 text-xs text-slate-400">Latest retrieval and return transactions</p></div>
              <button onClick={() => onNavigate("history")} className="flex items-center gap-1 text-xs font-semibold text-[#08689F] hover:underline">View history <ChevronRight size={14}/></button>
            </div>
            <div className="flex min-h-[245px] flex-col items-center justify-center px-6 py-10 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400"><History size={22}/></span>
              <p className="mt-4 text-sm font-semibold text-slate-600">No file activity yet</p>
              <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">Retrievals, returns, and file transfers will appear here automatically once transactions are recorded.</p>
            </div>
          </section>

          <aside className="rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,.04)]">
            <div className="border-b border-slate-200 px-5 py-4"><h3 className="font-bold">Record Categories</h3><p className="mt-0.5 text-xs text-slate-400">Files by classification</p></div>
            <div className="p-3">
              {categories.map(([label,count,dot]) => (
                <button key={label} onClick={() => onNavigate("records")} className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left transition hover:bg-slate-50">
                  <div className="flex items-center gap-3"><span className={`h-2.5 w-2.5 rounded-full ${dot}`}/><span className="text-sm font-medium text-slate-600">{label}</span></div>
                  <span className="text-sm font-bold text-slate-400">{count}</span>
                </button>
              ))}
            </div>
          </aside>
        </div>

        <section className="mt-5 grid gap-3 sm:grid-cols-3">
          <button onClick={() => onNavigate("retrieve")} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-[#08689F]/30 hover:shadow-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#08689F]"><FileArchive size={18}/></span>
            <div><p className="text-sm font-semibold">Retrieve Record</p><p className="text-xs text-slate-400">Release and track custody</p></div>
          </button>
          <button onClick={() => onNavigate("returns")} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-[#4F8F3A]/30 hover:shadow-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-[#4F8F3A]"><RotateCcw size={18}/></span>
            <div><p className="text-sm font-semibold">Return Record</p><p className="text-xs text-slate-400">Complete a file return</p></div>
          </button>
          <button onClick={() => onNavigate("history")} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-[#D9A928]/40 hover:shadow-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-[#A47700]"><History size={18}/></span>
            <div><p className="text-sm font-semibold">Movement History</p><p className="text-xs text-slate-400">Review the audit trail</p></div>
          </button>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
