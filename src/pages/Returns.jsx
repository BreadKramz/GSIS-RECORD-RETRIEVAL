import { useMemo, useState } from "react";
import { CheckCircle2, MapPin, RotateCcw, Search, UserRound, ClipboardList } from "lucide-react";

function Returns({ records, onReturn, profile }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [searched, setSearched] = useState(false);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ returnedBy:"", returnLocation:"Records Section", receivedBy:"Administrator", remarks:"" });
  const matches = useMemo(() => {
    const q=query.trim().toLowerCase();
    if(!q) return [];
    return records.filter(r => r.status !== "Available" && (r.recordNo.toLowerCase().includes(q) || r.memberName.toLowerCase().includes(q)));
  },[query,records]);
  const change=e=>setForm({...form,[e.target.name]:e.target.value});
  const find=()=>{setSearched(true);setSelected(null);setMessage("");};
  const submit = async (e) => {
    e.preventDefault();
    if(!selected) return setMessage("Select a retrieved or forwarded record before confirming return.");
    const result=onReturn(selected.id,form); } catch (error) { setSaving(false); return setMessage(error.message || "Unable to save transaction."); }
    setSaving(false);
    if (!result.ok) return setMessage(result.message);
    setMessage("Record returned successfully.");
    setSelected(null);setQuery("");setSearched(false);
    setForm({returnedBy:"",returnLocation:"Records Section",receivedBy:"Administrator",remarks:""});
  };

  return <div className="min-h-screen bg-[#F3F5F7] text-[#243746]">
    <header className="border-b border-slate-200 bg-white"><div className="flex min-h-20 items-center px-8"><div><h1 className="text-2xl font-bold">Return Record</h1><p className="text-sm text-slate-500">Record the return of a retrieved or forwarded physical file</p></div></div></header>
    <main className="max-w-6xl p-8">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#08689F]">Step 1</p><h2 className="mt-1 font-bold">Find an outstanding record</h2><p className="mt-1 text-sm text-slate-500">Only retrieved or forwarded records can be returned.</p>
        <div className="mt-5 flex max-w-2xl overflow-hidden rounded-md border border-slate-300 focus-within:border-[#08689F]"><Search className="ml-4 self-center text-slate-400" size={19}/><input value={query} onChange={e=>{setQuery(e.target.value);setSearched(false)}} onKeyDown={e=>e.key==="Enter"&&find()} placeholder="Enter record number or member name..." className="h-12 flex-1 px-3 text-sm outline-none"/><button type="button" onClick={find} className="m-1 rounded-md bg-[#08689F] px-5 text-sm font-semibold text-white">Find</button></div>
        {searched && <div className="mt-4 max-w-3xl overflow-hidden rounded-md border border-slate-200">{matches.length===0?<div className="bg-slate-50 px-5 py-5 text-sm text-slate-500">No outstanding matching records found.</div>:matches.map(r=><button key={r.id} type="button" onClick={()=>setSelected(r)} className={`flex w-full items-center justify-between border-b border-slate-100 px-5 py-4 text-left last:border-0 hover:bg-green-50/50 ${selected?.id===r.id?"bg-green-50":""}`}><div><p className="text-sm font-semibold">{r.memberName}</p><p className="mt-0.5 text-xs text-slate-500">{r.recordNo} · {r.category} · currently at {r.location}</p></div><span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#08689F]">{r.status}</span></button>)}</div>}
        {selected&&<div className="mt-4 flex max-w-3xl items-center gap-3 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm"><CheckCircle2 size={18} className="text-green-700"/><span><b>{selected.recordNo}</b> · {selected.memberName} selected for return</span></div>}
      </section>
      <form onSubmit={submit} className="mt-6 rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5"><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#08689F]">Step 2</p><h2 className="mt-1 font-bold">Return Information</h2><p className="mt-1 text-sm text-slate-500">Confirm who returned the file, who received it, and its storage location.</p></div>
        <div className="grid grid-cols-2 gap-5 p-6">
          <label className="text-sm font-semibold">Returned By<div className="relative mt-2"><UserRound size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input readOnly value={[profile?.first_name,profile?.last_name].filter(Boolean).join(" ")} className="h-12 w-full rounded-md border border-slate-300 bg-slate-50 pl-10 pr-3 font-normal"/></div></label>
          <label className="text-sm font-semibold">Received By<div className="relative mt-2"><CheckCircle2 size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input readOnly value="Records Section" className="h-12 w-full rounded-md border border-slate-300 bg-slate-50 pl-10 pr-3 font-normal"/></div></label>
          <label className="col-span-2 text-sm font-semibold">Return Location<div className="relative mt-2"><MapPin size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input required name="returnLocation" value={form.returnLocation} onChange={change} className="h-12 w-full rounded-md border border-slate-300 pl-10 pr-3 font-normal outline-none focus:border-[#08689F]"/></div></label>
          <label className="col-span-2 text-sm font-semibold">Remarks<div className="relative mt-2"><ClipboardList size={17} className="absolute left-3 top-3.5 text-slate-400"/><textarea name="remarks" value={form.remarks} onChange={change} rows="4" placeholder="Optional notes about the return..." className="w-full rounded-md border border-slate-300 py-3 pl-10 pr-3 font-normal outline-none focus:border-[#08689F]"/></div></label>
          {message&&<div className={`col-span-2 rounded-md border px-4 py-3 text-sm font-medium ${message.includes("successfully")?"border-green-200 bg-green-50 text-green-700":"border-red-200 bg-red-50 text-red-700"}`}>{message}</div>}
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4"><p className="text-xs text-slate-400">Confirming a return marks the record available and records the transaction.</p><button type="submit" disabled={saving} className="ml-auto flex items-center gap-2 rounded-md bg-[#4F8F3A] px-5 py-2.5 text-sm font-semibold text-white"><RotateCcw size={17}/>Confirm Return</button></div>
      </form>
    </main>
  </div>;
}
export default Returns;
