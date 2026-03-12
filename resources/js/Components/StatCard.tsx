import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: string;
        isPositive: boolean;
    };
    description?: string;
    color?: string;
}

export default function StatCard({ 
    title, 
    value, 
    icon: Icon, 
    trend, 
    description,
    color = 'indigo'
}: StatCardProps) {
    const colorClasses = {
        indigo: 'bg-indigo-50 text-indigo-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        rose: 'bg-rose-50 text-rose-600',
        amber: 'bg-amber-50 text-amber-600',
    };

    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">{title}</p>
                    <h3 className="mt-1 text-3xl font-bold text-slate-900">{value}</h3>
                </div>
                <div className={cn("p-3 rounded-xl", colorClasses[color as keyof typeof colorClasses])}>
                    <Icon size={24} />
                </div>
            </div>

            {(trend || description) && (
                <div className="mt-4 flex items-center gap-2">
                    {trend && (
                        <div className={cn(
                            "flex items-center gap-1 text-xs font-bold",
                            trend.isPositive ? "text-emerald-600" : "text-rose-600"
                        )}>
                            {trend.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            {trend.value}
                        </div>
                    )}
                    {description && (
                        <p className="text-xs text-slate-400 font-medium">{description}</p>
                    )}
                </div>
            )}
        </div>
    );
}
