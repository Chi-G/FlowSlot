import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
    Calendar, Shield, Zap, Star, Users, ArrowRight, 
    CheckCircle2, Clock, Globe, Briefcase, Sparkles,
    MousePointer2, Layout, Activity
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import Button from '@/Components/Button';

const FloatingCard = ({ delay, icon: Icon, title, time, status, x, y }: any) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8, x: x - 20, y: y - 20 }}
        animate={{ 
            opacity: 1, 
            scale: 1, 
            x: x, 
            y: y,
            transition: { delay, duration: 0.8, ease: "easeOut" }
        }}
        whileHover={{ y: y - 10, transition: { duration: 0.3 } }}
        className="absolute hidden lg:flex flex-col gap-3 p-4 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] w-48 z-20"
    >
        <div className="flex items-center justify-between">
            <div className="h-8 w-8 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                <Icon size={18} />
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                status === 'Confirmed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
            }`}>
                {status}
            </span>
        </div>
        <div>
            <p className="text-xs font-bold text-slate-800">{title}</p>
            <p className="text-[10px] font-medium text-slate-500">{time}</p>
        </div>
    </motion.div>
);

export default function Home() {
    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 500], [0, 100]);

    return (
        <PublicLayout title="The New Standard in Scheduling">
            <div className="relative overflow-hidden bg-slate-50">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 h-[800px] w-[800px] bg-indigo-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 h-[600px] w-[600px] bg-emerald-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4" />

                {/* Hero Section */}
                <section className="relative pt-24 pb-32 lg:pt-32 lg:pb-48 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div style={{ y: yHero }} className="relative z-10 text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100/50 text-indigo-700 text-sm font-bold mb-8 backdrop-blur-sm border border-indigo-200/50"
                            >
                                <Sparkles size={16} />
                                <span>Trusted by 12,000+ Enterprise Teams</span>
                            </motion.div>
                            
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tight mb-8"
                            >
                                Scheduling <br />
                                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Perfected</span>.
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed mb-12 max-w-xl"
                            >
                                Move past the friction of manual booking. FlowSlot provides the high-velocity infrastructure for global scheduling operations.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-wrap gap-6 items-center"
                            >
                                <Link href={route('services')}>
                                    <Button className="h-16 px-10 text-xl rounded-2xl shadow-2xl shadow-indigo-500/20 group transform transition active:scale-95">
                                        Explore Services
                                        <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                                    </Button>
                                </Link>
                                <div className="flex -space-x-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="h-12 w-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                                        </div>
                                    ))}
                                    <div className="h-12 w-12 rounded-full border-4 border-white bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                                        +5k
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Interactive Visual Element */}
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="relative z-10 rounded-[3rem] bg-gradient-to-br from-white to-slate-50 p-8 shadow-[0_32px_120px_rgba(0,0,0,0.06)] border border-white/60 overflow-hidden"
                            >
                                {/* Interface Mockup */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex gap-2">
                                        <div className="h-3 w-3 rounded-full bg-rose-400" />
                                        <div className="h-3 w-3 rounded-full bg-amber-400" />
                                        <div className="h-3 w-3 rounded-full bg-emerald-400" />
                                    </div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Preview</div>
                                </div>
                                
                                <div className="space-y-6">
                                    <div className="h-12 w-full rounded-xl bg-slate-100 animate-pulse" />
                                    <div className="grid grid-cols-3 gap-4">
                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                            <div key={i} className={`h-24 rounded-2xl border-2 ${i === 2 ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100'}`} />
                                        ))}
                                    </div>
                                    <div className="h-14 w-full rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-200" />
                                </div>

                                {/* Floating Cards */}
                                <FloatingCard icon={Users} title="Consultation" time="10:30 AM" status="Confirmed" x={-80} y={40} delay={0.6} />
                                <FloatingCard icon={Briefcase} title="Technical Review" time="2:00 PM" status="Pending" x={340} y={180} delay={0.8} />
                                <FloatingCard icon={Zap} title="Slot Generated" time="Just Now" status="Confirmed" x={120} y={-40} delay={1.0} />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Main Bento Grid */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Engineered for Velocity</h2>
                        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">Precision scheduling tools designed to scale with your organization.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
                        {/* Featured High Card */}
                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="md:col-span-8 md:row-span-2 rounded-[2.5rem] bg-white p-12 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col justify-between group overflow-hidden relative"
                        >
                            <div className="relative z-10 max-w-lg">
                                <div className="h-16 w-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-8 shadow-lg shadow-indigo-200">
                                    <Clock size={32} />
                                </div>
                                <h3 className="text-4xl font-black text-slate-900 mb-6 leading-tight">Instant Precision <br /> Slot Engine</h3>
                                <p className="text-xl text-slate-500 font-medium leading-relaxed">
                                    Our proprietary algorithm calculates service duration and buffer times in real-time, 
                                    ensuring you never deal with overlapping appointments again.
                                </p>
                            </div>
                            <div className="mt-8 relative z-10">
                                <Button variant="outline" className="rounded-full border-slate-200 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">
                                    Learn More <ArrowRight className="ml-2" size={18} />
                                </Button>
                            </div>
                            {/* Accent Background */}
                            <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 h-96 w-96 rounded-full bg-indigo-50 hover:scale-110 transition-transform duration-1000" />
                        </motion.div>

                        {/* Security Card */}
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="md:col-span-4 rounded-[2.5rem] bg-emerald-600 p-10 text-white flex flex-col justify-between shadow-xl shadow-emerald-200/50"
                        >
                            <Shield size={48} className="mb-8" />
                            <div>
                                <h3 className="text-2xl font-black mb-4">SOC2 Ready</h3>
                                <p className="text-emerald-50 font-medium">Enterprise-grade encryption for all scheduling metadata and customer PII.</p>
                            </div>
                        </motion.div>

                        {/* Integration Card */}
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="md:col-span-4 rounded-[2.5rem] bg-indigo-50 p-10 border border-indigo-100 flex flex-col justify-between shadow-lg"
                        >
                            <Globe size={48} className="text-indigo-600 mb-8" />
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4">Global API</h3>
                                <p className="text-slate-500 font-medium">Headless scheduling via REST and GraphQL. Deploy anywhere.</p>
                            </div>
                        </motion.div>
                    </div>
                </section>                

                {/* Modern Footer */}
                <footer className="border-t border-slate-200 pt-16 pb-8 bg-white">
                    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                            <Link href="/" className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-indigo-600 shadow-lg shadow-indigo-200" />
                                <span className="text-2xl font-black tracking-tight text-slate-900">
                                    Flow<span className="text-indigo-600">Slot</span>
                                </span>
                            </Link>
                            <div className="flex gap-10">
                                <Link href="/" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Home</Link>
                                <Link href={route('services')} className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Services</Link>
                                <Link href="/login" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Legal</Link>
                                <Link href="/login" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Privacy</Link>
                            </div>
                        </div>
                        <div className="text-center md:text-left text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
                            © 2026 FlowSlot Enterprise. All Rights Reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </PublicLayout>
    );
}
