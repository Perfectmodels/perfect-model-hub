import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    bgImage?: string;
    dark?: boolean;
    id?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = "", bgImage, dark = false, id }) => {
    if (bgImage) {
        return (
            <section
                id={id}
                className={`relative py-20 lg:py-32 bg-cover bg-center bg-fixed overflow-hidden ${className}`}
                style={{ backgroundImage: `url('${bgImage}')` }}
            >
                <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
                <div className="container relative z-10 mx-auto px-6">
                    {children}
                </div>
            </section>
        );
    }

    return (
        <section
            id={id}
            className={`
                relative py-20 lg:py-32 overflow-hidden
                ${dark ? 'bg-pm-dark' : 'bg-black'}
                ${className}
            `}
        >
            <div className="container relative z-10 mx-auto px-6">
                {children}
            </div>
        </section>
    );
};

export default Section;
