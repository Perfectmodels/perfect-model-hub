import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/components/SEO';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-6">
      <SEO title="Page non trouvée" description="Désolé, la page que vous recherchez n'existe pas." />
      <h1 className="text-9xl font-playfair font-bold text-pm-gold mb-4">404</h1>
      <h2 className="text-3xl font-playfair mb-8">Oups ! Page Introuvable</h2>
      <p className="text-gray-400 text-center max-w-md mb-12">
        La page que vous tentez de consulter semble avoir déménagé, ou n'a jamais existé. 
        Pas d'inquiétude, vous pouvez retourner à l'accueil pour reprendre votre navigation.
      </p>
      <Link 
        to="/" 
        className="px-8 py-4 bg-pm-gold text-pm-dark font-bold uppercase tracking-widest rounded-full hover:bg-white hover:scale-105 transition-all shadow-lg shadow-pm-gold/20"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;
