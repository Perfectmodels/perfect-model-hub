import React, { useState, useCallback, useRef } from 'react';
import { ArrowUpTrayIcon, ArrowPathIcon, DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { uploadFile } from '@/utils/storage';

interface FileUploaderProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    folder?: string;
    accept?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({ 
    label, 
    value, 
    onChange, 
    folder = 'documents',
    accept = '.pdf,.doc,.docx'
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = useCallback(async (file: File) => {
        setIsLoading(true);
        setError(null);

        try {
            const publicUrl = await uploadFile(file, 'documents', folder);
            onChange(publicUrl);
        } catch (err: any) {
            setError(err.message || "Une erreur est survenue lors de l'upload sur Supabase.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [onChange, folder]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleUpload(file);
        }
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleClear = () => {
        onChange('');
    };

    const getFileName = (url: string) => {
        if (!url) return '';
        const parts = url.split('/');
        return decodeURIComponent(parts[parts.length - 1]);
    };

    return (
        <div className="space-y-2">
            <label className="admin-label">{label}</label>
            <div className="flex items-center gap-4">
                <div className="flex-grow relative">
                    {value ? (
                        <div className="flex items-center justify-between bg-pm-dark/50 border border-pm-gold/30 rounded-lg px-4 py-3">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <DocumentIcon className="w-5 h-5 text-pm-gold flex-shrink-0" />
                                <span className="text-sm text-pm-off-white truncate" title={getFileName(value)}>
                                    {getFileName(value)}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <a 
                                    href={value} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-xs text-pm-gold hover:underline"
                                >
                                    Voir
                                </a>
                                <button 
                                    onClick={handleClear}
                                    className="p-1 hover:bg-white/10 rounded-full text-pm-off-white/70 hover:text-red-400 transition-colors"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={triggerFileSelect}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-pm-dark/50 border-2 border-dashed border-pm-off-white/20 rounded-lg px-4 py-6 hover:border-pm-gold/50 transition-colors group"
                        >
                            {isLoading ? (
                                <>
                                    <ArrowPathIcon className="w-6 h-6 text-pm-gold animate-spin" />
                                    <span className="text-pm-off-white/70">Envoi en cours...</span>
                                </>
                            ) : (
                                <>
                                    <ArrowUpTrayIcon className="w-6 h-6 text-pm-off-white/40 group-hover:text-pm-gold transition-colors" />
                                    <span className="text-pm-off-white/70 group-hover:text-pm-off-white transition-colors">
                                        Cliquez pour téléverser un document ({accept})
                                    </span>
                                </>
                            )}
                        </button>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept={accept}
                        className="hidden"
                    />
                </div>
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
    );
};

export default FileUploader;
