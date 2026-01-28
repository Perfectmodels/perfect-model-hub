import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Model } from '../../../types';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface ModelCardProps {
  model: Model;
}

const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  return (
    <Link to={`/mannequins/${model.id}`} className="block group relative h-full">
      <div className="relative overflow-hidden rounded-xl h-[450px] w-full bg-gray-900 border border-white/10 group-hover:border-pm-gold/50 transition-colors duration-500">

        {/* Image with Zoom Effect */}
        <div className="absolute inset-0 overflow-hidden">
            <img
                src={model.imageUrl}
                alt={model.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-transform duration-500">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-playfair font-bold text-white mb-1 group-hover:text-pm-gold transition-colors">{model.name}</h3>
                <p className="text-gray-300 text-sm font-medium mb-4 flex items-center gap-2">
                    <span className="uppercase tracking-wider">{model.location || "Libreville"}</span>
                    <span>•</span>
                    <span>{model.height}</span>
                </p>

                {/* Reveal on Hover */}
                <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <div className="flex items-center gap-2 text-pm-gold text-sm font-bold uppercase tracking-widest mt-2 border-t border-white/20 pt-4">
                        Voir le profil <ArrowRightIcon className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </div>

        {/* Level Badge if exists */}
        {model.level && (
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <span className="text-xs font-bold text-white uppercase tracking-wider">{model.level}</span>
            </div>
        )}
      </div>
    </Link>
  );
};

export default ModelCard;
