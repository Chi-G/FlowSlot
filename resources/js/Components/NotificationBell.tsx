import React, { useState } from 'react';
import { Bell, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '@/Hooks/useNotifications';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function NotificationBell() {
    const { notifications, unreadCount, markAsRead } = useNotifications();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors"
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div 
                            className="fixed inset-0 z-40" 
                            onClick={() => setIsOpen(false)} 
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-3 w-80 z-50 rounded-2xl border border-slate-100 bg-white shadow-2xl shadow-slate-200/50"
                        >
                            <div className="flex items-center justify-between border-b border-slate-50 p-4">
                                <h3 className="font-bold text-slate-900">Notifications</h3>
                                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="max-h-[400px] overflow-y-auto p-2">
                                {notifications.length === 0 ? (
                                    <div className="py-12 text-center text-slate-400">
                                        <Bell size={32} className="mx-auto mb-2 opacity-20" />
                                        <p className="text-sm font-medium">No alerts yet</p>
                                    </div>
                                ) : (
                                    notifications.map((notification) => (
                                        <div 
                                            key={notification.id}
                                            className={cn(
                                                "group relative flex flex-col gap-1 rounded-xl p-3 transition-colors hover:bg-slate-50",
                                                !notification.read_at && "bg-indigo-50/30"
                                            )}
                                        >
                                            <div className="flex items-start justify-between">
                                                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{notification.data.service}</p>
                                                {!notification.read_at && (
                                                    <button 
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="h-5 w-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Check size={12} />
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-sm font-medium text-slate-700">{notification.data.message}</p>
                                            <p className="text-[10px] text-slate-400 font-medium">Ref: {notification.data.reference_number}</p>
                                        </div>
                                    ))
                                )}
                            </div>

                            {notifications.length > 0 && (
                                <div className="border-t border-slate-50 p-3">
                                    <button className="w-full rounded-lg py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition-colors">
                                        View all alerts
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
