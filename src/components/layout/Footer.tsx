import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../components/SocialIcons';

const Footer: React.FC = () => {
    const { data } = useData();
    const currentYear = new Date().getFullYear();
    const contactInfo = data?.contactInfo;
    const socialLinks = data?.socialLinks;

    return (
        <footer className="bg-black border-t border-pm-gold/20 pt-16 pb-8 text-pm-off-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <span className="font-playfair font-bold text-2xl text-pm-gold">Perfect Models</span>
                        </Link>
                        <p className="text-sm opacity-70 leading-relaxed mb-6">
                            L'agence de référence au Gabon. Révélateur de talents, créateur d'opportunités et promoteur de l'excellence africaine.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks?.facebook && <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pm-gold transition-colors" title="Facebook" aria-label="Suivez-nous sur Facebook"><FacebookIcon className="w-5 h-5" /></a>}
                            {socialLinks?.instagram && <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pm-gold transition-colors" title="Instagram" aria-label="Suivez-nous sur Instagram"><InstagramIcon className="w-5 h-5" /></a>}
                            {socialLinks?.youtube && <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pm-gold transition-colors" title="YouTube" aria-label="Suivez-nous sur YouTube"><YoutubeIcon className="w-5 h-5" /></a>}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-playfair text-lg text-pm-gold mb-6">Navigation</h3>
                        <ul className="space-y-3 text-sm opacity-80">
                            <li><Link to="/agence" className="hover:text-pm-gold transition-colors">L'Agence</Link></li>
                            <li><Link to="/mannequins" className="hover:text-pm-gold transition-colors">Nos Mannequins</Link></li>
                            <li><Link to="/fashion-day" className="hover:text-pm-gold transition-colors">Perfect Fashion Day</Link></li>
                            <li><Link to="/magazine" className="hover:text-pm-gold transition-colors">Magazine</Link></li>
                            <li><Link to="/services" className="hover:text-pm-gold transition-colors">Nos Services</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-playfair text-lg text-pm-gold mb-6">Informations</h3>
                        <ul className="space-y-3 text-sm opacity-80">
                            <li><Link to="/contact" className="hover:text-pm-gold transition-colors">Contact & Booking</Link></li>
                            <li><Link to="/casting" className="hover:text-pm-gold transition-colors">Devenir Mannequin</Link></li>
                            <li><Link to="/privacy-policy" className="hover:text-pm-gold transition-colors">Politique de Confidentialité</Link></li>
                            <li><Link to="/terms-of-use" className="hover:text-pm-gold transition-colors">Conditions d'Utilisation</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                         <h3 className="font-playfair text-lg text-pm-gold mb-6">Nous Contacter</h3>
                         {contactInfo && (
                             <ul className="space-y-3 text-sm opacity-80">
                                 <li>{contactInfo.address}</li>
                                 <li><a href={`tel:${contactInfo.phone}`} className="hover:text-pm-gold">{contactInfo.phone}</a></li>
                                 <li><a href={`mailto:${contactInfo.email}`} className="hover:text-pm-gold">{contactInfo.email}</a></li>
                             </ul>
                         )}
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-xs opacity-50">
                    <p>&copy; {currentYear} Perfect Models Management. Tous droits réservés. - Designed with passion.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
