-- Post-Migration Cleanup & Performance Tuning

-- 1. Add Missing Indexes for Foreign Keys (Linter Feedback)
create index if not exists idx_absences_modelId on public.absences("modelId");
create index if not exists idx_forum_replies_threadId on public.forum_replies("threadId");
create index if not exists idx_monthly_payments_modelId on public.monthly_payments("modelId");

-- 2. Clean up Temporary Permissive Policy
-- Revert to the secure policies established in 20260128002000_performance_fixes.sql

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
    -- Drop the temp permissive policy
    begin execute format('drop policy "Temp migration access" on public.%I;', t); exception when others then null; end;
    
    -- Re-apply 'Admin mod access' (Write only for Admin) if it was dropped
    -- Note: In 20260128002000 we created policies. 
    -- We need to ensure they exist. Since we dropped them in 20260128002500, we must recreate them.
  end loop;
end;
$$;

-- 3. Re-create Secure Policies (Copy of 20260128002000 logic)

-- A. Content Tables
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

-- B. Sensitive Tables
create policy "Admin full access" on public.monthly_payments for all using ((select auth.role()) = 'service_role');
create policy "Admin full access" on public.absences for all using ((select auth.role()) = 'service_role');
create policy "Admin full access" on public.recovery_requests for all using ((select auth.role()) = 'service_role');
create policy "Admin full access" on public.models for all using ((select auth.role()) = 'service_role');

-- C. Auth Tables
create policy "Authenticated write access" on public.forum_threads for insert 
  with check ((select auth.role()) in ('authenticated', 'service_role'));
create policy "Authenticated update access" on public.forum_threads for update 
  using ((select auth.uid())::text = "authorId" or (select auth.role()) = 'service_role');

create policy "Authenticated write access" on public.forum_replies for insert 
  with check ((select auth.role()) in ('authenticated', 'service_role'));

create policy "Public insert access" on public.article_comments for insert 
  with check ((select auth.role()) in ('anon', 'authenticated', 'service_role'));

create policy "Public insert access" on public.fashion_day_reservations for insert 
  with check ((select auth.role()) in ('anon', 'authenticated', 'service_role'));
