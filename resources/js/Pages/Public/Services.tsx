import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion } from 'framer-motion';
import { Clock, Tag, ChevronRight, Star, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import Button from '@/Components/Button';

import Pagination from '@/Components/Pagination';

interface Service {
    id: number;
    name: string;
    description: string;
    duration_minutes: number;
    price: number;
    color_code: string;
}

interface Props {
    services: {
        data: Service[];
        links: any[];
    };
}

export default function Services({ services }: Props) {
    const serviceData = services.data;

    return (
        <PublicLayout title="Our Services">
            <div className="py-20 w-full">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-extrabold text-slate-900 tracking-tight sm:text-6xl mb-6"
                    >
                        Professional <span className="text-indigo-600">Solutions</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
                    >
                        Choose from our suite of enterprise-grade services tailored to elevate your business performance and strategic vision.
                    </motion.p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {serviceData.map((service, idx) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xl shadow-slate-200/40 flex flex-col h-full group transition-all"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div 
                                    className="h-16 w-16 rounded-2xl flex items-center justify-center text-white shadow-lg"
                                    style={{ backgroundColor: service.color_code }}
                                >
                                    <Star size={32} />
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-black text-slate-900">${Number(service.price).toFixed(0)}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Base Rate</p>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                                {service.name}
                            </h3>
                            <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-1">
                                {service.description}
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
                                    <Clock size={16} />
                                    <span>{service.duration_minutes} Minute Session</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
                                    <Tag size={16} />
                                    <span>Enterprise SKU: FS-{service.id}00</span>
                                </div>
                            </div>

                            <Link href={route('booking.show', service.id)} className="w-full">
                                <Button className="w-full group/btn gap-2 py-6 rounded-2xl">
                                    Secure Slot
                                    <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mb-16 flex justify-center">
                    <Pagination links={services.links} />
                </div>

                {/* Enterprise Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-indigo-50 rounded-[2.5rem] p-12 flex flex-col md:flex-row items-center justify-between gap-12"
                >
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center md:text-left">Scale your scheduling needs?</h2>
                        <p className="text-lg text-slate-600 font-medium mb-0 text-center md:text-left leading-relaxed">
                            Our Enterprise plan offers multi-user support, white-label options, and advanced API access for complex workflows.
                        </p>
                    </div>
                    <div className="shrink-0 flex gap-4">
                        <Button variant="outline" className="px-8 py-4 gap-2 text-indigo-700 bg-white hover:bg-indigo-100 shadow-sm border-indigo-100">
                            View Pricing
                            <ArrowRight size={18} />
                        </Button>
                    </div>
                </motion.div>
            </div>
        </PublicLayout>
    );
}
