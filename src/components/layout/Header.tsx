import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useData } from '../../contexts/DataContext';
import useAuth from '../../hooks/useAuth';
import { PowerIcon, UserIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { pathname } = useLocation();
    const { data } = useData();
    const { user, signOut } = useAuth();
    const siteConfig = data?.siteConfig;

    // Support legacy session for now
    const hasLegacyAccess = sessionStorage.getItem('classroom_access') === 'granted';
    const isAuthenticated = !!user || hasLegacyAccess;
    const userRole = user?.app_metadata?.role || sessionStorage.getItem('classroom_role');

    const handleSignOut = async () => {
        await signOut();
        sessionStorage.clear();
        window.location.href = '/';
    };

    const navigation = [
        { name: 'Accueil', href: '/' },
        { name: 'L\'Agence', href: '/agence' },
        { name: 'Mannequins', href: '/mannequins' },
        { name: 'Perfect Fashion Day', href: '/fashion-day' },
        { name: 'Magazine', href: '/magazine' },
        { name: 'Contact', href: '/contact' },
    ];

    const isActive = (path: string) => {
        if (path === '/' && pathname !== '/') return false;
        return pathname.startsWith(path);
    };

    const getDashboardPath = (role: string | null) => {
        switch (role) {
            case 'admin': return '/admin';
            case 'student': return '/profil';
            case 'jury': return '/jury/casting';
            case 'registration': return '/enregistrement/casting';
            default: return '/';
        }
    };

    return (
        <header className="bg-black/90 backdrop-blur-md sticky top-0 z-40 border-b border-pm-gold/20">
            <nav className="container mx-auto px-6 py-4" aria-label="Global">
                <div className="flex items-center justify-between">
                    <div className="flex lg:flex-1">
                        <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
                            <span className="sr-only">{siteConfig?.siteName || 'Perfect Models'}</span>
                            <img 
                                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" 
                                src={siteConfig?.logoUrl || "https://i.ibb.co/fVBxPNTP/T-shirt.png"} 
                                alt="" 
                            />
                            <span className="font-playfair font-bold text-xl text-pm-gold hidden sm:block">
                                Perfect Models
                            </span>
                        </Link>
                    </div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden lg:flex lg:gap-x-8">
                        {navigation.map((item) => (
                            <Link 
                                key={item.name} 
                                to={item.href} 
                                className={`text-sm font-semibold leading-6 tracking-wide uppercase transition-colors duration-300 hover:text-pm-gold ${isActive(item.href) ? 'text-pm-gold border-b border-pm-gold' : 'text-white'}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex lg:flex-1 lg:justify-end gap-4 items-center">
                        <Link to="/contact?service=booking" className="hidden lg:block border border-pm-gold text-pm-gold px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-pm-gold hover:text-black transition-all">
                            Booker
                        </Link>
                        
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <Link to={getDashboardPath(userRole)} className="text-white hover:text-pm-gold transition-colors" title="Mon Espace">
                                    <UserIcon className="w-6 h-6" />
                                </Link>
                                <button onClick={handleSignOut} className="text-white hover:text-red-500 transition-colors" title="Déconnexion">
                                    <PowerIcon className="w-6 h-6" />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="text-sm font-semibold leading-6 text-white hover:text-pm-gold transition-colors">
                                Connexion <span aria-hidden="true">&rarr;</span>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 hover:text-white"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-expanded={isOpen ? "true" : "false"}
                            aria-controls="mobile-menu"
                        >
                            <span className="sr-only">Ouvrir le menu</span>
                            {isOpen ? (
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div id="mobile-menu" className="lg:hidden mt-4 pb-4 border-t border-gray-800">
                        <div className="space-y-1 px-2 pt-2 pb-3">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`block rounded-md px-3 py-2 text-base font-medium ${isActive(item.href) ? 'bg-gray-900 text-pm-gold' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                to="/contact?service=booking"
                                className="block rounded-md px-3 py-2 text-base font-medium text-pm-gold mt-4 border border-pm-gold/30 text-center"
                                onClick={() => setIsOpen(false)}
                            >
                                Booker un talent
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
