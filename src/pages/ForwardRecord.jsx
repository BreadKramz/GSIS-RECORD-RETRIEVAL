import { useMemo, useState } from "react";
import { ArrowRightLeft, CheckCircle2, ClipboardList, MapPin, Search, UserRound } from "lucide-react";

function ForwardRecord({ records, onForward }) {
  const [query,setQuery]=useState("");
  const [selected,setSelected]=useState(null);
  const [searched,setSearched]=useState(false);
  const [message,setMessage]=useState("");
  const [form,setForm]=useState({ forwardedBy:"", forwardedTo:"", destination:"", remarks:"" });

  const matches=useMemo(()=>{
    const q=query.trim().toLowerCase();
    if(!q) return [];
    return records.filter(r => r.status !== "Available" && (r.recordNo.toLowerCase().includes(q) || r.memberName.toLowerCase().includes(q)));
  },[query,records]);

  const find=()=>{setSearched(true);setSelected(null);setMessage("");};
  const change=e=>setForm({...form,[e.target.name]:e.target.value});
  const submit=e=>{
    e.preventDefault();
    if(!selected) return setMessage("Select a retrieved or forwarded record before confirming forwarding.");
    const result=onForward(selected.id,form);
    if(!result.ok) return setMessage(result.message);
    setMessage("Record forwarded successfully.");
    setSelected(null);setQuery("");setSearched(false);
    setForm({forwardedBy:"",forwardedTo:"",destination:"",remarks:""});
  };

  return <div className="min-h-screen bg-[#F3F5F7] text-[#243746]">
    <header className="border-b border-slate-200 bg-white"><div className="flex min-h-20 items-center px-8"><div><h1 className="text-2xl font-bold">Forward Record</h1><p className="text-sm text-slate-500">Transfer custody of a retrieved physical file to another person or office</p></div></div></header>
    <main className="max-w-6xl p-8">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#08689F]">Step 1</p><h2 className="mt-1 font-bold">Find a record in circulation</h2><p className="mt-1 text-sm text-slate-500">Only retrieved or previously forwarded records can be forwarded.</p>
        <div className="mt-5 flex max-w-2xl overflow-hidden rounded-md border border-slate-300 bg-white focus-within:border-[#08689F]"><Search className="ml-4 self-center text-slate-400" size={19}/><input value={query} onChange={e=>{setQuery(e.target.value);setSearched(false)}} onKeyDown={e=>e.key==="Enter"&&find()} placeholder="Enter record number or member name..." className="h-12 flex-1 px-3 text-sm outline-none"/><button type="button" onClick={find} className="m-1 rounded-md bg-[#08689F] px-5 text-sm font-semibold text-white hover:bg-[#075A89]">Find</button></div>
        {searched&&<div className="mt-4 max-w-3xl overflow-hidden rounded-md border border-slate-200">{matches.length===0?<div className="bg-slate-50 px-5 py-5 text-sm text-slate-500">No retrieved or forwarded matching records found.</div>:matches.map(r=><button key={r.id} type="button" onClick={()=>{setSelected(r);setMessage("");}} className={`flex w-full items-center justify-between border-b border-slate-100 px-5 py-4 text-left last:border-0 hover:bg-amber-50/50 ${selected?.id===r.id?"bg-amber-50":""}`}><div><p className="text-sm font-semibold">{r.memberName}</p><p className="mt-0.5 text-xs text-slate-500">{r.recordNo} · {r.category} · {r.location} · {r.custodian}</p></div><span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-[#8A6A00]">{r.status}</span></button>)}</div>}
        {selected&&<div className="mt-4 flex max-w-3xl items-center gap-3 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm"><CheckCircle2 size={18} className="text-[#8A6A00]"/><span><b>{selected.recordNo}</b> · {selected.memberName} selected for forwarding</span></div>}
      </section>
      <form onSubmit={submit} className="mt-6 rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5"><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#08689F]">Step 2</p><h2 className="mt-1 font-bold">Forwarding Information</h2><p className="mt-1 text-sm text-slate-500">Document the custody transfer and the file's new destination.</p></div>
        <div className="grid grid-cols-2 gap-5 p-6">
          <label className="text-sm font-semibold">Forwarded By<div className="relative mt-2"><UserRound size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input required name="forwardedBy" value={form.forwardedBy} onChange={change} placeholder="Person releasing the file" className="h-12 w-full rounded-md border border-slate-300 pl-10 pr-3 font-normal outline-none focus:border-[#08689F]"/></div></label>
          <label className="text-sm font-semibold">Forwarded To<div className="relative mt-2"><UserRound size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input required name="forwardedTo" value={form.forwardedTo} onChange={change} placeholder="New custodian / receiving person" className="h-12 w-full rounded-md border border-slate-300 pl-10 pr-3 font-normal outline-none focus:border-[#08689F]"/></div></label>
          <label className="col-span-2 text-sm font-semibold">Destination / Office<div className="relative mt-2"><MapPin size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input required name="destination" value={form.destination} onChange={change} placeholder="Office, section, or destination" className="h-12 w-full rounded-md border border-slate-300 pl-10 pr-3 font-normal outline-none focus:border-[#08689F]"/></div></label>
          <label className="col-span-2 text-sm font-semibold">Remarks<div className="relative mt-2"><ClipboardList size={17} className="absolute left-3 top-3.5 text-slate-400"/><textarea name="remarks" value={form.remarks} onChange={change} rows="4" placeholder="Optional purpose or transfer notes..." className="w-full rounded-md border border-slate-300 py-3 pl-10 pr-3 font-normal outline-none focus:border-[#08689F]"/></div></label>
          {message&&<div className={`col-span-2 rounded-md border px-4 py-3 text-sm font-medium ${message.includes("successfully")?"border-green-200 bg-green-50 text-green-700":"border-red-200 bg-red-50 text-red-700"}`}>{message}</div>}
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4"><p className="text-xs text-slate-400">Forwarding keeps the file in circulation and updates its current custodian and location.</p><button type="submit" className="ml-auto flex items-center gap-2 rounded-md bg-[#A47700] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#8A6500]"><ArrowRightLeft size={17}/>Confirm Forward</button></div>
      </form>
    </main>
  </div>;
}
export default ForwardRecord;
