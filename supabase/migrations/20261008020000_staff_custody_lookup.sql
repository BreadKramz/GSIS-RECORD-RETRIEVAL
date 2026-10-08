-- Allow active RRS users to see active staff identities for custody selection.
-- This exposes only the existing profiles table fields through SELECT; consider
-- replacing it with a limited-view RPC if more sensitive profile columns are added.
drop policy if exists "Active RRS users can list active staff" on public.profiles;
create policy "Active RRS users can list active staff"
on public.profiles for select to authenticated
using (is_active = true and public.rrs_active_user());
