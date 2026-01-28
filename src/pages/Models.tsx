import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ModelCard from "../components/components/ModelCard";
import SEO from '../components/components/SEO';
import { useData } from '../contexts/DataContext';
import PageHeader from '../components/ui/PageHeader';
import Section from '../components/ui/Section';

type GenderFilter = 'Tous' | 'Femme' | 'Homme';

const FilterButton: React.FC<{
    label: string;
    active: boolean;
    onClick: () => void
}> = ({ label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`
        px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300
        ${active
            ? 'bg-pm-gold text-pm-dark shadow-lg shadow-pm-gold/20 scale-105'
            : 'bg-transparent text-gray-400 border border-white/20 hover:border-pm-gold hover:text-pm-gold'}
      `}
    >
      {label}
    </button>
);

const Models: React.FC = () => {
  const { data, isInitialized } = useData();
  const [filter, setFilter] = useState<GenderFilter>('Tous');
  const [searchTerm, setSearchTerm] = useState('');

  const models = data?.models || [];
  
  const publicModels = useMemo(() => models.filter(model => model.isPublic === true), [models]);

  const filteredModels = useMemo(() => {
    return publicModels
      .filter(model => filter === 'Tous' || model.gender === filter)
      .filter(model => model.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [filter, searchTerm, publicModels]);
  
  const seoDescription = useMemo(() => {
      const modelNames = publicModels.slice(0, 3).map(m => m.name).join(', ');
      return `Découvrez le portfolio des mannequins de Perfect Models Management, incluant ${modelNames}.`;
  }, [publicModels]);

  if (!isInitialized || !data) {
      return <div className="min-h-screen bg-pm-dark" />;
  }

  return (
    <div className="bg-pm-dark text-pm-off-white min-h-screen">
      <SEO 
        title="Nos Mannequins | Le Visage de la Mode Gabonaise"
        description={seoDescription}
        image={publicModels[0]?.imageUrl || data.siteImages.about}
      />

      <PageHeader
        title="Nos Mannequins"
        subtitle="Découvrez les visages qui définissent l'avenir de la mode."
        bgImage={data.siteImages.hero} // Using hero as fallback or specific image if available
      />

      <Section dark className="min-h-screen">
        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-16">
          <div className="flex flex-wrap justify-center gap-4">
            <FilterButton label="Tous" active={filter === 'Tous'} onClick={() => setFilter('Tous')} />
            <FilterButton label="Femmes" active={filter === 'Femme'} onClick={() => setFilter('Femme')} />
            <FilterButton label="Hommes" active={filter === 'Homme'} onClick={() => setFilter('Homme')} />
          </div>

          <div className="relative w-full max-w-md">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un mannequin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-3 text-white focus:outline-none focus:border-pm-gold focus:ring-1 focus:ring-pm-gold transition-all placeholder-gray-500"
            />
          </div>
        </div>

        {/* Models Grid */}
        <AnimatePresence mode="wait">
            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
            {filteredModels.map((model) => (
                <motion.div
                    key={model.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                >
                    <ModelCard model={model} />
                </motion.div>
            ))}
            </motion.div>
        </AnimatePresence>

        {filteredModels.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 font-playfair">Aucun mannequin ne correspond à votre recherche.</p>
          </div>
        )}
      </Section>
    </div>
  );
};

export default Models;
