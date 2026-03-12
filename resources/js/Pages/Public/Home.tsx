import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion } from 'framer-motion';
import { Calendar, Shield, Zap, Star, Users, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import Button from '@/Components/Button';

export default function Home() {
    const stats = [
        { label: 'Annual Bookings', value: '450k+', icon: Calendar },
        { label: 'Active Users', value: '120k+', icon: Users },
        { label: 'Security Score', value: '99.9%', icon: Shield },
        { label: 'Customer Rating', value: '4.9/5', icon: Star },
    ];

    const features = [
        {
            title: 'Enterprise Velocity',
            description: 'FlowSlot is engineered for speed. Our scheduling engine handles thousands of concurrent requests with zero latency.',
            icon: Zap,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
        },
        {
            title: 'Military-Grade Security',
            description: 'Your data is encrypted at rest and in transit. We follow strict SOC2 compliance standards to protect your scheduling data.',
            icon: Shield,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
        },
        {
            title: 'Seamless Integration',
            description: 'Connect with your existing calendar, CRM, and communication tools effortlessly. FlowSlot lives where you work.',
            icon: Calendar,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
        },
    ];

    return (
        <PublicLayout title="Welcome">
            <div className="py-20 px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center mb-20 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-6"
                    >
                        <Star size={16} fill="currentColor" />
                        <span>The New Standard in Scheduling</span>
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl font-extrabold text-slate-900 tracking-tight sm:text-7xl mb-8"
                    >
                        Enterprise scheduling <br />
                        <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">redefined</span>.
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-500 leading-relaxed mb-10"
                    >
                        FlowSlot helps global organizations manage time with precision, security, and elegance. Experience the friction-free way to connect with your clients.
                    </motion.p>
                    <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.3 }}
                         className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href={route('services')}>
                            <Button className="h-14 px-8 text-lg rounded-2xl shadow-xl shadow-indigo-100 group">
                                Explore Services
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button variant="outline" className="h-14 px-8 text-lg rounded-2xl border-slate-200">
                                Admin Portal
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 max-w-7xl mx-auto">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + idx * 0.1 }}
                            className="text-center p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm"
                        >
                            <stat.icon className="mx-auto mb-4 text-slate-400" size={24} />
                            <p className="text-4xl font-black text-slate-900 mb-1">{stat.value}</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32 max-w-7xl mx-auto">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + idx * 0.1 }}
                            className="flex flex-col gap-6 group"
                        >
                            <div className={`h-16 w-16 rounded-[1.25rem] ${feature.bg} ${feature.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                                <feature.icon size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-[3rem] bg-slate-900 p-16 text-center text-white"
                >
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-4xl font-extrabold mb-6 tracking-tight">Ready to streamline your enterprise?</h2>
                        <p className="text-slate-400 mb-10 text-xl font-medium leading-relaxed">Join over 10,000 global companies who trust FlowSlot with their most valuable resource: time.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={route('services')}>
                                <Button className="w-full sm:w-auto px-12 h-16 text-xl rounded-2xl">
                                    Book Now
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="outline" className="w-full sm:w-auto px-12 h-16 text-xl rounded-2xl border-slate-700 text-white hover:bg-slate-800">
                                    Management
                                </Button>
                            </Link>
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl"></div>
                </motion.div>
            </div>
        </PublicLayout>
    );
}
