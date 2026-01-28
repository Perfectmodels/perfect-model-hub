-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm"; -- Good for search

-- Helper function to update updated_at column
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;


-- 1. Agency Info
create table if not exists public.agency_info (
  id integer primary key default 1,
  about jsonb,
  "values" jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
alter table public.agency_info enable row level security;
create policy "Public read access" on public.agency_info for select using (true);
create policy "Public write access" on public.agency_info for all using (true);

-- 2. Agency Services
create table if not exists public.agency_services (
  id text primary key,
  title text,
  slug text,
  description text,
  icon text,
  category text,
  "buttonText" text,
  "buttonLink" text,
  details jsonb,
  created_at timestamp with time zone default now()
);
alter table public.agency_services enable row level security;
create policy "Public read access" on public.agency_services for select using (true);
create policy "Public write access" on public.agency_services for all using (true);

-- 3. Agency Timeline
create table if not exists public.agency_timeline (
  id text primary key,
  year text,
  event text,
  created_at timestamp with time zone default now()
);
alter table public.agency_timeline enable row level security;
create policy "Public read access" on public.agency_timeline for select using (true);
create policy "Public write access" on public.agency_timeline for all using (true);

-- 4. Agency Partners
create table if not exists public.agency_partners (
  id text primary key,
  name text,
  created_at timestamp with time zone default now()
);
alter table public.agency_partners enable row level security;
create policy "Public read access" on public.agency_partners for select using (true);
create policy "Public write access" on public.agency_partners for all using (true);

-- 5. Agency Achievements
create table if not exists public.agency_achievements (
  id text primary key,
  name text,
  items text[],
  created_at timestamp with time zone default now()
);
alter table public.agency_achievements enable row level security;
create policy "Public read access" on public.agency_achievements for select using (true);
create policy "Public write access" on public.agency_achievements for all using (true);

-- 6. Articles
create table if not exists public.articles (
  id text primary key,
  slug text unique,
  author text,
  category text,
  content jsonb,
  date date,
  excerpt text,
  "imageUrl" text,
  "isFeatured" boolean,
  reactions jsonb,
  tags text[],
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
alter table public.articles enable row level security;
create policy "Public read access" on public.articles for select using (true);
create policy "Public write access" on public.articles for all using (true);

-- 7. Models
create table if not exists public.models (
  id text primary key,
  age integer,
  email text,
  experience text,
  gender text,
  height text,
  "imageUrl" text,
  "isPublic" boolean default true,
  journey text,
  level text,
  location text,
  measurements jsonb,
  name text,
  password text, -- Note: In Supabase, use Auth Users! This is migrated legacy data.
  phone text,
  username text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
alter table public.models enable row level security;
create policy "Public read access" on public.models for select using ("isPublic" = true);
create policy "Public write access" on public.models for all using (true);

-- 8. Absences
create table if not exists public.absences (
  id text primary key,
  date date,
  "isExcused" boolean,
  "modelId" text references public.models(id),
  "modelName" text,
  notes text,
  reason text,
  created_at timestamp with time zone default now()
);
alter table public.absences enable row level security;
create policy "Public read access" on public.absences for select using (true);
create policy "Public write access" on public.absences for all using (true);

-- 9. Article Comments
create table if not exists public.article_comments (
  id text primary key,
  "articleSlug" text, -- Could reference articles(slug)
  "authorName" text,
  content text,
  "createdAt" timestamp with time zone
);
alter table public.article_comments enable row level security;
create policy "Public read access" on public.article_comments for select using (true);
create policy "Public write access" on public.article_comments for all using (true);

-- 10. Fashion Day Reservations
create table if not exists public.fashion_day_reservations (
  id text primary key,
  email text,
  name text,
  phone text,
  "specialRequests" text,
  status text,
  "submissionDate" timestamp with time zone,
  "tableOptionId" text
);
alter table public.fashion_day_reservations enable row level security;
create policy "Admin read access" on public.fashion_day_reservations for select using (true);
create policy "Public write access" on public.fashion_day_reservations for all using (true);

-- 11. Forum Threads
create table if not exists public.forum_threads (
  id text primary key,
  "authorId" text,
  "authorName" text,
  category text,
  content text,
  "createdAt" timestamp with time zone,
  "isLocked" boolean default false,
  "isPinned" boolean default false,
  tags text[],
  title text,
  "updatedAt" timestamp with time zone,
  views integer default 0
);
alter table public.forum_threads enable row level security;
create policy "Public read access" on public.forum_threads for select using (true);
create policy "Public write access" on public.forum_threads for all using (true);

-- 12. Forum Replies
create table if not exists public.forum_replies (
  id text primary key,
  "authorId" text,
  "authorName" text,
  content text,
  "createdAt" timestamp with time zone,
  "threadId" text references public.forum_threads(id)
);
alter table public.forum_replies enable row level security;
create policy "Public read access" on public.forum_replies for select using (true);
create policy "Public write access" on public.forum_replies for all using (true);


-- 13. Hero Slides
create table if not exists public.hero_slides (
  id serial primary key,
  data jsonb,
  created_at timestamp with time zone default now()
);
alter table public.hero_slides enable row level security;
create policy "Public read access" on public.hero_slides for select using (true);
create policy "Public write access" on public.hero_slides for all using (true);

-- 14. Jury Members
create table if not exists public.jury_members (
  id text primary key,
  name text,
  username text,
  password text
);
alter table public.jury_members enable row level security;
create policy "Admin read access" on public.jury_members for select using (true);
create policy "Public write access" on public.jury_members for all using (true);

-- 15. Model Distinctions
create table if not exists public.model_distinctions (
  id text primary key,
  name text,
  titles text[]
);
alter table public.model_distinctions enable row level security;
create policy "Public read access" on public.model_distinctions for select using (true);
create policy "Public write access" on public.model_distinctions for all using (true);

-- 16. Monthly Payments
create table if not exists public.monthly_payments (
  id text primary key,
  amount numeric,
  method text,
  "modelId" text references public.models(id),
  "modelName" text,
  month text,
  notes text,
  "paymentDate" date,
  status text
);
alter table public.monthly_payments enable row level security;
-- Only Model or Admin should see this. For migration ease, we allow read.
create policy "Admin/Owner read access" on public.monthly_payments for select using (true);
create policy "Public write access" on public.monthly_payments for all using (true);

-- 17. Nav Links
create table if not exists public.nav_links (
  id text primary key,
  "inFooter" boolean,
  label text,
  path text
);
alter table public.nav_links enable row level security;
create policy "Public read access" on public.nav_links for select using (true);
create policy "Public write access" on public.nav_links for all using (true);

-- 18. News Items
create table if not exists public.news_items (
  id text primary key,
  date date,
  excerpt text,
  "imageUrl" text,
  link text,
  title text,
  created_at timestamp with time zone default now()
);
alter table public.news_items enable row level security;
create policy "Public read access" on public.news_items for select using (true);
create policy "Public write access" on public.news_items for all using (true);

-- 19. Pages Content
create table if not exists public.pages_content (
  id text primary key,
  subtitle text,
  text text,
  title text
);
alter table public.pages_content enable row level security;
create policy "Public read access" on public.pages_content for select using (true);
create policy "Public write access" on public.pages_content for all using (true);

-- 20. Recovery Requests
create table if not exists public.recovery_requests (
  id text primary key,
  "modelName" text,
  phone text,
  status text,
  timestamp timestamp with time zone
);
alter table public.recovery_requests enable row level security;
create policy "Admin read access" on public.recovery_requests for select using (true);
create policy "Public write access" on public.recovery_requests for all using (true);

-- 21. Registration Staff
create table if not exists public.registration_staff (
  id text primary key,
  name text,
  password text,
  username text
);
alter table public.registration_staff enable row level security;
create policy "Admin read access" on public.registration_staff for select using (true);
create policy "Public write access" on public.registration_staff for all using (true);

-- 22. Site Config
create table if not exists public.site_config (
  id integer primary key default 1,
  logo text
);
alter table public.site_config enable row level security;
create policy "Public read access" on public.site_config for select using (true);
create policy "Public write access" on public.site_config for all using (true);

-- 23. Site Images
create table if not exists public.site_images (
  key text primary key,
  url text
);
alter table public.site_images enable row level security;
create policy "Public read access" on public.site_images for select using (true);
create policy "Public write access" on public.site_images for all using (true);

-- 24. Social Links
create table if not exists public.social_links (
  platform text primary key,
  url text
);
alter table public.social_links enable row level security;
create policy "Public read access" on public.social_links for select using (true);
create policy "Public write access" on public.social_links for all using (true);

-- 25. Testimonials
create table if not exists public.testimonials (
  id text primary key,
  "imageUrl" text,
  name text,
  quote text,
  role text
);
alter table public.testimonials enable row level security;
create policy "Public read access" on public.testimonials for select using (true);
create policy "Public write access" on public.testimonials for all using (true);

-- FUNCTIONS (Example: Semantic Search or simple counters)
-- Basic trigger function to update updated_at
create trigger update_articles_modtime before update on public.articles for each row execute procedure update_updated_at_column();
create trigger update_models_modtime before update on public.models for each row execute procedure update_updated_at_column();

