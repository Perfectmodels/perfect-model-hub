import React from 'react';

// --- Core Data Models ---

/**
 * Represents a fashion model in the agency.
 */
export interface Model {
  id: string; // Unique identifier for the model
  name: string; // Full name of the model
  username: string; // Unique username for login
  password: string; // Password for the model's account
  email?: string; // Email address of the model
  phone?: string; // Phone number of the model
  age?: number; // Age of the model
  height: string; // Height of the model
  gender: 'Homme' | 'Femme'; // Gender of the model
  location?: string; // Current location of the model
  imageUrl: string; // URL of the model's main profile picture
  portfolioImages?: string[]; // Array of URLs for portfolio images
  distinctions?: ModelDistinction[]; // List of awards or distinctions
  isPublic?: boolean; // Whether the model's profile is publicly visible
  level?: 'Pro' | 'Débutant'; // Skill level of the model
  measurements: {
    chest: string;
    waist: string;
    hips: string;
    shoeSize: string;
  };
  categories: string[]; // Modeling categories (e.g., Défilé, Éditorial)
  experience: string; // Description of the model's experience
  journey: string; // Description of the model's journey in the industry
  quizScores: { 
    [chapterSlug: string]: {
      score: number;
      total: number;
      timesLeft: number;
      timestamp: string;
    } 
  };
  lastLogin?: string; // Timestamp of the last login
  lastActivity?: string; // Description of the last activity
}

/**
 * Represents a magazine article.
 */
export interface Article {
  slug: string; // URL-friendly identifier for the article
  title: string; // Title of the article
  category: string; // Category of the article (e.g., Portrait, Tendance)
  excerpt: string; // A short summary of the article
  imageUrl: string; // URL of the main image for the article
  author: string; // Author of the article
  date: string; // Publication date of the article
  content: ArticleContent[]; // The main content of the article, structured in blocks
  tags?: string[]; // Tags associated with the article
  isFeatured?: boolean; // Whether the article is featured on the homepage
  viewCount?: number; // Number of times the article has been viewed
  reactions?: {
    likes: number;
    dislikes: number;
  };
}

/**
 * Represents a service offered by the agency.
 */
export interface Service {
  slug: string; // URL-friendly identifier for the service
  icon: string; // Name of the icon to display for the service
  title: string; // Title of the service
  category: 'Services Mannequinat' | 'Services Mode et Stylisme' | 'Services Événementiels'; // Category of the service
  description: string; // A short description of the service
  details?: { 
    title: string;
    points: string[];
  }; // Detailed points about the service
  buttonText: string; // Text for the call-to-action button
  buttonLink: string; // Link for the call-to-action button
  isComingSoon?: boolean; // Whether the service is coming soon
}

/**
 * Represents a "Perfect Fashion Day" event.
 */
export interface FashionDayEvent {
  edition: number; // The edition number of the event
  date: string; // The date and time of the event
  theme: string; // The theme of the event
  location?: string; // The location of the event
  mc?: string; // The master of ceremonies for the event
  promoter?: string; // The promoter of the event
  stylists?: Stylist[]; // List of stylists featured in the event
  featuredModels?: string[]; // List of models featured in the event
  artists?: Artist[]; // List of artists performing at the event
  partners?: { type: string; name: string }[]; // List of partners for the event
  description: string; // A description of the event
}

// --- Content & Structure Types ---

/**
 * A union type representing the different types of content blocks within an article.
 */
export type ArticleContent = 
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'image'; src: string; alt: string; caption?: string };

/**
 * Represents an award or distinction a model has received.
 */
export interface ModelDistinction {
    name: string; // Name of the distinction (e.g., Miss Gabon)
    titles: string[]; // Specific titles won (e.g., Lauréate 2022)
}

/**
 * Represents a stylist participating in an event.
 */
export interface Stylist {
  name: string; // Name of the stylist
  description: string; // A short description of the stylist's work
  images: string[]; // URLs of images showcasing the stylist's work
}

/**
 * Represents a performing artist at an event.
 */
export interface Artist {
  name: string; // Name of the artist
  description: string; // Description of the artist's performance
  images: string[]; // URLs of images of the artist
}

/**
 * Represents a category of achievements for the agency.
 */
export interface AchievementCategory {
  name: string; // Name of the category (e.g., Défilés de Mode)
  items: string[]; // List of achievements in this category
}

/**
 * Represents a news item, typically for the homepage.
 */
export interface NewsItem {
  id: string; // Unique identifier for the news item
  title: string; // Title of the news item
  date: string; // Date of the news item
  imageUrl: string; // URL of the image for the news item
  excerpt: string; // A short excerpt of the news item
  link?: string; // A link to the full news item or a related page
}

/**
 * Represents a testimonial from a client or model.
 */
export interface Testimonial {
  name: string; // Name of the person giving the testimonial
  role: string; // Role of the person (e.g., Créateur de Mode)
  quote: string; // The testimonial text
  imageUrl: string; // URL of the person's image
}

/**
 * Represents a partner of the agency.
 */
export interface Partner {
  name: string; // Name of the partner
}

// --- Educational & Quiz Types ---

/**
 * Represents a training module in the PMM Classroom.
 */
export interface Module {
  slug: string; // URL-friendly identifier for the module
  title: string; // Title of the module
  chapters: Chapter[]; // The chapters within this module
  quiz: QuizQuestion[]; // The quiz for this module
}

/**
 * Represents a chapter within a training module.
 */
export interface Chapter {
  slug: string; // URL-friendly identifier for the chapter
  title: string; // Title of the chapter
  content: string; // The content of the chapter
}

/**
 * Represents a question in a quiz.
 */
export interface QuizQuestion {
  question: string; // The question text
  options: string[]; // An array of possible answers
  correctAnswer: string; // The correct answer
}

// --- Application & Form Types ---

/**
 * Represents the status of a casting application.
 */
export type CastingApplicationStatus = 'Nouveau' | 'Présélectionné' | 'Accepté' | 'Refusé';

/**
 * Represents the role of a person applying for the Perfect Fashion Day.
 */
export type FashionDayApplicationRole = 'Mannequin' | 'Styliste' | 'Partenaire' | 'Photographe' | 'MUA' | 'Autre';

/**
 * Represents the status of a Perfect Fashion Day application.
 */
export type FashionDayApplicationStatus = 'Nouveau' | 'En attente' | 'Accepté' | 'Refusé';

/**
 * Represents an application for a casting call.
 */
export interface CastingApplication {
  id: string; // Unique identifier for the application
  submissionDate: string; // Date the application was submitted
  status: CastingApplicationStatus; // Current status of the application
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phone: string;
  nationality: string;
  city: string;
  gender: 'Homme' | 'Femme';
  height: string;
  weight: string;
  chest: string;
  waist: string;
  hips: string;
  shoeSize: string;
  eyeColor: string;
  hairColor: string;
  experience: string;
  instagram: string;
  portfolioLink: string;
  photoPortraitUrl?: string | null;
  photoFullBodyUrl?: string | null;
  photoProfileUrl?: string | null;
  scores?: { [juryId: string]: JuryScore }; // Scores from the jury
  passageNumber?: number; // Passage number assigned during casting
}

/**
 * Represents an application for the Perfect Fashion Day event.
 */
export interface FashionDayApplication {
  id: string; // Unique identifier for the application
  submissionDate: string; // Date the application was submitted
  name: string; // Full name of the applicant
  email: string; // Email of the applicant
  phone: string; // Phone number of the applicant
  role: FashionDayApplicationRole; // Role the applicant is applying for
  message: string; // Message from the applicant
  status: FashionDayApplicationStatus; // Current status of the application
}

/**
 * Represents a request from a client to book a model.
 */
export interface BookingRequest {
  id: string; // Unique identifier for the booking request
  submissionDate: string; // Date the request was submitted
  status: 'Nouveau' | 'Confirmé' | 'Annulé'; // Status of the request
  clientName: string; // Name of the client
  clientEmail: string; // Email of the client
  clientCompany?: string; // Company of the client
  requestedModels: string; // The models requested
  startDate?: string; // Start date of the booking
  endDate?: string; // End date of the booking
  message: string; // Message from the client
}

/**
 * Represents a message sent through the contact form.
 */
export interface ContactMessage {
  id: string; // Unique identifier for the message
  submissionDate: string; // Date the message was sent
  status: 'Nouveau' | 'Lu' | 'Archivé'; // Status of the message
  name: string; // Name of the sender
  email: string; // Email of the sender
  subject: string; // Subject of the message
  message: string; // The message content
}

// --- Admin & Staff Types ---

/**
 * Represents a member of the casting jury.
 */
export interface JuryMember {
  id: string; // Unique identifier for the jury member
  name: string; // Name of the jury member
  username: string; // Username for login
  password: string; // Password for the jury member's account
}

/**
 * Represents a staff member responsible for registration at events.
 */
export interface RegistrationStaff {
  id: string; // Unique identifier for the staff member
  name: string; // Name of the staff member
  username: string; // Username for login
  password: string; // Password for the staff member's account
}

/**
 * Represents the scores given by a jury member to a casting applicant.
 */
export interface JuryScore {
  physique: number; // Score for physique
  presence: number; // Score for presence
  photogenie: number; // Score for photogenie
  potentiel: number; // Score for potential
  notes?: string; // Additional notes from the jury member
  overall: number; // Overall score
}

/**
 * Represents a request from a model to recover their account.
 */
export interface RecoveryRequest {
  id: string; // Unique identifier for the recovery request
  modelName: string; // Name of the model requesting recovery
  phone: string; // Phone number of the model
  timestamp: string; // Timestamp of the request
  status: 'Nouveau' | 'Traité'; // Status of the request
}

/**
 * Represents a record of a model's absence.
 */
export interface Absence {
  id: string; // Unique identifier for the absence record
  modelId: string; // ID of the absent model
  modelName: string; // Name of the absent model
  date: string; // Date of the absence (YYYY-MM-DD)
  reason: 'Maladie' | 'Personnel' | 'Non justifié' | 'Autre'; // Reason for the absence
  notes?: string; // Additional notes about the absence
  isExcused: boolean; // Whether the absence is excused
}

/**
 * Represents a record of a monthly payment to a model.
 */
export interface MonthlyPayment {
  id: string; // Unique identifier for the payment (e.g., 'modelId-YYYY-MM')
  modelId: string; // ID of the model receiving the payment
  modelName: string; // Name of the model
  month: string; // The month the payment is for (YYYY-MM)
  amount: number; // The amount of the payment
  paymentDate: string; // The date the payment was made (YYYY-MM-DD)
  method: 'Virement' | 'Espèces' | 'Autre'; // The payment method
  status: 'Payé' | 'En attente' | 'En retard'; // The status of the payment
  notes?: string; // Additional notes about the payment
}

/**
 * Represents a brief for a photoshoot.
 */
export interface PhotoshootBrief {
  id: string; // Unique identifier for the photoshoot brief
  modelId: string; // ID of the model for the photoshoot
  modelName: string; // Name of the model
  theme: string; // Theme of the photoshoot
  clothingStyle: string; // Required clothing style
  accessories: string; // Required accessories
  location: string; // Location of the photoshoot
  dateTime: string; // Date and time of the photoshoot
  createdAt: string; // Timestamp of when the brief was created
  status: 'Nouveau' | 'Lu' | 'Archivé'; // Status of the brief
}

// --- Forum & Comments ---

/**
 * Represents a thread in the classroom forum.
 */
export interface ForumThread {
  id: string; // Unique identifier for the thread
  title: string; // Title of the thread
  authorId: string; // ID of the author
  authorName: string; // Name of the author
  createdAt: string; // Timestamp of when the thread was created
  initialPost: string; // The initial post content
}

/**
 * Represents a reply to a forum thread.
 */
export interface ForumReply {
  id: string; // Unique identifier for the reply
  threadId: string; // ID of the thread this reply belongs to
  authorId: string; // ID of the author
  authorName: string; // Name of the author
  createdAt: string; // Timestamp of when the reply was created
  content: string; // The content of the reply
}

/**
 * Represents a comment on a magazine article.
 */
export interface ArticleComment {
  id: string; // Unique identifier for the comment
  articleSlug: string; // Slug of the article this comment belongs to
  authorName: string; // Name of the author
  createdAt: string; // Timestamp of when the comment was created
  content: string; // The content of the comment
}

// --- Site Configuration & Miscellaneous ---

/**
 * Represents the social media links for the agency.
 */
export interface SocialLinks {
  facebook: string;
  instagram: string;
  youtube: string;
}

/**
 * Represents the contact information for the agency.
 */
export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  notificationEmail?: string;
}

/**
 * Represents the URLs for various images used on the site.
 */
export interface SiteImages {
  hero: string;
  about: string;
  fashionDayBg: string;
  agencyHistory: string;
  classroomBg: string;
  castingBg: string;
}

/**
 * Represents the API keys for various third-party services.
 */
export interface ApiKeys {
  resendApiKey: string;
  formspreeEndpoint: string;
  firebaseDynamicLinks?: {
    webApiKey?: string;
    domainUriPrefix: string;
  };
  imgbbApiKey?: string;
  brevoApiKey?: string;
}

/**
 * Represents the props for the AI Assistant component.
 */
export interface AIAssistantProps {
    isOpen: boolean;
    onClose: () => void;
    onInsertContent: (content: string) => void;
    fieldName: string;
    initialPrompt: string;
    jsonSchema?: any;
}

/**
 * Represents a single frequently asked question.
 */
export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Represents a category of frequently asked questions.
 */
export interface FAQCategory {
  category: string;
  items: FAQItem[];
}

/**
 * Represents a navigation link for the header or footer.
 */
export interface NavLink {
    path: string;
    label: string;
    inFooter: boolean;
    footerLabel?: string;
}
