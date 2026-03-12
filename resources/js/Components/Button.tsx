import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'success' | 'danger' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export default function Button({ 
    children, 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading,
    disabled,
    ...props 
}: ButtonProps) {
    const variants = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200',
        success: 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-100',
        danger: 'bg-rose-500 text-white hover:bg-rose-600 shadow-md shadow-rose-100',
        outline: 'border-2 border-slate-200 bg-transparent text-slate-600 hover:border-indigo-600 hover:text-indigo-600',
        ghost: 'bg-transparent text-slate-500 hover:bg-slate-100',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-6 py-2.5 text-sm',
        lg: 'px-8 py-3.5 text-base',
    };

    return (
        <button
            disabled={disabled || isLoading}
            className={cn(
                'inline-flex items-center justify-center rounded-xl font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {isLoading ? (
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : null}
            {children}
        </button>
    );
}
