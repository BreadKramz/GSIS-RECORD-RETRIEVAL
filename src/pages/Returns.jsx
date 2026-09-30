import { useState } from "react";
import { CheckCircle2, MapPin, RotateCcw, Search, UserRound, ClipboardList } from "lucide-react";

function Returns() {
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({ returnedBy:"", returnLocation:"Records Section", receivedBy:"Administrator", remarks:"" });
  const change = e => setForm({...form,[e.target.name]:e.target.value});
  const submit = e => {
    e.preventDefault();
    alert("Prototype only: return transactions will be saved when the backend is connected.");
  };

  return (
    <div className="min-h-screen bg-[#F3F5F7] text-[#243746]">
      <header className="border-b border-slate-200 bg-white">
        <div className="flex min-h-20 items-center px-5 md:px-8">
          <div><h1 className="text-xl font-bold md:text-2xl">Return Record</h1><p className="text-sm text-slate-500">Record the return of a retrieved or forwarded physical file</p></div>
        </div>
      </header>

      <main className="max-w-6xl p-5 md:p-8">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#08689F]">Step 1</p>
          <h2 className="mt-1 font-bold">Find an outstanding record</h2>
          <p className="mt-1 text-sm text-slate-500">Locate the physical file that is being returned.</p>
          <div className="mt-5 flex max-w-2xl overflow-hidden rounded-md border border-slate-300 focus-within:border-[#08689F]">
            <Search className="ml-4 self-center text-slate-400" size={19}/>
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Enter record number or member name..." className="h-12 flex-1 px-3 text-sm outline-none"/>
            <button type="button" className="m-1 rounded-md bg-[#08689F] px-5 text-sm font-semibold text-white hover:bg-[#075A89]">Find</button>
          </div>
          <div className="mt-4 rounded-md border border-dashed border-slate-300 bg-slate-50 px-5 py-5 text-sm text-slate-400">
            Retrieved and forwarded records will appear here after the database is connected.
          </div>
        </section>

        <form onSubmit={submit} className="mt-6 rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#08689F]">Step 2</p>
            <h2 className="mt-1 font-bold">Return Information</h2>
            <p className="mt-1 text-sm text-slate-500">Confirm who returned the file, who received it, and its storage location.</p>
          </div>
          <div className="grid gap-5 p-6 md:grid-cols-2">
            <label className="text-sm font-semibold">Returned By
              <div className="relative mt-2"><UserRound size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input required name="returnedBy" value={form.returnedBy} onChange={change} placeholder="Person or office returning the file" className="h-12 w-full rounded-md border border-slate-300 pl-10 pr-3 font-normal outline-none focus:border-[#08689F]"/></div>
            </label>
            <label className="text-sm font-semibold">Received By
              <div className="relative mt-2"><CheckCircle2 size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input required name="receivedBy" value={form.receivedBy} onChange={change} placeholder="Receiving staff" className="h-12 w-full rounded-md border border-slate-300 pl-10 pr-3 font-normal outline-none focus:border-[#08689F]"/></div>
            </label>
            <label className="text-sm font-semibold md:col-span-2">Return Location
              <div className="relative mt-2"><MapPin size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input required name="returnLocation" value={form.returnLocation} onChange={change} placeholder="Storage section / shelf / office" className="h-12 w-full rounded-md border border-slate-300 pl-10 pr-3 font-normal outline-none focus:border-[#08689F]"/></div>
            </label>
            <label className="text-sm font-semibold md:col-span-2">Remarks
              <div className="relative mt-2"><ClipboardList size={17} className="absolute left-3 top-3.5 text-slate-400"/><textarea name="remarks" value={form.remarks} onChange={change} rows="4" placeholder="Optional notes about the return..." className="w-full rounded-md border border-slate-300 py-3 pl-10 pr-3 font-normal outline-none focus:border-[#08689F]"/></div>
            </label>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
            <p className="hidden text-xs text-slate-400 sm:block">Confirming a return will mark the record available and add a history entry.</p>
            <button type="submit" className="ml-auto flex items-center gap-2 rounded-md bg-[#4F8F3A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#447d33]"><RotateCcw size={17}/>Confirm Return</button>
          </div>
        </form>
      </main>
    </div>
  );
}
export default Returns;
