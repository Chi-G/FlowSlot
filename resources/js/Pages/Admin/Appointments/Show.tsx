import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { 
    ChevronLeft, 
    User, 
    Mail, 
    Phone, 
    Calendar, 
    Clock, 
    FileText,
    CheckCircle,
    XCircle,
    RotateCcw,
    Flag
} from 'lucide-react';
import StatusBadge from '@/Components/StatusBadge';
import Button from '@/Components/Button';

interface Appointment {
    id: number;
    reference_number: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string | null;
    status: string;
    notes: string | null;
    service: {
        name: string;
        price: number;
        duration_minutes: number;
    };
    time_slot: {
        start_time: string;
        end_time: string;
    };
    created_at: string;
}

interface Props {
    appointment: Appointment;
}

export default function Show({ appointment }: Props) {
    const updateStatus = (status: string) => {
        router.patch(route('admin.appointments.updateStatus', appointment.id), { status });
    };

    return (
        <AdminLayout title={`Booking ${appointment.reference_number}`}>
            <div className="max-w-7xl">
                <Link href={route('admin.appointments.index')} className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 mb-8">
                    <ChevronLeft size={16} /> Back to appointments
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left & Center: Top level info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
                            <div className="flex items-start justify-between mb-8">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Reference Number</p>
                                    <h2 className="text-3xl font-black text-slate-900">{appointment.reference_number}</h2>
                                </div>
                                <StatusBadge status={appointment.status as any} className="text-sm px-4 py-1" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">Customer Details</h3>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{appointment.customer_name}</p>
                                            <p className="text-xs text-slate-500 font-medium">Customer</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                            <Mail size={20} />
                                        </div>
                                        <p className="text-sm font-medium text-slate-600">{appointment.customer_email}</p>
                                    </div>
                                    {appointment.customer_phone && (
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                                <Phone size={20} />
                                            </div>
                                            <p className="text-sm font-medium text-slate-600">{appointment.customer_phone}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">Service Details</h3>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                                            <Flag size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{appointment.service.name}</p>
                                            <p className="text-xs text-slate-500 font-medium">${Number(appointment.service.price).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                                            <Clock size={20} />
                                        </div>
                                        <p className="text-sm font-medium text-slate-600">{appointment.service.duration_minutes} Minutes</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-4 mb-6">Appointment Notes</h3>
                            {appointment.notes ? (
                                <p className="text-sm text-slate-600 leading-relaxed">{appointment.notes}</p>
                            ) : (
                                <p className="text-sm text-slate-400 italic">No notes provided for this appointment.</p>
                            )}
                        </div>
                    </div>

                    {/* Right: Actions & Schedule */}
                    <div className="space-y-8">
                        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Schedule Info</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
                                    <Calendar className="text-indigo-600" size={24} />
                                    <div>
                                        <p className="text-xs font-bold text-slate-400">Date</p>
                                        <p className="text-sm font-black text-slate-900">
                                            {format(new Date(appointment.time_slot.start_time), 'MMMM d, yyyy')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
                                    <Clock className="text-indigo-600" size={24} />
                                    <div>
                                        <p className="text-xs font-bold text-slate-400">Time</p>
                                        <p className="text-sm font-black text-slate-900">
                                            {format(new Date(appointment.time_slot.start_time), 'h:mm a')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Manage Status</h3>
                            <div className="space-y-3">
                                {appointment.status !== 'confirmed' && (
                                    <Button 
                                        onClick={() => updateStatus('confirmed')}
                                        className="w-full justify-start gap-3 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-none"
                                    >
                                        <CheckCircle size={18} /> Confirm Appointment
                                    </Button>
                                )}
                                {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                                    <Button 
                                        onClick={() => updateStatus('completed')}
                                        className="w-full justify-start gap-3 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-none"
                                    >
                                        <CheckCircle size={18} /> Mark as Completed
                                    </Button>
                                )}
                                {appointment.status !== 'cancelled' && (
                                    <Button 
                                        onClick={() => updateStatus('cancelled')}
                                        className="w-full justify-start gap-3 bg-rose-50 text-rose-600 hover:bg-rose-100 border-none"
                                    >
                                        <XCircle size={18} /> Cancel Appointment
                                    </Button>
                                )}
                                {appointment.status === 'cancelled' && (
                                    <Button 
                                        onClick={() => updateStatus('pending')}
                                        className="w-full justify-start gap-3 bg-slate-50 text-slate-600 hover:bg-slate-100 border-none"
                                    >
                                        <RotateCcw size={18} /> Re-open Appointment
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}
