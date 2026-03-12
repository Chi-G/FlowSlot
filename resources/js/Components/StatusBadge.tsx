import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type Status = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'available' | 'reserved' | 'blocked' | 'active' | 'inactive';

interface StatusBadgeProps {
    status: Status;
    className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
    const styles: Record<Status, string> = {
        pending: 'bg-amber-50 text-amber-600 border-amber-100',
        confirmed: 'bg-indigo-50 text-indigo-600 border-indigo-100',
        completed: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        cancelled: 'bg-rose-50 text-rose-600 border-rose-100',
        available: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        reserved: 'bg-indigo-50 text-indigo-600 border-indigo-100',
        blocked: 'bg-slate-50 text-slate-600 border-slate-100',
        active: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        inactive: 'bg-slate-50 text-slate-600 border-slate-100',
    };

    return (
        <span className={cn(
            'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize transition-colors',
            styles[status],
            className
        )}>
            {status}
        </span>
    );
}
