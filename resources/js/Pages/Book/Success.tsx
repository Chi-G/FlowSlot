import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { CheckCircle2, Calendar, Clock, ArrowRight, Share2, Download } from 'lucide-react';
import Button from '@/Components/Button';
import { motion } from 'framer-motion';

interface Appointment {
    reference_number: string;
    customer_name: string;
    service: {
        name: string;
    };
    time_slot: {
        start_time: string;
    };
}

interface Props {
    appointment: Appointment;
}

export default function Success({ appointment }: Props) {
    return (
        <PublicLayout title="Booking Confirmed">
            <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="mb-8 flex justify-center"
                >
                    <div className="rounded-full bg-emerald-100 p-6 text-emerald-600 shadow-lg shadow-emerald-50">
                        <CheckCircle2 size={64} />
                    </div>
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-extrabold text-slate-900 mb-4"
                >
                    Booking Confirmed!
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg text-slate-500 mb-12"
                >
                    Thank you, {appointment.customer_name}. Your appointment has been secured. A confirmation email has been sent to you.
                </motion.p>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xl shadow-slate-200/50 mb-12 text-left"
                >
                    <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-6">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Reference Number</p>
                            <p className="text-2xl font-black text-indigo-600">{appointment.reference_number}</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors"><Share2 size={20} /></button>
                            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors"><Download size={20} /></button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Calendar className="text-indigo-600" size={20} />
                            <div>
                                <p className="text-sm font-bold text-slate-900">{appointment.service.name}</p>
                                <p className="text-xs text-slate-500 font-medium">
                                    {format(new Date(appointment.time_slot.start_time), 'EEEE, MMMM d, yyyy')}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Clock className="text-indigo-600" size={20} />
                            <div>
                                <p className="text-sm font-bold text-slate-900">Start Time</p>
                                <p className="text-xs text-slate-500 font-medium">
                                    {format(new Date(appointment.time_slot.start_time), 'h:mm a')}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                        <Button variant="outline" className="w-full sm:w-auto px-8">
                            Back to Home
                        </Button>
                    </Link>
                    <Link href={route('booking.index')}>
                        <Button className="w-full sm:w-auto gap-2 px-8">
                            Book Another Service
                            <ArrowRight size={18} />
                        </Button>
                    </Link>
                </div>

                <p className="mt-12 text-xs text-slate-400 font-medium italic">
                    FlowSlot Enterprise: Professional scheduling made simple.
                </p>
            </div>
        </PublicLayout>
    );
}
