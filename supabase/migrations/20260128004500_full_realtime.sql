-- Add remaining tables to Realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.models;
ALTER PUBLICATION supabase_realtime ADD TABLE public.articles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.agency_info;
ALTER PUBLICATION supabase_realtime ADD TABLE public.agency_services;
ALTER PUBLICATION supabase_realtime ADD TABLE public.agency_timeline;
ALTER PUBLICATION supabase_realtime ADD TABLE public.agency_partners;
ALTER PUBLICATION supabase_realtime ADD TABLE public.agency_achievements;
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_config;
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_images;
ALTER PUBLICATION supabase_realtime ADD TABLE public.pages_content;
ALTER PUBLICATION supabase_realtime ADD TABLE public.nav_links;
ALTER PUBLICATION supabase_realtime ADD TABLE public.social_links;
ALTER PUBLICATION supabase_realtime ADD TABLE public.testimonials;
ALTER PUBLICATION supabase_realtime ADD TABLE public.model_distinctions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.hero_slides;
ALTER PUBLICATION supabase_realtime ADD TABLE public.jury_members;
ALTER PUBLICATION supabase_realtime ADD TABLE public.registration_staff;
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.casting_applications;
