import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage, Link } from '@inertiajs/react';
import { Bell, CheckCircle2, Clock, Calendar, ArrowLeft, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import StatusBadge from '@/Components/StatusBadge';
import Pagination from '@/Components/Pagination';
import Button from '@/Components/Button';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Notification {
    id: string;
    data: {
        message: string;
        reference_number: string;
        customer_name: string;
        service: string;
    };
    read_at: string | null;
    created_at: string;
}

interface Props {
    notifications: {
        data: Notification[];
        links: any[];
    };
}

export default function Index({ notifications }: Props) {
    const markAllAsRead = () => {
        router.post(route('admin.notifications.markAllAsRead'));
    };

    const markAsRead = (id: string) => {
        router.post(route('admin.notifications.markAsRead', id), {}, {
            preserveScroll: true
        });
    };

    return (
        <AdminLayout title="Notifications">
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href={route('admin.dashboard')}>
                            <button className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all text-slate-500">
                                <ArrowLeft size={20} />
                            </button>
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Notifications Center</h2>
                            <p className="text-sm text-slate-500 font-medium">Keep track of all your business activities.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button 
                            variant="outline" 
                            className="gap-2 h-10 border-slate-200"
                            onClick={markAllAsRead}
                        >
                            <CheckCircle2 size={18} />
                            Mark all as read
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4">
                    {notifications.data.length === 0 ? (
                        <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center">
                            <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                <Bell className="text-slate-300" size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">All caught up!</h3>
                            <p className="text-slate-500 max-w-sm mx-auto mt-2">You don't have any notifications at the moment. New alerts will appear here.</p>
                        </div>
                    ) : (
                        notifications.data.map((notification) => (
                            <div 
                                key={notification.id}
                                className={cn(
                                    "bg-white rounded-2xl border transition-all p-5 flex items-start gap-5 group",
                                    !notification.read_at 
                                        ? "border-indigo-100 shadow-sm shadow-indigo-50/50" 
                                        : "border-slate-100 opacity-80"
                                )}
                            >
                                <div className={cn(
                                    "h-12 w-12 rounded-xl flex items-center justify-center shrink-0",
                                    !notification.read_at ? "bg-indigo-50 text-indigo-600" : "bg-slate-50 text-slate-400"
                                )}>
                                    <Bell size={20} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="font-bold text-slate-900 text-lg leading-tight">
                                                {notification.data.message}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                                                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                                                    <Clock size={14} className="text-slate-400" />
                                                    {format(new Date(notification.created_at), 'MMM d, yyyy · h:mm a')}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs font-black text-indigo-600 font-mono">
                                                    #{notification.data.reference_number}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {!notification.read_at && (
                                            <button 
                                                onClick={() => markAsRead(notification.id)}
                                                className="shrink-0 p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all text-xs font-bold"
                                            >
                                                Mark Read
                                            </button>
                                        )}
                                    </div>

                                    <div className="mt-4 p-4 bg-slate-50/50 rounded-xl border border-slate-50 flex flex-wrap gap-6">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Customer</p>
                                            <p className="text-sm font-bold text-slate-700">{notification.data.customer_name}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Service</p>
                                            <p className="text-sm font-bold text-slate-700">{notification.data.service}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <Pagination links={notifications.links} />
            </div>
        </AdminLayout>
    );
}
