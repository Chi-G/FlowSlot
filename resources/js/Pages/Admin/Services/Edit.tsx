import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';
import { ChevronLeft, Save, Trash2 } from 'lucide-react';
import Button from '@/Components/Button';

interface Service {
    id: number;
    name: string;
    description: string;
    duration_minutes: number;
    price: number;
    color_code: string;
    is_active: boolean;
}

interface Props {
    service: Service;
}

export default function Edit({ service }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: service.name,
        description: service.description,
        duration_minutes: service.duration_minutes,
        price: service.price,
        color_code: service.color_code,
        is_active: service.is_active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.services.update', service.id));
    };

    return (
        <AdminLayout title="Edit Service">
            <div className="max-w-3xl">
                <Link href={route('admin.services.index')} className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 mb-6">
                    <ChevronLeft size={16} /> Back to services
                </Link>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-slate-700 mb-2">Service Name</label>
                                <input 
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                />
                                {errors.name && <p className="mt-1 text-xs font-bold text-rose-500">{errors.name}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                                <textarea 
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                />
                                {errors.description && <p className="mt-1 text-xs font-bold text-rose-500">{errors.description}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Duration (Minutes)</label>
                                <input 
                                    type="number"
                                    required
                                    min="5"
                                    className="w-full px-4 py-3 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                    value={data.duration_minutes}
                                    onChange={e => setData('duration_minutes', parseInt(e.target.value))}
                                />
                                {errors.duration_minutes && <p className="mt-1 text-xs font-bold text-rose-500">{errors.duration_minutes}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Price ($)</label>
                                <input 
                                    type="number"
                                    required
                                    min="0"
                                    step="0.01"
                                    className="w-full px-4 py-3 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                    value={data.price}
                                    onChange={e => setData('price', parseFloat(e.target.value))}
                                />
                                {errors.price && <p className="mt-1 text-xs font-bold text-rose-500">{errors.price}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Color Label</label>
                                <div className="flex gap-3">
                                    <input 
                                        type="color"
                                        className="h-12 w-20 rounded-lg border-slate-200 p-1 cursor-pointer"
                                        value={data.color_code}
                                        onChange={e => setData('color_code', e.target.value)}
                                    />
                                    <input 
                                        type="text"
                                        className="flex-1 px-4 py-3 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-mono"
                                        value={data.color_code}
                                        onChange={e => setData('color_code', e.target.value)}
                                    />
                                </div>
                                {errors.color_code && <p className="mt-1 text-xs font-bold text-rose-500">{errors.color_code}</p>}
                            </div>

                            <div className="flex items-end pb-3">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative">
                                        <input 
                                            type="checkbox" 
                                            className="sr-only"
                                            checked={data.is_active}
                                            onChange={e => setData('is_active', e.target.checked)}
                                        />
                                        <div className={`block w-14 h-8 rounded-full transition-colors ${data.is_active ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
                                        <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${data.is_active ? 'translate-x-6' : ''}`}></div>
                                    </div>
                                    <span className="text-sm font-bold text-slate-700">Display publicly</span>
                                </label>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-50 flex justify-end gap-4">
                            <Link href={route('admin.services.index')}>
                                <Button variant="outline" type="button">Cancel</Button>
                            </Link>
                            <Button type="submit" isLoading={processing} className="gap-2">
                                <Save size={18} />
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
