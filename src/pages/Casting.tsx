import React from 'react';
import CountdownTimer from "../components/components/CountdownTimer";
import { CalendarDaysIcon, ClockIcon, MapPinIcon, CheckCircleIcon, SparklesIcon } from '@heroicons/react/24/outline';
import SEO from '../components/components/SEO';
import { useData } from '../contexts/DataContext';
import PageHeader from '../components/ui/PageHeader';
import Section from '../components/ui/Section';
import PremiumButton from '../components/ui/PremiumButton';
import PremiumCard from '../components/ui/PremiumCard';

const Casting: React.FC = () => {
  const { data, isInitialized } = useData();
  const castingDate = "2025-09-06T14:00:00";
  
  if (!isInitialized || !data) {
    return <div className="min-h-screen bg-pm-dark" />;
  }
  
  const { siteImages } = data;

  const conditionsFilles = [
    "Âge : 16 à 28 ans",
    "Taille : 1m70 minimum",
    "Tour de taille : 60 à 66 cm",
    "Tour de hanche : 90 à 96 cm",
  ];

  const conditionsGarcons = [
    "Âge : 18 à 30 ans",
    "Taille : 1m80 minimum",
  ];
  
  const dressCode = [
    "Débardeur noir",
    "Jean slim noir",
    "Talons (pour les filles)",
    "Chaussures de ville (pour les garçons)",
  ];

  return (
    <div className="bg-pm-dark text-pm-off-white">
      <SEO 
        title="Grand Casting National | Devenez Mannequin"
        description="Saisissez votre chance ! Participez au grand casting national de Perfect Models Management."
        image={siteImages.castingBg}
      />

      <PageHeader
        title="Grand Casting National"
        subtitle="Votre carrière commence ici. Rejoignez l'élite."
        bgImage={siteImages.castingBg}
      />

      <Section dark className="-mt-32 relative z-20 pt-0">
          {/* Key Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
             <InfoCard icon={CalendarDaysIcon} title="Date" content="Samedi 6 Sept. 2025" />
             <InfoCard icon={ClockIcon} title="Heure" content="14h00 Précises" />
             <InfoCard icon={MapPinIcon} title="Lieu" content="Complexe Eli, Ancien Sobraga" />
          </div>

          {/* Countdown */}
          <div className="text-center mb-24">
              <h2 className="text-sm font-bold text-pm-gold uppercase tracking-widest mb-8">Le temps presse</h2>
              <div className="inline-block p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                 <CountdownTimer targetDate={castingDate} />
              </div>
          </div>

          {/* Conditions & Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-24">
              <PremiumCard className="p-10 h-full">
                  <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 bg-pm-gold/20 rounded-full text-pm-gold"><CheckCircleIcon className="w-8 h-8" /></div>
                      <h3 className="text-2xl font-playfair font-bold text-white">Conditions</h3>
                  </div>

                  <div className="space-y-8">
                      <div>
                          <h4 className="font-bold text-pm-gold uppercase tracking-wider text-sm mb-4 border-b border-white/10 pb-2">Pour les Filles</h4>
                          <ul className="space-y-3">
                              {conditionsFilles.map((item, i) => (
                                  <li key={i} className="flex items-start gap-3 text-gray-300">
                                      <span className="text-pm-gold mt-1">•</span>
                                      {item}
                                  </li>
                              ))}
                          </ul>
                      </div>
                      <div>
                          <h4 className="font-bold text-pm-gold uppercase tracking-wider text-sm mb-4 border-b border-white/10 pb-2">Pour les Garçons</h4>
                          <ul className="space-y-3">
                              {conditionsGarcons.map((item, i) => (
                                  <li key={i} className="flex items-start gap-3 text-gray-300">
                                      <span className="text-pm-gold mt-1">•</span>
                                      {item}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </div>
              </PremiumCard>

              <PremiumCard className="p-10 h-full">
                  <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 bg-pm-gold/20 rounded-full text-pm-gold"><SparklesIcon className="w-8 h-8" /></div>
                      <h3 className="text-2xl font-playfair font-bold text-white">Tenue & Attitude</h3>
                  </div>

                  <div className="mb-8">
                      <h4 className="font-bold text-pm-gold uppercase tracking-wider text-sm mb-4 border-b border-white/10 pb-2">Dress Code Strict</h4>
                      <ul className="space-y-3">
                          {dressCode.map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-gray-300">
                                  <span className="text-pm-gold mt-1">•</span>
                                  {item}
                              </li>
                          ))}
                      </ul>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                      <p className="text-red-300 text-sm italic">
                          "Le respect de la tenue est impératif. Tout candidat ne respectant pas ces consignes ne sera pas auditionné."
                      </p>
                  </div>
              </PremiumCard>
          </div>

          {/* Final CTA */}
          <div className="text-center max-w-3xl mx-auto">
              <PremiumCard className="p-12 border-pm-gold/30">
                  <h2 className="text-4xl font-playfair font-bold text-white mb-6">Ne manquez pas votre chance</h2>
                  <p className="text-gray-300 mb-10 text-lg">
                      La pré-inscription en ligne est fortement recommandée pour gagner du temps le jour J.
                  </p>
                  <PremiumButton to="/casting-formulaire" variant="primary" size="lg" className="w-full sm:w-auto shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                      S'inscrire au Casting
                  </PremiumButton>
              </PremiumCard>
          </div>
      </Section>
    </div>
  );
};

const InfoCard: React.FC<{ icon: React.ElementType, title: string, content: string }> = ({ icon: Icon, title, content }) => (
    <div className="bg-pm-dark border border-pm-gold/20 rounded-xl p-6 flex flex-col items-center text-center shadow-2xl">
        <Icon className="w-10 h-10 text-pm-gold mb-4" />
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{title}</h4>
        <p className="text-lg text-white font-bold font-playfair">{content}</p>
    </div>
);

export default Casting;
