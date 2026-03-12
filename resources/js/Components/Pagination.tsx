import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface LinkItem {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: LinkItem[];
    className?: string;
}

export default function Pagination({ links, className }: PaginationProps) {
    if (links.length <= 3) return null;

    return (
        <div className={cn("flex flex-wrap items-center justify-center gap-2", className)}>
            {links.map((link, i) => {
                if (link.url === null) {
                    return (
                        <span
                            key={i}
                            className="px-4 py-2 text-sm font-bold text-slate-300 border border-slate-100 rounded-xl cursor-not-allowed bg-slate-50/30"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                }

                return (
                    <Link
                        key={i}
                        href={link.url}
                        className={cn(
                            "px-4 py-2 text-sm font-bold transition-all rounded-xl border",
                            link.active 
                                ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100" 
                                : "bg-white border-slate-100 text-slate-500 hover:bg-slate-50 hover:border-indigo-100"
                        )}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                );
            })}
        </div>
    );
}
