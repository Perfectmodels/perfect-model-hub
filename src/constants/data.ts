
import { Model, Service, AchievementCategory, ModelDistinction, Testimonial, ContactInfo, SiteImages, Partner, ApiKeys, CastingApplication, FashionDayApplication, NewsItem, FashionDayEvent, ForumThread, ForumReply, ArticleComment, RecoveryRequest, JuryMember, RegistrationStaff, BookingRequest, ContactMessage, SocialLinks, Artist, FAQCategory, Absence, MonthlyPayment, PhotoshootBrief, NavLink } from '../../types';

export const siteConfig = {
  logo: 'https://i.ibb.co/fVBxPNTP/T-shirt.png', 
};

export const navLinks: NavLink[] = [
  { path: '/', label: 'Accueil', inFooter: true },
  { path: '/agence', label: 'Agence', inFooter: true },
  { path: '/mannequins', label: 'Mannequins', inFooter: true },
  { path: '/fashion-day', label: 'PFD', inFooter: true, footerLabel: 'Perfect Fashion Day' },
  { path: '/magazine', label: 'Magazine', inFooter: true },
  { path: '/services', label: 'Services', inFooter: true },
  { path: '/contact', label: 'Contact', inFooter: true },
  { path: '/formations', label: 'Classroom', inFooter: false },
];

export const socialLinks: SocialLinks = {
    facebook: 'https://www.facebook.com/PerfectModels241',
    instagram: 'https://www.instagram.com/perfectmodelsmanagement_/',
    youtube: 'https://www.youtube.com/@perfectmodelsmanagement6013',
};

export const contactInfo: ContactInfo = {
    email: 'contact@perfectmodels.ga',
    phone: '+241 077 00 00 00',
    address: 'Libreville, Gabon',
    notificationEmail: 'contact@perfectmodels.ga',
};

export const siteImages: SiteImages = {
    hero: 'https://i.ibb.co/K2wS0Pz/hero-bg.jpg',
    about: 'https://i.ibb.co/3WfK9Xg/about-img.jpg',
    fashionDayBg: 'https://i.ibb.co/C5rcPJHz/titostyle-53.jpg',
    agencyHistory: 'https://i.ibb.co/jH0YvJg/agency-history.jpg',
    classroomBg: 'https://i.ibb.co/TBt9FBSv/AJC-4630.jpg',
    castingBg: 'https://i.ibb.co/z5TzL2M/casting-bg.jpg',
};

export const apiKeys: ApiKeys = {
    resendApiKey: 're_12345678_abcdefghijklmnopqrstuvwxyz',
    formspreeEndpoint: 'https://formspree.io/f/xovnyqnz',
    firebaseDynamicLinks: {
        webApiKey: "AIzaSyB_jjJEXU7yvJv49aiPCJqEZgiyfJEJzrg",
        domainUriPrefix: 'https://perfectmodels.page.link'
    },
    imgbbApiKey: '59f0176178bae04b1f2cbd7f5bc03614',
    brevoApiKey: 'jules.google AQ.Ab8RN6L8DU8CxfYi7rGFC-IcfaPPEaUiwfD1Vxll6INemTkYkw',
};

export const juryMembers: JuryMember[] = [
    { id: 'jury1', name: 'Martelly', username: 'jury1', password: 'password2025' },
    { id: 'jury2', name: 'Darain', username: 'jury2', password: 'password2025' },
    { id: 'jury3', name: 'David', username: 'jury3', password: 'password2025' },
    { id: 'jury4', name: 'Sadia', username: 'jury4', password: 'password2025' },
];

export const registrationStaff: RegistrationStaff[] = [
    { id: 'reg1', name: 'Sephora', username: 'enregistrement1', password: 'password2025' },
    { id: 'reg2', name: 'Aimée', username: 'enregistrement2', password: 'password2025' },
    { id: 'reg3', name: 'Duchesse', username: 'enregistrement3', password: 'password2025' },
    { id: 'reg4', name: 'Sephra', username: 'enregistrement4', password: 'password2025' },
];

export const models: Model[] = [
    {
        id: 'noemi-kim',
        name: 'Noemi Kim',
        username: 'Man-PMMN01',
        password: 'noemi2024',
        level: 'Pro',
        email: 'noemi.kim@example.com',
        phone: '+241077000001',
        age: 22,
        height: '1m78',
        gender: 'Femme',
        location: 'Libreville',
        imageUrl: 'https://i.ibb.co/mCcD1Gfq/DSC-0272.jpg',
        isPublic: true,
        portfolioImages: [
            'https://i.ibb.co/z5TzL2M/casting-bg.jpg',
            'https://i.ibb.co/K2wS0Pz/hero-bg.jpg',
            'https://i.ibb.co/C5rcPJHz/titostyle-53.jpg',
        ],
        distinctions: [
            { name: "Palmarès National & International", titles: ["Miss Gabon 2022", "Top Model Afrique Centrale 2023"] }
        ],
        measurements: { chest: '85cm', waist: '62cm', hips: '90cm', shoeSize: '40' },
        categories: ['Défilé', 'Éditorial', 'Beauté'],
        experience: "Mannequin vedette de l'agence, Noemi a défilé pour les plus grands créateurs gabonais et a été le visage de plusieurs campagnes nationales. Son professionnalisme et sa démarche captivante en font une référence.",
        journey: "Découverte lors d'un casting sauvage, Noemi a rapidement gravi les échelons grâce à sa détermination. Formée au sein de la PMM Classroom, elle incarne aujourd'hui l'excellence et l'ambition de l'agence.",
        quizScores: { 
            'module-1-les-fondamentaux-du-mannequinat': { score: 3, total: 3, timesLeft: 0, timestamp: '2024-07-01T10:00:00Z' }, 
            'module-2-techniques-de-podium-catwalk': { score: 2, total: 2, timesLeft: 0, timestamp: '2024-07-02T10:00:00Z' } 
        },
    },
];

export const testimonials: Testimonial[] = [
    {
        name: 'Franck B.',
        role: 'Créateur de Mode',
        quote: "Collaborer avec Perfect Models Management est un gage de professionnalisme. Leurs mannequins sont non seulement magnifiques mais aussi incroyablement bien formés et ponctuels. Un vrai plaisir.",
        imageUrl: 'https://i.ibb.co/s5zW7gZ/testimonial-1.jpg',
    },
];

export const castingApplications: CastingApplication[] = [];
export const fashionDayApplications: FashionDayApplication[] = [];
export const forumThreads: ForumThread[] = [];
export const forumReplies: ForumReply[] = [];
export const articleComments: ArticleComment[] = [];
export const recoveryRequests: RecoveryRequest[] = [];
export const bookingRequests: BookingRequest[] = [];
export const contactMessages: ContactMessage[] = [];
export const absences: Absence[] = [];
export const monthlyPayments: MonthlyPayment[] = [];
export const photoshootBriefs: PhotoshootBrief[] = [];

export const newsItems: NewsItem[] = [
    { id: '1', title: "Grand Casting Annuel", date: '2025-09-06', imageUrl: 'https://i.ibb.co/z5TzL2M/casting-bg.jpg', excerpt: "Nous recherchons les prochains visages de la mode. Préparez-vous pour notre grand casting national.", link: '/casting-formulaire' },
    { id: '2', title: "Perfect Fashion Day Édition 2", date: '2025-02-08', imageUrl: 'https://i.ibb.co/C5rcPJHz/titostyle-53.jpg', excerpt: "La seconde édition de notre événement mode phare approche à grands pas. Découvrez le thème et les créateurs.", link: '/fashion-day' },
    { id: '3', title: "Nouveaux Talents 2024", date: '2024-08-15', imageUrl: 'https://i.ibb.co/3WfK9Xg/about-img.jpg', excerpt: "L'agence est fière d'accueillir trois nouveaux mannequins prometteurs dans ses rangs.", link: '/mannequins' },
];

export const fashionDayEvents: FashionDayEvent[] = [
];

export const agencyTimeline = [
    { year: '2021', event: 'Création de l\'agence Perfect Models Management' },
    { year: '2022', event: 'Lancement du programme de formation "PMM Classroom"' },
    { year: '2023', event: 'Nos mannequins participent à la Libreville Fashion Week' },
    { year: '2025', event: 'Première édition du Perfect Fashion Day' },
];

export const agencyInfo = {
    about: {
        p1: "Fondée en 2021 par Parfait Asseko, Perfect Models Management est née d'une vision : créer une agence de mannequins d'élite au Gabon, capable de rivaliser avec les standards internationaux. Nous sommes plus qu'une simple agence ; nous sommes un berceau de talents, une plateforme de développement et un acteur clé de l'écosystème de la mode en Afrique Centrale.",
        p2: "Notre mission est de découvrir, former et propulser les futurs visages de la mode, tout en offrant à nos clients un service irréprochable et des profils adaptés à leurs besoins les plus exigeants. L'élégance, le professionnalisme et la passion sont les piliers de notre identité."
    },
    values: [
        { name: 'Excellence', description: 'Nous visons les plus hauts standards dans tout ce que nous entreprenons.' },
        { name: 'Intégrité', description: 'Nous opérons avec transparence et respect envers nos talents et nos clients.' },
        { name: 'Développement', description: 'Nous investissons dans la formation continue de nos mannequins.' },
    ],
};

export const modelDistinctions: ModelDistinction[] = [
    { name: 'Miss Gabon', titles: ['Lauréate 2022', '1ère Dauphine 2021'] },
    { name: 'Top Model Afrique', titles: ['Gagnant Catégorie Homme 2023'] },
    { name: 'Elite Model Look', titles: ['Finaliste Gabon 2023'] },
    { name: 'Libreville Fashion Week', titles: ['Mannequin de l\'année 2024'] }
];

export const agencyServices: Service[] = [
];

export const agencyAchievements: AchievementCategory[] = [
    { name: 'Défilés de Mode', items: ['Libreville Fashion Week', 'Black Fashion Week Paris (Représentation)', 'FIMA Niger (Représentation)'] },
    { name: 'Campagnes Publicitaires', items: ['Airtel Gabon', 'BGFI Bank', 'Sobebra', 'Canal+'] },
    { name: 'Magazines', items: ['Gabon Magazine', 'Afropolitan', 'Elle Côte d\'Ivoire (Édito)'] },
];

export const agencyPartners: Partner[] = [
    { name: 'G Store' },
    { name: 'NR Picture' },
    { name: 'Tito Style' },
    { name: 'La Gare du Nord' },
    { name: 'Miguel Fashion Style' }
];

export const faqData: FAQCategory[] = [
];
