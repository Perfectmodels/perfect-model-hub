import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface PremiumButtonProps {
    children: React.ReactNode;
    to?: string;
    onClick?: () => void;
    variant?: 'primary' | 'outline' | 'ghost';
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const PremiumButton: React.FC<PremiumButtonProps> = ({
    children,
    to,
    onClick,
    variant = 'primary',
    className = "",
    size = 'md',
    type = 'button',
    disabled = false
}) => {
    const baseClasses = "inline-flex items-center justify-center font-bold uppercase tracking-widest transition-all duration-300 rounded-full";

    const variants = {
        primary: "bg-pm-gold text-pm-dark hover:bg-white hover:scale-105 shadow-lg shadow-pm-gold/20",
        outline: "border-2 border-pm-gold text-pm-gold hover:bg-pm-gold hover:text-pm-dark hover:scale-105",
        ghost: "text-pm-gold hover:text-white hover:bg-white/10"
    };

    const sizes = {
        sm: "px-6 py-2 text-xs",
        md: "px-8 py-3 text-sm",
        lg: "px-10 py-4 text-sm md:text-base"
    };

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : ''} ${className}`;

    if (to) {
        return (
            <Link to={to} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <motion.button
            type={type}
            onClick={onClick}
            className={classes}
            disabled={disabled}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.button>
    );
};

export default PremiumButton;
