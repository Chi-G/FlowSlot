import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import ServiceCard from '@/Components/ServiceCard';
import { router } from '@inertiajs/react';
import { motion } from 'framer-motion';

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

export default function Index({ services }: Props) {
    const handleSelectService = (service: Service) => {
        router.get(`/book/${service.id}`);
    };

    const serviceData = services.data;

    return (
        <PublicLayout title="Choose a Service">
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl"
                    >
                        Enterprise <span className="text-indigo-600">Appointment</span> Booking
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-xl text-slate-500"
                    >
                        Select a service below to view availability and secure your slot in seconds.
                    </motion.p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-12 mb-12">
                    {serviceData.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ServiceCard 
                                service={service} 
                                onSelect={handleSelectService} 
                            />
                        </motion.div>
                    ))}
                    
                    {serviceData.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
                            <p className="text-lg font-medium text-slate-500">No services are currently available for booking.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex justify-center">
                    <Pagination links={services.links} />
                </div>

                {/* Benefits Section */}
                <div className="mt-32 grid grid-cols-1 gap-12 sm:grid-cols-3">
                    {[
                        { title: 'Real-time Updates', desc: 'See immediate slot availability with zero latency.' },
                        { title: 'Instant Confirmation', desc: 'Secure your booking instantly with a reference number.' },
                        { title: 'Secure & Reliable', desc: 'Enterprise-grade security for all your scheduling needs.' }
                    ].map((benefit, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-50"
                        >
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                            <p className="text-slate-500 leading-relaxed">{benefit.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </PublicLayout>
    );
}
