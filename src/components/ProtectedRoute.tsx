import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Props for the ProtectedRoute component.
 */
interface ProtectedRouteProps {
  children: React.ReactElement; // The component to render if the user has access.
  role: 'admin' | 'student' | 'jury' | 'registration' | 'beginner'; // The role required to access the route.
}

/**
 * A component that protects routes by checking for user authentication and role.
 * If the user is not authenticated or does not have the required role, it redirects them to the login page.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  // Retrieve user role and access status from session storage.
  const userRole = sessionStorage.getItem('classroom_role');
  const hasAccess = sessionStorage.getItem('classroom_access') === 'granted';
  const location = useLocation();

  // Check if the user has access and the correct role.
  if (hasAccess && userRole === role) {
    return children; // Render the protected component.
  }
  
  // Redirect to the login page if access is denied.
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;