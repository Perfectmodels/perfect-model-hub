-- Enable Realtime for Interactive & Live Data Tables

-- 1. Publication for client-side subscription
-- By default 'supabase_realtime' publication exists, we just need to add tables to it.

alter publication supabase_realtime add table public.forum_threads;
alter publication supabase_realtime add table public.forum_replies;
alter publication supabase_realtime add table public.article_comments;

-- 2. Admin Live Dashboard Support
-- Allow admins to see updates in real-time
alter publication supabase_realtime add table public.monthly_payments;
alter publication supabase_realtime add table public.absences;
alter publication supabase_realtime add table public.recovery_requests;
alter publication supabase_realtime add table public.fashion_day_reservations;

-- 3. Notifications/System Support
alter publication supabase_realtime add table public.news_items;
