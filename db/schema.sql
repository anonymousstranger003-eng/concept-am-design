-- =====================================================================
-- AM Concepts CMS — Foundation schema
-- Run once: Supabase Dashboard → SQL Editor → New query → paste → Run.
-- Safe to re-run.
-- =====================================================================

create table if not exists public.admins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade unique,
  email text not null,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);
grant select on public.admins to authenticated;
grant all on public.admins to service_role;
alter table public.admins enable row level security;
do $$ begin
  create policy "admins_read_own" on public.admins
    for select to authenticated using (user_id = auth.uid());
exception when duplicate_object then null; end $$;

create or replace function public.is_admin(uid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.admins where user_id = uid);
$$;
grant execute on function public.is_admin(uuid) to anon, authenticated;

create table if not exists public.site_settings (
  id int primary key default 1,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);
grant select on public.site_settings to anon, authenticated;
grant insert, update on public.site_settings to authenticated;
grant all on public.site_settings to service_role;
alter table public.site_settings enable row level security;
do $$ begin
  create policy "settings_public_read" on public.site_settings
    for select to anon, authenticated using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "settings_admin_write" on public.site_settings
    for all to authenticated
    using (public.is_admin(auth.uid()))
    with check (public.is_admin(auth.uid()));
exception when duplicate_object then null; end $$;
insert into public.site_settings (id, data) values (1, '{}'::jsonb)
on conflict (id) do nothing;

create table if not exists public.content_blocks (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
grant select on public.content_blocks to anon, authenticated;
grant insert, update, delete on public.content_blocks to authenticated;
grant all on public.content_blocks to service_role;
alter table public.content_blocks enable row level security;
do $$ begin
  create policy "blocks_public_read" on public.content_blocks
    for select to anon, authenticated using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "blocks_admin_write" on public.content_blocks
    for all to authenticated
    using (public.is_admin(auth.uid()))
    with check (public.is_admin(auth.uid()));
exception when duplicate_object then null; end $$;

create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  form_type text not null default 'contact',
  payload jsonb not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);
grant insert on public.form_submissions to anon, authenticated;
grant select, update, delete on public.form_submissions to authenticated;
grant all on public.form_submissions to service_role;
alter table public.form_submissions enable row level security;
do $$ begin
  create policy "submissions_public_insert" on public.form_submissions
    for insert to anon, authenticated with check (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "submissions_admin_read" on public.form_submissions
    for select to authenticated using (public.is_admin(auth.uid()));
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "submissions_admin_update" on public.form_submissions
    for update to authenticated using (public.is_admin(auth.uid()));
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "submissions_admin_delete" on public.form_submissions
    for delete to authenticated using (public.is_admin(auth.uid()));
exception when duplicate_object then null; end $$;

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;
do $$ begin
  create policy "media_public_read" on storage.objects
    for select to anon, authenticated using (bucket_id = 'media');
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "media_admin_insert" on storage.objects
    for insert to authenticated
    with check (bucket_id = 'media' and public.is_admin(auth.uid()));
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "media_admin_update" on storage.objects
    for update to authenticated
    using (bucket_id = 'media' and public.is_admin(auth.uid()));
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "media_admin_delete" on storage.objects
    for delete to authenticated
    using (bucket_id = 'media' and public.is_admin(auth.uid()));
exception when duplicate_object then null; end $$;
