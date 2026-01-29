import React, { useState, useEffect, useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import { FashionDayApplication } from '../types';
import SEO from '../components/components/SEO';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, TrashIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';

const AdminFashionDay: React.FC = () => {
    const { data, saveData, isInitialized } = useData();
    const [localApps, setLocalApps] = useState<FashionDayApplication[]>([]);
    const [filter, setFilter] = useState<FashionDayApplication['status'] | 'Toutes'>('Toutes');
    const [selectedApp, setSelectedApp] = useState<FashionDayApplication | null>(null);

    useEffect(() => {
        if (data?.fashionDayApplications) {
            setLocalApps([...data.fashionDayApplications].sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()));
        }
    }, [data?.fashionDayApplications, isInitialized]);
    
    const filteredApps = useMemo(() => {
        if (filter === 'Toutes') return localApps;
        return localApps.filter(app => app.status === filter);
    }, [filter, localApps]);

    const handleDelete = async (appId: string) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette candidature ?")) {
            if (!data) return;
            const updatedApps = localApps.filter(app => app.id !== appId);
            await saveData({ ...data, fashionDayApplications: updatedApps });
        }
    };

    const handleUpdateStatus = async (appId: string, newStatus: FashionDayApplication['status']) => {
        if (!data) return;
        const updatedApps = localApps.map(app => app.id === appId ? { ...app, status: newStatus } : app);
        await saveData({ ...data, fashionDayApplications: updatedApps });
        if (selectedApp?.id === appId) {
            setSelectedApp({ ...selectedApp, status: newStatus });
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Nouveau': return 'bg-blue-500/20 text-blue-300 border-blue-500';
            case 'En attente': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500';
            case 'Accepté': return 'bg-green-500/20 text-green-300 border-green-500';
            case 'Refusé': return 'bg-red-500/20 text-red-300 border-red-500';
            default: return 'bg-gray-500/20 text-gray-300';
        }
    }

    const statusOptions: Array<FashionDayApplication['status'] | 'Toutes'> = ['Toutes', 'Nouveau', 'En attente', 'Accepté', 'Refusé'];

    return (
        <>
        <div className="bg-black text-white py-20 min-h-screen">
            <SEO title="Admin - Fashion Day" noIndex />
            <div className="container mx-auto px-6">
                <Link to="/admin" className="inline-flex items-center gap-2 text-pm-gold mb-4 hover:underline">
                    <ChevronLeftIcon className="w-5 h-5" />
                    Retour au Tableau de Bord
                </Link>
                <h1 className="text-4xl font-playfair text-pm-gold mb-8">Candidatures Fashion Day</h1>

                <div className="flex flex-wrap items-center gap-4 mb-8">
                    {statusOptions.map(f => (
                        <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 text-sm uppercase tracking-wider rounded-full transition-all ${filter === f ? 'bg-pm-gold text-pm-dark' : 'bg-transparent border border-pm-gold text-pm-gold hover:bg-pm-gold/20'}`}>
                            {f}
                        </button>
                    ))}
                </div>

                <div className="bg-gray-900 border border-pm-gold/20 rounded-lg overflow-hidden shadow-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-black/50">
                                <tr className="border-b border-pm-gold/20">
                                    <th className="p-4 uppercase text-xs tracking-wider">Nom</th>
                                    <th className="p-4 uppercase text-xs tracking-wider">Rôle</th>
                                    <th className="p-4 uppercase text-xs tracking-wider hidden sm:table-cell">Email</th>
                                    <th className="p-4 uppercase text-xs tracking-wider">Statut</th>
                                    <th className="p-4 uppercase text-xs tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredApps.map(app => (
                                    <tr key={app.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                                        <td className="p-4 font-semibold">{app.name}</td>
                                        <td className="p-4">{app.role}</td>
                                        <td className="p-4 hidden sm:table-cell">{app.email}</td>
                                        <td className="p-4"><span className={`px-2 py-1 text-xs font-bold rounded-full border ${getStatusColor(app.status)}`}>{app.status}</span></td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-4">
                                                <button onClick={() => setSelectedApp(app)} className="text-pm-gold/70 hover:text-pm-gold"><EyeIcon className="w-5 h-5"/></button>
                                                <button onClick={() => handleDelete(app.id)} className="text-red-500/70 hover:text-red-500"><TrashIcon className="w-5 h-5"/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredApps.length === 0 && <p className="text-center p-8 text-gray-500">Aucune candidature trouvée.</p>}
                    </div>
                </div>
            </div>
        </div>
        {selectedApp && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                 <div className="bg-gray-900 border border-pm-gold/30 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                    <header className="p-4 flex justify-between items-center border-b border-pm-gold/20">
                        <h2 className="text-2xl font-playfair text-pm-gold">Candidature de {selectedApp.name}</h2>
                        <button onClick={() => setSelectedApp(null)} className="text-gray-400 hover:text-white"><XMarkIcon className="w-6 h-6"/></button>
                    </header>
                    <main className="p-6 overflow-y-auto space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                             <div><strong className="text-gray-500 block text-xs uppercase">Nom</strong> {selectedApp.name}</div>
                             <div><strong className="text-gray-500 block text-xs uppercase">Rôle</strong> {selectedApp.role}</div>
                             <div><strong className="text-gray-500 block text-xs uppercase">Email</strong> {selectedApp.email}</div>
                             <div><strong className="text-gray-500 block text-xs uppercase">Téléphone</strong> {selectedApp.phone}</div>
                             <div className="col-span-2"><strong className="text-gray-500 block text-xs uppercase">Message</strong> <p className="bg-black/30 p-4 rounded mt-1">{selectedApp.message}</p></div>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-800">
                            <strong className="text-gray-500 block text-xs uppercase mb-2">Changer le statut</strong>
                            <div className="flex items-center gap-2 flex-wrap">
                                {statusOptions.filter(s => s !== 'Toutes').map(status => (
                                    <button key={status} onClick={() => handleUpdateStatus(selectedApp.id, status)} className={`px-2 py-1 text-xs font-bold rounded-full border transition-all ${selectedApp.status === status ? getStatusColor(status) : 'border-gray-600 text-gray-400 hover:bg-gray-800'}`}>
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </main>
                 </div>
            </div>
        )}
        </>
    );
};

export default AdminFashionDay;
