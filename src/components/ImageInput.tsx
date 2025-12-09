import React from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';

/**
 * Props for the ImageInput component.
 */
interface ImageInputProps {
    label: string;          // The label to display for the input field.
    value: string;          // The current URL of the image.
    onChange: (value: string) => void; // Callback function to handle URL changes.
}

/**
 * A component for inputting an image URL with a preview.
 * It includes a text input for the URL and a designated area to show the image.
 */
const ImageInput: React.FC<ImageInputProps> = ({ label, value, onChange }) => {

    // Handles changes to the input field and updates the parent component's state.
    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div>
            <label className="admin-label">{label}</label>
            <div className="flex items-center gap-4">
                {/* Image preview section */}
                <div className="w-24 h-24 flex-shrink-0 bg-black border border-pm-off-white/20 rounded-md flex items-center justify-center">
                    {value ? (
                        <img src={value} alt="Prévisualisation" className="w-full h-full object-cover rounded-md" />
                    ) : (
                        <PhotoIcon className="w-10 h-10 text-pm-off-white/30" />
                    )}
                </div>
                {/* Input for the image URL */}
                <div className="flex-grow">
                    <input
                        type="text"
                        value={value}
                        onChange={handleUrlChange}
                        placeholder="Coller l'URL de l'image ici"
                        className="admin-input"
                    />
                    <p className="text-xs text-pm-off-white/60 mt-1">
                        Utilisez un service d'hébergement d'images comme <a href="https://ibb.co/" target="_blank" rel="noopener noreferrer" className="underline text-pm-gold">ibb.co</a> ou <a href="https://postimages.org/" target="_blank" rel="noopener noreferrer" className="underline text-pm-gold">Postimages</a> pour obtenir une URL.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ImageInput;
