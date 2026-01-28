-- Fix Function Search Path Mutable warning
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
    new.updated_at = now();
    RETURN new;
END;
$$;

-- Secure RLS Policies (Reverting permissive migration policies)

-- Helper to drop permissive policies safely
do $$
declare
  t text;
begin
  for t in 
    select table_name from information_schema.tables where table_schema = 'public'
  loop
    -- Drop the temporary "Public write access" policy used for migration
    begin
        execute format('drop policy "Public write access" on public.%I;', t);
    exception when others then null; end;
  end loop;
end;
$$;

-- Re-apply strict policies

-- 1. Content Tables (Read: Public, Write: Admin)
-- articles, news_items, hero_slides, testimonials, agency_*, site_*, pages_content, nav_links, social_links, model_distinctions
create policy "Admin write access" on public.articles for all using (auth.role() = 'service_role' or auth.email() = 'admin@example.com'); -- adjusting for real admin check later
create policy "Admin write access" on public.news_items for all using (auth.role() = 'service_role');
create policy "Admin write access" on public.hero_slides for all using (auth.role() = 'service_role');
create policy "Admin write access" on public.testimonials for all using (auth.role() = 'service_role');
create policy "Admin write access" on public.agency_info for all using (auth.role() = 'service_role');
create policy "Admin write access" on public.agency_services for all using (auth.role() = 'service_role');
create policy "Admin write access" on public.agency_timeline for all using (auth.role() = 'service_role');
create policy "Admin write access" on public.agency_partners for all using (auth.role() = 'service_role');
create policy "Admin write access" on public.agency_achievements for all using (auth.role() = 'service_role');
create policy "Admin write access" on public.site_config for all using (auth.role() = 'service_role');
create policy "Admin write access" on public.site_images for all using (auth.role() = 'service_role');
create policy "Admin write access" on public.pages_content for all using (auth.role() = 'service_role');
create policy "Admin write access" on public.nav_links for all using (auth.role() = 'service_role');
create policy "Admin write access" on public.social_links for all using (auth.role() = 'service_role');
create policy "Admin write access" on public.model_distinctions for all using (auth.role() = 'service_role');
create policy "Admin write access" on public.jury_members for all using (auth.role() = 'service_role');
create policy "Admin write access" on public.registration_staff for all using (auth.role() = 'service_role');

-- 2. Sensitive/User Data (Read: Restricted, Write: Restricted/Public Insert)

-- Models (Public Read mostly, Write: Admin/Self)
-- For now, Admin write primarily
create policy "Admin write access" on public.models for all using (auth.role() = 'service_role');

-- Absences, Payments, Recovery (Admin Read, Admin Write)
create policy "Admin write access" on public.absences for all using (auth.role() = 'service_role');
create policy "Admin write access" on public.monthly_payments for all using (auth.role() = 'service_role');
create policy "Admin write access" on public.recovery_requests for all using (auth.role() = 'service_role');

-- Public Submission Forms
-- Fashion Day Reservations
create policy "Public insert access" on public.fashion_day_reservations for insert with check (true);

-- Article Comments
create policy "Public insert access" on public.article_comments for insert with check (true);

-- Forum (Read: Public, Write: Authenticated)
drop policy if exists "Authenticated write access" on public.forum_threads;
drop policy if exists "Authenticated update access" on public.forum_threads;
drop policy if exists "Authenticated write access" on public.forum_replies;

create policy "Authenticated write access" on public.forum_threads for insert with check (auth.role() = 'authenticated' or auth.role() = 'service_role');
create policy "Authenticated update access" on public.forum_threads for update using (auth.uid()::text = "authorId" or auth.role() = 'service_role');
create policy "Authenticated write access" on public.forum_replies for insert with check (auth.role() = 'authenticated' or auth.role() = 'service_role');

