import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';
import { ChevronLeft, Calendar, Clock, Zap, RefreshCw } from 'lucide-react';
import Button from '@/Components/Button';

interface Service {
    id: number;
    name: string;
}

interface Props {
    services: Service[];
}

export default function Index({ services }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        service_id: services[0]?.id || '',
        start_date: '',
        end_date: '',
        start_time: '09:00',
        end_time: '17:00',
        interval_minutes: 30,
    });

    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.slots.store'));
    };

    return (
        <AdminLayout title="Generate Time Slots">
            <div className="max-w-6xl">
                <Link href={route('admin.dashboard')} className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 mb-6">
                    <ChevronLeft size={16} /> Back to dashboard
                </Link>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="bg-indigo-600 p-8 text-white">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
                                <Zap size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Bulk Slot Generator</h2>
                        </div>
                        <p className="text-indigo-100 font-medium">Automatically create available time slots for your services. Specify the date range, working hours, and session intervals.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-slate-700 mb-2">Select Service</label>
                                <select 
                                    className="w-full px-4 py-3 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-slate-700 shadow-sm"
                                    value={data.service_id}
                                    onChange={e => setData('service_id', e.target.value)}
                                >
                                    <option value="" disabled>Choose a service...</option>
                                    {services.map(service => (
                                        <option key={service.id} value={service.id}>{service.name}</option>
                                    ))}
                                </select>
                                {errors.service_id && <p className="mt-1 text-xs font-bold text-rose-500">{errors.service_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Start Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type="date"
                                        required
                                        min={today}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-slate-700 shadow-sm"
                                        value={data.start_date}
                                        onChange={e => setData('start_date', e.target.value)}
                                    />
                                </div>
                                {errors.start_date && <p className="mt-1 text-xs font-bold text-rose-500">{errors.start_date}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">End Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type="date"
                                        required
                                        min={data.start_date || today}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-slate-700 shadow-sm"
                                        value={data.end_date}
                                        onChange={e => setData('end_date', e.target.value)}
                                    />
                                </div>
                                {errors.end_date && <p className="mt-1 text-xs font-bold text-rose-500">{errors.end_date}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Daily Start Time</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type="time"
                                        required
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-slate-700 shadow-sm"
                                        value={data.start_time}
                                        onChange={e => setData('start_time', e.target.value)}
                                    />
                                </div>
                                {errors.start_time && <p className="mt-1 text-xs font-bold text-rose-500">{errors.start_time}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Daily End Time</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type="time"
                                        required
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-slate-700 shadow-sm"
                                        value={data.end_time}
                                        onChange={e => setData('end_time', e.target.value)}
                                    />
                                </div>
                                {errors.end_time && <p className="mt-1 text-xs font-bold text-rose-500">{errors.end_time}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Slot Interval (Min)</label>
                                <div className="relative">
                                    <RefreshCw className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type="number"
                                        required
                                        min="5"
                                        step="5"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-slate-700 shadow-sm"
                                        value={data.interval_minutes}
                                        onChange={e => setData('interval_minutes', parseInt(e.target.value))}
                                    />
                                </div>
                                {errors.interval_minutes && <p className="mt-1 text-xs font-bold text-rose-500">{errors.interval_minutes}</p>}
                            </div>

                        </div>

                        <div className="pt-8 border-t border-slate-50 flex justify-end">
                            <Button 
                                type="submit" 
                                isLoading={processing} 
                                className="px-12 py-4 h-auto text-base gap-3"
                            >
                                <Zap size={20} />
                                Generate Available Slots
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
