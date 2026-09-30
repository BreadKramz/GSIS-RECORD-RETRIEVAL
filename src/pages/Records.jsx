import { useMemo, useState } from "react";
import { Archive, FilePlus2, Filter, Search } from "lucide-react";

const records = [];

function Records({ onNavigate }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const filtered = useMemo(() => records.filter((r) => {
    const q = query.toLowerCase().trim();
    return (!q || r.name?.toLowerCase().includes(q) || r.id?.toLowerCase().includes(q)) &&
      (category === "All" || r.type === category);
  }), [query, category]);

  return (
    <div className="min-h-screen bg-[#F3F5F7] text-[#243746]">
      <header className="border-b border-slate-200 bg-white">
        <div className="flex min-h-20 items-center justify-between px-5 md:px-8">
          <div><h1 className="text-xl font-bold md:text-2xl">Records</h1><p className="text-sm text-slate-500">Manage the physical record registry</p></div>
          <button onClick={() => onNavigate("add-record")} className="flex items-center gap-2 rounded-md bg-[#08689F] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#075A89]"><FilePlus2 size={18}/>Add Record</button>
        </div>
      </header>
      <main className="p-5 md:p-8">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
            <div className="flex h-12 items-center rounded-md border border-slate-300 focus-within:border-[#08689F]"><Search size={18} className="ml-4 text-slate-400"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search record number or member name..." className="h-full w-full px-3 text-sm outline-none"/></div>
            <div className="relative"><Filter size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><select value={category} onChange={e=>setCategory(e.target.value)} className="h-12 w-full rounded-md border border-slate-300 bg-white pl-10 text-sm outline-none"><option>All</option><option>Policy Envelope</option><option>Active File</option><option>Inactive File</option><option>Retirement</option></select></div>
          </div>
        </section>
        <section className="mt-5 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4"><h2 className="font-bold">Record Registry</h2><p className="mt-1 text-sm text-slate-500">{filtered.length} registered record{filtered.length === 1 ? "" : "s"}</p></div>
          {filtered.length === 0 ? <div className="px-6 py-16 text-center"><Archive size={34} className="mx-auto text-slate-300"/><p className="mt-3 font-semibold text-slate-600">No records registered yet</p><p className="mt-1 text-sm text-slate-400">Use Add Record to register the first physical file.</p></div> : null}
        </section>
      </main>
    </div>
  );
}
export default Records;
