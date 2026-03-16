import React, { useState, useRef, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Bell, CheckCircle2, Calendar, User, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function NotificationDropdown() {
    const { notifications } = usePage().props as any;
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications?.unreadCount || 0;
    const recentNotifications = notifications?.recent || [];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const markAsRead = (id: string) => {
        router.post(route('admin.notifications.markAsRead', id), {}, {
            preserveScroll: true,
        });
    };

    const markAllAsRead = () => {
        router.post(route('admin.notifications.markAllAsRead'), {}, {
            onSuccess: () => setIsOpen(false),
        });
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-all",
                    isOpen && "bg-slate-100 text-indigo-600"
                )}
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-black text-white ring-2 ring-white animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 mt-3 w-80 rounded-2xl border border-slate-200 bg-white shadow-2xl z-[100] overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
                            {unreadCount > 0 && (
                                <button 
                                    onClick={markAllAsRead}
                                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-all"
                                >
                                    Mark all as read
                                </button>
                            )}
                        </div>

                        <div className="max-h-[350px] overflow-y-auto divide-y divide-slate-50">
                            {recentNotifications.length === 0 ? (
                                <div className="p-8 text-center">
                                    <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                                        <Bell className="text-slate-300" size={20} />
                                    </div>
                                    <p className="text-xs font-medium text-slate-400">No new notifications</p>
                                </div>
                            ) : (
                                recentNotifications.map((notification: any) => (
                                    <div 
                                        key={notification.id}
                                        className={cn(
                                            "p-4 hover:bg-slate-50 transition-colors cursor-pointer group relative",
                                            !notification.read_at && "bg-indigo-50/30"
                                        )}
                                        onClick={() => markAsRead(notification.id)}
                                    >
                                        <div className="flex gap-3">
                                            <div className={cn(
                                                "mt-0.5 h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                                                !notification.read_at ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-400"
                                            )}>
                                                <Calendar size={14} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-slate-900 line-clamp-2">
                                                    {notification.data.message}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] font-medium text-slate-400">
                                                        {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                                                    </span>
                                                    {!notification.read_at && (
                                                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <Link 
                            href={route('admin.notifications.index')}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-2 p-3 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 hover:text-indigo-600 transition-all border-t border-slate-100"
                        >
                            View All Notifications
                            <ArrowRight size={14} />
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
