import React, { useState, useEffect } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, router } from '@inertiajs/react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, eachDayOfInterval } from 'date-fns';
import { ChevronLeft, ChevronRight, Clock, Info, Tag } from 'lucide-react';
import Button from '@/Components/Button';
import StatusBadge from '@/Components/StatusBadge';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface Service {
    id: number;
    name: string;
    description: string;
    duration_minutes: number;
    price: number;
    color_code: string;
}

interface TimeSlot {
    id: number;
    start_time: string;
    end_time: string;
    status: string;
}

interface Props {
    service: Service;
}

export default function Show({ service }: Props) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

    useEffect(() => {
        fetchSlots(selectedDate);
    }, [selectedDate]);

    useEffect(() => {
        fetchAvailableDates(currentMonth);
    }, [currentMonth]);

    const fetchSlots = async (date: Date) => {
        setIsLoadingSlots(true);
        try {
            const response = await axios.get(`/api/slots/${service.id}?date=${format(date, 'yyyy-MM-dd')}`);
            setSlots(response.data);
        } catch (error) {
            console.error('Error fetching slots:', error);
        } finally {
            setIsLoadingSlots(false);
        }
    };

    const fetchAvailableDates = async (month: Date) => {
        try {
            const response = await axios.get(`/api/available-dates/${service.id}?month=${format(month, 'yyyy-MM')}`);
            setAvailableDates(response.data);
        } catch (error) {
            console.error('Error fetching available dates:', error);
        }
    };

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between px-4 py-4 bg-white border-b border-slate-100 rounded-t-2xl">
                <h2 className="text-lg font-bold text-slate-900">{format(currentMonth, 'MMMM yyyy')}</h2>
                <div className="flex gap-2">
                    <button onClick={prevMonth} className="p-2 hover:bg-slate-50 rounded-full transition-colors"><ChevronLeft size={20} /></button>
                    <button onClick={nextMonth} className="p-2 hover:bg-slate-50 rounded-full transition-colors"><ChevronRight size={20} /></button>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return (
            <div className="grid grid-cols-7 border-b border-slate-50 bg-slate-50/50">
                {days.map((day, i) => (
                    <div key={i} className="py-3 text-center text-xs font-bold uppercase tracking-wider text-slate-400">
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);
        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const cloneDay = day;
                const isSelected = isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, monthStart);
                const dateStr = format(day, 'yyyy-MM-dd');
                const isAvailable = availableDates.includes(dateStr);
                
                days.push(
                    <div
                        key={day.toString()}
                        className={`relative h-14 cursor-pointer border-r border-b border-slate-50 p-1 flex flex-col items-center justify-center transition-all hover:bg-indigo-50/50 ${
                            !isCurrentMonth ? 'bg-slate-50/30 text-slate-300' : 'text-slate-700'
                        } ${isSelected ? 'bg-indigo-100/50 ring-1 ring-inset ring-indigo-500 z-10' : ''} ${
                            isAvailable && isCurrentMonth && !isSelected ? 'bg-emerald-50/60' : ''
                        }`}
                        onClick={() => setSelectedDate(cloneDay)}
                    >
                        <span className={`text-sm font-semibold select-none ${isSelected ? 'text-indigo-600' : ''}`}>
                            {format(day, 'd')}
                        </span>
                        {isAvailable && isCurrentMonth && (
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1">
                                <div className="h-1 w-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            </div>
                        )}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(<div className="grid grid-cols-7" key={day.toString()}>{days}</div>);
            days = [];
        }
        return <div className="bg-white">{rows}</div>;
    };

    return (
        <PublicLayout title={`Book ${service.name}`}>
            <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Left: Service Info & Calendar */}
                    <div className="lg:col-span-8">
                        <div className="mb-8">
                            <Link href="/services" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 mb-4">
                                <ChevronLeft size={16} /> Back to services
                            </Link>
                            <h1 className="text-3xl font-bold text-slate-900">{service.name}</h1>
                            <p className="mt-2 text-slate-500">{service.description}</p>
                            <div className="mt-4 flex items-center gap-6">
                                <div className="flex items-center gap-2 text-slate-700">
                                    <Clock size={18} className="text-indigo-600" />
                                    <span className="text-sm font-bold">{service.duration_minutes} Minutes</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-700">
                                    <Tag size={18} className="text-indigo-600" />
                                    <span className="text-sm font-bold">${Number(service.price).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                            {renderHeader()}
                            {renderDays()}
                            {renderCells()}
                        </div>
                    </div>

                    {/* Right: Time Slots */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center justify-between">
                                Available Time
                                <span className="text-xs font-medium text-slate-400">{format(selectedDate, 'MMM d, yyyy')}</span>
                            </h3>

                            <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-1">
                                <AnimatePresence mode="wait">
                                    {isLoadingSlots ? (
                                        <motion.div 
                                            key="loading"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="col-span-2 py-12 text-center text-slate-400"
                                        >
                                            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
                                        </motion.div>
                                    ) : slots.length === 0 ? (
                                        <motion.div 
                                            key="empty"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="col-span-2 py-12 text-center text-slate-400 bg-slate-50 rounded-xl"
                                        >
                                            <Info size={32} className="mx-auto mb-2 opacity-20" />
                                            <p className="text-sm font-medium">No slots found for this date</p>
                                        </motion.div>
                                    ) : (
                                        <motion.div 
                                            key="slots-grid"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="col-span-2 grid grid-cols-2 gap-3"
                                        >
                                            {slots.map((slot) => (
                                                <button
                                                    key={slot.id}
                                                    onClick={() => setSelectedSlot(slot)}
                                                    className={`rounded-xl border-2 py-3 px-2 text-sm font-bold transition-all ${
                                                        selectedSlot?.id === slot.id
                                                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                                            : 'border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 text-slate-600'
                                                    }`}
                                                >
                                                    {format(new Date(slot.start_time), 'h:mm a')}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-100">
                                <Button 
                                    className="w-full py-4 text-base"
                                    disabled={!selectedSlot}
                                    onClick={() => router.get(`/book/confirm/${service.id}/${selectedSlot?.id}`)}
                                >
                                    Continue to Booking
                                </Button>
                                <p className="mt-4 text-[10px] text-center text-slate-400 font-medium">
                                    You'll provide your details in the next step
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
