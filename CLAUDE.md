@AGENTS.md

## Supabase backup (2026-04-30)

Original Supabase project `zclzyzuevrufxbkcnvkl` ("hour-club") under org `info@zanycuts.com's Org` was scheduled for deletion on 2026-04-30 to stop $10/mo compute. Full schema + data dump lives at `.supabase-backup/restore.sql` — paste into the SQL editor of a new free-tier project to rebuild.

Tables backed up: `meetings` (28), `events` (8), `announcements` (3), `meeting_notices` (2). RLS enabled with public-read policies on all four. No auth users, no storage, no edge functions to migrate.

After restoring, update the Supabase URL + anon key in this project's env files.

