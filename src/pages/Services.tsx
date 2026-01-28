import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/components/SEO';
import { useData } from '../contexts/DataContext';
import { Service } from '../types';
import PageHeader from '../components/ui/PageHeader';
import Section from '../components/ui/Section';
import PremiumCard from '../components/ui/PremiumCard';
import PremiumButton from '../components/ui/PremiumButton';
import { 
    AcademicCapIcon, CameraIcon, UserGroupIcon, SparklesIcon, ClipboardDocumentCheckIcon, 
    MegaphoneIcon, IdentificationIcon, ScissorsIcon, PaintBrushIcon, CalendarDaysIcon, 
    PresentationChartLineIcon, ChatBubbleLeftRightIcon, VideoCameraIcon, PhotoIcon, StarIcon, HeartIcon, 
    UsersIcon, BriefcaseIcon, MicrophoneIcon, BuildingStorefrontIcon, ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';


const iconMap: { [key: string]: React.ElementType } = {
  AcademicCapIcon, CameraIcon, UserGroupIcon, SparklesIcon, ClipboardDocumentCheckIcon, 
  MegaphoneIcon, IdentificationIcon, ScissorsIcon, PaintBrushIcon, CalendarDaysIcon, 
  PresentationChartLineIcon, ChatBubbleLeftRightIcon, VideoCameraIcon, PhotoIcon, StarIcon,
  UsersIcon, BriefcaseIcon, MicrophoneIcon, BuildingStorefrontIcon, ClipboardDocumentListIcon
};

const ServiceCard: React.FC<{ service: Service, index: number }> = ({ service, index }) => {
    const Icon = iconMap[service.icon] || HeartIcon;

    return (
        <PremiumCard delay={index * 0.1} className="h-full flex flex-col group p-0">
             <div className="p-8 flex-grow flex flex-col">
                 <div className="flex justify-between items-start mb-6">
                     <div className="p-3 bg-gradient-to-br from-pm-gold/20 to-transparent rounded-2xl border border-pm-gold/20 text-pm-gold group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8" />
                     </div>
                     {service.isComingSoon && (
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-pm-gold/30 text-pm-gold/70">
                            Bientôt
                        </span>
                    )}
                 </div>

                 <h3 className="text-2xl font-playfair font-bold text-white mb-4 group-hover:text-pm-gold transition-colors">{service.title}</h3>
                 <p className="text-gray-400 mb-6 leading-relaxed flex-grow">{service.description}</p>

                 {service.details && (
                    <div className="mb-6 p-4 rounded-lg bg-black/20 border border-white/5">
                        <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">{service.details.title}</h4>
                        <ul className="space-y-1">
                            {service.details.points.slice(0, 3).map((point, i) => (
                                <li key={i} className="text-xs text-gray-500 flex items-start gap-2">
                                    <span className="text-pm-gold mt-0.5">•</span>
                                    {point}
                                </li>
                            ))}
                            {service.details.points.length > 3 && (
                                <li className="text-xs text-pm-gold mt-1 italic">+ {service.details.points.length - 3} autres points</li>
                            )}
                        </ul>
                    </div>
                 )}
             </div>

             <div className="p-8 pt-0 mt-auto">
                <PremiumButton
                    to={service.buttonLink}
                    variant="outline"
                    className="w-full group-hover:bg-pm-gold group-hover:text-pm-dark"
                    disabled={service.isComingSoon}
                >
                    {service.buttonText}
                </PremiumButton>
             </div>
        </PremiumCard>
    );
};

const Services: React.FC = () => {
    const { data, isInitialized } = useData();

    if (!isInitialized || !data) {
        return <div className="min-h-screen bg-pm-dark" />;
    }

    const services = data.agencyServices || [];

    const servicesByCategory = services.reduce((acc, service) => {
        const category = service.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(service);
        return acc;
    }, {} as Record<string, Service[]>);

    const categoryOrder: (keyof typeof servicesByCategory)[] = [
        'Services Mannequinat',
        'Services Mode et Stylisme',
        'Services Événementiels'
    ];

    return (
        <div className="bg-pm-dark text-pm-off-white">
            <SEO
                title="Nos Services | Accompagnement & Production"
                description="Découvrez l'ensemble des services conçus pour répondre aux besoins des créateurs, marques, et particuliers."
                image={data.siteImages.about}
            />

            <PageHeader
                title="Nos Services"
                subtitle="Des solutions sur mesure pour les mannequins, les marques et les créateurs."
                bgImage={data.siteImages.castingBg}
            />

            <div className="py-20">
                {categoryOrder.map((category, catIndex) => (
                    servicesByCategory[category] && (
                        <Section key={category} dark={catIndex % 2 !== 0}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="mb-12 border-l-4 border-pm-gold pl-6"
                            >
                                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white">{category}</h2>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {servicesByCategory[category].map((service, index) => (
                                    <ServiceCard key={index} service={service} index={index} />
                                ))}
                            </div>
                        </Section>
                    )
                ))}
            </div>

            {/* Custom CTA for Services */}
            <Section bgImage={data.siteImages.fashionDayBg} className="text-center">
                 <div className="max-w-3xl mx-auto bg-black/60 backdrop-blur-md p-10 rounded-2xl border border-white/10">
                    <h2 className="text-3xl font-playfair font-bold text-white mb-6">Besoin d'une solution personnalisée ?</h2>
                    <p className="text-gray-300 mb-8 text-lg">
                        Nous développons des offres sur mesure pour répondre à vos exigences spécifiques.
                    </p>
                    <PremiumButton to="/contact" variant="primary" size="lg">
                        Contactez notre équipe
                    </PremiumButton>
                 </div>
            </Section>
        </div>
    );
};

export default Services;
