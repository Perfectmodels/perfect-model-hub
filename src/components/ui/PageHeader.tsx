import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    bgImage: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, bgImage }) => {
    return (
        <div
            className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url('${bgImage}')` }}
        >
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

            <div className="relative z-10 px-6 max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-playfair font-bold text-pm-gold mb-6"
                    style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                >
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <p className="text-xl md:text-2xl text-pm-off-white/90 font-light max-w-2xl mx-auto leading-relaxed">
                            {subtitle}
                        </p>
                        <div className="w-24 h-1 bg-pm-gold mx-auto mt-8 rounded-full" />
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default PageHeader;
