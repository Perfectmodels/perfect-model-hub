import { lazy } from 'react';

export interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  isProtected?: boolean;
  roles?: string[];
}

// Explicit lazy imports to satisfy Vite's static analysis
const appRoutes: RouteConfig[] = [
  // Public routes
  { path: "/", component: lazy(() => import('../pages/Home')) },
  { path: "/agence", component: lazy(() => import('../pages/Agency')) },
  { path: "/mannequins", component: lazy(() => import('../pages/Models')) },
  { path: "/mannequins/:id", component: lazy(() => import('../pages/ModelDetail')) },
  { path: "/fashion-day", component: lazy(() => import('../pages/FashionDay')) },
  { path: "/magazine", component: lazy(() => import('../pages/Magazine')) },
  { path: "/magazine/:slug", component: lazy(() => import('../pages/ArticleDetail')) },
  { path: "/contact", component: lazy(() => import('../pages/Contact')) },
  { path: "/services", component: lazy(() => import('../pages/Services')) },
  { path: "/services/:slug", component: lazy(() => import('../pages/ServiceDetail')) },
  { path: "/casting", component: lazy(() => import('../pages/Casting')) },
  { path: "/casting-formulaire", component: lazy(() => import('../pages/CastingForm')) },
  { path: "/fashion-day-application", component: lazy(() => import('../pages/FashionDayApplicationForm')) },
  { path: "/login", component: lazy(() => import('../pages/Login')) },
  { path: "/privacy-policy", component: lazy(() => import('../pages/PrivacyPolicy')) },
  { path: "/terms-of-use", component: lazy(() => import('../pages/TermsOfUse')) },
  
  // Protected routes - Student
  { 
    path: "/formations", 
    component: lazy(() => import('../pages/Activity')),
    isProtected: true,
    roles: ['student']
  },
  { 
    path: "/formations/forum", 
    component: lazy(() => import('../pages/ClassroomForum')),
    isProtected: true,
    roles: ['student']
  },
  { 
    path: "/formations/forum/:threadId", 
    component: lazy(() => import('../pages/ForumThread')),
    isProtected: true,
    roles: ['student']
  },
  { 
    path: "/formations/:moduleSlug/:chapterSlug", 
    component: lazy(() => import('../pages/ChapterDetail')),
    isProtected: true,
    roles: ['student']
  },
  { 
    path: "/profil", 
    component: lazy(() => import('../pages/ModelDashboard')),
    isProtected: true,
    roles: ['student']
  },
  
  // Admin routes
  { 
    path: "/admin", 
    component: lazy(() => import('../pages/Admin')),
    isProtected: true,
    roles: ['admin']
  },
  { 
    path: "/admin/models", 
    component: lazy(() => import('../pages/AdminModels')),
    isProtected: true,
    roles: ['admin']
  },
  { 
    path: "/admin/magazine", 
    component: lazy(() => import('../pages/AdminMagazine')),
    isProtected: true,
    roles: ['admin']
  },
  { 
    path: "/admin/classroom", 
    component: lazy(() => import('../pages/AdminClassroom')),
    isProtected: true,
    roles: ['admin']
  },
  { 
    path: "/admin/settings", 
    component: lazy(() => import('../pages/AdminSettings')),
    isProtected: true,
    roles: ['admin']
  },
  { 
    path: "/admin/casting-applications", 
    component: lazy(() => import('../pages/AdminCasting')),
    isProtected: true,
    roles: ['admin']
  },
  { 
    path: "/admin/casting-results", 
    component: lazy(() => import('../pages/AdminCastingResults')),
    isProtected: true,
    roles: ['admin']
  },
  { 
    path: "/admin/fashion-day-applications", 
    component: lazy(() => import('../pages/AdminFashionDay')),
    isProtected: true,
    roles: ['admin']
  },
  { 
    path: "/enregistrement/casting", 
    component: lazy(() => import('../pages/RegistrationCasting')),
    isProtected: true,
    roles: ['registration']
  }
];

export default appRoutes;
