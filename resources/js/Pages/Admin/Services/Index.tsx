import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { Plus, Edit2, Trash2, MoreVertical, Eye } from 'lucide-react';
import StatusBadge from '@/Components/StatusBadge';
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
    services: Service[];
}

export default function Index({ services }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this service? All associated slots will be affected.')) {
            router.delete(route('admin.services.destroy', id));
        }
    };

    return (
        <AdminLayout title="Services Management">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Enterprise Services</h2>
                        <p className="text-sm text-slate-500 font-medium">Manage your professional service offerings and pricing.</p>
                    </div>
                    <Link href={route('admin.services.create')}>
                        <Button className="gap-2">
                            <Plus size={18} />
                            Add New Service
                        </Button>
                    </Link>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 border-b border-slate-50 uppercase tracking-wider">Service</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 border-b border-slate-50 uppercase tracking-wider">Duration</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 border-b border-slate-50 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 border-b border-slate-50 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 border-b border-slate-50 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {services.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                            No services found. Start by adding your first service.
                                        </td>
                                    </tr>
                                ) : (
                                    services.map((service) => (
                                        <tr key={service.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div 
                                                        className="h-3 w-3 rounded-full" 
                                                        style={{ backgroundColor: service.color_code }}
                                                    />
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900">{service.name}</p>
                                                        <p className="text-xs text-slate-400 font-medium truncate max-w-[200px]">{service.description}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-slate-600">{service.duration_minutes} mins</td>
                                            <td className="px-6 py-4 text-sm font-bold text-slate-900">${Number(service.price).toFixed(2)}</td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={service.is_active ? 'active' : 'inactive'} />
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={route('admin.services.edit', service.id)}>
                                                        <button className="p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all">
                                                            <Edit2 size={16} />
                                                        </button>
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(service.id)}
                                                        className="p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
