import { useMemo, useState } from "react";
import { History as HistoryIcon, Search, SlidersHorizontal } from "lucide-react";

function HistoryPage({ transactions }) {
  const [query,setQuery]=useState("");
  const [action,setAction]=useState("All");
  const filtered=useMemo(()=>transactions.filter(t=>{
    const q=query.trim().toLowerCase();
    return (!q || [t.recordNo,t.memberName,t.person,t.from,t.to,t.remarks].some(v=>v?.toLowerCase().includes(q))) && (action==="All"||t.action===action);
  }),[transactions,query,action]);
  return <div className="min-h-screen bg-[#F3F5F7] text-[#243746]">
    <header className="border-b border-slate-200 bg-white"><div className="flex min-h-20 items-center px-8"><div><h1 className="text-2xl font-bold">Movement History</h1><p className="text-sm text-slate-500">Audit trail of physical record transactions</p></div></div></header>
    <main className="p-8">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><div className="grid grid-cols-[1fr_240px] gap-4">
        <div className="flex h-12 items-center rounded-md border border-slate-300 focus-within:border-[#08689F]"><Search size={18} className="ml-4 text-slate-400"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search record, member, person, or location..." className="h-full w-full px-3 text-sm outline-none"/></div>
        <div className="relative"><SlidersHorizontal size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><select value={action} onChange={e=>setAction(e.target.value)} className="h-12 w-full rounded-md border border-slate-300 bg-white pl-10 text-sm"><option>All</option><option>Added</option><option>Retrieved</option><option>Forwarded</option><option>Returned</option></select></div>
      </div></section>
      <section className="mt-5 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4"><h2 className="font-bold">Transaction Log</h2><p className="mt-1 text-sm text-slate-500">{filtered.length} transaction{filtered.length===1?"":"s"} recorded</p></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[1000px] text-left"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-6 py-3">Date & Time</th><th className="px-4 py-3">Record</th><th className="px-4 py-3">Action</th><th className="px-4 py-3">From</th><th className="px-4 py-3">To</th><th className="px-4 py-3">Handled / Requested By</th><th className="px-6 py-3">Remarks</th></tr></thead>
        <tbody className="divide-y divide-slate-100">{filtered.length===0?<tr><td colSpan="7" className="px-6 py-14 text-center"><HistoryIcon size={32} className="mx-auto text-slate-300"/><p className="mt-3 font-semibold text-slate-600">No transaction history yet</p><p className="mt-1 text-sm text-slate-400">Add, retrieval, forwarding, and return transactions will be recorded automatically.</p></td></tr>:filtered.map(t=><tr key={t.id}><td className="px-6 py-4 text-sm text-slate-500">{t.timestamp}</td><td className="px-4 py-4"><p className="text-sm font-semibold">{t.memberName}</p><p className="text-xs text-slate-400">{t.recordNo}</p></td><td className="px-4 py-4"><span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold">{t.action}</span></td><td className="px-4 py-4 text-sm text-slate-600">{t.from||"—"}</td><td className="px-4 py-4 text-sm text-slate-600">{t.to||"—"}</td><td className="px-4 py-4 text-sm text-slate-600">{t.person||"—"}</td><td className="px-6 py-4 text-sm text-slate-500">{t.remarks||"—"}</td></tr>)}</tbody></table></div>
      </section>
    </main>
  </div>;
}
export default HistoryPage;
