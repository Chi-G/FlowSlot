import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { Plus, Edit2, Trash2, MoreVertical, Eye, Search, X } from 'lucide-react';
import StatusBadge from '@/Components/StatusBadge';
import Button from '@/Components/Button';
import ConfirmationModal from '@/Components/ConfirmationModal';
import TextInput from '@/Components/TextInput';
import Pagination from '@/Components/Pagination';

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
    services: {
        data: Service[];
        links: any[];
    };
    filters: {
        search: string;
    };
}

export default function Index({ services, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState<number | null>(null);

    // Debounced search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search !== (filters.search || '')) {
                router.get(
                    route('admin.services.index'),
                    { search: search },
                    { preserveState: true, replace: true }
                );
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [search]);

    const handleDelete = (id: number) => {
        setServiceToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (serviceToDelete) {
            router.delete(route('admin.services.destroy', serviceToDelete), {
                onFinish: () => {
                    setShowDeleteModal(false);
                    setServiceToDelete(null);
                }
            });
        }
    };

    return (
        <AdminLayout title="Services Management">
            <ConfirmationModal
                show={showDeleteModal}
                title="Delete Service?"
                description="Are you sure you want to delete this service? This action cannot be undone and will affect all scheduled slots."
                confirmText="Delete Service"
                variant="danger"
                onClose={() => {
                    setShowDeleteModal(false);
                    setServiceToDelete(null);
                }}
                onConfirm={confirmDelete}
            />

            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Enterprise Services</h2>
                        <p className="text-sm text-slate-500 font-medium">Manage your professional service offerings and pricing.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative w-full md:w-64 group">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                <Search size={16} />
                            </div>
                            <TextInput
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search services..."
                                className="pl-10 h-10 w-full bg-white border-slate-200"
                            />
                            {search && (
                                <button 
                                    onClick={() => setSearch('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                        <Link href={route('admin.services.create')}>
                            <Button className="gap-2 h-10 whitespace-nowrap">
                                <Plus size={18} />
                                Add New
                            </Button>
                        </Link>
                    </div>
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
                                {services.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                            {search ? 'No services match your search.' : 'No services found. Start by adding your first service.'}
                                        </td>
                                    </tr>
                                ) : (
                                    services.data.map((service) => (
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
                                                        <button className="p-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-all shadow-sm" title="Edit Service">
                                                                <Edit2 size={16} />
                                                        </button>
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(service.id)}
                                                        className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-all shadow-sm"
                                                        title="Delete Service"
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

                <Pagination links={services.links} />
            </div>
        </AdminLayout>
    );
}
