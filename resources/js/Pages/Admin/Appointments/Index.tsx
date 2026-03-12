import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { Eye, Clock, Calendar, User, MoreVertical, CheckCircle2, XCircle } from 'lucide-react';
import StatusBadge from '@/Components/StatusBadge';
import Pagination from '@/Components/Pagination';

interface Appointment {
    id: number;
    reference_number: string;
    customer_name: string;
    customer_email: string;
    status: string;
    service: {
        name: string;
    };
    time_slot: {
        start_time: string;
    };
}

interface Props {
    appointments: {
        data: Appointment[];
        links: any[];
    };
}

export default function Index({ appointments }: Props) {
    const updateStatus = (id: number, status: string) => {
        if (confirm(`Set appointment to ${status}?`)) {
            router.patch(route('admin.appointments.updateStatus', id), { status });
        }
    };

    return (
        <AdminLayout title="Appointments">
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Appointment Management</h2>
                    <p className="text-sm text-slate-500 font-medium">Track and manage all customer bookings.</p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 border-b border-slate-50 uppercase tracking-wider">Reference</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 border-b border-slate-50 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 border-b border-slate-50 uppercase tracking-wider">Service</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 border-b border-slate-50 uppercase tracking-wider">Scheduled</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 border-b border-slate-50 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 border-b border-slate-50 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {appointments.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                                            No appointments found.
                                        </td>
                                    </tr>
                                ) : (
                                    appointments.data.map((appointment) => (
                                        <tr key={appointment.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-black text-indigo-600 font-mono">{appointment.reference_number}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{appointment.customer_name}</p>
                                                    <p className="text-[10px] text-slate-400 font-medium">{appointment.customer_email}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-slate-600">{appointment.service.name}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-900">{format(new Date(appointment.time_slot.start_time), 'MMM d, yyyy')}</span>
                                                    <span className="text-[10px] text-slate-400 font-medium">{format(new Date(appointment.time_slot.start_time), 'h:mm a')}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={appointment.status as any} />
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button 
                                                        onClick={() => updateStatus(appointment.id, 'confirmed')}
                                                        className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"
                                                        title="Confirm"
                                                    >
                                                        <CheckCircle2 size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={() => updateStatus(appointment.id, 'cancelled')}
                                                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                                                        title="Cancel"
                                                    >
                                                        <XCircle size={16} />
                                                    </button>
                                                    <Link href={route('admin.appointments.show', appointment.id)}>
                                                        <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-all">
                                                            <Eye size={16} />
                                                        </button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <Pagination links={appointments.links} />
            </div>
        </AdminLayout>
    );
}
