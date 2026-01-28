// Public environment variables for frontend use
// These are publishable keys that can safely be in the codebase

export const ENV = {
  // ImgBB for image uploads
  IMGBB_API_KEY: import.meta.env.VITE_IMGBB_API_KEY || '',
  
  // Formspree for contact forms
  FORMSPREE_ENDPOINT: import.meta.env.VITE_FORMSPREE_ENDPOINT || '',
  
  // Brevo for email marketing (publishable key)
  BREVO_API_KEY: import.meta.env.VITE_BREVO_API_KEY || '',
} as const;
