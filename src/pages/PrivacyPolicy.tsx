import React from 'react';
import SEO from '../components/components/SEO';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="bg-black text-white min-h-screen py-20">
            <SEO title="Politique de Confidentialité | Perfect Models" description="Politique de confidentialité et protection des données de l'agence Perfect Models." />
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl font-playfair font-bold text-pm-gold mb-8">Politique de Confidentialité</h1>
                <div className="space-y-6 text-gray-300">
                    <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>
                    
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Collecte des Informations</h2>
                        <p>Nous collectons des informations lorsque vous utilisez notre site, notamment lors de votre inscription, de vos candidatures aux castings, ou lors de l'utilisation de nos formulaires de contact. Les informations collectées incluent votre nom, adresse e-mail, numéro de téléphone, et mensurations pour les mannequins.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Utilisation des Informations</h2>
                        <p>Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
                            <li>Améliorer notre site Web</li>
                            <li>Améliorer le service client et vos besoins de prise en charge</li>
                            <li>Vous contacter par e-mail ou téléphone concernant votre candidature ou demande</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Protection des Informations</h2>
                        <p>Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage de pointe pour protéger les informations sensibles transmises en ligne. Seuls les employés qui ont besoin d’effectuer un travail spécifique (par exemple, la facturation ou le service client) ont accès aux informations personnelles identifiables.</p>
                    </section>
                    
                    <p>Pour toute question concernant cette politique, veuillez nous contacter.</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
