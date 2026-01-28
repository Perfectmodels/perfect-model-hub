import React from 'react';
import { motion } from 'framer-motion';

interface PremiumCardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    onClick?: () => void;
}

const PremiumCard: React.FC<PremiumCardProps> = ({ children, className = "", delay = 0, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(212, 175, 55, 0.15)" }}
            onClick={onClick}
            className={`
                relative overflow-hidden rounded-2xl
                bg-white/5 backdrop-blur-md
                border border-white/10 hover:border-pm-gold/40
                transition-all duration-300 group
                ${className}
            `}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-pm-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export default PremiumCard;
