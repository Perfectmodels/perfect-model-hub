import { Module } from '../../types';

/**
 * This file contains the complete course data for the modeling academy.
 * It is structured as an array of modules, each containing chapters and a quiz.
 */

export const courseData: Module[] = [
  {
    slug: "module-1-les-fondamentaux-du-mannequinat",
    title: "Module 1: Les Fondamentaux du Mannequinat",
    chapters: [
      { 
        slug: "histoire-et-evolution-du-mannequinat",
        title: "Histoire et évolution du mannequinat", 
        content: `Le métier de mannequin, tel que nous le concevons aujourd'hui, est une invention relativement moderne, intimement liée à l'émergence de la haute couture. Avant le milieu du XIXe siècle, les créateurs de mode utilisaient des poupées pour présenter leurs nouvelles créations à leurs clientes. C'est le couturier anglais Charles Frederick Worth, installé à Paris, qui fut le premier, dans les années 1850, à faire porter ses robes par de vraies femmes, en l'occurrence sa propre épouse, Marie Vernet Worth. Elle est ainsi considérée comme la première mannequin de l'histoire.
Au début du XXe siècle, le métier se professionnalise avec l'ouverture des premières agences, comme celle de John Robert Powers aux États-Unis. Cependant, les mannequins restent anonymes, de simples "porte-manteaux" vivants.
L'âge d'or des magazines de mode, après la Seconde Guerre mondiale, commence à mettre en lumière certains visages, comme Lisa Fonssagrives ou Dovima. Mais c'est dans les années 1960, avec la révolution culturelle, que des personnalités comme Twiggy ou Jean Shrimpton deviennent des icônes, incarnant l'esprit de leur époque.
Les années 1990 marquent l'apogée du phénomène des "Supermodels". Cindy Crawford, Naomi Campbell, Linda Evangelista, Christy Turlington et Claudia Schiffer ne sont plus de simples modèles ; elles sont des célébrités mondiales, des marques à part entière, qui transcendent l'industrie de la mode.
Enfin, l'ère digitale a bouleversé le paysage. Les réseaux sociaux, et notamment Instagram, ont créé une nouvelle génération de mannequins-influenceurs (Gigi Hadid, Kendall Jenner), où le "personal branding" et le nombre de followers deviennent des atouts majeurs. Aujourd'hui, l'industrie tend vers plus de diversité et d'inclusivité, remettant en question les standards de beauté longtemps hégémoniques et ouvrant la porte à une plus grande variété de profils, de corps et d'identités.` 
      },
      // ... (rest of the content remains the same)
    ],
    quiz: [
      {
        question: "Quel est le rôle principal d'un 'booker' dans une agence ?",
        options: ["Maquiller les mannequins", "Prendre les photos du book", "Négocier les contrats et gérer le planning", "Choisir les vêtements pour les défilés"],
        correctAnswer: "Négocier les contrats et gérer le planning"
      },
      {
        question: "Qu'est-ce qu'un 'composite' (ou 'comp card') ?",
        options: ["Un contrat de travail", "Une carte de visite avec les meilleures photos et mensurations du mannequin", "Le planning des castings", "Un magazine de mode"],
        correctAnswer: "Une carte de visite avec les meilleures photos et mensurations du mannequin"
      },
      {
        question: "Lequel de ces types de mannequinat est principalement axé sur le travail avec les designers pendant le processus de création de vêtements ?",
        options: ["Mannequin commercial", "Mannequin éditorial", "Mannequin cabine (fitting)", "Mannequin de détail"],
        correctAnswer: "Mannequin cabine (fitting)"
      }
    ]
  },
  // ... (rest of the modules remain the same)
];
