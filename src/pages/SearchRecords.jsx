import { useMemo, useState } from "react";
import { ArrowLeft, FileArchive, Filter, MapPin, Search, UserRound } from "lucide-react";

const records = [
  { id: "PE-00125", name: "Juan Dela Cruz", type: "Policy Envelope", status: "Retrieved", location: "Legal Office", holder: "Ma'am Pearl", updated: "10 minutes ago" },
  { id: "AF-00342", name: "Maria Santos", type: "Active File", status: "Available", location: "Records Section", holder: "Records Section", updated: "35 minutes ago" },
  { id: "RT-00092", name: "Pedro Reyes", type: "Retirement", status: "Forwarded", location: "Retirement Section", holder: "Retirement Section", updated: "1 hour ago" },
  { id: "IF-00218", name: "Ana Garcia", type: "Inactive File", status: "Retrieved", location: "Legal Office", holder: "Ma'am Pearl", updated: "2 hours ago" },
  { id: "PE-00481", name: "Roberto Lim", type: "Policy Envelope", status: "Available", location: "Records Section", holder: "Records Section", updated: "Yesterday" },
  { id: "AF-00617", name: "Elena Flores", type: "Active File", status: "Available", location: "Records Section", holder: "Records Section", updated: "Yesterday" },
];

function StatusBadge({ status }) {
  const styles = {
    Available: "bg-green-50 text-[#4F8F3A] border-green-200",
    Retrieved: "bg-blue-50 text-[#08689F] border-blue-200",
    Forwarded: "bg-amber-50 text-[#8A6A00] border-amber-200",
  };
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[status] || "bg-slate-50 text-slate-600 border-slate-200"}`}>{status}</span>;
}

function SearchRecords({ onBack, onSelectRecord }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");

  const filtered = useMemo(() => records.filter((record) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || [record.id, record.name, record.location, record.holder].some((value) => value.toLowerCase().includes(q));
    return matchesQuery && (type === "All" || record.type === type);
  }), [query, type]);

  return (
    <div className="min-h-screen bg-[#F3F5F7] text-[#243746]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-20 max-w-[1500px] items-center justify-between gap-4 px-5 md:px-8">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="rounded-md border border-slate-200 p-2 text-slate-600 hover:bg-slate-50" aria-label="Back to dashboard">
              <ArrowLeft size={20} />
            </button>
            <img src="/gsis-logo.svg" alt="GSIS Logo" className="h-11 w-11 object-contain" />
            <div>
              <h1 className="text-xl font-bold">Search Records</h1>
              <p className="text-sm text-slate-500">GSIS Record Retrieval System</p>
            </div>
          </div>
          <span className="hidden rounded-md bg-[#EDF3F7] px-3 py-2 text-xs font-semibold text-[#08689F] sm:block">Internal Records Workspace</span>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] p-5 md:p-8">
        <section className="mb-6">
          <h2 className="text-2xl font-bold">Find a physical record</h2>
          <p className="mt-1 text-sm text-slate-500">Search the prototype registry to check a file's status, current location, and custodian.</p>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Member / Record Search</label>
              <div className="flex h-12 items-center rounded-md border border-slate-300 bg-white focus-within:border-[#08689F] focus-within:ring-2 focus-within:ring-[#08689F]/10">
                <Search className="ml-4 text-slate-400" size={19} />
                <input value={query} onChange={(e) => setQuery(e.target.value)} className="h-full w-full bg-transparent px-3 text-sm outline-none" placeholder="Enter member name, record number, location, or custodian..." />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Record Category</label>
              <div className="relative">
                <Filter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                <select value={type} onChange={(e) => setType(e.target.value)} className="h-12 w-full appearance-none rounded-md border border-slate-300 bg-white pl-10 pr-3 text-sm outline-none focus:border-[#08689F]">
                  <option>All</option>
                  <option>Policy Envelope</option>
                  <option>Active File</option>
                  <option>Inactive File</option>
                  <option>Retirement</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-slate-500"><span className="font-semibold text-[#243746]">{filtered.length}</span> record{filtered.length !== 1 ? "s" : ""} found</p>
          {(query || type !== "All") && <button onClick={() => { setQuery(""); setType("All"); }} className="text-sm font-semibold text-[#08689F] hover:underline">Clear filters</button>}
        </div>

        <section className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="border-b border-slate-200 bg-[#F7F8FA] text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Record / Member</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Current Location</th>
                  <th className="px-4 py-3 font-semibold">Custodian / Requested By</th>
                  <th className="px-5 py-3 font-semibold">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((record) => (
                  <tr key={record.id} onClick={() => onSelectRecord(record)} className="cursor-pointer hover:bg-[#F7FAFC]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#EDF3F7] text-[#08689F]"><FileArchive size={18} /></div>
                        <div><p className="text-sm font-semibold">{record.name}</p><p className="text-xs text-slate-400">{record.id}</p></div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">{record.type}</td>
                    <td className="px-4 py-4"><StatusBadge status={record.status} /></td>
                    <td className="px-4 py-4"><div className="flex items-center gap-2 text-sm text-slate-600"><MapPin size={15} className="text-slate-400" />{record.location}</div></td>
                    <td className="px-4 py-4"><div className="flex items-center gap-2 text-sm text-slate-600"><UserRound size={15} className="text-slate-400" />{record.holder}</div></td>
                    <td className="px-5 py-4 text-sm text-slate-500">{record.updated}</td>
                  </tr>
                ))}
                {filtered.length === 0 && <tr><td colSpan="6" className="px-6 py-14 text-center"><Search className="mx-auto mb-3 text-slate-300" size={30} /><p className="font-semibold text-slate-600">No matching records found</p><p className="mt-1 text-sm text-slate-400">Try another member name, record number, or category.</p></td></tr>}
              </tbody>
            </table>
          </div>
        </section>
        <p className="mt-4 text-xs text-slate-400">Prototype data only. Records will be loaded from the central database when the backend is connected.</p>
      </main>
    </div>
  );
}

export default SearchRecords;
