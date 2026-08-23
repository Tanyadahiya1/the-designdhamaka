-- Run this once in your Supabase project's SQL editor.
-- Project → SQL Editor → New query → paste this → Run.

-- 1. INQUIRIES (new client enquiries from the contact form)
create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  budget text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'archived'))
);

alter table inquiries enable row level security;

-- Anyone (anonymous site visitors) can submit an enquiry.
create policy "Public can insert inquiries"
  on inquiries for insert
  to anon
  with check (true);

-- Only logged-in admins can read/update/delete enquiries.
create policy "Authenticated can read inquiries"
  on inquiries for select
  to authenticated
  using (true);

create policy "Authenticated can update inquiries"
  on inquiries for update
  to authenticated
  using (true);

create policy "Authenticated can delete inquiries"
  on inquiries for delete
  to authenticated
  using (true);

-- 2. PROJECTS (your portfolio / selected work)
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  category text not null,
  year text not null,
  cover_image text not null,
  description text,
  link text,
  featured boolean not null default true,
  sort_order int not null default 0
);

alter table projects enable row level security;

-- Anyone can view published projects (they power the public site).
create policy "Public can read projects"
  on projects for select
  to anon
  using (true);

create policy "Authenticated can read projects"
  on projects for select
  to authenticated
  using (true);

create policy "Authenticated can insert projects"
  on projects for insert
  to authenticated
  with check (true);

create policy "Authenticated can update projects"
  on projects for update
  to authenticated
  using (true);

create policy "Authenticated can delete projects"
  on projects for delete
  to authenticated
  using (true);
