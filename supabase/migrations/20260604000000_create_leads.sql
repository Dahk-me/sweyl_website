create schema if not exists s_lead;

create table if not exists s_lead.leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  club        text not null,
  role        text not null,
  message     text,
  created_at  timestamptz not null default now()
);

alter table s_lead.leads enable row level security;

create policy "service role insert" on s_lead.leads
  for insert with check (true);

create policy "no public read" on s_lead.leads
  for select using (false);

grant usage on schema s_lead to service_role;
grant all on s_lead.leads to service_role;
