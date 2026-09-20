create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  team_id text not null unique,
  team_name text not null,
  leader_participant_id text,
  college text,
  department text,
  city text,
  status text not null default 'CONFIRMED',
  created_at timestamptz not null default now()
);

create table if not exists public.participants (
  id uuid primary key default gen_random_uuid(),
  participant_id text not null unique,
  team_id text references public.teams(team_id),
  full_name text not null,
  email text not null unique,
  phone text not null unique,
  college text,
  department text,
  year text,
  role text,
  qr_token text not null unique,
  registration_status text not null default 'CONFIRMED',
  created_at timestamptz not null default now()
);

create table if not exists public.checkpoint_verifications (
  id uuid primary key default gen_random_uuid(),
  participant_id text not null references public.participants(participant_id),
  team_id text references public.teams(team_id),
  checkpoint text not null,
  verified_by text not null,
  status text not null default 'COMPLETED',
  verified_at timestamptz not null default now(),
  unique (participant_id, checkpoint)
);

create table if not exists public.scan_history (
  id uuid primary key default gen_random_uuid(),
  participant_id text not null references public.participants(participant_id),
  team_id text references public.teams(team_id),
  checkpoint text,
  scanned_by text not null,
  status text not null default 'VERIFIED',
  scanned_at timestamptz not null default now()
);

alter table public.teams enable row level security;
alter table public.participants enable row level security;
alter table public.checkpoint_verifications enable row level security;
alter table public.scan_history enable row level security;

grant usage on schema public to anon;
grant insert on public.teams, public.participants to anon;

create policy "public can read teams" on public.teams for select using (true);
create policy "public can read participants" on public.participants for select using (true);
create policy "public can read checkpoint verifications" on public.checkpoint_verifications for select using (true);
create policy "public can read scan history" on public.scan_history for select using (true);
drop policy if exists "public can register teams" on public.teams;
drop policy if exists "public can register participants" on public.participants;
create policy "public can register teams" on public.teams for insert to anon with check (true);
create policy "public can register participants" on public.participants for insert to anon with check (true);