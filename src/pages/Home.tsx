import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/components/SEO';
import TestimonialCarousel from "../components/components/TestimonialCarousel";
import { useData } from '../contexts/DataContext';
import ModelCard from "../components/components/ModelCard";
import PremiumCard from '../components/ui/PremiumCard';
import Section from '../components/ui/Section';
import PremiumButton from '../components/ui/PremiumButton';
import { Service } from '../types';
import {
    AcademicCapIcon, CameraIcon, UserGroupIcon, SparklesIcon,
    MegaphoneIcon, IdentificationIcon, ScissorsIcon, PaintBrushIcon, CalendarDaysIcon,
    PresentationChartLineIcon, ChatBubbleLeftRightIcon, VideoCameraIcon, PhotoIcon, StarIcon, HeartIcon,
    UsersIcon, BriefcaseIcon, MicrophoneIcon, BuildingStorefrontIcon, ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

const iconMap: { [key: string]: React.ElementType } = {
  "UsersIcon": UsersIcon,
  "UserGroupIcon": UserGroupIcon,
  "AcademicCapIcon": AcademicCapIcon,
  "VideoCameraIcon": VideoCameraIcon,
  "PhotoIcon": PhotoIcon,
  "IdentificationIcon": IdentificationIcon,
  "ScissorsIcon": ScissorsIcon,
  "BriefcaseIcon": BriefcaseIcon,
  "PaintBrushIcon": PaintBrushIcon,
  "PresentationChartLineIcon": PresentationChartLineIcon,
  "SparklesIcon": SparklesIcon,
  "CameraIcon": CameraIcon,
  "StarIcon": StarIcon,
  "MegaphoneIcon": MegaphoneIcon,
  "MicrophoneIcon": MicrophoneIcon,
  "ChatBubbleLeftRightIcon": ChatBubbleLeftRightIcon,
  "BuildingStorefrontIcon": BuildingStorefrontIcon,
  "ClipboardDocumentListIcon": ClipboardDocumentListIcon,
  "CalendarDaysIcon": CalendarDaysIcon,
};

const HomeServiceCard: React.FC<{ service: Service, delay: number }> = ({ service, delay }) => {
    const Icon = iconMap[service.icon] || HeartIcon;
    return (
        <PremiumCard delay={delay} className="p-8 h-full flex flex-col items-start">
             {service.isComingSoon && (
                <span className="absolute top-4 right-4 bg-pm-dark/80 text-pm-gold text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-pm-gold/30">
                    Bientôt
                </span>
            )}
            <div className="p-3 bg-gradient-to-br from-pm-gold/20 to-transparent rounded-xl border border-pm-gold/20 mb-6">
                <Icon className="w-8 h-8 text-pm-gold" />
            </div>
            <h3 className="text-xl font-playfair font-bold text-white mb-3">{service.title}</h3>
            <p className="text-sm text-gray-400 mb-6 flex-grow leading-relaxed">{service.description}</p>
            <PremiumButton to={service.buttonLink} variant="outline" size="sm" disabled={service.isComingSoon}>
                {service.buttonText}
            </PremiumButton>
        </PremiumCard>
    );
};

const Home: React.FC = () => {
  const { data, isInitialized } = useData();

  if (!isInitialized || !data) {
    return (
      <div className="min-h-screen bg-pm-dark flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-pm-gold border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-pm-gold text-xl font-playfair animate-pulse">Chargement...</p>
        </div>
      </div>
    );
  }

  const { agencyInfo, fashionDayEvents, models, siteImages, testimonials, agencyServices } = data;
  const publicModels = models.filter(m => m.isPublic).slice(0, 4);
  const featuredServices = agencyServices.slice(0, 4);

  return (
    <div className="text-pm-off-white bg-pm-dark overflow-x-hidden">
      <SEO 
        title="Accueil | L'Élégance Redéfinie"
        description="Perfect Models Management, l'agence de mannequins de référence à Libreville, Gabon."
        image={siteImages.hero}
      />

      {/* 1. Hero Section */}
      <section 
        className="relative h-screen min-h-[600px] flex items-center justify-center text-center overflow-hidden"
      >
        {/* Parallax Background */}
        <div
            className="absolute inset-0 bg-cover bg-center bg-fixed z-0 transform scale-110"
            style={{ backgroundImage: `url('${siteImages.hero}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-pm-dark z-0" />

        <div className="relative z-10 px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
             <h2 className="text-pm-gold uppercase tracking-[0.3em] text-sm md:text-base mb-4 font-bold">
                Agence de Mannequins & Événementiel
             </h2>
             <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair text-white font-black leading-[0.9] tracking-tight mb-8">
                L'ÉLÉGANCE <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pm-gold via-yellow-200 to-pm-gold" style={{ textShadow: '0 0 30px rgba(212, 175, 55, 0.3)' }}>
                    REDÉFINIE
                </span>
             </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light"
          >
            Nous révélons les talents et valorisons la beauté africaine à travers le monde.
          </motion.p>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.8, duration: 0.8 }}
             className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <PremiumButton to="/mannequins" variant="primary" size="lg">
              Découvrir nos talents
            </PremiumButton>
            <PremiumButton to="/casting-formulaire" variant="outline" size="lg">
              Devenir Mannequin
            </PremiumButton>
          </motion.div>
        </div>
      </section>

      {/* 2. Agency Presentation */}
      <Section dark className="z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative group"
            >
                <div className="absolute -inset-4 bg-pm-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img
                    src={siteImages.about}
                    alt="Agency"
                    className="relative rounded-lg shadow-2xl border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-700"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-sm font-bold text-pm-gold uppercase tracking-widest mb-2">Notre Vision</h2>
                <h3 className="text-4xl md:text-5xl font-playfair text-white mb-6">Excellence & <span className="italic text-pm-gold">Innovation</span></h3>
                <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                    {agencyInfo.about.p1}
                </p>

                <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8 mb-8">
                    {['Professionnalisme', 'Excellence', 'Éthique'].map((val, i) => (
                        <div key={i} className="text-center">
                            <span className="block text-2xl md:text-3xl text-pm-gold font-playfair font-bold mb-1">0{i+1}</span>
                            <span className="text-xs uppercase tracking-wider text-gray-500">{val}</span>
                        </div>
                    ))}
                </div>

                <PremiumButton to="/agence" variant="outline">
                    En savoir plus
                </PremiumButton>
            </motion.div>
        </div>
      </Section>

      {/* 3. Services */}
      <Section bgImage={siteImages.castingBg}>
        <div className="text-center mb-16">
            <h2 className="text-pm-gold uppercase tracking-widest text-sm font-bold mb-3">Ce que nous faisons</h2>
            <h3 className="text-4xl md:text-5xl font-playfair text-white">Nos Services</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service, idx) => (
            <HomeServiceCard key={service.title} service={service} delay={idx * 0.1} />
          ))}
        </div>
        <div className="text-center mt-12">
            <PremiumButton to="/services" variant="primary">
                Voir tous les services
            </PremiumButton>
        </div>
      </Section>

      {/* 4. Models */}
      <Section dark>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
                <h2 className="text-pm-gold uppercase tracking-widest text-sm font-bold mb-3">Talents</h2>
                <h3 className="text-4xl md:text-5xl font-playfair text-white">Nos Mannequins</h3>
            </div>
            <Link to="/mannequins" className="hidden md:block text-pm-gold hover:text-white transition-colors uppercase tracking-widest text-sm font-bold border-b border-pm-gold pb-1">
                Voir tout le board →
            </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {publicModels.map((model, idx) => (
            <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
            >
                <ModelCard model={model} />
            </motion.div>
          ))}
        </div>

        <div className="md:hidden text-center mt-8">
             <PremiumButton to="/mannequins" variant="outline">
                Voir tout le board
             </PremiumButton>
        </div>
      </Section>

      {/* 5. Event Highlight */}
      <Section bgImage={siteImages.fashionDayBg} className="text-center">
         <div className="max-w-4xl mx-auto">
             <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="p-10 border border-pm-gold/30 bg-black/60 backdrop-blur-md rounded-xl"
             >
                <h2 className="text-pm-gold uppercase tracking-[0.2em] mb-4">Événement Phare</h2>
                <h3 className="text-4xl md:text-6xl font-playfair text-white mb-6">Perfect Fashion Day</h3>
                <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
                    {fashionDayEvents.find(e => e.edition === 2)?.description || "L'événement mode incontournable."}
                </p>
                <PremiumButton to="/fashion-day" variant="primary" size="lg">
                    Découvrir l'événement
                </PremiumButton>
             </motion.div>
         </div>
      </Section>

      {/* 7. Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <Section dark>
             <h2 className="text-center text-pm-gold uppercase tracking-widest text-sm font-bold mb-12">Témoignages</h2>
             <TestimonialCarousel />
        </Section>
      )}

      {/* 8. Call to Action */}
      <section className="relative py-24 bg-gradient-to-b from-pm-dark to-black overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pm-gold/50 to-transparent" />

        <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-playfair text-white mb-6">Prêt à commencer ?</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                Que vous soyez mannequin, styliste ou une marque, créons ensemble quelque chose d'extraordinaire.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <PremiumButton to="/casting-formulaire" variant="primary" size="lg">
                    Rejoindre l'agence
                </PremiumButton>
                <PremiumButton to="/contact" variant="outline" size="lg">
                    Nous contacter
                </PremiumButton>
            </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
