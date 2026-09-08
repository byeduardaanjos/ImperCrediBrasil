create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) between 3 and 120),
  whatsapp text not null check (char_length(whatsapp) between 10 and 25),
  address text not null check (char_length(address) between 5 and 180),
  neighborhood text not null check (char_length(neighborhood) between 2 and 100),
  city text not null check (char_length(city) between 2 and 100),
  desired_amount numeric(12, 2) not null check (desired_amount > 0),
  monthly_income numeric(12, 2) not null check (monthly_income > 0),
  consent_at timestamptz not null default now(),
  source text not null default 'site',
  status text not null default 'novo'
    check (status in ('novo', 'em_contato', 'em_analise', 'proposta_enviada', 'aprovado', 'recusado', 'concluido')),
  assigned_to uuid references auth.users(id) on delete set null,
  notes text
);

create index leads_status_created_at_idx on public.leads (status, created_at desc);
create index leads_assigned_to_idx on public.leads (assigned_to);

alter table public.leads enable row level security;

revoke all on table public.leads from anon, authenticated;
grant insert (full_name, whatsapp, address, neighborhood, city, desired_amount, monthly_income, consent_at, source)
  on table public.leads to anon;
grant select, insert, update, delete on table public.leads to service_role;

create policy "public_can_create_new_lead"
  on public.leads
  for insert
  to anon
  with check (
    status = 'novo'
    and assigned_to is null
    and notes is null
    and source = 'site'
  );

create table public.staff_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 2 and 100),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create index staff_members_active_idx on public.staff_members (active) where active = true;

alter table public.staff_members enable row level security;

revoke all on table public.staff_members from anon, authenticated;
grant select on table public.staff_members to authenticated;
grant select, insert, update, delete on table public.staff_members to service_role;

create policy "staff_can_view_own_membership"
  on public.staff_members
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

grant select, update on table public.leads to authenticated;

create policy "active_staff_can_view_leads"
  on public.leads
  for select
  to authenticated
  using (
    exists (
      select 1 from public.staff_members
      where user_id = (select auth.uid()) and active = true
    )
  );

create policy "active_staff_can_update_leads"
  on public.leads
  for update
  to authenticated
  using (
    exists (
      select 1 from public.staff_members
      where user_id = (select auth.uid()) and active = true
    )
  )
  with check (
    exists (
      select 1 from public.staff_members
      where user_id = (select auth.uid()) and active = true
    )
  );
