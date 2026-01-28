import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPinIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import SEO from '../components/components/SEO';
import { useData } from '../contexts/DataContext';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../components/icons/SocialIcons';
import BookingForm from "../components/components/BookingForm";
import { ContactMessage } from '../types';
import PageHeader from '../components/ui/PageHeader';
import Section from '../components/ui/Section';
import PremiumButton from '../components/ui/PremiumButton';
import PremiumCard from '../components/ui/PremiumCard';

const Contact: React.FC = () => {
    const { data, saveData } = useData();
    const location = useLocation();
    const contactInfo = data?.contactInfo;
    const socialLinks = data?.socialLinks;
    
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');
    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const service = params.get('service');
        if (service) {
            setFormData(prev => ({ ...prev, subject: `Demande de devis pour : ${service}` }));
        }
    }, [location.search]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setStatusMessage('');

        if (!data) {
            setStatus('error');
            setStatusMessage('Erreur: Impossible de charger les données.');
            return;
        }

        const newContactMessage: ContactMessage = {
            id: `contact-${Date.now()}`,
            submissionDate: new Date().toISOString(),
            status: 'Nouveau',
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
        };

        try {
            const updatedMessages = [...(data.contactMessages || []), newContactMessage];
            await saveData({ ...data, contactMessages: updatedMessages });
            
            setStatus('success');
            setStatusMessage('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setStatus('error');
            setStatusMessage('Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.');
            console.error("Error saving contact message:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (!data) return null;

    return (
        <div className="bg-pm-dark text-pm-off-white min-h-screen">
            <SEO 
                title="Contact | Perfect Models Management"
                description="Contactez-nous pour toute demande de booking, de partenariat ou d'information."
                image={data.siteImages.about}
            />

            <PageHeader
                title="Contactez-nous"
                subtitle="Une question, un projet ou une collaboration ? Notre équipe est à votre écoute."
                bgImage={data.siteImages.hero}
            />

            <Section dark>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <PremiumCard className="p-10 h-full flex flex-col justify-center">
                            <h2 className="text-3xl font-playfair font-bold text-white mb-8">Nos Coordonnées</h2>

                            {contactInfo && (
                                <div className="space-y-8">
                                    <InfoItem icon={MapPinIcon} title="Adresse" text={contactInfo.address} />
                                    <InfoItem icon={PhoneIcon} title="Téléphone" text={contactInfo.phone} />
                                    <InfoItem icon={EnvelopeIcon} title="Email" text={contactInfo.email} href={`mailto:${contactInfo.email}`} />
                                </div>
                            )}

                            <div className="mt-12 pt-8 border-t border-white/10">
                                <h3 className="text-sm font-bold text-pm-gold uppercase tracking-widest mb-6">Suivez-nous</h3>
                                {socialLinks && (
                                    <div className="flex space-x-6">
                                        {socialLinks.facebook && <SocialLink href={socialLinks.facebook} icon={FacebookIcon} label="Facebook" />}
                                        {socialLinks.instagram && <SocialLink href={socialLinks.instagram} icon={InstagramIcon} label="Instagram" />}
                                        {socialLinks.youtube && <SocialLink href={socialLinks.youtube} icon={YoutubeIcon} label="YouTube" />}
                                    </div>
                                )}
                            </div>
                        </PremiumCard>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                         initial={{ opacity: 0, x: 50 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         transition={{ duration: 0.8 }}
                    >
                        <div className="p-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                            <h2 className="text-3xl font-playfair font-bold text-white mb-2">Envoyez un message</h2>
                            <p className="text-gray-400 mb-8">Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.</p>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput label="Nom complet" name="name" value={formData.name} onChange={handleChange} required />
                                    <FormInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <FormInput label="Sujet" name="subject" value={formData.subject} onChange={handleChange} required />
                                <FormTextArea label="Message" name="message" value={formData.message} onChange={handleChange} required />

                                <div className="pt-4">
                                    <PremiumButton
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full"
                                    >
                                        {status === 'loading' ? 'Envoi en cours...' : 'Envoyer le message'}
                                    </PremiumButton>
                                </div>

                                {statusMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`text-center text-sm p-4 rounded-lg border ${status === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}
                                    >
                                        {statusMessage}
                                    </motion.div>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            </Section>

            {/* Booking Section */}
            <Section bgImage={data.siteImages.castingBg}>
                <div className="max-w-5xl mx-auto">
                    <div className="bg-black/80 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-pm-gold/30 shadow-2xl">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">Demande de Booking</h2>
                            <p className="text-gray-300">
                                Vous souhaitez booker un ou plusieurs de nos mannequins pour un événement ou un projet ?
                            </p>
                        </div>
                        <BookingForm />
                    </div>
                </div>
            </Section>
        </div>
    );
};

const InfoItem: React.FC<{icon: React.ElementType, title: string, text: string, href?: string}> = ({ icon: Icon, title, text, href }) => (
    <div className="flex items-start gap-4 group">
        <div className="p-3 rounded-full bg-pm-gold/10 text-pm-gold group-hover:bg-pm-gold group-hover:text-pm-dark transition-colors duration-300">
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{title}</h4>
            {href ? (
                <a href={href} className="text-lg text-white hover:text-pm-gold transition-colors font-medium">
                    {text}
                </a>
            ) : (
                <span className="text-lg text-white font-medium">{text}</span>
            )}
        </div>
    </div>
);

const SocialLink: React.FC<{ href: string, icon: React.ElementType, label: string }> = ({ href, icon: Icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-pm-gold hover:text-pm-dark transition-all duration-300 hover:scale-110"
        title={label}
        aria-label={label}
    >
        <Icon className="w-6 h-6" />
    </a>
);

const FormInput: React.FC<{label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type?: string, required?: boolean}> = (props) => (
    <div className="group">
        <label htmlFor={props.name} className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 group-focus-within:text-pm-gold transition-colors">
            {props.label}
        </label>
        <input
            {...props}
            id={props.name}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-pm-gold focus:ring-1 focus:ring-pm-gold transition-all"
        />
    </div>
);

const FormTextArea: React.FC<{label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, required?: boolean}> = (props) => (
    <div className="group">
        <label htmlFor={props.name} className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 group-focus-within:text-pm-gold transition-colors">
            {props.label}
        </label>
        <textarea
            {...props}
            id={props.name}
            rows={5}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-pm-gold focus:ring-1 focus:ring-pm-gold transition-all resize-none"
        />
    </div>
);

export default Contact;
