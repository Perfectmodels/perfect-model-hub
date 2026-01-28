import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckBadgeIcon, ChevronDownIcon, CalendarDaysIcon, TrophyIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { AchievementCategory, ModelDistinction, FAQCategory } from '../types';
import SEO from '../components/components/SEO';
import { useData } from '../contexts/DataContext';
import TestimonialCarousel from "../components/components/TestimonialCarousel";
import PageHeader from '../components/ui/PageHeader';
import Section from '../components/ui/Section';
import PremiumCard from '../components/ui/PremiumCard';
import PremiumButton from '../components/ui/PremiumButton';

const FAQItem: React.FC<{ item: { question: string, answer: string }, isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => {
    return (
        <motion.div
            className="mb-4 overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
            initial={false}
        >
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center p-6 text-left"
                aria-expanded={isOpen}
            >
                <span className="font-bold text-lg text-white font-playfair">{item.question}</span>
                <ChevronDownIcon
                    className={`w-5 h-5 text-pm-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                            {item.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

const FAQ: React.FC<{ faqData: FAQCategory[] }> = ({ faqData }) => {
    const [openFAQ, setOpenFAQ] = useState<string | null>('0-0');

    if (!faqData || faqData.length === 0) return null;

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-playfair text-white text-center mb-12">
                Questions <span className="text-pm-gold">Fréquentes</span>
            </h2>
            {faqData.map((category, catIndex) => (
                <div key={catIndex} className="mb-12">
                    <h3 className="text-xl font-bold text-pm-gold mb-6 uppercase tracking-wider">{category.category}</h3>
                    <div>
                        {category.items.map((item, itemIndex) => (
                            <FAQItem
                                key={`${catIndex}-${itemIndex}`}
                                item={item}
                                isOpen={openFAQ === `${catIndex}-${itemIndex}`}
                                onClick={() => setOpenFAQ(openFAQ === `${catIndex}-${itemIndex}` ? null : `${catIndex}-${itemIndex}`)}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const DistinctionCard: React.FC<{ distinction: ModelDistinction, index: number }> = ({ distinction, index }) => (
    <PremiumCard delay={index * 0.1} className="p-8 h-full flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pm-gold/20 to-transparent border border-pm-gold/30 flex items-center justify-center mb-6 text-pm-gold">
            <TrophyIcon className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-playfair font-bold text-white mb-4">{distinction.name}</h3>
        <div className="space-y-2 w-full">
            {distinction.titles.map((title, i) => (
                 <div key={i} className="flex items-center justify-center gap-2 text-sm text-gray-400 bg-white/5 py-2 px-3 rounded-lg">
                    <span className="text-pm-gold">✦</span>
                    {title}
                 </div>
            ))}
        </div>
    </PremiumCard>
);

const TimelineItem: React.FC<{ item: { year: string, event: string }, index: number }> = ({ item, index }) => {
    const isLeft = index % 2 === 0;

    return (
        <div className={`relative flex items-center justify-between w-full mb-8 md:mb-12 ${isLeft ? 'flex-row-reverse' : ''}`}>
            <div className="hidden md:block w-5/12" />

            <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-pm-dark border-2 border-pm-gold rounded-full transform -translate-x-1/2 z-10 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                 <div className="w-2 h-2 bg-pm-gold rounded-full animate-pulse" />
            </div>

            <motion.div
                className="w-full pl-12 md:pl-0 md:w-5/12"
                initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <div className={`p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-pm-gold/30 transition-colors ${!isLeft ? 'md:text-right' : ''}`}>
                    <span className="text-4xl font-playfair font-bold text-pm-gold/20 absolute top-2 right-4 select-none">{item.year}</span>
                    <h3 className="text-2xl font-bold text-pm-gold mb-2 relative z-10">{item.year}</h3>
                    <p className="text-gray-300 leading-relaxed relative z-10">{item.event}</p>
                </div>
            </motion.div>
        </div>
    );
};

const AchievementsTabs: React.FC<{ achievements: AchievementCategory[] }> = ({ achievements }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {achievements.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`
                            px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300
                            ${activeTab === index
                                ? 'bg-pm-gold text-pm-dark shadow-lg shadow-pm-gold/20 scale-105'
                                : 'bg-transparent text-gray-400 border border-white/20 hover:border-pm-gold hover:text-pm-gold'}
                        `}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            <div className="min-h-[300px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {achievements[activeTab].items.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                <CheckBadgeIcon className="w-6 h-6 text-pm-gold flex-shrink-0" />
                                <span className="text-gray-300">{item}</span>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {achievements[activeTab].name === "Défilés de Mode" && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="mt-8 text-center p-6 rounded-xl bg-pm-gold/10 border border-pm-gold/20"
                    >
                        <p className="text-pm-gold italic font-playfair text-lg">
                            "Notre agence a participé à tous les événements de mode majeurs depuis 2021."
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const Agency: React.FC = () => {
  const { data, isInitialized } = useData();

  if (!isInitialized || !data) {
    return <div className="min-h-screen bg-pm-dark" />;
  }
  
  const { agencyInfo, modelDistinctions, agencyTimeline, agencyAchievements, agencyPartners, siteImages, faqData } = data;

  return (
    <div className="bg-pm-dark text-pm-off-white">
      <SEO 
        title="L'Agence | Notre Histoire et Nos Valeurs"
        description="Plongez au cœur de Perfect Models Management."
        image={siteImages.agencyHistory}
      />

      <PageHeader
        title="Notre Agence"
        subtitle="Professionnalisme, Excellence et Éthique au cœur de la mode africaine."
        bgImage={siteImages.agencyHistory}
      />

      {/* Vision & Mission */}
      <Section dark>
        <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2 relative">
                <div className="absolute -top-10 -left-10 w-20 h-20 border-t-2 border-l-2 border-pm-gold rounded-tl-3xl opacity-50" />
                <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b-2 border-r-2 border-pm-gold rounded-br-3xl opacity-50" />
                <img src={siteImages.about} alt="About Us" className="rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="md:w-1/2">
                <h2 className="text-sm font-bold text-pm-gold uppercase tracking-widest mb-4">À Propos</h2>
                <h3 className="text-4xl font-playfair text-white mb-8">Une Vision <span className="text-pm-gold">Unique</span></h3>
                <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                    <p>{agencyInfo.about.p1}</p>
                    <p>{agencyInfo.about.p2}</p>
                </div>
            </div>
        </div>
      </Section>

      {/* Distinctions */}
      <Section bgImage={siteImages.hero}>
         <div className="text-center mb-16">
            <h2 className="text-pm-gold uppercase tracking-widest text-sm font-bold mb-3">Excellence Reconnue</h2>
            <h3 className="text-4xl md:text-5xl font-playfair text-white">Nos Distinctions</h3>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modelDistinctions.map((distinction, index) => (
              <DistinctionCard key={index} distinction={distinction} index={index} />
            ))}
         </div>
      </Section>

      {/* Timeline */}
      <Section dark>
          <div className="text-center mb-16">
             <h2 className="text-pm-gold uppercase tracking-widest text-sm font-bold mb-3">Évolution</h2>
             <h3 className="text-4xl md:text-5xl font-playfair text-white">Notre Parcours</h3>
          </div>

          <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-4 md:left-1/2 h-full w-px bg-gradient-to-b from-transparent via-pm-gold/40 to-transparent transform md:-translate-x-1/2" />
                {agencyTimeline.map((item, index) => (
                    <TimelineItem key={index} item={item} index={index} />
                ))}
          </div>
      </Section>

      {/* Achievements */}
      <Section className="bg-gradient-to-b from-pm-dark to-black">
         <div className="text-center mb-16">
            <h2 className="text-pm-gold uppercase tracking-widest text-sm font-bold mb-3">Portfolios</h2>
            <h3 className="text-4xl md:text-5xl font-playfair text-white">Nos Réalisations</h3>
         </div>
         <AchievementsTabs achievements={agencyAchievements} />
      </Section>

      {/* Partners */}
      <Section dark>
         <h3 className="text-center text-xl font-playfair text-white mb-12 opacity-80">Ils nous font confiance</h3>
         <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 max-w-5xl mx-auto opacity-70 hover:opacity-100 transition-opacity duration-500">
            {agencyPartners.map((partner, index) => (
                <div key={index} className="text-xl md:text-2xl font-bold font-playfair text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200">
                    {partner.name}
                </div>
            ))}
         </div>
      </Section>

      {/* Testimonials */}
      <Section bgImage={siteImages.fashionDayBg}>
           <h2 className="text-center text-pm-gold uppercase tracking-widest text-sm font-bold mb-12">Témoignages</h2>
           <TestimonialCarousel />
      </Section>

      {/* FAQ */}
      <Section dark>
         <FAQ faqData={faqData} />
      </Section>

      {/* CTA */}
      <section className="py-24 bg-pm-gold text-pm-dark text-center">
         <div className="container mx-auto px-6">
            <h2 className="text-4xl font-playfair font-bold mb-6">Prêt à collaborer avec l'élite ?</h2>
            <p className="max-w-2xl mx-auto mb-10 text-lg font-medium opacity-90">
                Que ce soit pour un casting, un défilé ou une campagne publicitaire, nous sommes là pour réaliser vos projets.
            </p>
            <div className="flex justify-center gap-4">
                 <PremiumButton to="/contact" variant="outline" className="border-pm-dark text-pm-dark hover:bg-pm-dark hover:text-pm-gold">
                    Nous Contacter
                 </PremiumButton>
            </div>
         </div>
      </section>

    </div>
  );
};

export default Agency;
