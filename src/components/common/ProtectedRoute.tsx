import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  // Custom auth compatibility (from Login.tsx)
  const userRole = sessionStorage.getItem('classroom_role');
  const hasAccess = sessionStorage.getItem('classroom_access') === 'granted';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pm-dark text-pm-gold">
         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-pm-gold"></div>
         <span className="ml-3 font-playfair tracking-widest uppercase text-xs">Vérification en cours...</span>
      </div>
    );
  }

  // Check Supabase Auth OR Custom Auth
  const isSupabaseAuthed = !!user;
  const isCustomAuthed = hasAccess && !!userRole;

  if (!isSupabaseAuthed && !isCustomAuthed) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check roles if specified
  if (roles.length > 0) {
    // Current role can come from custom auth OR Supabase app_metadata
    const currentRole = userRole || (user?.app_metadata?.role) || (user?.user_metadata?.role);
    
    if (!currentRole || !roles.includes(currentRole)) {
       console.warn(`Access denied for role: ${currentRole}. Required roles: ${roles.join(', ')}`);
       return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
