import {
  Archive,
  Bell,
  ChevronRight,
  Clock3,
  FileArchive,
  FileCheck2,
  Files,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

const stats = [
  { label: "Total Records", value: "—", detail: "All registered files", icon: Files, accent: "#08689F" },
  { label: "Available", value: "—", detail: "Ready for retrieval", icon: FileCheck2, accent: "#4F8F3A" },
  { label: "Retrieved", value: "—", detail: "Currently out", icon: FileArchive, accent: "#08689F" },
  { label: "Pending Return", value: "—", detail: "Awaiting return", icon: Clock3, accent: "#D9A928" },
];

const activities = [];

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Search Records", icon: Search, page: "search" },
  { label: "Records", icon: Archive },
  { label: "Retrieve", icon: FileArchive },
  { label: "Returns", icon: RotateCcw },
  { label: "History", icon: History },
];

function StatusBadge({ status }) {
  const styles = {
    Retrieved: "bg-[#08689F]/10 text-[#08689F]",
    Returned: "bg-[#4F8F3A]/15 text-[#4e8d2d]",
    Forwarded: "bg-[#D9A928]/20 text-[#8a6a00]",
  };

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

function Dashboard({ onLogout, onNavigate }) {
  return (
    <div className="min-h-screen bg-[#F3F5F7] text-[#243746]">
      <div>
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 text-[#08689F] hover:bg-slate-100 lg:hidden"><Menu size={22} /></button>
            <div>
              <h1 className="text-xl font-bold md:text-2xl">Dashboard</h1>
              <p className="hidden text-sm text-gray-500 sm:block">Record Retrieval System overview</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-full border border-slate-200 p-2.5 text-gray-500 hover:bg-slate-50">
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#D9A928]" />
            </button>
            <div className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 sm:flex">
              <ShieldCheck size={18} className="text-[#4F8F3A]" />
              <span className="text-sm font-semibold">Admin</span>
            </div>
          </div>
        </header>

        <main className="p-5 md:p-8">
          <section className="mb-8">
            <h2 className="text-2xl font-bold">Good day, Administrator</h2>
            <p className="mt-1 text-gray-500">Here is the current status of your physical records.</p>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(({ label, value, detail, icon: Icon, accent }) => (
              <article key={label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{label}</p>
                    <p className="mt-2 text-3xl font-bold">{value}</p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-md" style={{ backgroundColor: `${accent}18`, color: accent }}>
                    <Icon size={22} />
                  </div>
                </div>
                <p className="mt-4 text-xs text-gray-400">{detail}</p>
              </article>
            ))}
          </section>

          <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#08689F]">Quick Search</p>
                <h3 className="mt-1 text-xl font-bold text-[#243746]">Find a record instantly</h3>
                <p className="mt-1 text-sm text-[#687782]">Search by member name, record number, or file reference.</p>
              </div>
              <div className="flex w-full max-w-2xl overflow-hidden rounded-md bg-white shadow-sm">
                <div className="flex flex-1 items-center">
                  <Search className="ml-4 text-gray-400" size={20} />
                  <input
                    type="search"
                    placeholder="Search member name or record number..."
                    className="h-13 w-full bg-transparent px-3 text-sm text-[#243746] outline-none"
                  />
                </div>
                <button onClick={() => onNavigate("search")} className="m-1.5 rounded-md bg-[#08689F] px-5 text-sm font-semibold text-white hover:bg-[#075A89]">Search</button>
              </div>
            </div>
          </section>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_320px]">
            <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <div>
                  <h3 className="font-bold">Recent File Activity</h3>
                  <p className="mt-0.5 text-xs text-gray-400">Latest retrieval, return, and forwarding transactions</p>
                </div>
                <button className="flex items-center gap-1 text-sm font-semibold text-[#08689F]">View all <ChevronRight size={16} /></button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] text-left">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-gray-400">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Record</th>
                      <th className="px-4 py-3 font-semibold">Type</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Requested / Forwarded</th>
                      <th className="px-6 py-3 font-semibold">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activities.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-10 text-center text-sm text-slate-400">
                          No file activity yet.
                        </td>
                      </tr>
                    )}
                    {activities.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/70">
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold">{item.name}</p>
                          <p className="text-xs text-gray-400">{item.id}</p>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">{item.type}</td>
                        <td className="px-4 py-4"><StatusBadge status={item.action} /></td>
                        <td className="px-4 py-4 text-sm text-gray-600">{item.person}</td>
                        <td className="px-6 py-4 text-sm text-gray-400">{item.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold">Record Categories</h3>
              <p className="mt-1 text-xs text-gray-400">Current prototype categories</p>
              <div className="mt-5 space-y-3">
                {[
                  ["Policy Envelopes", "—", "#08689F"],
                  ["Active Files", "—", "#4F8F3A"],
                  ["Inactive Files", "—", "#7C8796"],
                  ["Retirement", "—", "#D9A928"],
                ].map(([label, count, color]) => (
                  <button key={label} className="flex w-full items-center justify-between rounded-md border border-slate-100 p-3 text-left hover:bg-slate-50">
                    <div className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-sm font-medium">{label}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-500">{count}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 rounded-md bg-[#F3F5F7] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Prototype note</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">Dashboard data will appear here once records and transactions are added.</p>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
