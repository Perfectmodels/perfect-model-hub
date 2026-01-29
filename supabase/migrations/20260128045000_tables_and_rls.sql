-- Create and Fix Tables RLS
-- Using IF NOT EXISTS

-- 1. casting_applications
CREATE TABLE IF NOT EXISTS public.casting_applications (
    id text PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now(),
    submission_date timestamp with time zone,
    status text,
    first_name text,
    last_name text,
    birth_date text,
    email text,
    phone text,
    nationality text,
    city text,
    gender text,
    height text,
    weight text,
    chest text,
    waist text,
    hips text,
    shoe_size text,
    eye_color text,
    hair_color text,
    experience text,
    instagram text,
    portfolio_link text,
    photo_portrait_url text,
    photo_full_body_url text,
    photo_profile_url text,
    scores jsonb,
    passage_number integer
);
ALTER TABLE public.casting_applications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Casting Access" ON public.casting_applications;
CREATE POLICY "Public Casting Access" ON public.casting_applications FOR ALL USING (true) WITH CHECK (true);

-- 2. fashion_day_reservations
CREATE TABLE IF NOT EXISTS public.fashion_day_reservations (
    id text PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now(),
    submission_date timestamp with time zone,
    name text,
    email text,
    phone text,
    role text,
    message text,
    status text
);
ALTER TABLE public.fashion_day_reservations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Fashion Day Access" ON public.fashion_day_reservations;
CREATE POLICY "Public Fashion Day Access" ON public.fashion_day_reservations FOR ALL USING (true) WITH CHECK (true);

-- 3. forum_threads
CREATE TABLE IF NOT EXISTS public.forum_threads (
    id text PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now(),
    title text,
    author_id text,
    author_name text,
    initial_post text
);
ALTER TABLE public.forum_threads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Threads Access" ON public.forum_threads;
CREATE POLICY "Public Threads Access" ON public.forum_threads FOR ALL USING (true) WITH CHECK (true);

-- 4. forum_replies
CREATE TABLE IF NOT EXISTS public.forum_replies (
    id text PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now(),
    thread_id text REFERENCES public.forum_threads(id) ON DELETE CASCADE,
    author_id text,
    author_name text,
    content text
);
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Replies Access" ON public.forum_replies;
CREATE POLICY "Public Replies Access" ON public.forum_replies FOR ALL USING (true) WITH CHECK (true);

-- 5. article_comments
CREATE TABLE IF NOT EXISTS public.article_comments (
    id text PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now(),
    article_slug text,
    author_name text,
    content text
);
ALTER TABLE public.article_comments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Comments Access" ON public.article_comments;
CREATE POLICY "Public Comments Access" ON public.article_comments FOR ALL USING (true) WITH CHECK (true);

-- 6. recovery_requests
CREATE TABLE IF NOT EXISTS public.recovery_requests (
    id text PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now(),
    model_name text,
    phone text,
    timestamp timestamp with time zone,
    status text
);
ALTER TABLE public.recovery_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Recovery Access" ON public.recovery_requests;
CREATE POLICY "Public Recovery Access" ON public.recovery_requests FOR ALL USING (true) WITH CHECK (true);

-- 7. monthly_payments
CREATE TABLE IF NOT EXISTS public.monthly_payments (
    id text PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now(),
    model_id text,
    model_name text,
    month text,
    amount numeric,
    payment_date text,
    method text,
    status text,
    notes text
);
ALTER TABLE public.monthly_payments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Payments Access" ON public.monthly_payments;
CREATE POLICY "Public Payments Access" ON public.monthly_payments FOR ALL USING (true) WITH CHECK (true);

-- 8. absences
CREATE TABLE IF NOT EXISTS public.absences (
    id text PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now(),
    model_id text,
    model_name text,
    date text,
    reason text,
    notes text,
    is_excused boolean
);
ALTER TABLE public.absences ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Absences Access" ON public.absences;
CREATE POLICY "Public Absences Access" ON public.absences FOR ALL USING (true) WITH CHECK (true);
