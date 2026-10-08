-- GSIS RRS permanent storage foundation.
-- Run only after reviewing in Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.records (
 id uuid primary key default gen_random_uuid(),
 record_no text not null unique check (length(btrim(record_no)) > 0),
 member_name text not null check (length(btrim(member_name)) > 0),
 category text not null check (category in ('Policy Envelope','Active File','Inactive File','Retirement')),
 status text not null default 'Available' check (status in ('Available','Retrieved','Forwarded')),
 location text not null default 'Records Section',
 current_custodian_id uuid references public.profiles(id),
 remarks text not null default '',
 created_by uuid not null references public.profiles(id),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 constraint available_has_no_custodian check (status <> 'Available' or current_custodian_id is null),
 constraint circulating_has_custodian check (status = 'Available' or current_custodian_id is not null)
);

create table if not exists public.record_transactions (
 id uuid primary key default gen_random_uuid(),
 record_id uuid not null references public.records(id),
 action text not null check (action in ('Added','Retrieved','Forwarded','Returned')),
 actor_id uuid not null references public.profiles(id),
 from_location text,
 to_location text,
 from_custodian_id uuid references public.profiles(id),
 to_custodian_id uuid references public.profiles(id),
 remarks text not null default '',
 created_at timestamptz not null default now()
);
create index if not exists idx_record_transactions_record_time on public.record_transactions(record_id,created_at desc);
create index if not exists idx_records_custodian on public.records(current_custodian_id);

alter table public.records enable row level security;
alter table public.record_transactions enable row level security;
revoke all on public.records from anon, authenticated;
revoke all on public.record_transactions from anon, authenticated;
grant select on public.records, public.record_transactions to authenticated;

create or replace function public.rrs_active_user()
returns boolean language sql stable security definer set search_path = ''
as $$
 select exists(select 1 from public.profiles where id=auth.uid() and is_active=true and role in ('admin','staff'));
$$;
revoke all on function public.rrs_active_user() from public;
grant execute on function public.rrs_active_user() to authenticated;

drop policy if exists "Active users can view records" on public.records;
create policy "Active users can view records" on public.records for select to authenticated using (public.rrs_active_user());
drop policy if exists "Active users can view record transactions" on public.record_transactions;
create policy "Active users can view record transactions" on public.record_transactions for select to authenticated using (public.rrs_active_user());

-- All mutations occur through authenticated, validated SECURITY DEFINER functions.
create or replace function public.rrs_add_record(p_record_no text,p_member_name text,p_category text,p_location text,p_remarks text default '')
returns uuid language plpgsql security definer set search_path = ''
as $$
declare v_id uuid; v_actor uuid := auth.uid();
begin
 if not public.rrs_active_user() then raise exception 'Active account required'; end if;
 if not exists(select 1 from public.profiles where id=v_actor and role='admin' and is_active=true) then
   raise exception 'Administrator access required to add records';
 end if;
 if nullif(btrim(p_record_no),'') is null or nullif(btrim(p_member_name),'') is null or nullif(btrim(p_location),'') is null then
   raise exception 'Record number, member name and location are required';
 end if;
 insert into public.records(record_no,member_name,category,location,remarks,created_by)
 values(upper(btrim(p_record_no)),btrim(p_member_name),p_category,btrim(p_location),coalesce(p_remarks,''),v_actor)
 returning id into v_id;
 insert into public.record_transactions(record_id,action,actor_id,to_location,remarks)
 values(v_id,'Added',v_actor,btrim(p_location),coalesce(p_remarks,''));
 return v_id;
end;
$$;
revoke all on function public.rrs_add_record(text,text,text,text,text) from public,anon;
grant execute on function public.rrs_add_record(text,text,text,text,text) to authenticated;

create or replace function public.rrs_move_record(p_record_id uuid,p_action text,p_location text,p_target_custodian uuid default null,p_remarks text default '')
returns void language plpgsql security definer set search_path = ''
as $$
declare r public.records%rowtype; v_actor uuid := auth.uid(); v_admin boolean;
begin
 if not public.rrs_active_user() then raise exception 'Active account required'; end if;
 select role='admin' into v_admin from public.profiles where id=v_actor;
 select * into r from public.records where id=p_record_id for update;
 if not found then raise exception 'Record not found'; end if;
 if nullif(btrim(p_location),'') is null then raise exception 'Location required'; end if;
 if p_action='Retrieved' then
   if r.status<>'Available' then raise exception 'Only available records can be retrieved'; end if;
   if p_target_custodian is null then raise exception 'Custodian required'; end if;
 elsif p_action='Forwarded' then
   if r.status='Available' then raise exception 'Retrieve record before forwarding'; end if;
   if not v_admin and r.current_custodian_id is distinct from v_actor then raise exception 'Only current custodian may forward'; end if;
   if p_target_custodian is null then raise exception 'Recipient required'; end if;
 elsif p_action='Returned' then
   if r.status='Available' then raise exception 'Record is already available'; end if;
   if not v_admin and r.current_custodian_id is distinct from v_actor then raise exception 'Only current custodian may return'; end if;
   if p_target_custodian is not null then raise exception 'Returned record cannot have a custodian'; end if;
 else raise exception 'Invalid action'; end if;
 if p_target_custodian is not null and not exists(select 1 from public.profiles where id=p_target_custodian and is_active=true) then
   raise exception 'Recipient must be an active user';
 end if;
 update public.records set status=case when p_action='Returned' then 'Available' else p_action end,
 location=btrim(p_location),current_custodian_id=p_target_custodian,
 remarks=coalesce(nullif(p_remarks,''),r.remarks),updated_at=now()
 where id=p_record_id;
 insert into public.record_transactions(record_id,action,actor_id,from_location,to_location,from_custodian_id,to_custodian_id,remarks)
 values(p_record_id,p_action,v_actor,r.location,btrim(p_location),r.current_custodian_id,p_target_custodian,coalesce(p_remarks,''));
end;
$$;
revoke all on function public.rrs_move_record(uuid,text,text,uuid,text) from public,anon;
grant execute on function public.rrs_move_record(uuid,text,text,uuid,text) to authenticated;
