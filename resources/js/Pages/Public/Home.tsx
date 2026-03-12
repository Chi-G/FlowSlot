import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion } from 'framer-motion';
import { 
    Calendar, Shield, Zap, Bell, Globe, 
    ArrowRight, CheckCircle2, Search,
    Link as LinkIcon, Lock, Sparkles, Activity
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import Button from '@/Components/Button';

const DotGrid = () => (
    <div className="absolute inset-0 z-0 opacity-[0.4] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
    </div>
);

const ServiceCard = ({ icon: Icon, title, description, badge, delay, position }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay, duration: 0.8, ease: "easeOut" }}
        whileHover={{ y: -5, scale: 1.02 }}
        className={`absolute hidden xl:flex flex-col gap-3 p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.04)] w-64 z-20 ${position}`}
    >
        <div className="flex items-center justify-between">
            <div className="h-10 w-10 rounded-xl bg-indigo-600/5 text-indigo-600 flex items-center justify-center">
                <Icon size={20} />
            </div>
            {badge && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase tracking-widest">
                    {badge}
                </span>
            )}
        </div>
        <div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">{title}</h4>
            <p className="text-[11px] font-medium text-slate-400 leading-relaxed">{description}</p>
        </div>
    </motion.div>
);

export default function Home() {
    return (
        <PublicLayout title="Enterprise Scheduling, Simplified">
            <div className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-white flex items-center justify-center py-20">
                <DotGrid />

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-12 border border-slate-100"
                    >
                        <Sparkles size={12} className="text-indigo-500" />
                        <span>FlowSlot v1.0.0 — The Intelligent Booking Infrastructure</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-8"
                    >
                        Enterprise Scheduling, <br />
                        <span className="text-indigo-600">Simplified.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl font-medium text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        Stop wrestling with calendars. Manage world-class appointment workflows with 
                        <span className="text-slate-900"> absolute precision.</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center"
                    >
                        <Link href={route('services')}>
                            <Button className="h-16 px-12 text-lg rounded-full shadow-2xl shadow-indigo-500/10 group transform transition active:scale-95">
                                Explore Booking Options
                                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* User-Centric Service Cards */}
                
                <ServiceCard 
                    icon={Bell}
                    title="Automated Updates"
                    description="Intelligent email and SMS delivery for every confirmation."
                    badge="Queued"
                    delay={0.6}
                    position="bottom-[20%] left-[8%]"
                />

                <ServiceCard 
                    icon={Lock}
                    title="Data Integrity"
                    description="Rock-solid deduplication and replay protection for your data."
                    badge="Verified"
                    delay={0.7}
                    position="bottom-[15%] right-[12%]"
                />

                {/* Aesthetic Accents */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-slate-100 rounded-full pointer-events-none opacity-50" 
                />
            </div>
        </PublicLayout>
    );
}
