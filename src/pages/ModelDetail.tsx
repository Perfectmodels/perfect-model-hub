import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import SEO from '../components/components/SEO';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const ModelDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data } = useData();
    const models = data?.models || [];
    
    // Assumes id is the ID. Ideally retrieve by a slug if available, but ID is standard.
    const model = models.find(m => m.id === id);

    if (!model) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
                <SEO title="Mannequin Introuvable" description="Le mannequin demandé n'est pas disponible." />
                <p className="mb-4 text-xl">Mannequin non trouvé.</p>
                <Link to="/mannequins" className="text-pm-gold hover:underline">Retour aux mannequins</Link>
            </div>
        );
    }

    return (
        <div className="bg-black text-white min-h-screen pb-20">
            <SEO 
                title={`${model.name} | Mannequin Perfect Models`} 
                description={`Découvrez le portfolio de ${model.name}, mannequin chez Perfect Models, agence de mannequins au Gabon.`}
                image={model.imageUrl}
            />
            
            <div className="container mx-auto px-6 pt-24">
                <Link to="/mannequins" className="inline-flex items-center gap-2 text-pm-gold mb-8 hover:underline opacity-80 hover:opacity-100 transition-opacity">
                    <ArrowLeftIcon className="w-4 h-4" />
                    Retour aux mannequins
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image Section */}
                   <div className="h-[600px] w-full bg-gray-900 rounded-lg overflow-hidden relative shadow-2xl shadow-pm-gold/10">
                       <img src={model.imageUrl} alt={model.name} className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                       <div className="absolute bottom-0 left-0 right-0 p-8">
                           <h1 className="text-5xl font-playfair font-bold text-white mb-2">{model.name}</h1>
                           <p className="text-pm-gold uppercase tracking-widest text-sm font-semibold">Mannequin</p>
                       </div>
                   </div>

                   {/* Details Section */}
                   <div className="flex flex-col justify-center">
                       <h2 className="text-3xl font-playfair font-bold text-pm-gold mb-8 border-b border-pm-gold/20 pb-4">Mensurations</h2>
                       <ul className="space-y-6 text-sm md:text-base tracking-wide text-gray-300">
                            {model.height && <li className="flex justify-between items-center"><span>Taille</span> <span className="font-bold text-white text-lg">{model.height} cm</span></li>}
                             {model.measurements?.chest && <li className="flex justify-between items-center"><span>Poitrine</span> <span className="font-bold text-white text-lg">{model.measurements.chest} cm</span></li>}
                             {model.measurements?.waist && <li className="flex justify-between items-center"><span>Taille</span> <span className="font-bold text-white text-lg">{model.measurements.waist} cm</span></li>}
                             {model.measurements?.hips && <li className="flex justify-between items-center"><span>Hanches</span> <span className="font-bold text-white text-lg">{model.measurements.hips} cm</span></li>}
                             {model.measurements?.shoeSize && <li className="flex justify-between items-center"><span>Pointure</span> <span className="font-bold text-white text-lg">{model.measurements.shoeSize}</span></li>}
                       </ul>
                       
                       <div className="mt-12">
                           <Link to={`/contact?service=booking&model=${encodeURIComponent(model.name)}`} className="block w-full text-center bg-pm-gold text-pm-dark font-bold uppercase py-4 rounded-full hover:bg-white hover:text-black transition-all shadow-lg shadow-pm-gold/20 transform hover:-translate-y-1">
                               Booker ce talent
                           </Link>
                           <p className="text-center text-xs text-gray-500 mt-4">Pour toute demande spécifique, contactez-nous directement.</p>
                       </div>
                   </div>
                </div>
            </div>
        </div>
    );
};

export default ModelDetail;
