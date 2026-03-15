import React, { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useForm, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { Calendar, Clock, User, Mail, Phone, ChevronLeft, ShieldCheck } from 'lucide-react';
import Button from '@/Components/Button';
import { motion } from 'framer-motion';

interface Service {
    id: number;
    name: string;
    duration_minutes: number;
    price: number;
}

interface TimeSlot {
    id: number;
    start_time: string;
    end_time: string;
}

interface Props {
    service: Service;
    slot: TimeSlot;
}

export default function Confirm({ service, slot }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        service_id: service.id,
        time_slot_id: slot.id,
        customer_name: '',
        customer_email: '',
        customer_phone: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/api/book');
    };

    return (
        <PublicLayout title="Confirm Your Booking">
            <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <Link href={`/book/${service.id}`} className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 mb-8">
                    <ChevronLeft size={16} /> Change date/time
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* Left: Summary */}
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-6">Booking Summary</h1>
                        <div className="rounded-2xl bg-indigo-600 p-8 text-white shadow-xl shadow-indigo-100">
                            <h2 className="text-xl font-bold mb-6 border-b border-indigo-500/50 pb-4">{service.name}</h2>
                            
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <p className="text-white/70 text-xs font-bold uppercase tracking-wider">Date</p>
                                        <p className="font-bold">{format(new Date(slot.start_time), 'EEEE, MMMM d, yyyy')}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <p className="text-white/70 text-xs font-bold uppercase tracking-wider">Time</p>
                                        <p className="font-bold">{format(new Date(slot.start_time), 'h:mm a')} ({service.duration_minutes} mins)</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 pt-6 border-t border-indigo-500/50">
                                    <p className="text-white/70 font-medium">Total Amount</p>
                                    <p className="text-2xl font-bold ml-auto">${Number(service.price).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                            <ShieldCheck className="text-indigo-600 shrink-0" size={24} />
                            <div>
                                <p className="text-sm font-bold text-slate-900">Secure Booking</p>
                                <p className="text-xs text-slate-500 mt-1">Your information is protected by enterprise-grade encryption.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-900 mb-8">Your Details</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type="text"
                                        required
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                        placeholder="John Doe"
                                        value={data.customer_name}
                                        onChange={e => setData('customer_name', e.target.value)}
                                    />
                                </div>
                                {errors.customer_name && <p className="mt-1 text-xs font-bold text-rose-500">{errors.customer_name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type="email"
                                        required
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                        placeholder="john@example.com"
                                        value={data.customer_email}
                                        onChange={e => setData('customer_email', e.target.value)}
                                    />
                                </div>
                                {errors.customer_email && <p className="mt-1 text-xs font-bold text-rose-500">{errors.customer_email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type="tel"
                                        required
                                        maxLength={11}
                                        pattern="[0-9]{11}"
                                        title="Please enter exactly 11 digits"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                        placeholder="07065910449"
                                        value={data.customer_phone}
                                        onChange={e => setData('customer_phone', e.target.value.replace(/[^0-9]/g, ''))}
                                    />
                                </div>
                                {errors.customer_phone && <p className="mt-1 text-xs font-bold text-rose-500">{errors.customer_phone}</p>}
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full py-4 text-base"
                                isLoading={processing}
                            >
                                Confirm Booking
                            </Button>

                            <p className="text-[10px] text-center text-slate-400 font-medium">
                                By confirming, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </form>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
