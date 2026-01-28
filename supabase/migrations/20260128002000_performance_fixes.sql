
-- Performance & Security Fixes

-- 1. Helper to drop overlapping/insecure policies
-- We will recreate them with optimal performance wrapping (select ...)
-- and stricter scoping.

do $$
declare
  tables text[] := array[
    'articles', 'news_items', 'hero_slides', 'testimonials', 'agency_info', 
    'agency_services', 'agency_timeline', 'agency_partners', 'agency_achievements', 
    'site_config', 'site_images', 'pages_content', 'nav_links', 'social_links', 
    'model_distinctions', 'jury_members', 'registration_staff', 'models', 
    'absences', 'monthly_payments', 'recovery_requests', 'fashion_day_reservations',
    'article_comments', 'forum_threads', 'forum_replies'
  ];
  t text;
begin
  foreach t in array tables loop
    -- Drop generic Admin write access (ALL) to replace with specific actions
    begin execute format('drop policy "Admin write access" on public.%I;', t); exception when others then null; end;
    
    -- Drop potentially leaking Public read access on sensitive tables
    if t in ('monthly_payments', 'absences', 'recovery_requests') then
        begin execute format('drop policy "Public read access" on public.%I;', t); exception when others then null; end;
    end if;
  end loop;
end;
$$;

-- 2. Re-apply Admin Policies (Optimized & Scoped)
-- Using (select auth.role()) for performance

-- A. Public Read Tables: Admin only needs Write (Insert, Update, Delete)
-- Because "Public read access" covers SELECT.
-- Tables: articles, news_items, hero_slides, testimonials, agency_*, site_*, pages_content, nav_links, social_links, model_distinctions, jury, staff, article_comments
-- Note: fashion_day_reservations is likely admin-read only? Assuming public for now or safe defaults.

create policy "Admin mod access" on public.articles for insert with check ((select auth.role()) = 'service_role');
create policy "Admin mod access update" on public.articles for update using ((select auth.role()) = 'service_role');
create policy "Admin mod access delete" on public.articles for delete using ((select auth.role()) = 'service_role');

create policy "Admin mod access" on public.news_items for insert with check ((select auth.role()) = 'service_role');
create policy "Admin mod access update" on public.news_items for update using ((select auth.role()) = 'service_role');
create policy "Admin mod access delete" on public.news_items for delete using ((select auth.role()) = 'service_role');

create policy "Admin mod access" on public.hero_slides for insert with check ((select auth.role()) = 'service_role');
create policy "Admin mod access update" on public.hero_slides for update using ((select auth.role()) = 'service_role');
create policy "Admin mod access delete" on public.hero_slides for delete using ((select auth.role()) = 'service_role');

create policy "Admin mod access" on public.testimonials for insert with check ((select auth.role()) = 'service_role');
create policy "Admin mod access update" on public.testimonials for update using ((select auth.role()) = 'service_role');
create policy "Admin mod access delete" on public.testimonials for delete using ((select auth.role()) = 'service_role');

create policy "Admin mod access" on public.agency_info for insert with check ((select auth.role()) = 'service_role');
create policy "Admin mod access update" on public.agency_info for update using ((select auth.role()) = 'service_role');
create policy "Admin mod access delete" on public.agency_info for delete using ((select auth.role()) = 'service_role');

create policy "Admin mod access" on public.agency_services for insert with check ((select auth.role()) = 'service_role');
create policy "Admin mod access update" on public.agency_services for update using ((select auth.role()) = 'service_role');
create policy "Admin mod access delete" on public.agency_services for delete using ((select auth.role()) = 'service_role');

create policy "Admin mod access" on public.agency_timeline for insert with check ((select auth.role()) = 'service_role');
create policy "Admin mod access update" on public.agency_timeline for update using ((select auth.role()) = 'service_role');
create policy "Admin mod access delete" on public.agency_timeline for delete using ((select auth.role()) = 'service_role');

create policy "Admin mod access" on public.agency_partners for insert with check ((select auth.role()) = 'service_role');
create policy "Admin mod access update" on public.agency_partners for update using ((select auth.role()) = 'service_role');
create policy "Admin mod access delete" on public.agency_partners for delete using ((select auth.role()) = 'service_role');

create policy "Admin mod access" on public.agency_achievements for insert with check ((select auth.role()) = 'service_role');
create policy "Admin mod access update" on public.agency_achievements for update using ((select auth.role()) = 'service_role');
create policy "Admin mod access delete" on public.agency_achievements for delete using ((select auth.role()) = 'service_role');

create policy "Admin mod access" on public.site_config for insert with check ((select auth.role()) = 'service_role');
create policy "Admin mod access update" on public.site_config for update using ((select auth.role()) = 'service_role');
create policy "Admin mod access delete" on public.site_config for delete using ((select auth.role()) = 'service_role');

create policy "Admin mod access" on public.site_images for insert with check ((select auth.role()) = 'service_role');
create policy "Admin mod access update" on public.site_images for update using ((select auth.role()) = 'service_role');
create policy "Admin mod access delete" on public.site_images for delete using ((select auth.role()) = 'service_role');

create policy "Admin mod access" on public.pages_content for insert with check ((select auth.role()) = 'service_role');
create policy "Admin mod access update" on public.pages_content for update using ((select auth.role()) = 'service_role');
create policy "Admin mod access delete" on public.pages_content for delete using ((select auth.role()) = 'service_role');

create policy "Admin mod access" on public.nav_links for insert with check ((select auth.role()) = 'service_role');
create policy "Admin mod access update" on public.nav_links for update using ((select auth.role()) = 'service_role');
create policy "Admin mod access delete" on public.nav_links for delete using ((select auth.role()) = 'service_role');

create policy "Admin mod access" on public.social_links for insert with check ((select auth.role()) = 'service_role');
create policy "Admin mod access update" on public.social_links for update using ((select auth.role()) = 'service_role');
create policy "Admin mod access delete" on public.social_links for delete using ((select auth.role()) = 'service_role');

create policy "Admin mod access" on public.model_distinctions for insert with check ((select auth.role()) = 'service_role');
create policy "Admin mod access update" on public.model_distinctions for update using ((select auth.role()) = 'service_role');
create policy "Admin mod access delete" on public.model_distinctions for delete using ((select auth.role()) = 'service_role');

create policy "Admin mod access" on public.jury_members for insert with check ((select auth.role()) = 'service_role');
create policy "Admin mod access update" on public.jury_members for update using ((select auth.role()) = 'service_role');
create policy "Admin mod access delete" on public.jury_members for delete using ((select auth.role()) = 'service_role');

create policy "Admin mod access" on public.registration_staff for insert with check ((select auth.role()) = 'service_role');
create policy "Admin mod access update" on public.registration_staff for update using ((select auth.role()) = 'service_role');
create policy "Admin mod access delete" on public.registration_staff for delete using ((select auth.role()) = 'service_role');


-- B. Sensitive Tables (No Public Read): Admin needs ALL (Select + Write)
-- Tables: monthly_payments, absences, recovery_requests
create policy "Admin full access" on public.monthly_payments for all using ((select auth.role()) = 'service_role');
create policy "Admin full access" on public.absences for all using ((select auth.role()) = 'service_role');
create policy "Admin full access" on public.recovery_requests for all using ((select auth.role()) = 'service_role');


-- C. Mixed Access (Models)
-- Models: Admin Write. Public Read Partial. Admin Read All.
-- Since Public Read only sees "isPublic=true", Admin needs a policy to see hidden ones.
create policy "Admin full access" on public.models for all using ((select auth.role()) = 'service_role');


-- D. Fix Auth InitPlan on Existing Public/Auth Policies
-- Drop and recreate using (select ...)

-- Forum Threads
drop policy if exists "Authenticated write access" on public.forum_threads;
drop policy if exists "Authenticated update access" on public.forum_threads;
create policy "Authenticated write access" on public.forum_threads for insert 
  with check ((select auth.role()) in ('authenticated', 'service_role'));
create policy "Authenticated update access" on public.forum_threads for update 
  using ((select auth.uid())::text = "authorId" or (select auth.role()) = 'service_role');

-- Forum Replies
drop policy if exists "Authenticated write access" on public.forum_replies;
create policy "Authenticated write access" on public.forum_replies for insert 
  with check ((select auth.role()) in ('authenticated', 'service_role'));

-- Article Comments (Public Insert)
drop policy if exists "Public insert access" on public.article_comments;
create policy "Public insert access" on public.article_comments for insert 
  with check ((select auth.role()) in ('anon', 'authenticated', 'service_role'));

-- Fashion Day Reservations (Public Insert)
drop policy if exists "Public insert access" on public.fashion_day_reservations;
create policy "Public insert access" on public.fashion_day_reservations for insert 
  with check ((select auth.role()) in ('anon', 'authenticated', 'service_role'));

