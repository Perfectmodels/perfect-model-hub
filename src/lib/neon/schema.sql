-- Neon PostgreSQL Schema for Perfect Models Management
-- Run this in Neon SQL Editor to create tables

-- Site Configuration
CREATE TABLE IF NOT EXISTS site_config (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Navigation Links
CREATE TABLE IF NOT EXISTS nav_links (
    id SERIAL PRIMARY KEY,
    path VARCHAR(255) NOT NULL,
    label VARCHAR(100) NOT NULL,
    in_footer BOOLEAN DEFAULT false,
    footer_label VARCHAR(100),
    sort_order INT DEFAULT 0
);

-- Social Links
CREATE TABLE IF NOT EXISTS social_links (
    id SERIAL PRIMARY KEY,
    platform VARCHAR(50) NOT NULL,
    url VARCHAR(500) NOT NULL
);

-- Contact Info
CREATE TABLE IF NOT EXISTS contact_info (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    notification_email VARCHAR(255)
);

-- Site Images
CREATE TABLE IF NOT EXISTS site_images (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    url TEXT NOT NULL
);

-- Models
CREATE TABLE IF NOT EXISTS models (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(100),
    password_hash VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    age INT,
    height VARCHAR(20),
    gender VARCHAR(20) NOT NULL,
    location VARCHAR(255) DEFAULT 'Libreville',
    image_url TEXT,
    is_public BOOLEAN DEFAULT false,
    level VARCHAR(20) DEFAULT 'Débutant',
    portfolio_images JSONB DEFAULT '[]',
    distinctions JSONB DEFAULT '[]',
    measurements JSONB,
    categories JSONB DEFAULT '[]',
    experience TEXT,
    journey TEXT,
    quiz_scores JSONB DEFAULT '{}',
    last_login TIMESTAMP,
    last_activity TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Fashion Day Events
CREATE TABLE IF NOT EXISTS fashion_day_events (
    id SERIAL PRIMARY KEY,
    edition INT NOT NULL,
    date TIMESTAMP,
    theme VARCHAR(255),
    location VARCHAR(500),
    mc VARCHAR(255),
    promoter VARCHAR(255),
    description TEXT,
    stylists JSONB DEFAULT '[]',
    featured_models JSONB DEFAULT '[]',
    artists JSONB DEFAULT '[]',
    partners JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Services
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    icon VARCHAR(100),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    details JSONB,
    button_text VARCHAR(100),
    button_link VARCHAR(255),
    is_coming_soon BOOLEAN DEFAULT false
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    quote TEXT NOT NULL,
    image_url TEXT
);

-- News Items
CREATE TABLE IF NOT EXISTS news_items (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE,
    image_url TEXT,
    excerpt TEXT,
    link VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Articles (Magazine)
CREATE TABLE IF NOT EXISTS articles (
    slug VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    excerpt TEXT,
    image_url TEXT,
    author VARCHAR(255),
    date DATE,
    content JSONB,
    tags JSONB DEFAULT '[]',
    is_featured BOOLEAN DEFAULT false,
    view_count INT DEFAULT 0,
    reactions JSONB DEFAULT '{"likes": 0, "dislikes": 0}',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Course Data (Modules)
CREATE TABLE IF NOT EXISTS course_modules (
    slug VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    chapters JSONB DEFAULT '[]',
    quiz JSONB DEFAULT '[]',
    sort_order INT DEFAULT 0
);

-- Jury Members
CREATE TABLE IF NOT EXISTS jury_members (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255)
);

-- Registration Staff
CREATE TABLE IF NOT EXISTS registration_staff (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255)
);

-- Casting Applications
CREATE TABLE IF NOT EXISTS casting_applications (
    id VARCHAR(100) PRIMARY KEY,
    submission_date TIMESTAMP DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'Nouveau',
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birth_date DATE,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    nationality VARCHAR(100),
    city VARCHAR(100),
    gender VARCHAR(20) NOT NULL,
    height VARCHAR(20),
    weight VARCHAR(20),
    chest VARCHAR(20),
    waist VARCHAR(20),
    hips VARCHAR(20),
    shoe_size VARCHAR(20),
    eye_color VARCHAR(50),
    hair_color VARCHAR(50),
    experience TEXT,
    instagram VARCHAR(255),
    portfolio_link VARCHAR(500),
    photo_portrait_url TEXT,
    photo_full_body_url TEXT,
    photo_profile_url TEXT,
    scores JSONB DEFAULT '{}',
    passage_number INT
);

-- Fashion Day Applications
CREATE TABLE IF NOT EXISTS fashion_day_applications (
    id VARCHAR(100) PRIMARY KEY,
    submission_date TIMESTAMP DEFAULT NOW(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    role VARCHAR(50),
    message TEXT,
    status VARCHAR(50) DEFAULT 'Nouveau'
);

-- Forum Threads
CREATE TABLE IF NOT EXISTS forum_threads (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id VARCHAR(100),
    author_name VARCHAR(255),
    initial_post TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Forum Replies
CREATE TABLE IF NOT EXISTS forum_replies (
    id VARCHAR(100) PRIMARY KEY,
    thread_id VARCHAR(100) REFERENCES forum_threads(id) ON DELETE CASCADE,
    author_id VARCHAR(100),
    author_name VARCHAR(255),
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Article Comments
CREATE TABLE IF NOT EXISTS article_comments (
    id VARCHAR(100) PRIMARY KEY,
    article_slug VARCHAR(100) REFERENCES articles(slug) ON DELETE CASCADE,
    author_name VARCHAR(255),
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Recovery Requests
CREATE TABLE IF NOT EXISTS recovery_requests (
    id VARCHAR(100) PRIMARY KEY,
    model_name VARCHAR(255),
    phone VARCHAR(50),
    timestamp TIMESTAMP DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'Nouveau'
);

-- Booking Requests
CREATE TABLE IF NOT EXISTS booking_requests (
    id VARCHAR(100) PRIMARY KEY,
    submission_date TIMESTAMP DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'Nouveau',
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_company VARCHAR(255),
    requested_models TEXT,
    start_date DATE,
    end_date DATE,
    message TEXT
);

-- Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
    id VARCHAR(100) PRIMARY KEY,
    submission_date TIMESTAMP DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'Nouveau',
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT
);

-- FAQ Categories
CREATE TABLE IF NOT EXISTS faq_categories (
    id SERIAL PRIMARY KEY,
    category VARCHAR(255) NOT NULL,
    items JSONB DEFAULT '[]'
);

-- Absences
CREATE TABLE IF NOT EXISTS absences (
    id VARCHAR(100) PRIMARY KEY,
    model_id VARCHAR(100) REFERENCES models(id) ON DELETE CASCADE,
    model_name VARCHAR(255),
    date DATE NOT NULL,
    reason VARCHAR(50),
    notes TEXT,
    is_excused BOOLEAN DEFAULT false
);

-- Monthly Payments
CREATE TABLE IF NOT EXISTS monthly_payments (
    id VARCHAR(100) PRIMARY KEY,
    model_id VARCHAR(100) REFERENCES models(id) ON DELETE CASCADE,
    model_name VARCHAR(255),
    month VARCHAR(7) NOT NULL,
    amount DECIMAL(10,2),
    payment_date DATE,
    method VARCHAR(50) DEFAULT 'Espèces',
    status VARCHAR(50) DEFAULT 'En attente',
    notes TEXT
);

-- Photoshoot Briefs
CREATE TABLE IF NOT EXISTS photoshoot_briefs (
    id VARCHAR(100) PRIMARY KEY,
    model_id VARCHAR(100) REFERENCES models(id) ON DELETE CASCADE,
    model_name VARCHAR(255),
    theme VARCHAR(255),
    clothing_style TEXT,
    accessories TEXT,
    location VARCHAR(255),
    date_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'Nouveau'
);

-- Agency Info
CREATE TABLE IF NOT EXISTS agency_info (
    id SERIAL PRIMARY KEY,
    about JSONB,
    values JSONB DEFAULT '[]',
    timeline JSONB DEFAULT '[]',
    achievements JSONB DEFAULT '[]',
    partners JSONB DEFAULT '[]'
);

-- Model Distinctions
CREATE TABLE IF NOT EXISTS model_distinctions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    titles JSONB DEFAULT '[]'
);

-- API Keys (encrypted storage recommended)
CREATE TABLE IF NOT EXISTS api_keys (
    id SERIAL PRIMARY KEY,
    key_name VARCHAR(100) UNIQUE NOT NULL,
    key_value TEXT,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_models_is_public ON models(is_public);
CREATE INDEX IF NOT EXISTS idx_models_level ON models(level);
CREATE INDEX IF NOT EXISTS idx_casting_status ON casting_applications(status);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(is_featured);
