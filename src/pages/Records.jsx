import { useMemo, useState } from "react";
import { Archive, FilePlus2, Filter, Search, MapPin, UserRound } from "lucide-react";

function StatusBadge({ status }) {
  const styles = {
    Available: "border-green-200 bg-green-50 text-[#4F8F3A]",
    Retrieved: "border-blue-200 bg-blue-50 text-[#08689F]",
    Forwarded: "border-amber-200 bg-amber-50 text-[#8A6A00]",
  };
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[status] || "border-slate-200 bg-slate-50 text-slate-600"}`}>{status}</span>;
}

function Records({ records, onNavigate, onSelectRecord }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const filtered = useMemo(() => records.filter((r) => {
    const q = query.toLowerCase().trim();
    return (!q || [r.recordNo, r.memberName, r.location, r.custodian].some(v => v?.toLowerCase().includes(q))) &&
      (category === "All" || r.category === category);
  }), [records, query, category]);

  return (
    <div className="min-h-screen bg-[#F3F5F7] text-[#243746]">
      <header className="border-b border-slate-200 bg-white">
        <div className="flex min-h-20 items-center justify-between px-8">
          <div><h1 className="text-2xl font-bold">Records</h1><p className="text-sm text-slate-500">Manage the physical record registry</p></div>
          <button onClick={() => onNavigate("add-record")} className="flex items-center gap-2 rounded-md bg-[#08689F] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#075A89]"><FilePlus2 size={18}/>Add Record</button>
        </div>
      </header>
      <main className="p-8">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 grid-cols-[1fr_260px]">
            <div className="flex h-12 items-center rounded-md border border-slate-300 focus-within:border-[#08689F]"><Search size={18} className="ml-4 text-slate-400"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search record number, member, location, or custodian..." className="h-full w-full px-3 text-sm outline-none"/></div>
            <div className="relative"><Filter size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><select value={category} onChange={e=>setCategory(e.target.value)} className="h-12 w-full rounded-md border border-slate-300 bg-white pl-10 text-sm outline-none"><option>All</option><option>Policy Envelope</option><option>Active File</option><option>Inactive File</option><option>Retirement</option></select></div>
          </div>
        </section>
        <section className="mt-5 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4"><div><h2 className="font-bold">Record Registry</h2><p className="mt-1 text-sm text-slate-500">{filtered.length} registered record{filtered.length === 1 ? "" : "s"}</p></div></div>
          {filtered.length === 0 ? <div className="px-6 py-16 text-center"><Archive size={34} className="mx-auto text-slate-300"/><p className="mt-3 font-semibold text-slate-600">No records registered yet</p><p className="mt-1 text-sm text-slate-400">Use Add Record to register the first physical file.</p></div> :
          <div className="overflow-x-auto"><table className="w-full min-w-[1000px] text-left">
            <thead className="border-b border-slate-200 bg-[#F7F8FA] text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-6 py-3">Record / Member</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Location</th><th className="px-4 py-3">Custodian</th><th className="px-6 py-3">Last Updated</th></tr></thead>
            <tbody className="divide-y divide-slate-100">{filtered.map(r=><tr key={r.id} onClick={()=>onSelectRecord(r)} className="cursor-pointer hover:bg-[#F7FAFC]">
              <td className="px-6 py-4"><p className="text-sm font-semibold">{r.memberName}</p><p className="text-xs text-slate-400">{r.recordNo}</p></td>
              <td className="px-4 py-4 text-sm text-slate-600">{r.category}</td><td className="px-4 py-4"><StatusBadge status={r.status}/></td>
              <td className="px-4 py-4"><span className="flex items-center gap-2 text-sm text-slate-600"><MapPin size={15} className="text-slate-400"/>{r.location}</span></td>
              <td className="px-4 py-4"><span className="flex items-center gap-2 text-sm text-slate-600"><UserRound size={15} className="text-slate-400"/>{r.status === "Available" ? "In storage" : r.custodian}</span></td>
              <td className="px-6 py-4 text-sm text-slate-500">{r.lastUpdated}</td>
            </tr>)}</tbody>
          </table></div>}
        </section>
      </main>
    </div>
  );
}
export default Records;
