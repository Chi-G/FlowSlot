import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion } from 'framer-motion';
import { Calendar, Shield, Zap, Star, Users, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import Button from '@/Components/Button';

export default function About() {
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
        <PublicLayout title="About Us">
            <div className="py-20 px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center mb-20 max-w-3xl mx-auto">
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
                        className="text-5xl font-extrabold text-slate-900 tracking-tight sm:text-6xl mb-8"
                    >
                        Redefining how the world <span className="text-indigo-600">connects</span>.
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-500 leading-relaxed"
                    >
                        FlowSlot Enterprise was built with a single mission: to eliminate the friction of scheduling. We help global organizations manage time with precision, security, and elegance.
                    </motion.p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 max-w-7xl mx-auto">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            className="text-center p-8 rounded-3xl bg-white border border-slate-100 shadow-sm"
                        >
                            <stat.icon className="mx-auto mb-4 text-slate-400" size={24} />
                            <p className="text-3xl font-black text-slate-900 mb-1">{stat.value}</p>
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
                            transition={{ delay: 0.5 + idx * 0.1 }}
                            className="flex flex-col gap-6"
                        >
                            <div className={`h-14 w-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center shadow-sm`}>
                                <feature.icon size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-12 text-center text-white"
                >
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-extrabold mb-6">Ready to streamline your enterprise?</h2>
                        <p className="text-slate-400 mb-10 text-lg font-medium">Join over 10,000 global companies who trust FlowSlot with their most valuable resource: time.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={route('booking.index')}>
                                <Button className="w-full sm:w-auto px-10 h-14 text-lg">
                                    Book a Demo
                                </Button>
                            </Link>
                            <Button variant="outline" className="w-full sm:w-auto px-10 h-14 text-lg border-slate-700 text-white hover:bg-slate-800">
                                Contact Sales
                            </Button>
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
