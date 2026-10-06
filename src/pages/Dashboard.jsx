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

function Dashboard({ onNavigate, records, transactions }) {
  const stats = [
    { label: "Total Records", value: records.length, detail: "Registered physical files", icon: Files, tone: "bg-blue-50 text-[#08689F]" },
    { label: "Available", value: records.filter(r => r.status === "Available").length, detail: "Ready for retrieval", icon: FileCheck2, tone: "bg-green-50 text-[#4F8F3A]" },
    { label: "Retrieved", value: records.filter(r => r.status === "Retrieved").length, detail: "Currently in custody", icon: FileArchive, tone: "bg-sky-50 text-[#0879BD]" },
    { label: "Pending Return", value: records.filter(r => r.status !== "Available").length, detail: "Awaiting return", icon: Clock3, tone: "bg-amber-50 text-[#A47700]" },
  ];
  const categories = [
    ["Policy Envelopes", records.filter(r => r.category === "Policy Envelope").length, "bg-[#08689F]"],
    ["Active Files", records.filter(r => r.category === "Active File").length, "bg-[#4F8F3A]"],
    ["Inactive Files", records.filter(r => r.category === "Inactive File").length, "bg-slate-400"],
    ["Retirement", records.filter(r => r.category === "Retirement").length, "bg-[#D9A928]"],
  ];
  const recentActivity = transactions.filter(t => t.action !== "Added").slice(0, 5);

  return (
    <div className="min-h-screen bg-[#EAF1F5] text-[#17384B]">
      <header className="sticky top-0 z-20 border-b border-[#0B6C9F]/15 bg-gradient-to-r from-[#064E78] via-[#08689F] to-[#0A7A82] text-white shadow-[0_3px_16px_rgba(6,78,120,.18)]">
        <div className="flex h-[76px] items-center justify-between px-6 md:px-8 xl:px-10">
          <div>
            <h1 className="text-xl font-bold tracking-[-0.02em] md:text-2xl">Dashboard</h1>
            <p className="mt-0.5 text-xs text-blue-100/80">GSIS Dumaguete · Record Retrieval System</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition hover:bg-white/20">
              <Bell size={18} />
            </button>
            <div className="hidden h-10 items-center gap-2.5 rounded-lg border border-white/20 bg-white/10 px-3 sm:flex">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/15 text-white"><ShieldCheck size={16}/></span>
              <div className="leading-tight"><p className="text-xs font-semibold">Administrator</p><p className="text-[10px] text-blue-100/70">Full access</p></div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] p-6 md:p-8 xl:p-10">
        <section className="mb-7 flex flex-col justify-between gap-4 rounded-2xl border border-white/70 bg-white/70 p-6 shadow-[0_8px_30px_rgba(22,73,98,.08)] backdrop-blur-sm lg:flex-row lg:items-end">
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
            <article key={label} className="rounded-2xl border border-[#D8E4EA] bg-white p-5 shadow-[0_8px_24px_rgba(28,73,96,.06)]">
              <div className="flex items-start justify-between">
                <div><p className="text-sm font-medium text-slate-500">{label}</p><p className="mt-2 text-[30px] font-bold leading-none tracking-[-0.03em]">{value}</p></div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tone}`}><Icon size={20}/></div>
              </div>
              <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-400">{detail}</p>
            </article>
          ))}
        </section>

        <section className="mt-5 rounded-2xl border border-[#D8E4EA] bg-white p-5 shadow-[0_8px_24px_rgba(28,73,96,.06)] md:p-6">
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
          <section className="overflow-hidden rounded-2xl border border-[#D8E4EA] bg-white shadow-[0_8px_24px_rgba(28,73,96,.06)]">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 md:px-6">
              <div><h3 className="font-bold">Recent File Activity</h3><p className="mt-0.5 text-xs text-slate-400">Latest retrieval and return transactions</p></div>
              <button onClick={() => onNavigate("history")} className="flex items-center gap-1 text-xs font-semibold text-[#08689F] hover:underline">View history <ChevronRight size={14}/></button>
            </div>
            {recentActivity.length === 0 ? <div className="flex min-h-[245px] flex-col items-center justify-center px-6 py-10 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400"><History size={22}/></span>
              <p className="mt-4 text-sm font-semibold text-slate-600">No file activity yet</p>
              <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">Retrievals and returns will appear here automatically.</p>
            </div> : <div className="divide-y divide-slate-100">{recentActivity.map(item => <div key={item.id} className="flex items-center justify-between gap-4 px-6 py-4"><div className="min-w-0"><p className="text-sm font-semibold">{item.memberName}</p><p className="mt-0.5 text-xs text-slate-400">{item.recordNo} · {item.from} → {item.to}</p></div><div className="shrink-0 text-right"><p className="text-xs font-semibold text-[#08689F]">{item.action}</p><p className="mt-1 text-[10px] text-slate-400">{item.timestamp}</p></div></div>)}</div>}
          </section>

          <aside className="rounded-2xl border border-[#D8E4EA] bg-white shadow-[0_8px_24px_rgba(28,73,96,.06)]">
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

        <section className="mt-5 grid gap-4 sm:grid-cols-3">
          <button onClick={() => onNavigate("retrieve")} className="flex items-center gap-3 rounded-2xl border border-[#D8E4EA] bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-[#08689F]/30 hover:shadow-md">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#08689F]"><FileArchive size={18}/></span>
            <div><p className="text-sm font-semibold">Retrieve Record</p><p className="text-xs text-slate-400">Release and track custody</p></div>
          </button>
          <button onClick={() => onNavigate("returns")} className="flex items-center gap-3 rounded-2xl border border-[#D8E4EA] bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-[#4F8F3A]/30 hover:shadow-md">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-[#4F8F3A]"><RotateCcw size={18}/></span>
            <div><p className="text-sm font-semibold">Return Record</p><p className="text-xs text-slate-400">Complete a file return</p></div>
          </button>
          <button onClick={() => onNavigate("history")} className="flex items-center gap-3 rounded-2xl border border-[#D8E4EA] bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-[#D9A928]/40 hover:shadow-md">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-[#A47700]"><History size={18}/></span>
            <div><p className="text-sm font-semibold">Movement History</p><p className="text-xs text-slate-400">Review the audit trail</p></div>
          </button>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
