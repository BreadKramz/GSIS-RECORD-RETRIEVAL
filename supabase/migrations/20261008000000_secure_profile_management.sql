-- Run in Supabase SQL Editor after reviewing. Existing admin accounts are preserved.
-- New accounts always begin as staff; never trust client-supplied role metadata.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, first_name, middle_name, last_name, role, is_active)
  values (
    new.id,
    coalesce(nullif(btrim(new.raw_user_meta_data ->> 'first_name'), ''), 'User'),
    nullif(btrim(new.raw_user_meta_data ->> 'middle_name'), ''),
    coalesce(nullif(btrim(new.raw_user_meta_data ->> 'last_name'), ''), ''),
    'staff',
    true
  );
  return new;
end;
$$;

-- Remove unrestricted profile UPDATE policies: use a validated RPC instead.
drop policy if exists "Admins can update profiles" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;

create or replace function public.admin_update_profile(
  target_user_id uuid,
  new_first_name text,
  new_middle_name text,
  new_last_name text,
  new_role text,
  new_is_active boolean
)
returns void
language plpgsql security definer set search_path = ''
as $$
declare
  target_role text;
  target_active boolean;
begin
  if not exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin' and is_active = true
  ) then
    raise exception 'Administrator access required';
  end if;

  if target_user_id is null or new_role not in ('admin', 'staff')
     or new_is_active is null
     or nullif(btrim(new_first_name), '') is null
     or nullif(btrim(new_last_name), '') is null then
    raise exception 'Invalid profile details';
  end if;

  select role, is_active into target_role, target_active
  from public.profiles where id = target_user_id for update;
  if not found then raise exception 'User not found'; end if;

  if target_role = 'admin' and target_active = true
     and (new_role <> 'admin' or new_is_active = false)
     and (select count(*) from public.profiles where role = 'admin' and is_active = true) <= 1 then
    raise exception 'Cannot deactivate or demote the last active administrator';
  end if;

  update public.profiles
  set first_name = btrim(new_first_name),
      middle_name = nullif(btrim(coalesce(new_middle_name, '')), ''),
      last_name = btrim(new_last_name),
      role = new_role,
      is_active = new_is_active
  where id = target_user_id;
end;
$$;

revoke all on function public.admin_update_profile(uuid,text,text,text,text,boolean) from public;
revoke all on function public.admin_update_profile(uuid,text,text,text,text,boolean) from anon;
grant execute on function public.admin_update_profile(uuid,text,text,text,text,boolean) to authenticated;

-- Ensure RLS remains enabled. Verify existing SELECT policies separately.
alter table public.profiles enable row level security;
