-- Create meetings table
create table if not exists meetings (
  id uuid primary key default gen_random_uuid(),
  day_of_week integer not null check (day_of_week between 0 and 6),
  time text not null,
  tags text[] not null default array[]::text[],
  note text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_meetings_day_sort on meetings (day_of_week, sort_order);

create trigger meetings_updated_at
  before update on meetings
  for each row
  execute function update_updated_at();

alter table meetings enable row level security;

create policy "Allow public read" on meetings
  for select using (true);

-- Create meeting_notices table
create table if not exists meeting_notices (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_meeting_notices_sort on meeting_notices (sort_order);

create trigger meeting_notices_updated_at
  before update on meeting_notices
  for each row
  execute function update_updated_at();

alter table meeting_notices enable row level security;

create policy "Allow public read" on meeting_notices
  for select using (true);

-- Seed meeting notices
insert into meeting_notices (text, sort_order) values
  ('NA meets daily at 12:00 PM', 0),
  ('CMA meets Thursday at 8:00 AM', 1);

-- Seed meetings data from hardcoded schedule
-- Monday = 1
insert into meetings (day_of_week, time, tags, note, sort_order) values
  (1, '8:00 AM',  '{"Open","Step Study"}', null, 0),
  (1, '12:00 PM', '{"Open"}',              null, 1),
  (1, '5:30 PM',  '{"Open"}',              null, 2),
-- Tuesday = 2
  (2, '8:00 AM',  '{"Open Discussion"}',   null, 0),
  (2, '12:00 PM', '{"Open Discussion"}',   null, 1),
  (2, '5:30 PM',  '{"Open Discussion"}',   null, 2),
  (2, '8:00 PM',  '{"Open"}',              null, 3),
-- Wednesday = 3
  (3, '8:00 AM',  '{"Open"}',                          null, 0),
  (3, '10:30 AM', '{"Open","Step Study","Women"}',      null, 1),
  (3, '12:00 PM', '{"Open Discussion"}',                null, 2),
  (3, '5:30 PM',  '{"Open Discussion"}',                null, 3),
  (3, '8:00 PM',  '{"Open"}',                          null, 4),
-- Thursday = 4
  (4, '8:00 AM',  '{"Open"}',                    null, 0),
  (4, '12:00 PM', '{"Open Discussion"}',          null, 1),
  (4, '5:30 PM',  '{"Open"}',                    null, 2),
  (4, '8:00 PM',  '{"Open","Big Book Study"}',   null, 3),
-- Friday = 5
  (5, '8:00 AM',  '{"Open","Big Book Study"}',   null, 0),
  (5, '12:00 PM', '{"Open"}',                    null, 1),
  (5, '5:30 PM',  '{"Open Discussion"}',         'Al-Anon also meets at this time', 2),
-- Saturday = 6
  (6, '8:00 AM',  '{"Open Discussion"}',   null, 0),
  (6, '12:00 PM', '{"Open Discussion"}',   null, 1),
  (6, '3:00 PM',  '{"Open"}',              null, 2),
  (6, '5:30 PM',  '{"Open Discussion"}',   null, 3),
  (6, '8:00 PM',  '{"Open Discussion"}',   null, 4),
-- Sunday = 0
  (0, '9:30 AM',  '{"11th Step","Open Discussion"}',          null, 0),
  (0, '1:00 PM',  '{"Open Discussion"}',                      null, 1),
  (0, '5:00 PM',  '{"Open Discussion"}',                      null, 2),
  (0, '8:00 PM',  '{"Open Discussion","Young People"}',       null, 3);
