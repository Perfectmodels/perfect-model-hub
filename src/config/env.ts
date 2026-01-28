// Public environment variables for frontend use
// These are publishable keys that can safely be in the codebase

export const ENV = {
  // ImgBB for image uploads
  IMGBB_API_KEY: import.meta.env.VITE_IMGBB_API_KEY || '59f0176178bae04b1f2cbd7f5bc03614',
  
  // Formspree for contact forms
  FORMSPREE_ENDPOINT: import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/xovnyqnz',
  
  // Brevo for email marketing (publishable key)
  BREVO_API_KEY: import.meta.env.VITE_BREVO_API_KEY || '',
} as const;
