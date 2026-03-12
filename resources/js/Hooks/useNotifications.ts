import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

interface Notification {
    id: string;
    data: {
        message: string;
        appointment_id: number;
        reference_number: string;
        customer_name: string;
        service: string;
    };
    read_at: string | null;
    created_at: string;
}

export function useNotifications() {
    const { auth } = usePage().props as any;
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (!auth.user) return;

        // Initial fetch would go here via an API route
        // For now, we set up Echo listener

        const channel = window.Echo.private(`admin.bookings`);

        channel.listen('.BookingCreated', (e: any) => {
            const newNotification: Notification = {
                id: Math.random().toString(36).substr(2, 9),
                data: {
                    message: `New booking received from ${e.appointment.customer_name}`,
                    appointment_id: e.appointment.id,
                    reference_number: e.appointment.reference_number,
                    customer_name: e.appointment.customer_name,
                    service: e.appointment.service.name,
                },
                read_at: null,
                created_at: new Date().toISOString(),
            };

            setNotifications(prev => [newNotification, ...prev]);
            setUnreadCount(prev => prev + 1);

            // Play sound nudge
            new Audio('/sounds/notification.mp3').play().catch(() => { });
        });

        return () => {
            window.Echo.leave(`admin.bookings`);
        };
    }, [auth.user]);

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read_at: new Date().toISOString() } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    return { notifications, unreadCount, markAsRead };
}
