import { lazy } from 'react';

export interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  isProtected?: boolean;
  roles?: string[];
}

// Fonction utilitaire pour le chargement paresseux avec typage fort
const lazyLoad = (path: string) => {
  return lazy(() => import(`../pages/${path}`).then(module => ({ default: module.default })));
};

const appRoutes: RouteConfig[] = [
  // Public routes
  { path: "/", component: lazyLoad('Home') },
  { path: "/agence", component: lazyLoad('Agency') },
  { path: "/mannequins", component: lazyLoad('Models') },
  { path: "/mannequins/:id", component: lazyLoad('ModelDetail') },
  { path: "/fashion-day", component: lazyLoad('FashionDay') },
  { path: "/magazine", component: lazyLoad('Magazine') },
  { path: "/magazine/:slug", component: lazyLoad('ArticleDetail') },
  { path: "/contact", component: lazyLoad('Contact') },
  { path: "/services", component: lazyLoad('Services') },
  { path: "/services/:slug", component: lazyLoad('ServiceDetail') },
  { path: "/casting", component: lazyLoad('Casting') },
  { path: "/casting-formulaire", component: lazyLoad('CastingForm') },
  { path: "/fashion-day-application", component: lazyLoad('FashionDayApplicationForm') },
  { path: "/login", component: lazyLoad('Login') },
  { path: "/privacy-policy", component: lazyLoad('PrivacyPolicy') },
  { path: "/terms-of-use", component: lazyLoad('TermsOfUse') },
  
  // Protected routes - Student
  { 
    path: "/formations", 
    component: lazyLoad('Activity'),
    isProtected: true,
    roles: ['student']
  },
  { 
    path: "/formations/forum", 
    component: lazyLoad('ClassroomForum'),
    isProtected: true,
    roles: ['student']
  },
  { 
    path: "/formations/forum/:threadId", 
    component: lazyLoad('ForumThread'),
    isProtected: true,
    roles: ['student']
  },
  { 
    path: "/formations/:moduleSlug/:chapterSlug", 
    component: lazyLoad('ChapterDetail'),
    isProtected: true,
    roles: ['student']
  },
  { 
    path: "/profil", 
    component: lazyLoad('ModelDashboard'),
    isProtected: true,
    roles: ['student']
  },
  
  // Admin routes
  { 
    path: "/admin", 
    component: lazyLoad('Admin'),
    isProtected: true,
    roles: ['admin']
  },
  { 
    path: "/admin/models", 
    component: lazyLoad('AdminModels'),
    isProtected: true,
    roles: ['admin']
  },
  { 
    path: "/admin/magazine", 
    component: lazyLoad('AdminMagazine'),
    isProtected: true,
    roles: ['admin']
  },
  { 
    path: "/admin/classroom", 
    component: lazyLoad('AdminClassroom'),
    isProtected: true,
    roles: ['admin']
  },
  { 
    path: "/admin/settings", 
    component: lazyLoad('AdminSettings'),
    isProtected: true,
    roles: ['admin']
  },
  { 
    path: "/admin/casting-applications", 
    component: lazyLoad('AdminCasting'),
    isProtected: true,
    roles: ['admin']
  },
  { 
    path: "/admin/casting-results", 
    component: lazyLoad('AdminCastingResults'),
    isProtected: true,
    roles: ['admin']
  },
  { 
    path: "/admin/fashion-day-applications", 
    component: lazyLoad('AdminFashionDay'),
    isProtected: true,
    roles: ['admin']
  },
  { 
    path: "/enregistrement/casting", 
    component: lazyLoad('RegistrationCasting'),
    isProtected: true,
    roles: ['registration']
  }
];

export default appRoutes;
