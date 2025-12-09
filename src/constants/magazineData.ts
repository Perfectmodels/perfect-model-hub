import { Article } from '../../types';

/**
 * This file contains the data for the magazine articles.
 * Each article has a unique slug, title, category, excerpt, and other metadata.
 * The content of each article is an array of objects, each representing a different type of content (paragraph, heading, image, quote).
 */

export const articles: Article[] = [
  {
    slug: 'noemi-kim-reine-des-podiums',
    title: "Noemi Kim : Portrait d'une Reine des Podiums",
    category: 'Portrait',
    excerpt: "De Miss Gabon à Top Model Afrique Centrale, Noemi Kim collectionne les titres et s'impose comme une figure incontournable de la mode. Retour sur le parcours d'une mannequin dont l'ambition n'a d'égale que son élégance.",
    imageUrl: 'https://i.ibb.co/mCcD1Gfq/DSC-0272.jpg',
    author: 'Focus Model 241',
    date: '2024-08-12',
    isFeatured: true,
    content: [
      { type: 'paragraph', text: "Noemi Kim n'est pas seulement un mannequin, elle est une collectionneuse de couronnes. Son parcours fulgurant, marqué par des titres prestigieux, dessine le portrait d'une jeune femme déterminée à porter haut les couleurs de la mode gabonaise. De l'écharpe de Miss à la reconnaissance continentale, son histoire est celle d'une ambition réalisée avec grâce et professionnalisme." },
      { type: 'heading', level: 2, text: "Une Ambassadrice de Beauté Nationale" },
      { type: 'paragraph', text: "En 2022, le Gabon découvre son nouveau visage : Noemi Kim est couronnée Miss Gabon. Plus qu'un concours de beauté, ce titre la propulse au rang d'ambassadrice de l'élégance et de la culture de son pays. Cette expérience a forgé son caractère et sa présence scénique, lui apprenant à maîtriser la pression des projecteurs et à incarner des valeurs fortes." },
      { type: 'image', src: 'https://i.ibb.co/K2wS0Pz/hero-bg.jpg', alt: 'Noemi Kim lors d\'un shooting', caption: 'Une prestance royale, héritage de son titre de Miss Gabon.' },
      { type: 'heading', level: 2, text: "La Conquête du Continent" },
      { type: 'paragraph', text: "Loin de se reposer sur ses lauriers nationaux, Noemi Kim a relevé le défi continental en 2023. Sa participation au concours Top Model Afrique Centrale a été une démonstration de son talent et de sa polyvalence. Elle y a remporté le titre, confirmant son statut de mannequin de premier plan non seulement au Gabon, mais dans toute la sous-région. Ce succès international témoigne de la qualité de sa formation au sein de Perfect Models Management et de sa capacité à répondre aux standards les plus exigeants." },
      { type: 'quote', text: "Chaque titre est une étape, pas une destination. Le plus important est de continuer à apprendre et à grandir.", author: "Noemi Kim" },
      { type: 'paragraph', text: "Aujourd'hui, Noemi Kim continue son ascension, inspirant une nouvelle génération de mannequins. Son palmarès n'est que le reflet de son éthique de travail et de sa passion. Chez Perfect Models Management, nous sommes fiers d'accompagner une telle étoile sur le chemin du succès." }
    ],
    tags: ['Noemi Kim', 'Miss Gabon', 'Top Model', 'Mannequin Gabonais', 'Succès', 'Portrait']
  },
  // ... (rest of the articles)
];
