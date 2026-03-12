import { Head, Link, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatCard from '@/Components/StatCard';
import StatusBadge from '@/Components/StatusBadge';
import { 
    Users, 
    CalendarCheck, 
    DollarSign, 
    Briefcase,
    Clock,
    User,
    ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface Booking {
    id: number;
    customer_name: string;
    customer_email: string;
    status: string;
    reference_number: string;
    service: {
        name: string;
    };
    time_slot: {
        start_time: string;
    };
}

interface Props {
    stats: {
        totalAppointments: number;
        pendingAppointments: number;
        revenue: number;
        activeServices: number;
    };
    todayBookings: Booking[];
}

export default function Dashboard({ stats, todayBookings }: Props) {
    return (
        <AdminLayout title="System Overview">
            <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard 
                        title="Total Appointments" 
                        value={stats.totalAppointments} 
                        icon={CalendarCheck} 
                        trend={{ value: '12%', isPositive: true }}
                        description="from last month"
                    />
                    <StatCard 
                        title="Pending Requests" 
                        value={stats.pendingAppointments} 
                        icon={Clock} 
                        color="amber"
                    />
                    <StatCard 
                        title="Total Revenue" 
                        value={`$${Number(stats.revenue).toLocaleString()}`} 
                        icon={DollarSign} 
                        color="emerald"
                        trend={{ value: '8.4%', isPositive: true }}
                    />
                    <StatCard 
                        title="Active Services" 
                        value={stats.activeServices} 
                        icon={Briefcase} 
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Today's Appointments Table */}
                    <div className="lg:col-span-2 rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-slate-50">
                            <h3 className="text-lg font-bold text-slate-900">Today's Appointments</h3>
                            <Link 
                                href={route('admin.appointments.index')} 
                                className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                            >
                                View All <ArrowUpRight size={16} />
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 border-b border-slate-50 uppercase tracking-wider">Customer</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 border-b border-slate-50 uppercase tracking-wider">Service</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 border-b border-slate-50 uppercase tracking-wider">Time</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 border-b border-slate-50 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {todayBookings.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                                                No appointments scheduled for today.
                                            </td>
                                        </tr>
                                    ) : (
                                        todayBookings.map((booking) => (
                                            <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                            <User size={14} />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-900">{booking.customer_name}</p>
                                                            <p className="text-[10px] text-slate-400 font-medium">{booking.customer_email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-slate-600">{booking.service.name}</td>
                                                <td className="px-6 py-4 text-sm font-bold text-slate-900">
                                                    {format(new Date(booking.time_slot.start_time), 'h:mm a')}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge status={booking.status as any} />
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Actions / Recent Activity */}
                    <div className="space-y-6">
                        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h3>
                            <div className="space-y-3">
                                <Link 
                                    href={route('admin.services.create')}
                                    className="w-full flex items-center gap-3 rounded-xl border border-slate-100 p-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-indigo-100 transition-all"
                                >
                                    <div className="h-8 w-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                        <Plus size={18} />
                                    </div>
                                    Create New Service
                                </Link>
                                <Link 
                                    href={route('admin.slots.index')}
                                    className="w-full flex items-center gap-3 rounded-xl border border-slate-100 p-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-indigo-100 transition-all"
                                >
                                    <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                        <Calendar size={18} />
                                    </div>
                                    Generate Time Slots
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-100 bg-indigo-600 p-6 text-white shadow-lg shadow-indigo-100">
                            <h3 className="font-bold mb-2">Pro Tip</h3>
                            <p className="text-xs text-indigo-100 leading-relaxed font-medium">Use real-time slot generation to avoid conflicts during high-traffic periods.</p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

// Helper icons
const Plus = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

const Calendar = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);
