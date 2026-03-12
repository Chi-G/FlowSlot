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
        className={`absolute hidden xl:flex flex-col gap-3 p-5 rounded-3xl bg-white/70 backdrop-blur-xl border border-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] w-64 z-20 ${position}`}
    >
        <div className="flex items-center justify-between">
            <div className="h-10 w-10 rounded-xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center">
                <Icon size={20} />
            </div>
            {badge && (
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 uppercase tracking-wider">
                    {badge}
                </span>
            )}
        </div>
        <div>
            <h4 className="text-sm font-black text-slate-900 mb-1">{title}</h4>
            <p className="text-xs font-medium text-slate-500 leading-relaxed">{description}</p>
        </div>
        <div className="mt-1 flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Live System Active</span>
        </div>
    </motion.div>
);

export default function Home() {
    return (
        <PublicLayout title="Effortless Scheduling, Seamless Flow">
            <div className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-white flex flex-center items-center justify-center py-20">
                <DotGrid />

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-12 border border-slate-100"
                    >
                        <Sparkles size={12} className="text-indigo-500" />
                        <span>FlowSlot Enterprise Version 1.0.0</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-7xl md:text-[9rem] font-black text-slate-900 leading-[0.85] tracking-tighter mb-10"
                    >
                        Connect, Locate, and <br />
                        <span className="text-slate-300">Manage</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-3xl font-medium text-slate-400 mb-16 max-w-3xl mx-auto leading-relaxed"
                    >
                        Effortless Scheduling, <span className="text-slate-900">Seamless Flow</span>. <br />
                        All your appointments synchronized in one place.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center"
                    >
                        <Link href={route('services')}>
                            <Button className="h-16 px-12 text-lg rounded-full shadow-2xl shadow-indigo-500/20 group transform transition active:scale-95">
                                Explore Services Now
                                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Service Cards Inspired by the Screenshot Interface */}
                
                {/* Top Left: Booking Service */}
                <ServiceCard 
                    icon={Calendar}
                    title="BookingService"
                    description="Handles appointment creation with transactional safety and conflict detection."
                    badge="Secure"
                    delay={0.4}
                    position="top-[15%] left-[10%]"
                />

                {/* Top Right: Availability Service */}
                <ServiceCard 
                    icon={Search}
                    title="AvailabilityService"
                    description="Manages real-time slot queries and high-performance caching."
                    badge="Real-time"
                    delay={0.5}
                    position="top-[20%] right-[10%]"
                />

                {/* Bottom Left: Notification Service */}
                <ServiceCard 
                    icon={Bell}
                    title="NotificationService"
                    description="Multi-channel delivery (Email, SMS, Push) with intelligent queuing."
                    badge="Queued"
                    delay={0.6}
                    position="bottom-[20%] left-[8%]"
                />

                {/* Bottom Right: Idempotency Service */}
                <ServiceCard 
                    icon={Lock}
                    title="IdempotencyService"
                    description="Ensures deduplication and replay protection for all system requests."
                    badge="Verified"
                    delay={0.7}
                    position="bottom-[15%] right-[12%]"
                />

                {/* Center Far Right: Webhook Service */}
                <ServiceCard 
                    icon={LinkIcon}
                    title="WebhookService"
                    description="Seamless external system integrations and Google Calendar sync."
                    badge="Connected"
                    delay={0.8}
                    position="top-[50%] -translate-y-1/2 right-[5%]"
                />

                {/* Small Center Accents */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-100 rounded-full pointer-events-none opacity-50" 
                />
                <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-dashed border-slate-100 rounded-full pointer-events-none opacity-30" 
                />
            </div>
        </PublicLayout>
    );
}
