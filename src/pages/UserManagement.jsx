import { useState } from "react";
import { Plus, Search, ShieldCheck, Users } from "lucide-react";
function UserManagement(){
 const [query,setQuery]=useState("");
 return <div className="min-h-screen bg-[#F3F5F7] text-[#243746]">
  <header className="border-b border-slate-200 bg-white"><div className="flex min-h-20 items-center justify-between px-5 md:px-8"><div><h1 className="text-xl font-bold md:text-2xl">User Management</h1><p className="text-sm text-slate-500">Manage authorized Record Retrieval System accounts</p></div><button className="flex items-center gap-2 rounded-md bg-[#08689F] px-4 py-2.5 text-sm font-semibold text-white"><Plus size={17}/>Add User</button></div></header>
  <main className="p-5 md:p-8"><div className="mb-5 grid gap-4 sm:grid-cols-3"><div className="rounded-lg border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Total Users</p><p className="mt-2 text-3xl font-bold">—</p></div><div className="rounded-lg border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Administrators</p><p className="mt-2 text-3xl font-bold">—</p></div><div className="rounded-lg border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Staff</p><p className="mt-2 text-3xl font-bold">—</p></div></div>
  <section className="rounded-lg border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-200 p-5"><div className="flex max-w-xl items-center rounded-md border border-slate-300"><Search size={18} className="ml-4 text-slate-400"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search users..." className="h-11 w-full px-3 text-sm outline-none"/></div></div><div className="py-14 text-center"><Users size={34} className="mx-auto text-slate-300"/><p className="mt-3 font-semibold text-slate-600">No user accounts loaded</p><p className="mt-1 text-sm text-slate-400">Accounts and roles will be managed here after authentication is connected.</p></div></section>
  <div className="mt-5 flex gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-slate-600"><ShieldCheck size={20} className="shrink-0 text-[#08689F]"/><p><b>Role control:</b> Administrators will have full system access. Staff permissions can be limited to operational record workflows.</p></div>
  </main>
 </div>;
}
export default UserManagement;
