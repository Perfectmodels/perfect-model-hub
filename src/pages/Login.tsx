import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LockClosedIcon, UserIcon, XMarkIcon, PhoneIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import SEO from '../components/components/SEO';
import { useData } from '../contexts/DataContext';
import { RecoveryRequest } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import PremiumButton from '../components/ui/PremiumButton';

interface ActiveUser {
  name: string;
  role: string;
  loginTime: number;
}

const updateUserActivity = (name: string, role: string) => {
    const now = Date.now();
    const fifteenMinutes = 15 * 60 * 1000;
    const currentActivityJSON = localStorage.getItem('pmm_active_users');
    let activeUsers: ActiveUser[] = currentActivityJSON ? JSON.parse(currentActivityJSON) : [];
    activeUsers = activeUsers.filter(user => user.name !== name);
    activeUsers.push({ name, role, loginTime: now });
    activeUsers = activeUsers.filter(user => (now - user.loginTime) < fifteenMinutes);
    localStorage.setItem('pmm_active_users', JSON.stringify(activeUsers));
};


const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRecoveryModalOpen, setIsRecoveryModalOpen] = useState(false);
  const navigate = useNavigate();
  const { data, isInitialized, saveData } = useData();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isInitialized || !data) {
        setError('Service indisponible. Veuillez réessayer dans un instant.');
        return;
    }

    const normalizedUsername = username.toLowerCase().trim();
    const isEmail = normalizedUsername.includes('@');

    // Attempt Supabase Authentication if it looks like an email
    if (isEmail) {
      try {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: normalizedUsername,
          password: password,
        });

        if (authError) throw authError;

        if (authData.user) {
          const role = authData.user.app_metadata?.role || authData.user.user_metadata?.role || 'student';
          sessionStorage.setItem('classroom_access', 'granted');
          sessionStorage.setItem('classroom_role', role);
          sessionStorage.setItem('userId', authData.user.id);
          sessionStorage.setItem('userName', authData.user.user_metadata?.name || authData.user.email || '');

          const pathMap = {
            admin: '/admin',
            student: '/profil',
            jury: '/jury/casting',
            registration: '/enregistrement/casting'
          };
          
          navigate((pathMap as any)[role] || '/');
          return;
        }
      } catch (err: any) {
        setError(err.message || 'Erreur d\'authentification Supabase.');
        return;
      }
    }

    // Legacy Authentication Fallback
    const timestamp = new Date().toISOString();
    const users = [
        { type: 'admin', user: { name: 'Directeur', username: 'admin', password: 'admin2025' }, path: '/admin' },
        { type: 'admin', user: { name: 'Administration', username: 'contact@perfectmodels.ga', password: 'pmm2025@' }, path: '/admin' },
        ...data.models.map(m => ({ type: 'student', user: m, path: '/profil' })),
        ...data.juryMembers.map(j => ({ type: 'jury', user: j, path: '/jury/casting' })),
        ...data.registrationStaff.map(s => ({ type: 'registration', user: s, path: '/enregistrement/casting' })),
    ];

    const foundUser = users.find(u => 
        (
            ('username' in u.user && u.user.username?.toLowerCase() === normalizedUsername) || 
            u.user.name.toLowerCase() === normalizedUsername
        ) && u.user.password === password
    );

    if (foundUser) {
        sessionStorage.setItem('classroom_access', 'granted');
        sessionStorage.setItem('classroom_role', foundUser.type);
        sessionStorage.setItem('userId', (foundUser.user as any).id);
        sessionStorage.setItem('userName', foundUser.user.name);
        
        updateUserActivity(foundUser.user.name, foundUser.type);

        if (foundUser.type === 'student') {
            const listKey = 'models';
            const updatedList = (data as any)[listKey].map((item: any) => 
                item.id === (foundUser.user as any).id ? { ...item, lastLogin: timestamp } : item
            );
            await saveData({ ...data, [listKey]: updatedList });
        }
        
        navigate(foundUser.path);
        return;
    }

    setError('Identifiant ou mot de passe incorrect.');
    setPassword('');
  };

  const handleSubmitRecovery = async (modelName: string, phone: string) => {
    if (!data) return;
    const newRequest: RecoveryRequest = {
      id: Date.now().toString(), modelName, phone, timestamp: new Date().toISOString(), status: 'Nouveau',
    };
    const updatedRequests = [...(data.recoveryRequests || []), newRequest];
    await saveData({ ...data, recoveryRequests: updatedRequests });
    setIsRecoveryModalOpen(false);
    alert('Votre demande a été envoyée. Vous serez contacté prochainement.');
  };

  return (
    <>
      <SEO title="Accès Privé | Perfect Models Management" noIndex />
      <div 
        className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden"
      >
        {/* Background */}
        <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${data?.siteImages.castingBg})` }}
        />
        <div className="absolute inset-0 bg-pm-dark/80 backdrop-blur-sm" />

        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-full max-w-md"
        >
          <div className="bg-black/60 border border-pm-gold/20 p-8 md:p-10 rounded-2xl shadow-2xl backdrop-blur-md">
            <div className="text-center mb-10">
                <Link to="/" className="inline-block mb-6 transition-transform hover:scale-110">
                    <img
                        src={data?.siteConfig.logo}
                        alt="PMM Logo"
                        className="h-20 w-auto rounded-full border-2 border-pm-gold p-1 bg-black"
                    />
                </Link>
                <h1 className="text-3xl font-playfair font-bold text-pm-gold mb-2">Espace Membre</h1>
                <p className="text-gray-400 text-sm">
                  Connectez-vous pour accéder à votre tableau de bord.
                </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                    <div className="relative group">
                        <UserIcon className="h-5 w-5 text-gray-500 absolute top-1/2 left-4 transform -translate-y-1/2 group-focus-within:text-pm-gold transition-colors" />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => { setUsername(e.target.value); setError(''); }}
                            placeholder="Identifiant ou Email"
                            className="w-full bg-black/40 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder-gray-600 focus:outline-none focus:border-pm-gold focus:ring-1 focus:ring-pm-gold transition-all"
                            required
                        />
                    </div>
                    <div className="relative group">
                        <LockClosedIcon className="h-5 w-5 text-gray-500 absolute top-1/2 left-4 transform -translate-y-1/2 group-focus-within:text-pm-gold transition-colors" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(''); }}
                            placeholder="Mot de passe"
                            className="w-full bg-black/40 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder-gray-600 focus:outline-none focus:border-pm-gold focus:ring-1 focus:ring-pm-gold transition-all"
                            required
                        />
                    </div>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 p-3 rounded-lg"
                    >
                        {error}
                    </motion.div>
                )}

                <PremiumButton
                    type="submit"
                    disabled={!isInitialized}
                    className="w-full"
                    size="lg"
                >
                    {isInitialized ? 'Se connecter' : 'Chargement...'}
                </PremiumButton>
            </form>

            <div className="mt-8 text-center border-t border-white/10 pt-6">
              <button
                onClick={() => setIsRecoveryModalOpen(true)}
                className="text-sm text-gray-500 hover:text-pm-gold transition-colors"
              >
                Mot de passe oublié ?
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recovery Modal */}
      <AnimatePresence>
        {isRecoveryModalOpen && (
            <RecoveryModal onClose={() => setIsRecoveryModalOpen(false)} onSubmit={handleSubmitRecovery} />
        )}
      </AnimatePresence>
    </>
  );
};

const RecoveryModal: React.FC<{onClose: () => void, onSubmit: (name: string, phone: string) => void}> = ({ onClose, onSubmit }) => {
  const [modelName, setModelName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(modelName, phone);
  };

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-pm-dark border border-pm-gold/30 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-playfair font-bold text-pm-gold">Récupération de Compte</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          <p className="text-sm text-gray-300 mb-8 leading-relaxed">
            Veuillez renseigner votre nom et votre numéro de téléphone. Notre équipe vous contactera pour réinitialiser vos accès.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative group">
                <UserIcon className="h-5 w-5 text-gray-500 absolute top-1/2 left-4 transform -translate-y-1/2 group-focus-within:text-pm-gold transition-colors" />
                <input
                    type="text"
                    value={modelName}
                    onChange={e => setModelName(e.target.value)}
                    placeholder="Votre nom complet"
                    className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:border-pm-gold focus:outline-none transition-colors"
                    required
                />
            </div>
            <div className="relative group">
                <PhoneIcon className="h-5 w-5 text-gray-500 absolute top-1/2 left-4 transform -translate-y-1/2 group-focus-within:text-pm-gold transition-colors" />
                <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="Votre numéro de téléphone"
                    className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:border-pm-gold focus:outline-none transition-colors"
                    required
                />
            </div>
            <PremiumButton type="submit" className="w-full mt-4">
              Envoyer la demande
            </PremiumButton>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
