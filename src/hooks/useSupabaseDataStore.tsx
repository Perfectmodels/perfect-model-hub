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
        supabase.from('news_items').select('*').order('date', { ascending: false }),
        supabase.from('testimonials').select('*'),
        supabase.from('articles').select('*').order('date', { ascending: false }),
        supabase.from('casting_applications').select('*').order('created_at', { ascending: false }),
        supabase.from('monthly_payments').select('*').order('month', { ascending: false }),
        supabase.from('absences').select('*').order('date', { ascending: false }),
        supabase.from('forum_threads').select('*').order('created_at', { ascending: false }),
        supabase.from('forum_replies').select('*').order('created_at', { ascending: true }),
        supabase.from('site_config').select('*').single(),
        supabase.from('agency_info').select('*').single(),
        supabase.from('agency_services').select('*'),
        supabase.from('agency_timeline').select('*').order('year', { ascending: false }),
        supabase.from('agency_partners').select('*'),
        supabase.from('agency_achievements').select('*'),
        supabase.from('social_links').select('*'),
        supabase.from('nav_links').select('*'),
        supabase.from('pages_content').select('*'),
        supabase.from('site_images').select('*'),
        supabase.from('jury_members').select('*'),
        supabase.from('registration_staff').select('*'),
        supabase.from('fashion_day_reservations').select('*').order('submission_date', { ascending: false }),
        supabase.from('article_comments').select('*').order('created_at', { ascending: false }),
        supabase.from('recovery_requests').select('*').order('timestamp', { ascending: false })
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
    setData(newData);
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
