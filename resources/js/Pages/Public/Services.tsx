import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion } from 'framer-motion';
import { Clock, Tag, ChevronRight, Star, ArrowRight } from 'lucide-react';
import { Link, router } from '@inertiajs/react';
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
    categories: string[];
    selectedCategory: string;
}

export default function Services({ services, categories, selectedCategory }: Props) {
    const serviceData = services.data;

    const handleCategoryChange = (category: string) => {
        router.get(route('services'), { category }, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    };

    return (
        <PublicLayout title="Our Services">
            <div className="py-20 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-extrabold text-slate-900 tracking-tight sm:text-6xl mb-6"
                    >
                        Book Your <span className="text-indigo-600">Appointment</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
                    >
                        Select a category below to find the right expert session for your needs.
                    </motion.p>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all border ${
                                selectedCategory === cat
                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100'
                                    : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-200 hover:text-indigo-600'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {serviceData.length > 0 ? (
                        serviceData.map((service, idx) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-xl shadow-slate-200/40 flex flex-col h-full group transition-all relative overflow-hidden"
                            >
                                {/* Availability Glow */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -mr-16 -mt-16 pointer-events-none" />

                                <div className="flex items-start justify-between mb-8">
                                    <div 
                                        className="h-16 w-16 rounded-2xl flex items-center justify-center text-white shadow-lg"
                                        style={{ backgroundColor: service.color_code }}
                                    >
                                        <Star size={32} />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-3xl font-black text-slate-900">${Number(service.price).toFixed(0)}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">per session</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="flex items-center gap-1 text-amber-500 mb-2">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                                        <span className="text-[10px] font-bold text-slate-400 ml-1">(4.9/5)</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                        {service.name}
                                    </h3>
                                </div>

                                <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-1">
                                    {service.description}
                                </p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
                                        <Clock size={16} className="text-indigo-500" />
                                        <span>{service.duration_minutes} Minutes</span>
                                    </div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        Available Today
                                    </div>
                                </div>

                                <Link href={route('booking.show', service.id)} className="w-full">
                                    <Button className="w-full group/btn gap-2 py-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100">
                                        Book Now
                                        <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 py-20 text-center">
                            <p className="text-xl font-bold text-slate-400">No services found in this category.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="mb-16">
                    <Pagination links={services.links} />
                </div>
            </div>
        </PublicLayout>
    );
}
