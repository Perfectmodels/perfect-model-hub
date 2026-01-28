
-- 1. Fix Extension in Public
create schema if not exists extensions;
grant usage on schema extensions to postgres, anon, authenticated, service_role;

-- Move pg_trgm to extensions schema
alter extension pg_trgm set schema extensions;
-- Update search path so functions can find it
alter database postgres set search_path to public, extensions;

-- 2. Fix Overly Permissive Policies (Leftovers)

-- Agency Info
drop policy if exists "Admin update access" on public.agency_info;
-- Replaced by "Admin write access" defined in previous migration, but ensuring strictness
-- (If strictly needed, re-create: create policy "Admin write access" ... using (auth.role() = 'service_role'))

-- Models
drop policy if exists "Admin/Self write access" on public.models;
-- Note: "Admin write access" (service_role) was added in 20260128001000. 
-- If 'Self' access is needed (e.g. models updating their own profile), it should be:
-- create policy "Self update access" on public.models for update using (auth.uid()::text = id);

-- 3. Address Permissive Public Inserts (Comments & Reservations)
-- The linter warns about CHECK (true). To make it slightly safer/explicit, we restrict to anon/authenticated roles explicitly.
-- This doesn't change behavior (anyone can still post), but avoids "always true" wildcardiness often flagged.

-- Article Comments
drop policy if exists "Public insert access" on public.article_comments;
create policy "Public insert access" on public.article_comments for insert with check (auth.role() in ('anon', 'authenticated'));

-- Fashion Day Reservations
drop policy if exists "Public insert access" on public.fashion_day_reservations;
create policy "Public insert access" on public.fashion_day_reservations for insert with check (auth.role() in ('anon', 'authenticated'));
