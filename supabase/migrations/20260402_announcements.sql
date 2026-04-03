-- Create announcements table
create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text,
  category text,
  date date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for querying by date
create index idx_announcements_date on announcements (date);

-- Auto-update updated_at on row change (reuse existing function)
create trigger announcements_updated_at
  before update on announcements
  for each row
  execute function update_updated_at();

-- Enable RLS
alter table announcements enable row level security;

-- Allow anon read access
create policy "Allow public read" on announcements
  for select using (true);

-- Seed existing announcements
insert into announcements (title, body, category, date) values
  (
    'Welcome to our new website!',
    'We''ve launched a brand new members-only website for The Hour Club. Here you''ll find meeting schedules, announcements, resources, and more. Bookmark this page and check back often for updates.',
    'News',
    '2026-03-28'
  ),
  (
    'Spring cleanup day — volunteers needed',
    'Join us Saturday, April 12th at 9:00 AM for our spring cleanup. We''ll be tidying up the clubhouse inside and out. Bring gloves and a good attitude. Coffee and donuts provided. Many hands make light work!',
    'Event',
    '2026-04-12'
  ),
  (
    'New Thursday night Big Book study',
    'Starting this month, we''ve added a Big Book Study meeting every Thursday at 8:00 PM. This is an open meeting and everyone is welcome. Come join the discussion as we work through the Big Book together.',
    'Schedule',
    '2026-03-20'
  );
