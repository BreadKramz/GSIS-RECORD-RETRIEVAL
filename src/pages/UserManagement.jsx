import { useEffect, useState } from "react";
import { Search, ShieldCheck, Users } from "lucide-react";
import { supabase } from "../lib/supabaseClient.js";
function UserManagement(){
 const [query,setQuery]=useState("");
 const [users,setUsers]=useState([]);
 const [loading,setLoading]=useState(true);
 useEffect(()=>{ supabase.from("profiles").select("id, first_name, middle_name, last_name, role, is_active, created_at").order("created_at",{ascending:false}).then(({data})=>{setUsers(data||[]);setLoading(false);}); },[]);
 const shown=users.filter(u=>[u.first_name,u.middle_name,u.last_name,u.role].filter(Boolean).join(" ").toLowerCase().includes(query.toLowerCase()));
 return <div className="min-h-screen bg-[#F3F5F7] text-[#243746]">
  <header className="border-b border-slate-200 bg-white"><div className="flex min-h-20 items-center justify-between px-5 md:px-8"><div><h1 className="text-xl font-bold md:text-2xl">User Management</h1><p className="text-sm text-slate-500">Manage authorized Record Retrieval System accounts</p></div></div></header>
  <main className="p-5 md:p-8"><div className="mb-5 grid gap-4 sm:grid-cols-3"><div className="rounded-lg border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Total Users</p><p className="mt-2 text-3xl font-bold">{users.length}</p></div><div className="rounded-lg border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Administrators</p><p className="mt-2 text-3xl font-bold">{users.filter(u=>u.role==="admin").length}</p></div><div className="rounded-lg border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Staff</p><p className="mt-2 text-3xl font-bold">{users.filter(u=>u.role==="staff").length}</p></div></div>
  <section className="rounded-lg border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-200 p-5"><div className="flex max-w-xl items-center rounded-md border border-slate-300"><Search size={18} className="ml-4 text-slate-400"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search users..." className="h-11 w-full px-3 text-sm outline-none"/></div></div>{loading ? <div className="py-14 text-center text-sm text-slate-500">Loading users...</div> : shown.length===0 ? <div className="py-14 text-center"><Users size={34} className="mx-auto text-slate-300"/><p className="mt-3 font-semibold text-slate-600">No users found</p></div> : <div className="divide-y divide-slate-100">{shown.map(u=><div key={u.id} className="grid grid-cols-[1fr_120px_120px] items-center gap-4 px-5 py-4 text-sm"><div><p className="font-semibold">{[u.first_name,u.last_name].filter(Boolean).join(" ")}</p><p className="text-xs text-slate-400">{[u.first_name,u.middle_name,u.last_name].filter(Boolean).join(" ")}</p></div><span className="capitalize">{u.role}</span><span>{u.is_active ? "Active" : "Inactive"}</span></div>)}</div>}</section>
  <div className="mt-5 flex gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-slate-600"><ShieldCheck size={20} className="shrink-0 text-[#08689F]"/><p><b>Role control:</b> Administrators will have full system access. Staff permissions can be limited to operational record workflows.</p></div>
  </main>
 </div>;
}
export default UserManagement;
