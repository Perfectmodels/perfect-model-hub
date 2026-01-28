import React from 'react';
import SEO from '../components/components/SEO';

const TermsOfUse: React.FC = () => {
    return (
        <div className="bg-black text-white min-h-screen py-20">
            <SEO title="Conditions d'Utilisation | Perfect Models" description="Conditions générales d'utilisation du site de l'agence Perfect Models." />
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl font-playfair font-bold text-pm-gold mb-8">Conditions d'Utilisation</h1>
                <div className="space-y-6 text-gray-300">
                    <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>
                    
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Acceptation des Conditions</h2>
                        <p>En accédant à ce site web, vous acceptez d'être lié par ces conditions d'utilisation, toutes les lois et réglementations applicables, et acceptez que vous êtes responsable du respect de toutes les lois locales applicables.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Licence d'Utilisation</h2>
                        <p>Il est permis de télécharger temporairement une copie des documents (information ou logiciel) sur le site web de Perfect Models pour une visualisation transitoire personnelle et non commerciale uniquement.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Droits à l'Image</h2>
                        <p>Tous les contenus visuels (photos, vidéos) présents sur ce site sont la propriété exclusive de Perfect Models et/ou des mannequins et photographes respectifs. Toute reproduction ou utilisation sans autorisation est strictement interdite.</p>
                    </section>

                    <p>Pour toute question concernant ces conditions, veuillez nous contacter.</p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfUse;
