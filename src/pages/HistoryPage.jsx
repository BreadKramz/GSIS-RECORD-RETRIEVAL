import { useState } from "react";
import { History as HistoryIcon, Search, SlidersHorizontal } from "lucide-react";

function HistoryPage() {
  const [query,setQuery]=useState("");
  const [action,setAction]=useState("All");
  return <div className="min-h-screen bg-[#F3F5F7] text-[#243746]">
    <header className="border-b border-slate-200 bg-white"><div className="flex min-h-20 items-center px-5 md:px-8"><div><h1 className="text-xl font-bold md:text-2xl">Movement History</h1><p className="text-sm text-slate-500">Audit trail of physical record transactions</p></div></div></header>
    <main className="p-5 md:p-8">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><div className="grid gap-4 lg:grid-cols-[1fr_240px]">
        <div className="flex h-12 items-center rounded-md border border-slate-300 focus-within:border-[#08689F]"><Search size={18} className="ml-4 text-slate-400"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search record, member, person, or location..." className="h-full w-full px-3 text-sm outline-none"/></div>
        <div className="relative"><SlidersHorizontal size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><select value={action} onChange={e=>setAction(e.target.value)} className="h-12 w-full rounded-md border border-slate-300 bg-white pl-10 text-sm"><option>All</option><option>Retrieved</option><option>Forwarded</option><option>Returned</option></select></div>
      </div></section>
      <section className="mt-5 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4"><h2 className="font-bold">Transaction Log</h2><p className="mt-1 text-sm text-slate-500">Complete movement history will appear here.</p></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-6 py-3">Date & Time</th><th className="px-4 py-3">Record</th><th className="px-4 py-3">Action</th><th className="px-4 py-3">From</th><th className="px-4 py-3">To</th><th className="px-4 py-3">Handled / Requested By</th><th className="px-6 py-3">Remarks</th></tr></thead><tbody><tr><td colSpan="7" className="px-6 py-14 text-center"><HistoryIcon size={32} className="mx-auto text-slate-300"/><p className="mt-3 font-semibold text-slate-600">No transaction history yet</p><p className="mt-1 text-sm text-slate-400">Retrieval, forwarding, and return transactions will be recorded automatically.</p></td></tr></tbody></table></div>
      </section>
    </main>
  </div>;
}
export default HistoryPage;
