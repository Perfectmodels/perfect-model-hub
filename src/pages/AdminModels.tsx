import React, { useState, useEffect, useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import { Model } from '../types';
import SEO from '../components/components/SEO';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, TrashIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const AdminModels: React.FC = () => {
    const { data, saveData, isInitialized } = useData();
    const [localModels, setLocalModels] = useState<Model[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (data?.models) {
            setLocalModels([...data.models]);
        }
    }, [data?.models, isInitialized]);

    const filteredModels = useMemo(() => {
        return localModels.filter(model => 
            model.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            (model.username && model.username.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [searchTerm, localModels]);

    const handleDelete = async (modelId: string) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce mannequin ? Cette action est irréversible.")) {
            if (!data) return;
            const updatedModels = localModels.filter(m => m.id !== modelId);
            await saveData({ ...data, models: updatedModels });
        }
    };

    const toggleVisibility = async (model: Model) => {
        if (!data) return;
        const updatedModel = { ...model, isPublic: !model.isPublic };
        const updatedModels = localModels.map(m => m.id === model.id ? updatedModel : m);
        await saveData({ ...data, models: updatedModels });
    };

    return (
        <div className="bg-black text-white py-20 min-h-screen">
            <SEO title="Admin - Gestion des Mannequins" noIndex />
            <div className="container mx-auto px-6">
                <Link to="/admin" className="inline-flex items-center gap-2 text-pm-gold mb-4 hover:underline">
                    <ChevronLeftIcon className="w-5 h-5" />
                    Retour au Tableau de Bord
                </Link>
                <div className="flex justify-between items-center mb-8">
                     <h1 className="text-4xl font-playfair text-pm-gold">Gestion des Mannequins</h1>
                     <Link to="/enregistrement/casting" className="bg-pm-gold text-pm-dark px-4 py-2 rounded-full font-bold uppercase text-xs hover:bg-white transition-colors">
                        Ajouter un mannequin
                     </Link>
                </div>

                <div className="mb-8">
                    <input 
                        type="text" 
                        placeholder="Rechercher par nom..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-1/3 bg-gray-900 border border-gray-700 rounded-full px-4 py-2 focus:outline-none focus:border-pm-gold transition-colors"
                    />
                </div>

                <div className="bg-gray-900 border border-pm-gold/20 rounded-lg overflow-hidden shadow-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-black/50">
                                <tr className="border-b border-pm-gold/20">
                                    <th className="p-4 uppercase text-xs tracking-wider">Nom</th>
                                    <th className="p-4 uppercase text-xs tracking-wider hidden sm:table-cell">Email</th>
                                    <th className="p-4 uppercase text-xs tracking-wider hidden sm:table-cell">Taille</th>
                                    <th className="p-4 uppercase text-xs tracking-wider">Visibilité</th>
                                    <th className="p-4 uppercase text-xs tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredModels.map(model => (
                                    <tr key={model.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                                        <td className="p-4 font-semibold flex items-center gap-3">
                                            <img src={model.imageUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
                                            {model.name}
                                        </td>
                                        <td className="p-4 hidden sm:table-cell text-gray-400">{model.email}</td>
                                        <td className="p-4 hidden sm:table-cell">{model.height}</td>
                                        <td className="p-4">
                                            <button onClick={() => toggleVisibility(model)} className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-bold border transition-colors ${model.isPublic ? 'bg-green-500/20 text-green-300 border-green-500' : 'bg-gray-700 text-gray-400 border-gray-600'}`}>
                                                {model.isPublic ? <EyeIcon className="w-3 h-3"/> : <EyeSlashIcon className="w-3 h-3"/>}
                                                {model.isPublic ? 'Public' : 'Privé'}
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-3">
                                                <Link to={`/mannequins/${model.id}`} target="_blank" className="text-gray-400 hover:text-white" title="Voir le profil"><EyeIcon className="w-5 h-5"/></Link>
                                                <button onClick={() => handleDelete(model.id)} className="text-red-500/70 hover:text-red-500" title="Supprimer"><TrashIcon className="w-5 h-5"/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredModels.length === 0 && <p className="text-center p-8 text-gray-500">Aucun mannequin trouvé.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminModels;
