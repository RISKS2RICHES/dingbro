-- Run this in the Supabase SQL editor once.

-- ── Tables ──
create table if not exists public.site_config (
  key text primary key,
  value text,
  updated_at timestamptz default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  icon text default 'wrench',
  position int default 0,
  created_at timestamptz default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  description text,
  image_url text,
  position int default 0,
  created_at timestamptz default now()
);

create table if not exists public.sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text not null,
  storage_path text,
  track text not null check (track in ('A','B')),
  display_width int default 150,
  position int default 0,
  created_at timestamptz default now()
);

-- ── Storage buckets ──
insert into storage.buckets (id, name, public)
values ('logos','logos', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('hero','hero', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('products','products', true)
on conflict (id) do nothing;

-- ── Row Level Security ──
alter table public.site_config enable row level security;
alter table public.services enable row level security;
alter table public.products enable row level security;
alter table public.sponsors enable row level security;

-- public read
create policy "site_config read" on public.site_config for select using (true);
create policy "services read" on public.services for select using (true);
create policy "products read" on public.products for select using (true);
create policy "sponsors read" on public.sponsors for select using (true);

-- admin-only write (matched by email claim)
create policy "site_config admin write" on public.site_config for all
  using (auth.jwt() ->> 'email' = 'admin@dingbro.com')
  with check (auth.jwt() ->> 'email' = 'admin@dingbro.com');
create policy "services admin write" on public.services for all
  using (auth.jwt() ->> 'email' = 'admin@dingbro.com')
  with check (auth.jwt() ->> 'email' = 'admin@dingbro.com');
create policy "products admin write" on public.products for all
  using (auth.jwt() ->> 'email' = 'admin@dingbro.com')
  with check (auth.jwt() ->> 'email' = 'admin@dingbro.com');
create policy "sponsors admin write" on public.sponsors for all
  using (auth.jwt() ->> 'email' = 'admin@dingbro.com')
  with check (auth.jwt() ->> 'email' = 'admin@dingbro.com');

-- storage policies: public read, admin write
create policy "logos public read" on storage.objects for select using (bucket_id = 'logos');
create policy "hero public read" on storage.objects for select using (bucket_id = 'hero');
create policy "products public read" on storage.objects for select using (bucket_id = 'products');
create policy "logos admin write" on storage.objects for all
  using (bucket_id = 'logos' and auth.jwt() ->> 'email' = 'admin@dingbro.com')
  with check (bucket_id = 'logos' and auth.jwt() ->> 'email' = 'admin@dingbro.com');
create policy "hero admin write" on storage.objects for all
  using (bucket_id = 'hero' and auth.jwt() ->> 'email' = 'admin@dingbro.com')
  with check (bucket_id = 'hero' and auth.jwt() ->> 'email' = 'admin@dingbro.com');
create policy "products admin write" on storage.objects for all
  using (bucket_id = 'products' and auth.jwt() ->> 'email' = 'admin@dingbro.com')
  with check (bucket_id = 'products' and auth.jwt() ->> 'email' = 'admin@dingbro.com');

-- ── Seed: point hero at the supabase-hosted video ──
insert into public.site_config (key, value) values
  ('hero_video_url', 'https://snvwynjuhzdkdkszbvcf.supabase.co/storage/v1/object/public/hero/copy_8101D942-7F7A-4086-9127-781C1BC8D76D.mov')
on conflict (key) do update set value = excluded.value, updated_at = now();
