import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDaysIcon, MapPinIcon, SparklesIcon, UserGroupIcon, MicrophoneIcon, XMarkIcon } from '@heroicons/react/24/outline';
import SEO from '../components/components/SEO';
import { useData } from '../contexts/DataContext';
import { FashionDayEvent } from '../types';
import PageHeader from '../components/ui/PageHeader';
import Section from '../components/ui/Section';
import PremiumButton from '../components/ui/PremiumButton';
import PremiumCard from '../components/ui/PremiumCard';

const FashionDay: React.FC = () => {
  const { data, isInitialized } = useData();
  const fashionDayEvents = data?.fashionDayEvents || [];
  
  const [selectedEdition, setSelectedEdition] = useState<FashionDayEvent | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (fashionDayEvents.length > 0) {
      setSelectedEdition(fashionDayEvents[0]);
    }
  }, [fashionDayEvents]);

  if (!isInitialized || !data) {
    return <div className="min-h-screen bg-pm-dark"></div>;
  }

  if (fashionDayEvents.length === 0 || !selectedEdition) {
    return <div className="min-h-screen flex items-center justify-center text-white">Aucun événement à afficher.</div>;
  }

  return (
    <div className="bg-pm-dark text-pm-off-white">
      <SEO
        title="Perfect Fashion Day | L'Événement Mode"
        description="Vibrez au rythme du Perfect Fashion Day."
        image={data.siteImages.fashionDayBg}
      />

      <PageHeader
        title="Perfect Fashion Day"
        subtitle="Plus qu'un défilé, une célébration de la créativité et de l'identité gabonaise."
        bgImage={data.siteImages.fashionDayBg}
      />

      <Section dark>
          {/* Edition Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {fashionDayEvents.map(event => (
              <button
                key={event.edition}
                onClick={() => setSelectedEdition(event)}
                className={`
                    px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300
                    ${selectedEdition.edition === event.edition
                        ? 'bg-pm-gold text-pm-dark shadow-lg shadow-pm-gold/20 scale-105'
                        : 'bg-transparent text-gray-400 border border-white/20 hover:border-pm-gold hover:text-pm-gold'}
                `}
              >
                Édition {event.edition} ({new Date(event.date).getFullYear()})
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
                key={selectedEdition.edition}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
            >
                {/* Theme & Description */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h2 className="text-sm font-bold text-pm-gold uppercase tracking-widest mb-4">Thème</h2>
                    <h3 className="text-4xl md:text-5xl font-playfair text-white mb-6">"{selectedEdition.theme}"</h3>
                    <p className="text-xl text-gray-300 mb-8">{new Date(selectedEdition.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    <p className="text-gray-400 leading-relaxed text-lg">{selectedEdition.description}</p>
                </div>

                {/* Key Info Grid */}
                {selectedEdition.location && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        <InfoCard icon={CalendarDaysIcon} title="Date" content={new Date(selectedEdition.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} />
                        <InfoCard icon={MapPinIcon} title="Lieu" content={selectedEdition.location} />
                        <InfoCard icon={SparklesIcon} title="Promoteur" content={selectedEdition.promoter || 'Parfait Asseko'} />
                    </div>
                )}

                {/* Call to Action for Edition 2 */}
                {selectedEdition.edition === 2 && (
                    <div className="mb-20">
                         <PremiumCard className="p-12 text-center bg-gradient-to-br from-pm-gold/20 to-pm-dark">
                            <h3 className="text-3xl font-playfair font-bold text-white mb-6">Rejoignez l'Aventure</h3>
                            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                                Pour cette nouvelle édition, nous recherchons des talents visionnaires pour donner vie au thème "L’Art de Se Révéler".
                            </p>
                            <PremiumButton to="/fashion-day-application" variant="primary" size="lg">
                                Participer à l'événement
                            </PremiumButton>
                         </PremiumCard>
                    </div>
                )}

                {/* Content Grid (Artists & Models) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="flex items-center gap-3 text-2xl font-playfair text-white mb-6 border-b border-white/10 pb-4">
                            <MicrophoneIcon className="w-6 h-6 text-pm-gold" />
                            Artistes & Performances
                        </h3>
                        <ul className="space-y-4">
                             {selectedEdition.artists?.map((artist, index) => (
                                 <li key={index} className="flex flex-col">
                                     <span className="font-bold text-pm-gold">{artist.name}</span>
                                     <span className="text-sm text-gray-400">{artist.description}</span>
                                 </li>
                             ))}
                        </ul>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="flex items-center gap-3 text-2xl font-playfair text-white mb-6 border-b border-white/10 pb-4">
                            <UserGroupIcon className="w-6 h-6 text-pm-gold" />
                            Mannequins Vedettes
                        </h3>
                         <p className="text-gray-300 leading-relaxed">
                            {selectedEdition.featuredModels?.join(', ')} et toute la Perfect Models Squad.
                        </p>
                    </div>
                </div>

                {/* Stylists Gallery */}
                {selectedEdition.stylists && (
                    <div className="mb-20">
                        <div className="text-center mb-12">
                             <h2 className="text-pm-gold uppercase tracking-widest text-sm font-bold mb-3">Créateurs</h2>
                             <h3 className="text-4xl font-playfair text-white">Les Stylistes</h3>
                        </div>
                        <div className="space-y-16">
                            {selectedEdition.stylists.map((stylist) => (
                                <div key={stylist.name}>
                                    <div className="mb-8 pl-4 border-l-4 border-pm-gold">
                                        <h4 className="text-3xl font-playfair font-bold text-white">{stylist.name}</h4>
                                        <p className="text-gray-400 mt-2">{stylist.description}</p>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                        {(stylist.images || []).map((img, idx) => (
                                            <motion.button
                                                key={idx}
                                                whileHover={{ scale: 1.05 }}
                                                onClick={() => setSelectedImage(img)}
                                                className="aspect-square rounded-lg overflow-hidden border border-white/10 hover:border-pm-gold transition-colors"
                                            >
                                                <img src={img} alt={`${stylist.name} ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </motion.div>
          </AnimatePresence>
      </Section>
      
      {/* Lightbox */}
      <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button className="absolute top-6 right-6 text-white hover:text-pm-gold p-2">
                <XMarkIcon className="w-10 h-10"/>
              </button>
              <img
                src={selectedImage}
                alt="Zoom"
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
};

const InfoCard: React.FC<{ icon: React.ElementType, title: string, content: string }> = ({ icon: Icon, title, content }) => (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center gap-4">
        <div className="p-3 bg-pm-gold/10 rounded-full text-pm-gold">
            <Icon className="w-8 h-8" />
        </div>
        <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{title}</h4>
            <p className="text-lg text-white font-medium">{content}</p>
        </div>
    </div>
);

export default FashionDay;
