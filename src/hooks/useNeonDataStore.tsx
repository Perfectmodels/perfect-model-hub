import { useState, useEffect, useCallback } from 'react';
import { query, execute } from '../lib/neon';
import { 
  Model, FashionDayEvent, Service, AchievementCategory, ModelDistinction, 
  Testimonial, ContactInfo, SiteImages, Partner, ApiKeys, CastingApplication, 
  FashionDayApplication, NewsItem, ForumThread, ForumReply, Article, Module, 
  ArticleComment, RecoveryRequest, JuryMember, RegistrationStaff, BookingRequest, 
  ContactMessage, FAQCategory, Absence, MonthlyPayment, PhotoshootBrief, NavLink 
} from '../../types';

// Import initial data to seed the database if it's empty
import { 
  models as initialModels, 
  siteConfig as initialSiteConfig, 
  contactInfo as initialContactInfo, 
  siteImages as initialSiteImages, 
  apiKeys as initialApiKeys, 
  newsItems as initialNewsItems, 
  navLinks as initialNavLinks, 
  fashionDayEvents as initialFashionDayEvents, 
  socialLinks as initialSocialLinks, 
  agencyTimeline as initialAgencyTimeline, 
  agencyInfo as initialAgencyInfo, 
  modelDistinctions as initialModelDistinctions, 
  agencyServices as initialAgencyServices, 
  agencyAchievements as initialAgencyAchievements, 
  agencyPartners as initialAgencyPartners, 
  testimonials as initialTestimonials,
  juryMembers as initialJuryMembers,
  registrationStaff as initialRegistrationStaff,
  faqData as initialFaqData
} from '../constants/data';
import { articles as initialArticles } from '../constants/magazineData';
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
function toCamelCase<T>(obj: Record<string, unknown>): T {
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    result[camelKey] = obj[key];
  }
  return result as T;
}

export const useNeonDataStore = () => {
  const [data, setData] = useState<AppData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getInitialData = useCallback((): AppData => ({
    models: initialModels,
    siteConfig: initialSiteConfig,
    contactInfo: initialContactInfo,
    siteImages: initialSiteImages,
    apiKeys: initialApiKeys,
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
    photoshootBriefs: [],
    newsItems: initialNewsItems,
    navLinks: initialNavLinks,
    fashionDayEvents: initialFashionDayEvents,
    socialLinks: initialSocialLinks,
    agencyTimeline: initialAgencyTimeline,
    agencyInfo: initialAgencyInfo,
    modelDistinctions: initialModelDistinctions,
    agencyServices: initialAgencyServices,
    agencyAchievements: initialAgencyAchievements,
    agencyPartners: initialAgencyPartners,
    testimonials: initialTestimonials,
    articles: initialArticles,
    courseData: initialCourseData,
    juryMembers: initialJuryMembers,
    registrationStaff: initialRegistrationStaff,
    faqData: initialFaqData,
  }), []);

  const fetchData = useCallback(async () => {
    try {
      // Fetch all data from Neon in parallel
      const [
        modelsResult,
        newsResult,
        testimonialsResult,
        articlesResult,
        eventsResult,
        castingResult,
        fashionDayAppsResult,
        threadsResult,
        repliesResult,
        commentsResult,
        recoveryResult,
        bookingResult,
        contactResult,
        absencesResult,
        paymentsResult,
        briefsResult
      ] = await Promise.all([
        query('SELECT * FROM models ORDER BY created_at DESC').catch(() => []),
        query('SELECT * FROM news_items ORDER BY date DESC').catch(() => []),
        query('SELECT * FROM testimonials').catch(() => []),
        query('SELECT * FROM articles ORDER BY date DESC').catch(() => []),
        query('SELECT * FROM fashion_day_events ORDER BY edition DESC').catch(() => []),
        query('SELECT * FROM casting_applications ORDER BY submission_date DESC').catch(() => []),
        query('SELECT * FROM fashion_day_applications ORDER BY submission_date DESC').catch(() => []),
        query('SELECT * FROM forum_threads ORDER BY created_at DESC').catch(() => []),
        query('SELECT * FROM forum_replies ORDER BY created_at ASC').catch(() => []),
        query('SELECT * FROM article_comments ORDER BY created_at DESC').catch(() => []),
        query('SELECT * FROM recovery_requests ORDER BY timestamp DESC').catch(() => []),
        query('SELECT * FROM booking_requests ORDER BY submission_date DESC').catch(() => []),
        query('SELECT * FROM contact_messages ORDER BY submission_date DESC').catch(() => []),
        query('SELECT * FROM absences ORDER BY date DESC').catch(() => []),
        query('SELECT * FROM monthly_payments ORDER BY month DESC').catch(() => []),
        query('SELECT * FROM photoshoot_briefs ORDER BY created_at DESC').catch(() => [])
      ]);

      const initialData = getInitialData();

      // Transform and merge data
      const dbModels = (modelsResult as Record<string, unknown>[]).map(row => ({
        id: row.id as string,
        name: row.name as string,
        username: row.username as string,
        password: row.password_hash as string,
        email: row.email as string,
        phone: row.phone as string,
        age: row.age as number,
        height: row.height as string,
        gender: row.gender as 'Homme' | 'Femme',
        location: row.location as string,
        imageUrl: row.image_url as string,
        isPublic: row.is_public as boolean,
        level: row.level as 'Pro' | 'Débutant',
        portfolioImages: row.portfolio_images as string[] || [],
        distinctions: row.distinctions as ModelDistinction[] || [],
        measurements: row.measurements as Model['measurements'],
        categories: row.categories as string[] || [],
        experience: row.experience as string,
        journey: row.journey as string,
        quizScores: row.quiz_scores as Model['quizScores'] || {},
        lastLogin: row.last_login as string,
        lastActivity: row.last_activity as string,
      }));

      setData({
        ...initialData,
        models: dbModels.length > 0 ? dbModels : initialData.models,
        newsItems: (newsResult as Record<string, unknown>[]).length > 0 
          ? (newsResult as Record<string, unknown>[]).map(r => toCamelCase<NewsItem>(r))
          : initialData.newsItems,
        testimonials: (testimonialsResult as Record<string, unknown>[]).length > 0 
          ? (testimonialsResult as Record<string, unknown>[]).map(r => toCamelCase<Testimonial>(r))
          : initialData.testimonials,
        articles: (articlesResult as Record<string, unknown>[]).length > 0 
          ? (articlesResult as Record<string, unknown>[]).map(r => toCamelCase<Article>(r))
          : initialData.articles,
        fashionDayEvents: (eventsResult as Record<string, unknown>[]).length > 0 
          ? (eventsResult as Record<string, unknown>[]).map(r => toCamelCase<FashionDayEvent>(r))
          : initialData.fashionDayEvents,
        castingApplications: (castingResult as Record<string, unknown>[]).map(r => toCamelCase<CastingApplication>(r)),
        fashionDayApplications: (fashionDayAppsResult as Record<string, unknown>[]).map(r => toCamelCase<FashionDayApplication>(r)),
        forumThreads: (threadsResult as Record<string, unknown>[]).map(r => toCamelCase<ForumThread>(r)),
        forumReplies: (repliesResult as Record<string, unknown>[]).map(r => toCamelCase<ForumReply>(r)),
        articleComments: (commentsResult as Record<string, unknown>[]).map(r => toCamelCase<ArticleComment>(r)),
        recoveryRequests: (recoveryResult as Record<string, unknown>[]).map(r => toCamelCase<RecoveryRequest>(r)),
        bookingRequests: (bookingResult as Record<string, unknown>[]).map(r => toCamelCase<BookingRequest>(r)),
        contactMessages: (contactResult as Record<string, unknown>[]).map(r => toCamelCase<ContactMessage>(r)),
        absences: (absencesResult as Record<string, unknown>[]).map(r => toCamelCase<Absence>(r)),
        monthlyPayments: (paymentsResult as Record<string, unknown>[]).map(r => toCamelCase<MonthlyPayment>(r)),
        photoshootBriefs: (briefsResult as Record<string, unknown>[]).map(r => toCamelCase<PhotoshootBrief>(r)),
      });

      setIsInitialized(true);
    } catch (err) {
      console.error('Error fetching data from Neon:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      // Fallback to initial data
      setData(getInitialData());
      setIsInitialized(true);
    }
  }, [getInitialData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const saveData = useCallback(async (newData: AppData) => {
    try {
      // For now, update local state immediately
      // Individual save functions should be used for specific updates
      setData(newData);
    } catch (err) {
      console.error('Error saving data:', err);
      throw err;
    }
  }, []);

  // Specific save functions for different data types
  const saveModel = useCallback(async (model: Model) => {
    await execute(`
      INSERT INTO models (id, name, username, password_hash, email, phone, age, height, gender, location, image_url, is_public, level, portfolio_images, distinctions, measurements, categories, experience, journey, quiz_scores)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        username = EXCLUDED.username,
        password_hash = EXCLUDED.password_hash,
        email = EXCLUDED.email,
        phone = EXCLUDED.phone,
        age = EXCLUDED.age,
        height = EXCLUDED.height,
        gender = EXCLUDED.gender,
        location = EXCLUDED.location,
        image_url = EXCLUDED.image_url,
        is_public = EXCLUDED.is_public,
        level = EXCLUDED.level,
        portfolio_images = EXCLUDED.portfolio_images,
        distinctions = EXCLUDED.distinctions,
        measurements = EXCLUDED.measurements,
        categories = EXCLUDED.categories,
        experience = EXCLUDED.experience,
        journey = EXCLUDED.journey,
        quiz_scores = EXCLUDED.quiz_scores,
        updated_at = NOW()
    `, [
      model.id, model.name, model.username, model.password, model.email,
      model.phone, model.age, model.height, model.gender, model.location,
      model.imageUrl, model.isPublic, model.level, 
      JSON.stringify(model.portfolioImages || []),
      JSON.stringify(model.distinctions || []),
      JSON.stringify(model.measurements),
      JSON.stringify(model.categories || []),
      model.experience, model.journey, 
      JSON.stringify(model.quizScores || {})
    ]);
    await fetchData();
  }, [fetchData]);

  const saveCastingApplication = useCallback(async (app: CastingApplication) => {
    await execute(`
      INSERT INTO casting_applications (id, submission_date, status, first_name, last_name, birth_date, email, phone, nationality, city, gender, height, weight, chest, waist, hips, shoe_size, eye_color, hair_color, experience, instagram, portfolio_link, photo_portrait_url, photo_full_body_url, photo_profile_url, scores, passage_number)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)
      ON CONFLICT (id) DO UPDATE SET
        status = EXCLUDED.status,
        scores = EXCLUDED.scores,
        passage_number = EXCLUDED.passage_number
    `, [
      app.id, app.submissionDate, app.status, app.firstName, app.lastName,
      app.birthDate, app.email, app.phone, app.nationality, app.city,
      app.gender, app.height, app.weight, app.chest, app.waist, app.hips,
      app.shoeSize, app.eyeColor, app.hairColor, app.experience, app.instagram,
      app.portfolioLink, app.photoPortraitUrl, app.photoFullBodyUrl, 
      app.photoProfileUrl, JSON.stringify(app.scores || {}), app.passageNumber
    ]);
    await fetchData();
  }, [fetchData]);

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
