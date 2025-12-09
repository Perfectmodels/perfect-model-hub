
import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import { BookingRequest } from '../../types';

/**
 * Props for the BookingForm component.
 */
interface BookingFormProps {
    prefilledModelName?: string; // Optional: Prefills the model name input.
    onSuccess?: () => void;      // Optional: Callback function to run on successful submission.
}

/**
 * A form for clients to book models. It captures client details, desired models, dates, and project information.
 */
const BookingForm: React.FC<BookingFormProps> = ({ prefilledModelName, onSuccess }) => {
    const { data, saveData } = useData(); // Hook to access and save application-wide data.
    
    // State for form fields.
    const [formData, setFormData] = useState({
        clientName: '',
        clientEmail: '',
        clientCompany: '',
        requestedModels: prefilledModelName || '',
        startDate: '',
        endDate: '',
        message: ''
    });

    // State for tracking form submission status.
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    // Effect to update the form if the prefilled model name changes.
    useEffect(() => {
        if (prefilledModelName) {
            setFormData(prev => ({ ...prev, requestedModels: prefilledModelName }));
        }
    }, [prefilledModelName]);

    // Updates form state on user input.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handles the form submission.
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setStatusMessage('');

        if (!data) {
            setStatus('error');
            setStatusMessage('Erreur: Impossible de charger les données.');
            return;
        }

        // Create a new booking request object.
        const newRequest: BookingRequest = {
            id: `booking-${Date.now()}`,
            submissionDate: new Date().toISOString(),
            status: 'Nouveau',
            ...formData
        };

        try {
            // Add the new request to the existing list and save.
            const updatedRequests = [...(data.bookingRequests || []), newRequest];
            await saveData({ ...data, bookingRequests: updatedRequests });

            setStatus('success');
            setStatusMessage('Demande de booking envoyée ! Notre équipe vous contactera prochainement.');
            // Reset form fields after successful submission.
            setFormData({
                clientName: '', clientEmail: '', clientCompany: '',
                requestedModels: prefilledModelName || '', startDate: '', endDate: '', message: ''
            });
            if (onSuccess) onSuccess(); // Trigger success callback if provided.
        } catch (error) {
            setStatus('error');
            setStatusMessage("Une erreur est survenue lors de l'envoi de votre demande.");
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label="Votre Nom Complet" name="clientName" value={formData.clientName} onChange={handleChange} required />
                <FormInput label="Votre Email" name="clientEmail" type="email" value={formData.clientEmail} onChange={handleChange} required />
            </div>
            <FormInput label="Société (optionnel)" name="clientCompany" value={formData.clientCompany} onChange={handleChange} />
            <FormInput 
                label="Mannequin(s) souhaité(s)" 
                name="requestedModels" 
                value={formData.requestedModels} 
                onChange={handleChange} 
                required 
                disabled={!!prefilledModelName}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label="Date de début (souhaitée)" name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
                <FormInput label="Date de fin (souhaitée)" name="endDate" type="date" value={formData.endDate} onChange={handleChange} />
            </div>
            <FormTextArea label="Message / Détails du projet" name="message" value={formData.message} onChange={handleChange} required />

            <div>
                <button type="submit" disabled={status === 'loading'} className="w-full px-8 py-3 bg-pm-gold text-pm-dark font-bold uppercase tracking-widest rounded-full transition-all hover:bg-white disabled:opacity-50">
                    {status === 'loading' ? 'Envoi...' : 'Envoyer la demande'}
                </button>
            </div>
            {statusMessage && (
                <p className={`text-center text-sm p-3 rounded-md ${status === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                    {statusMessage}
                </p>
            )}
        </form>
    );
};

/**
 * A reusable input component for the booking form.
 */
const FormInput: React.FC<{label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type?: string, required?: boolean, disabled?: boolean}> = (props) => (
    <div>
        <label htmlFor={props.name} className="admin-label">{props.label}</label>
        <input {...props} id={props.name} className="admin-input" />
    </div>
);

/**
 * A reusable textarea component for the booking form.
 */
const FormTextArea: React.FC<{label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, required?: boolean}> = (props) => (
    <div>
        <label htmlFor={props.name} className="admin-label">{props.label}</label>
        <textarea {...props} id={props.name} rows={5} className="admin-input admin-textarea" />
    </div>
);

export default BookingForm;
