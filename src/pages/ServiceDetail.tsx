import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import SEO from '../components/components/SEO';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const ServiceDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data } = useData();
    const services = data?.agencyServices || [];

    // Attempt to match service by loose slug matching
    const service = services.find(s => {
        const urlSlug = s.buttonLink.split('/').pop();
        return urlSlug === slug || s.title.toLowerCase().replace(/\s+/g, '-') === slug;
    });

    if (!service) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
                <SEO title="Service Introuvable" description="Le service demandé est introuvable." />
                <p className="mb-4 text-xl">Service non trouvé.</p>
                <Link to="/services" className="text-pm-gold hover:underline">Retour aux services</Link>
            </div>
        );
    }

    return (
        <div className="bg-black text-white min-h-screen pb-20">
            <SEO 
                title={`${service.title} | Services Perfect Models`} 
                description={service.description}
            />
            
            <div className="container mx-auto px-6 pt-24">
                <Link to="/services" className="inline-flex items-center gap-2 text-pm-gold mb-8 hover:underline opacity-80 hover:opacity-100 transition-opacity">
                    <ArrowLeftIcon className="w-4 h-4" />
                    Retour aux services
                </Link>

                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-playfair font-bold text-pm-gold mb-6">{service.title}</h1>
                    
                    <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 shadow-2xl">
                         <p className="text-lg leading-relaxed text-gray-300 mb-8">{service.description}</p>
                         
                         {service.details && (
                            <div className="mb-10 bg-black/50 p-6 rounded-lg border-l-4 border-pm-gold">
                                <h3 className="text-xl font-bold text-white mb-4">{service.details.title}</h3>
                                <ul className="space-y-3">
                                    {service.details.points.map((point, index) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-400">
                                            <span className="text-pm-gold mt-1">•</span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to={`/contact?service=${encodeURIComponent(service.title)}`} className="px-8 py-4 bg-pm-gold text-pm-dark font-bold uppercase rounded-full hover:bg-white hover:text-black transition-all shadow-lg shadow-pm-gold/20 text-center">
                                Réserver ce service
                            </Link>
                            <Link to="/contact" className="px-8 py-4 bg-transparent border border-pm-gold text-pm-gold font-bold uppercase rounded-full hover:bg-pm-gold hover:text-black transition-all text-center">
                                Nous contacter
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
