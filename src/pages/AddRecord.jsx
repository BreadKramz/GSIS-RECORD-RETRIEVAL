import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";

function AddRecord({ onBack }) {
  const [form, setForm] = useState({ recordNo:"", memberName:"", category:"Policy Envelope", location:"Records Section", remarks:"" });
  const change = (e) => setForm({...form,[e.target.name]:e.target.value});
  const submit = (e) => { e.preventDefault(); alert("Prototype only: record saving will be enabled when the database is connected."); };
  return (
    <div className="min-h-screen bg-[#F3F5F7] text-[#243746]">
      <header className="border-b border-slate-200 bg-white"><div className="flex min-h-20 items-center gap-4 px-5 md:px-8"><button onClick={onBack} className="rounded-md border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"><ArrowLeft size={20}/></button><div><h1 className="text-xl font-bold md:text-2xl">Add Record</h1><p className="text-sm text-slate-500">Register a physical file in the Record Retrieval System</p></div></div></header>
      <main className="max-w-5xl p-5 md:p-8">
        <form onSubmit={submit} className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5"><h2 className="font-bold">Record Information</h2><p className="mt-1 text-sm text-slate-500">Enter the identifying information and initial physical location.</p></div>
          <div className="grid gap-5 p-6 md:grid-cols-2">
            <label className="text-sm font-semibold">Record Number<input required name="recordNo" value={form.recordNo} onChange={change} placeholder="e.g. PE-00125" className="mt-2 h-12 w-full rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-[#08689F]"/></label>
            <label className="text-sm font-semibold">Member Name<input required name="memberName" value={form.memberName} onChange={change} placeholder="Enter complete member name" className="mt-2 h-12 w-full rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-[#08689F]"/></label>
            <label className="text-sm font-semibold">Record Category<select name="category" value={form.category} onChange={change} className="mt-2 h-12 w-full rounded-md border border-slate-300 bg-white px-3 font-normal outline-none focus:border-[#08689F]"><option>Policy Envelope</option><option>Active File</option><option>Inactive File</option><option>Retirement</option></select></label>
            <label className="text-sm font-semibold">Initial Location<input required name="location" value={form.location} onChange={change} className="mt-2 h-12 w-full rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-[#08689F]"/></label>
            <label className="text-sm font-semibold md:col-span-2">Remarks<textarea name="remarks" value={form.remarks} onChange={change} rows="4" placeholder="Optional notes about the physical record..." className="mt-2 w-full rounded-md border border-slate-300 p-3 font-normal outline-none focus:border-[#08689F]"/></label>
          </div>
          <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4"><button type="button" onClick={onBack} className="rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold">Cancel</button><button type="submit" className="flex items-center gap-2 rounded-md bg-[#08689F] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#075A89]"><Save size={17}/>Save Record</button></div>
        </form>
      </main>
    </div>
  );
}
export default AddRecord;
