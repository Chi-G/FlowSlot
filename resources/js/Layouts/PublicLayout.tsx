import React, { ReactNode } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckCircle2, Menu, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Props {
    children: ReactNode;
    title?: string;
}

export default function PublicLayout({ children, title }: Props) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Head title={title ? `${title} | FlowSlot` : 'FlowSlot - Smart Booking'} />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/20 bg-white/40 backdrop-blur-2xl">
                <div className="mx-auto max-w-[1800px] px-6 sm:px-12 lg:px-20">
                    <div className="flex h-16 justify-between items-center">
                        <Link href="/" className="flex items-center gap-3 group">
                            <ApplicationLogo className="h-10 w-auto rounded-lg shadow-sm transition-transform group-hover:scale-105" />
                            <span className="text-xl font-bold tracking-tight text-slate-900">
                                Flow<span className="text-indigo-600">Slot</span>
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">                           
                            <Link 
                                href={route('services')} 
                                className={cn(
                                    "text-sm font-medium transition-colors",
                                    usePage().url.startsWith('/services') ? "text-indigo-600 font-bold" : "text-slate-600 hover:text-indigo-600"
                                )}
                            >
                                Services
                            </Link>
                            <Link href={route('login')} className="rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-all shadow-md active:scale-95">
                                Admin Portal
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button 
                            className="md:hidden p-2 text-slate-600"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Nav */}
                <motion.div 
                    initial={false}
                    animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                    className="md:hidden overflow-hidden border-t border-slate-100 bg-white"
                >
                    <div className="flex flex-col gap-4 p-4">
                        <Link href="/" className="text-lg font-medium text-slate-600">Home</Link>
                        <Link href={route('services')} className="text-lg font-medium text-slate-600">Services</Link>
                        <Link href={route('login')} className="rounded-lg bg-indigo-600 p-3 text-center text-white font-semibold">Admin Portal</Link>
                    </div>
                </motion.div>
            </nav>

            {/* Main Content */}
            <main className="pt-16">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={usePage().url}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}
