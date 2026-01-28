import React, { useEffect, Suspense } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { DataProvider, useData } from './contexts/DataContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import AIAssistantIcon from './components/components/AIAssistantIcon';
import { PWAInstaller } from './components/components/PWAInstaller';
import { registerServiceWorker } from './utils/pwa';
import routes from './config/routes';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const LoadingFallback: React.FC = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
);

const pageVariants = {
    initial: {
        opacity: 0,
    },
    in: {
        opacity: 1,
    },
    out: {
        opacity: 0,
    }
};

const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
} as any;

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  
  const renderRoute = (route: typeof routes[0]) => {
    const Component = route.component;
    
    if (route.isProtected) {
      return (
        <Route 
          key={route.path} 
          path={route.path} 
          element={
            <ProtectedRoute roles={route.roles}>
              <Suspense fallback={<LoadingFallback />}>
                <Component />
              </Suspense>
            </ProtectedRoute>
          } 
        />
      );
    }
    
    return (
      <Route 
        key={route.path} 
        path={route.path} 
        element={
          <Suspense fallback={<LoadingFallback />}>
            <Component />
          </Suspense>
        } 
      />
    );
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Routes location={location}>
          {routes.map(renderRoute)}
          <Route path="*" element={<div>Page non trouvée</div>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const AppContent: React.FC = () => {
    const location = useLocation();
    const { data } = useData();

    // Notification logic for browser tab title
    useEffect(() => {
        const originalTitle = "Perfect Models Management";
        if (data && location.pathname.startsWith('/admin')) {
            const newCastingApps = data.castingApplications?.filter(app => app.status === 'Nouveau').length || 0;
            const newFashionDayApps = data.fashionDayApplications?.filter(app => app.status === 'Nouveau').length || 0;
            const newRecoveryRequests = data.recoveryRequests?.filter(req => req.status === 'Nouveau').length || 0;
            const newBookingRequests = data.bookingRequests?.filter(req => req.status === 'Nouveau').length || 0;
            const newMessages = data.contactMessages?.filter(msg => msg.status === 'Nouveau').length || 0;

            const totalNotifications = newCastingApps + newFashionDayApps + newRecoveryRequests + newBookingRequests + newMessages;

            if (totalNotifications > 0) {
                document.title = `(${totalNotifications}) Admin | ${originalTitle}`;
            } else {
                document.title = `Admin | ${originalTitle}`;
            }
        } else {
            // Restore title if not on an admin page (this will be handled by SEO component for other pages)
            if (document.title.startsWith('(') || document.title.startsWith('Admin |')) {
                 document.title = originalTitle;
            }
        }
        
        return () => {
            document.title = originalTitle;
        };
    }, [location.pathname, data]);


    return (
        <Layout>
            <AnimatedRoutes />
            <AIAssistantIcon />
            <PWAInstaller />
            <ScrollToTop />
        </Layout>
    );
}

import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <HashRouter>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;