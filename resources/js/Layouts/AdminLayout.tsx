import React, { ReactNode, useState, useEffect } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import NotificationDropdown from '../Components/NotificationDropdown';
import ApplicationLogo from '../Components/ApplicationLogo';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, 
    Calendar, 
    Settings, 
    Clock, 
    Users, 
    Bell, 
    LogOut,
    ChevronLeft,
    ChevronRight,
    Search
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import ConfirmationModal from '../Components/ConfirmationModal';
import Toast from '../Components/Toast';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Props {
    children: ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title }: Props) {
    const { auth, flash } = usePage().props as any;
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [toast, setToast] = useState<{ message: string | null; type: 'success' | 'error' }>({
        message: null,
        type: 'success',
    });
    const [headerSearch, setHeaderSearch] = useState('');

    // Handle flash messages
    useEffect(() => {
        if (flash?.success) {
            setToast({ message: flash.success, type: 'success' });
        } else if (flash?.error) {
            setToast({ message: flash.error, type: 'error' });
        }
    }, [flash]);

    const menuItems = [
        { label: 'Dashboard', icon: LayoutDashboard, href: route('admin.dashboard'), active: route().current('admin.dashboard') },
        { label: 'Services', icon: Clock, href: route('admin.services.index'), active: route().current('admin.services.*') },
        { label: 'Generate Slots', icon: Clock, href: route('admin.slots.index'), active: route().current('admin.slots.*') },
        { label: 'Appointments', icon: Calendar, href: route('admin.appointments.index'), active: route().current('admin.appointments.*') },
        { 
            label: 'Notifications', 
            icon: Bell, 
            href: route('admin.notifications.index'), 
            active: route().current('admin.notifications.*'),
            badge: usePage().props.notifications ? (usePage().props.notifications as any).unreadCount : 0
        },
    ];

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
            <Head title={title ? `${title} | Admin FlowSlot` : 'FlowSlot Admin'} />

            {/* Notifications */}
            <Toast 
                message={toast.message} 
                type={toast.type} 
                onClose={() => setToast({ ...toast, message: null })} 
            />

            <ConfirmationModal
                show={showLogoutModal}
                title="End session?"
                description="Are you sure you want to log out of the admin portal?"
                confirmText="Log Out"
                variant="primary"
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
            />

            {/* Sidebar */}
            <aside 
                className={cn(
                    "sticky top-0 h-screen bg-white border-r border-slate-200 transition-all duration-300 z-50",
                    isSidebarCollapsed ? "w-20" : "w-64"
                )}
            >
                <div className="flex h-16 items-center px-6 border-b border-slate-200">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 overflow-hidden">
                        <ApplicationLogo className="h-8 w-8 min-w-[32px] rounded-md shadow-sm object-cover" />
                        {!isSidebarCollapsed && (
                            <span className="text-lg font-bold tracking-tight whitespace-nowrap">
                                Flow<span className="text-indigo-600">Slot</span>
                            </span>
                        )}
                    </Link>
                </div>

                <div className="flex flex-col gap-1 p-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all group",
                                item.active 
                                    ? "bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-100/50" 
                                    : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                            )}
                        >
                            <item.icon className={cn(
                                "h-5 w-5 transition-colors", 
                                item.active ? "text-indigo-600" : "text-slate-400 group-hover:text-indigo-600"
                            )} />
                            {!isSidebarCollapsed && (
                                <div className="flex-1 flex items-center justify-between">
                                    <span>{item.label}</span>
                                    {item.label === 'Notifications' && (item as any).badge > 0 && (
                                        <span className="bg-indigo-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-white">
                                            {(item as any).badge}
                                        </span>
                                    )}
                                </div>
                            )}
                        </Link>
                    ))}
                </div>

                <div className="absolute bottom-0 w-full p-4 border-t border-slate-200 bg-white">
                    <button 
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className="flex w-full items-center justify-center gap-2 rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
                    >
                        {isSidebarCollapsed ? <ChevronRight size={20} /> : <div className="flex items-center gap-2"><ChevronLeft size={20} /> <span className="text-sm">Collapse Sidebar</span></div>}
                    </button>
                    
                    {!isSidebarCollapsed && (
                        <div className="mt-4 flex items-center gap-3 px-2">
                            <div className="h-8 w-8 rounded-full bg-slate-200" />
                            <div className="flex-1 overflow-hidden">
                                <p className="text-xs font-semibold truncate">{auth.user.name}</p>
                                <p className="text-[10px] text-slate-500 truncate">{auth.user.email}</p>
                            </div>
                            <button 
                                onClick={() => setShowLogoutModal(true)}
                                className="text-slate-400 hover:text-rose-500 transition-colors"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header className="sticky top-0 z-40 h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4 bg-slate-100 rounded-full px-4 py-1.5 w-96 max-w-full border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-100 transition-all relative group">
                        <Search size={18} className="text-slate-400" />
                        <input 
                            type="text" 
                            value={headerSearch}
                            onChange={(e) => setHeaderSearch(e.target.value)}
                            placeholder="Global search (coming soon)..." 
                            className="bg-transparent border-none text-sm focus:ring-0 w-full p-0 h-6 text-slate-700" 
                        />
                        {headerSearch && (
                            <div className="absolute top-full left-0 mt-2 p-3 bg-slate-900 text-white text-[11px] font-bold rounded-xl shadow-2xl opacity-0 group-focus-within:opacity-100 transition-all transform translate-y-2 group-focus-within:translate-y-0 pointer-events-none z-50">
                                Global search is currently being architected for enterprise-grade performance.
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        <NotificationDropdown />
                        <div className="h-8 w-[1px] bg-slate-200 mx-2" />
                        <h1 className="text-sm font-semibold text-slate-700">{title || 'Admin Dashboard'}</h1>
                    </div>
                </header>

                <main className="flex-1 p-8 overflow-y-auto">
                    <motion.div
                        key={title}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
