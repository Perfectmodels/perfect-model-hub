import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  Model, FashionDayEvent, Service, AchievementCategory, ModelDistinction, 
  Testimonial, ContactInfo, SiteImages, Partner, ApiKeys, CastingApplication, 
  FashionDayApplication, NewsItem, ForumThread, ForumReply, Article, Module, 
  ArticleComment, RecoveryRequest, JuryMember, RegistrationStaff, BookingRequest, 
  ContactMessage, FAQCategory, Absence, MonthlyPayment, PhotoshootBrief, NavLink 
} from '../../types';

import { 
  contactInfo as initialContactInfo, 
  apiKeys as initialApiKeys, 
  faqData as initialFaqData,
  siteConfig as initialSiteConfig,
  navLinks as initialNavLinks,
  socialLinks as initialSocialLinks,
  agencyTimeline as initialTimeline,
  agencyInfo as initialAgencyInfo,
  modelDistinctions as initialDistinctions,
  agencyServices as initialServices,
  agencyAchievements as initialAchievements,
  agencyPartners as initialPartners,
  models as initialModels,
  fashionDayEvents as initialEvents,
  testimonials as initialTestimonials,
  newsItems as initialNews,
  siteImages as initialImages,
  juryMembers as initialJury,
  registrationStaff as initialStaff
} from '../constants/data';
import { courseData as initialCourseData } from '../constants/courseData';

export interface AppData {
  siteConfig: { logo: string };
  navLinks: NavLink[];
  socialLinks: { facebook: string; instagram: string; youtube: string; };
  agencyTimeline: { year: string; event: string; }[];
  agencyInfo: {
    about: { p1: string; p2: string; };
    values: { name: string; description: string; }[];
  };
  modelDistinctions: ModelDistinction[];
  agencyServices: Service[];
  agencyAchievements: AchievementCategory[];
  agencyPartners: Partner[];
  models: Model[];
  fashionDayEvents: FashionDayEvent[];
  testimonials: Testimonial[];
  articles: Article[];
  courseData: Module[];
  contactInfo: ContactInfo;
  siteImages: SiteImages;
  apiKeys: ApiKeys;
  castingApplications: CastingApplication[];
  fashionDayApplications: FashionDayApplication[];
  newsItems: NewsItem[];
  forumThreads: ForumThread[];
  forumReplies: ForumReply[];
  articleComments: ArticleComment[];
  recoveryRequests: RecoveryRequest[];
  bookingRequests: BookingRequest[];
  contactMessages: ContactMessage[];
  juryMembers: JuryMember[];
  registrationStaff: RegistrationStaff[];
  faqData: FAQCategory[];
  absences: Absence[];
  monthlyPayments: MonthlyPayment[];
  photoshootBriefs: PhotoshootBrief[];
}

// Helper to convert snake_case DB rows to camelCase
function toCamelCase<T>(obj: any): T {
  if (!obj) return obj as T;
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    result[camelKey] = obj[key];
  }
  return result as T;
}

// Helper to convert camelCase APP objects to snake_case DB rows
function toSnakeCase<T>(obj: any): T {
  if (!obj) return obj as T;
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    result[snakeKey] = obj[key];
  }
  return result as T;
}

export const useSupabaseDataStore = () => {
  const [data, setData] = useState<AppData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [
        modelsRes, newsRes, testimonialsRes, articlesRes, castingRes,
        paymentsRes, absencesRes, threadsRes, repliesRes, configRes,
        agencyInfoRes, servicesRes, timelineRes, partnersRes, achievementsRes,
        socialRes, navRes, pagesRes, imagesRes, juryRes, staffRes,
        reservationsRes, commentsRes, recoveryRes
      ] = await Promise.all([
        supabase.from('models').select('*').order('created_at', { ascending: false }),
        (supabase.from('news_items') as any).select('*').order('date', { ascending: false }),
        (supabase.from('testimonials') as any).select('*'),
        (supabase.from('articles') as any).select('*').order('date', { ascending: false }),
        supabase.from('casting_applications').select('*').order('created_at', { ascending: false }),
        (supabase.from('monthly_payments') as any).select('*').order('month', { ascending: false }),
        supabase.from('absences').select('*').order('date', { ascending: false }),
        (supabase.from('forum_threads') as any).select('*').order('created_at', { ascending: false }),
        (supabase.from('forum_replies') as any).select('*').order('created_at', { ascending: true }),
        (supabase.from('site_config') as any).select('*').single(),
        (supabase.from('agency_info') as any).select('*').single(),
        (supabase.from('agency_services') as any).select('*'),
        (supabase.from('agency_timeline') as any).select('*').order('year', { ascending: false }),
        (supabase.from('agency_partners') as any).select('*'),
        (supabase.from('agency_achievements') as any).select('*'),
        (supabase.from('social_links') as any).select('*'),
        (supabase.from('nav_links') as any).select('*'),
        (supabase.from('pages_content') as any).select('*'),
        (supabase.from('site_images') as any).select('*'),
        (supabase.from('jury_members') as any).select('*'),
        (supabase.from('registration_staff') as any).select('*'),
        (supabase.from('fashion_day_reservations') as any).select('*').order('submission_date', { ascending: false }),
        (supabase.from('article_comments') as any).select('*').order('created_at', { ascending: false }),
        (supabase.from('recovery_requests') as any).select('*').order('timestamp', { ascending: false })
      ]);

      console.log('Fetched data from Supabase', { 
        pagesFound: (pagesRes.data || []).length,
        modelsFound: (modelsRes.data || []).length 
      });
      // Handle agency info correctly
      const agencyInfo = (agencyInfoRes.data as any) || { about: { p1: '', p2: '' }, values: [] };
      
      // Handle social links correctly
      const socialLinks: any = {};
      (socialRes.data || []).forEach((link: any) => {
        socialLinks[link.platform] = link.url;
      });

      // Handle site images correctly
      const siteImages: any = {};
      (imagesRes.data || []).forEach((img: any) => {
        siteImages[img.key] = img.url;
      });

      const appData: AppData = {
        models: (modelsRes.data || []).map(m => toCamelCase<Model>(m as any)),
        newsItems: (newsRes.data || []).map(n => toCamelCase<NewsItem>(n as any)),
        testimonials: (testimonialsRes.data || []).map(t => toCamelCase<Testimonial>(t as any)),
        articles: (articlesRes.data || []).map(a => toCamelCase<Article>(a as any)),
        castingApplications: (castingRes.data || []).map(c => toCamelCase<CastingApplication>(c as any)),
        monthlyPayments: (paymentsRes.data || []).map(p => toCamelCase<MonthlyPayment>(p as any)),
        absences: (absencesRes.data || []).map(a => toCamelCase<Absence>(a as any)),
        forumThreads: (threadsRes.data || []).map(t => toCamelCase<ForumThread>(t as any)),
        forumReplies: (repliesRes.data || []).map(r => toCamelCase<ForumReply>(r as any)),
        siteConfig: { logo: (configRes.data as any)?.logo || '' },
        agencyInfo: { about: agencyInfo.about, values: agencyInfo.values },
        agencyServices: (servicesRes.data || []).map(s => toCamelCase<Service>(s as any)),
        agencyTimeline: (timelineRes.data || []).map(t => toCamelCase<any>(t as any)),
        agencyPartners: (partnersRes.data || []).map(p => toCamelCase<Partner>(p as any)),
        agencyAchievements: (achievementsRes.data || []).map(a => toCamelCase<AchievementCategory>(a as any)),
        socialLinks: socialLinks,
        navLinks: (navRes.data || []).map(n => toCamelCase<NavLink>(n as any)),
        siteImages: siteImages,
        juryMembers: (juryRes.data || []).map(j => toCamelCase<JuryMember>(j as any)),
        registrationStaff: (staffRes.data || []).map(s => toCamelCase<RegistrationStaff>(s as any)),
        fashionDayEvents: [], 
        fashionDayApplications: (reservationsRes.data || []).map(r => toCamelCase<any>(r as any)),
        articleComments: (commentsRes.data || []).map(c => toCamelCase<ArticleComment>(c as any)),
        recoveryRequests: (recoveryRes.data || []).map(r => toCamelCase<RecoveryRequest>(r as any)),
        bookingRequests: [],
        contactMessages: [],
        faqData: initialFaqData,
        courseData: initialCourseData,
        contactInfo: initialContactInfo,
        apiKeys: initialApiKeys,
        modelDistinctions: [],
        photoshootBriefs: []
      };

      setData(appData);
      setIsInitialized(true);
    } catch (err: any) {
      console.warn('Error fetching data from Supabase, falling back to static data:', err);
      // Fallback to static data
      const fallbackData: AppData = {
          siteConfig: initialSiteConfig,
          navLinks: initialNavLinks,
          socialLinks: initialSocialLinks,
          agencyTimeline: initialTimeline,
          agencyInfo: initialAgencyInfo,
          modelDistinctions: initialDistinctions,
          agencyServices: initialServices,
          agencyAchievements: initialAchievements,
          agencyPartners: initialPartners,
          models: initialModels,
          fashionDayEvents: initialEvents,
          testimonials: initialTestimonials,
          newsItems: initialNews,
          contactInfo: initialContactInfo,
          siteImages: initialImages,
          apiKeys: initialApiKeys,
          juryMembers: initialJury,
          registrationStaff: initialStaff,
          faqData: initialFaqData,
          courseData: initialCourseData,

          // Empty arrays for dynamic user data
          articles: [],
          castingApplications: [],
          fashionDayApplications: [],
          forumThreads: [],
          forumReplies: [],
          articleComments: [],
          recoveryRequests: [],
          bookingRequests: [],
          contactMessages: [],
          absences: [],
          monthlyPayments: [],
          photoshootBriefs: []
      };

      setData(fallbackData);
      setError(null); // Clear error to allow rendering
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public' },
        (payload: any) => {
          console.log('Realtime change received:', payload);
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchData]);

  const saveData = useCallback(async (newData: AppData) => {
    setData(newData); // Optimistic update

    try {
        console.log('Saving data to Supabase...', newData);

        // 1. Site Config (Logo)
        if (newData.siteConfig) {
             // Assuming single row with id=1, or we update based on a known criteria. 
             // Since we fetched with .single(), we can try upserting with a fixed ID or assume existing row.
             // We'll use a specific query to update the single row if it exists, or insert.
             // Assuming 'id' is 1 for the config row if established, or we just take the first one.
             // Safe bet: Update where true if possible, but standard is single row with ID 1.
             const { error } = await (supabase.from('site_config') as any).update({ logo: newData.siteConfig.logo }).eq('id', 1);
             if (error && error.code === 'PGRST116') { // Row not found maybe? Try insert
                 await (supabase.from('site_config') as any).insert({ id: 1, logo: newData.siteConfig.logo });
             }
        }

        // 2. Site Images
        if (newData.siteImages) {
            const updates = Object.entries(newData.siteImages).map(([key, url]) => ({
                key,
                url
            }));
            if (updates.length > 0) {
                const { error } = await (supabase.from('site_images') as any).upsert(updates, { onConflict: 'key' });
                if (error) console.error('Error saving site_images:', error);
            }
        }

        // 3. Social Links
        if (newData.socialLinks) {
            const updates = Object.entries(newData.socialLinks).map(([platform, url]) => ({
                platform,
                url
            }));
             if (updates.length > 0) {
                const { error } = await (supabase.from('social_links') as any).upsert(updates, { onConflict: 'platform' });
                if (error) console.error('Error saving social_links:', error);
            }
        }

         // 4. Testimonials
         if (newData.testimonials) {
             const rows = newData.testimonials.map(t => ({
                 id: t.id,
                 name: t.name,
                 role: t.role,
                 quote: t.quote,
                 image_url: t.imageUrl
             }));
             const { error } = await (supabase.from('testimonials') as any).upsert(rows);
             if (error) console.error('Error saving testimonials:', error);
         }
         
         // 5. Agency Partners
         if (newData.agencyPartners) {
             const rows = newData.agencyPartners.map(p => toSnakeCase<any>(p));
             const { error } = await (supabase.from('agency_partners') as any).upsert(rows);
             if (error) console.error('Error saving agency_partners:', error);
         }

         // 6. Agency Info (About, Values) - stored in agency_info table
         if (newData.agencyInfo) {
             // agency_info table structure is likely `about` (jsonb/text) and `values` (jsonb).
             // Let's assume ID 1 again or single row.
             const payload = {
                 id: 1,
                 about: newData.agencyInfo.about,
                 values: newData.agencyInfo.values
             };
             const { error } = await (supabase.from('agency_info') as any).upsert(payload);
             if (error) console.error('Error saving agency_info:', error);
         }

    } catch (err: any) {
        console.error("Critical Error saving data:", err);
        setError("Failed to save data: " + err.message);
    }
  }, []);

  const saveModel = useCallback(async (model: Model) => {
    const { error } = await supabase
      .from('models')
      .upsert(toSnakeCase<any>(model));
    if (error) throw error;
  }, []);

  const saveCastingApplication = useCallback(async (app: CastingApplication) => {
    const { error } = await supabase
      .from('casting_applications')
      .upsert(toSnakeCase<any>(app));
    if (error) throw error;
  }, []);

  return {
    data,
    saveData,
    isInitialized,
    error,
    saveModel,
    saveCastingApplication,
    refetch: fetchData
  };
};
