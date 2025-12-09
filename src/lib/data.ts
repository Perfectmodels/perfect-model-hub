// Sample data from the agency
export const agencyInfo = {
  about: {
    p1: "Fondée le 12 septembre 2021 par Parfait ASSEKO, Perfect Models Management (PMM) est une agence de mannequins qui redéfinit les standards du mannequinat au Gabon. Basée à Libreville, l'agence se positionne comme une véritable plateforme de formation, de promotion et d'épanouissement pour les jeunes talents.",
    p2: "Notre mission : révéler et sublimer la beauté africaine, tout en promouvant l'excellence artistique à travers des projets locaux et internationaux. Chez PMM, nous croyons en une Afrique qui inspire, en des talents qui s'imposent, et en une vision du mannequinat moderne, inclusive et ambitieuse."
  },
  values: [
    { name: "Professionnalisme", description: "Une éthique de travail rigoureuse et un engagement total." },
    { name: "Discipline", description: "La clé de la réussite sur les podiums et en dehors." },
    { name: "Excellence artistique", description: "Nous poussons chaque talent à atteindre son plein potentiel." },
    { name: "Culture Gabonaise", description: "Fiers de nos racines, nous mettons en valeur le patrimoine du Gabon." }
  ]
};

export const agencyAchievements = [
  {
    name: "Défilés de Mode",
    items: ["Perfect Fashion Day", "K'elle POUR ELLE", "O'Fashion Évent", "FEMOGA", "Pink Woman Show"]
  },
  {
    name: "Figuration & Clip Vidéo",
    items: ["King Ben – Cotelet", "Donzer – Ovengo", "Orfee Lashka – Je sais que tu mens"]
  },
  {
    name: "Collaborations Photo",
    items: ["Edele A", "Tito Style", "Vanella Fashion", "Vi Design", "Issée by Lita"]
  }
];

export const agencyPartners = [
  "La Gare du Nord", "Darain Visuals", "AG Style", "Farel MD", "Tito Style",
  "K'elle Collection", "Fédération Gabonaise de Mode", "Symbiose Concept Store"
];

export const featuredModels = [
  {
    id: "noemi-kim",
    name: "Noemi Kim",
    gender: "Femme",
    height: "1m78",
    level: "Pro",
    imageUrl: "https://i.ibb.co/mCcD1Gfq/DSC-0272.jpg",
    categories: ["Défilé", "Éditorial", "Beauté"],
    isPublic: true,
    measurements: { chest: "85cm", waist: "62cm", hips: "90cm", shoeSize: "40" },
    experience: "Mannequin vedette de l'agence, Noemi a défilé pour les plus grands créateurs gabonais.",
    distinctions: [{ name: "Palmarès", titles: ["Miss Gabon 2022", "Top Model Afrique Centrale 2023"] }]
  },
  {
    id: "aj-caramela",
    name: "AJ Caramela",
    gender: "Femme",
    height: "1m75",
    level: "Pro",
    imageUrl: "https://i.postimg.cc/k5skXhC2/NR-09474.jpg",
    categories: ["Défilé", "Commercial", "Éditorial"],
    isPublic: true,
    measurements: { chest: "82cm", waist: "60cm", hips: "88cm", shoeSize: "39" },
    experience: "Avec son regard perçant et sa polyvalence, AJ excelle dans les shootings éditoriaux.",
    distinctions: [{ name: "Reconnaissance", titles: ["Visage de l'Année 2023"] }]
  },
  {
    id: "yann-aubin",
    name: "Yann Aubin",
    gender: "Homme",
    height: "1m88",
    level: "Pro",
    imageUrl: "https://i.ibb.co/Rk1fG3ph/farelmd-37.jpg",
    categories: ["Défilé", "Costume", "Sportswear"],
    isPublic: true,
    measurements: { chest: "98cm", waist: "78cm", hips: "95cm", shoeSize: "44" },
    experience: "Spécialiste du prêt-à-porter masculin, reconnu pour sa démarche puissante.",
    distinctions: [{ name: "Podiums", titles: ["Mannequin Homme de l'Année 2025"] }]
  },
  {
    id: "diane-vanessa",
    name: "Diane Vanessa",
    gender: "Femme",
    height: "1m76",
    level: "Pro",
    imageUrl: "https://i.ibb.co/jkztFFQV/brando-50.jpg",
    categories: ["Défilé", "Éditorial"],
    isPublic: true,
    measurements: { chest: "84cm", waist: "63cm", hips: "89cm", shoeSize: "39" },
    experience: "Mannequin polyvalente avec une présence scénique exceptionnelle.",
    distinctions: []
  },
  {
    id: "rosnel-akoma",
    name: "Rosnel Akoma Ayo",
    gender: "Homme",
    height: "1m85",
    level: "Pro",
    imageUrl: "https://i.ibb.co/mC32jrDj/farelmd-31.jpg",
    categories: ["Défilé", "Commercial"],
    isPublic: true,
    measurements: { chest: "96cm", waist: "76cm", hips: "92cm", shoeSize: "43" },
    experience: "Mannequin masculin emblématique de l'agence.",
    distinctions: [{ name: "Titres", titles: ["Mister Akae Beach"] }]
  },
  {
    id: "priscilia-mba",
    name: "Priscilia Mba",
    gender: "Femme",
    height: "1m74",
    level: "Pro",
    imageUrl: "https://i.ibb.co/b5NYjLqm/brando-39.jpg",
    categories: ["Défilé", "Beauté"],
    isPublic: true,
    measurements: { chest: "83cm", waist: "61cm", hips: "88cm", shoeSize: "38" },
    experience: "Talent prometteur avec une élégance naturelle.",
    distinctions: []
  }
];

export const services = [
  {
    slug: "casting-mannequins",
    title: "Casting Mannequins",
    category: "Services Mannequinat",
    description: "Organisation de castings professionnels pour défilés, shootings et publicités.",
    icon: "Users"
  },
  {
    slug: "booking-mannequins",
    title: "Booking Mannequins",
    category: "Services Mannequinat",
    description: "Réservation de mannequins pour événements et campagnes publicitaires.",
    icon: "UserPlus"
  },
  {
    slug: "mannequins-defiles",
    title: "Mannequins pour Défilés",
    category: "Services Mannequinat",
    description: "Des mannequins professionnels pour vos défilés avec coaching sur la posture.",
    icon: "Sparkles"
  },
  {
    slug: "mannequins-photo",
    title: "Mannequins Photo",
    category: "Services Mannequinat",
    description: "Shooting photo pour catalogues, lookbooks ou réseaux sociaux.",
    icon: "Camera"
  },
  {
    slug: "formation",
    title: "Formation Mannequins",
    category: "Services Formation",
    description: "Formation complète pour développer vos compétences de mannequin.",
    icon: "GraduationCap"
  },
  {
    slug: "conseil-image",
    title: "Conseil en Image",
    category: "Services Conseil",
    description: "Accompagnement personnalisé pour sublimer votre image.",
    icon: "Palette"
  }
];

export const magazineArticles = [
  {
    slug: "noemi-kim-au-dela-du-podium",
    title: "Noemi Kim : Au-delà du podium",
    author: "Focus Model 241",
    category: "Interview",
    date: "15 Juillet 2024",
    excerpt: "Plongez dans le parcours inspirant de notre mannequin phare, entre discipline, ambition et passion.",
    imageUrl: "https://i.ibb.co/JWP8Dvk5/1004673860.jpg",
    viewCount: 32
  },
  {
    slug: "retour-sur-le-perfect-fashion-day",
    title: "Retour sur le Perfect Fashion Day",
    author: "La Rédaction",
    category: "Événement",
    date: "10 Février 2025",
    excerpt: "Les moments forts et les plus belles créations de l'événement qui a marqué les esprits.",
    imageUrl: "https://i.ibb.co/C5rcPJHz/titostyle-53.jpg",
    viewCount: 0
  },
  {
    slug: "l-audace-du-sur-mesure-masculin",
    title: "L'audace du sur-mesure masculin",
    author: "Focus Model 241",
    category: "Tendance",
    date: "28 Mars 2025",
    excerpt: "Analyse du style affirmé des créateurs comme Farel MD et Miguel Fashion Style.",
    imageUrl: "https://i.ibb.co/Rk1fG3ph/farelmd-37.jpg",
    viewCount: 29
  }
];

export const fashionDayEvents = [
  {
    edition: 1,
    theme: "Racines & Modernité",
    date: "Samedi 25 janvier 2025",
    location: "La Gare du Nord, Libreville",
    description: "La première édition de notre événement phare, célébrant l'union entre l'héritage culturel et l'innovation.",
    imageUrl: "https://i.ibb.co/PzjSSk5j/482986573-631604006390611-5475849692479591284-n.jpg"
  },
  {
    edition: 2,
    theme: "L'art de se révéler",
    date: "Samedi 31 janvier 2026",
    location: "À Définir",
    description: "Une mode profondément enracinée dans la culture et l'affirmation de soi.",
    imageUrl: "https://i.ibb.co/Z6FhzMM9/Google-AI-Studio-2025-09-14-T19-03-15-639-Z.png"
  }
];
