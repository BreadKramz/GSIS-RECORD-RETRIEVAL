import { ArrowLeft, ArchiveRestore, ArrowRightLeft, Clock3, FileArchive, MapPin, RotateCcw, UserRound } from "lucide-react";

function Badge({ status }) {
  const styles = {
    Available: "border-green-200 bg-green-50 text-[#4F8F3A]",
    Retrieved: "border-blue-200 bg-blue-50 text-[#08689F]",
    Forwarded: "border-amber-200 bg-amber-50 text-[#8A6A00]",
  };
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${styles[status] || "border-slate-200 bg-slate-50 text-slate-600"}`}>{status}</span>;
}

function RecordDetails({ record, onBack }) {
  const history = [
    { action: record.status, location: record.location, person: record.holder, time: record.updated },
  ];

  return (
    <div className="min-h-screen bg-[#F3F5F7] text-[#243746]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-20 max-w-[1450px] items-center justify-between px-5 md:px-8">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="rounded-md border border-slate-200 p-2 text-slate-600 hover:bg-slate-50" aria-label="Back to search"><ArrowLeft size={20} /></button>
            <img src="/gsis-logo.svg" alt="GSIS Logo" className="h-11 w-11 object-contain" />
            <div><h1 className="text-xl font-bold">Record Details</h1><p className="text-sm text-slate-500">GSIS Record Retrieval System</p></div>
          </div>
          <Badge status={record.status} />
        </div>
      </header>

      <main className="mx-auto max-w-[1450px] p-5 md:p-8">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#08689F]">{record.type}</p>
            <h2 className="mt-1 text-3xl font-bold">{record.name}</h2>
            <p className="mt-1 font-mono text-sm text-slate-500">{record.id}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-2 rounded-md bg-[#08689F] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#075A89]"><ArchiveRestore size={17}/>Retrieve</button>
            <button className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"><ArrowRightLeft size={17}/>Forward</button>
            <button className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"><RotateCcw size={17}/>Return</button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
          <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4"><h3 className="font-bold">File Information</h3><p className="mt-1 text-sm text-slate-500">Current physical record information and custody.</p></div>
            <div className="grid gap-px bg-slate-200 sm:grid-cols-2">
              {[
                ["Record Number", record.id, FileArchive],
                ["Record Category", record.type, FileArchive],
                ["Current Location", record.location, MapPin],
                ["Custodian / Requested By", record.holder, UserRound],
              ].map(([label,value,Icon]) => (
                <div key={label} className="bg-white p-6"><div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-[#EDF3F7] text-[#08689F]"><Icon size={18}/></div><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 font-semibold text-slate-700">{value}</p></div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-bold">Current Status</h3>
            <div className="mt-5 rounded-lg border border-slate-200 bg-[#F8FAFB] p-5">
              <Badge status={record.status}/>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex gap-3"><MapPin size={17} className="mt-0.5 text-slate-400"/><div><p className="text-slate-400">Location</p><p className="font-semibold">{record.location}</p></div></div>
                <div className="flex gap-3"><UserRound size={17} className="mt-0.5 text-slate-400"/><div><p className="text-slate-400">Held / requested by</p><p className="font-semibold">{record.holder}</p></div></div>
                <div className="flex gap-3"><Clock3 size={17} className="mt-0.5 text-slate-400"/><div><p className="text-slate-400">Last updated</p><p className="font-semibold">{record.updated}</p></div></div>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4"><h3 className="font-bold">Movement History</h3><p className="mt-1 text-sm text-slate-500">Tracks where the physical file has been and who handled it.</p></div>
          <div className="p-6">
            {history.map((item, i) => <div key={i} className="flex gap-4"><div className="flex flex-col items-center"><div className="h-3 w-3 rounded-full bg-[#08689F]"/><div className="mt-1 h-12 w-px bg-slate-200"/></div><div className="-mt-1"><p className="font-semibold">{item.action}</p><p className="mt-1 text-sm text-slate-500">{item.location} · {item.person}</p><p className="mt-1 text-xs text-slate-400">{item.time}</p></div></div>)}
          </div>
        </section>

        <p className="mt-4 text-xs text-slate-400">Prototype only. Retrieve, Forward, and Return actions will be saved when the backend is connected.</p>
      </main>
    </div>
  );
}

export default RecordDetails;
