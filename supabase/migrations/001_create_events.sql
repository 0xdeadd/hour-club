-- Create events table for special events, celebrations, etc.
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date date not null,
  event_time text,
  people_involved text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for querying upcoming events
create index idx_events_event_date on events (event_date);

-- Auto-update updated_at on row change
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger events_updated_at
  before update on events
  for each row
  execute function update_updated_at();

-- Enable RLS but allow all access via service role key
alter table events enable row level security;

-- Allow anon read access
create policy "Allow public read" on events
  for select using (true);
