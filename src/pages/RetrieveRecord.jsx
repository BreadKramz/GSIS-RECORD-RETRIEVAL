import { useState } from "react";
import { ArrowRight, FileArchive, Search, UserRound, MapPin, ClipboardList } from "lucide-react";

function RetrieveRecord() {
  const [recordNo, setRecordNo] = useState("");
  const [form, setForm] = useState({ requestedBy:"", destination:"", remarks:"" });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    alert("Prototype only: retrieval transactions will be saved when the backend is connected.");
  };

  return (
    <div className="min-h-screen bg-[#F3F5F7] text-[#243746]">
      <header className="border-b border-slate-200 bg-white">
        <div className="flex min-h-20 items-center px-5 md:px-8">
          <div><h1 className="text-xl font-bold md:text-2xl">Retrieve Record</h1><p className="text-sm text-slate-500">Record the release and current custody of a physical file</p></div>
        </div>
      </header>

      <main className="max-w-6xl p-5 md:p-8">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#08689F]">Step 1</p>
          <h2 className="mt-1 font-bold">Find the record</h2>
          <p className="mt-1 text-sm text-slate-500">Search by record number or member name before releasing the physical file.</p>
          <div className="mt-5 flex max-w-2xl overflow-hidden rounded-md border border-slate-300 bg-white focus-within:border-[#08689F]">
            <Search className="ml-4 self-center text-slate-400" size={19}/>
            <input value={recordNo} onChange={e=>setRecordNo(e.target.value)} placeholder="Enter record number or member name..." className="h-12 flex-1 px-3 text-sm outline-none"/>
            <button type="button" className="m-1 rounded-md bg-[#08689F] px-5 text-sm font-semibold text-white hover:bg-[#075A89]">Find</button>
          </div>
          <p className="mt-3 text-xs text-slate-400">Record lookup will use the central registry when the backend is connected.</p>
        </section>

        <form onSubmit={submit} className="mt-6 rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#08689F]">Step 2</p>
            <h2 className="mt-1 font-bold">Retrieval Information</h2>
            <p className="mt-1 text-sm text-slate-500">Document who requested the file and where the physical record will be taken.</p>
          </div>
          <div className="grid gap-5 p-6 md:grid-cols-2">
            <label className="text-sm font-semibold">Requested By
              <div className="relative mt-2"><UserRound size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input required name="requestedBy" value={form.requestedBy} onChange={change} placeholder="Name of requesting person / office" className="h-12 w-full rounded-md border border-slate-300 pl-10 pr-3 font-normal outline-none focus:border-[#08689F]"/></div>
            </label>
            <label className="text-sm font-semibold">Destination / Forwarded To
              <div className="relative mt-2"><MapPin size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input required name="destination" value={form.destination} onChange={change} placeholder="Office, section, or custodian" className="h-12 w-full rounded-md border border-slate-300 pl-10 pr-3 font-normal outline-none focus:border-[#08689F]"/></div>
            </label>
            <label className="text-sm font-semibold md:col-span-2">Remarks
              <div className="relative mt-2"><ClipboardList size={17} className="absolute left-3 top-3.5 text-slate-400"/><textarea name="remarks" value={form.remarks} onChange={change} rows="4" placeholder="Optional purpose or notes..." className="w-full rounded-md border border-slate-300 py-3 pl-10 pr-3 font-normal outline-none focus:border-[#08689F]"/></div>
            </label>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
            <p className="hidden text-xs text-slate-400 sm:block">The transaction will update the record's current location and movement history.</p>
            <button type="submit" className="ml-auto flex items-center gap-2 rounded-md bg-[#08689F] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#075A89]"><FileArchive size={17}/>Confirm Retrieval<ArrowRight size={16}/></button>
          </div>
        </form>
      </main>
    </div>
  );
}
export default RetrieveRecord;
