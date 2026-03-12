import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Tag, ChevronRight } from 'lucide-react';
import Button from './Button';

interface Service {
    id: number;
    name: string;
    description: string;
    duration_minutes: number;
    price: number;
    color_code: string;
}

interface ServiceCardProps {
    service: Service;
    onSelect: (service: Service) => void;
}

export default function ServiceCard({ service, onSelect }: ServiceCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-100 transition-all hover:shadow-xl hover:shadow-indigo-100/50"
        >
            <div 
                className="absolute top-0 right-0 h-24 w-24 translate-x-12 -translate-y-12 rounded-full opacity-10 transition-transform group-hover:scale-150"
                style={{ backgroundColor: service.color_code || '#4f46e5' }}
            />

            <div className="relative flex flex-col h-full">
                <div className="flex items-start justify-between gap-4">
                    <div 
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-lg"
                        style={{ backgroundColor: service.color_code || '#4f46e5' }}
                    >
                        <Tag size={24} />
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-slate-900">${Number(service.price).toFixed(2)}</p>
                        <p className="text-xs font-medium text-slate-400">inc. tax</p>
                    </div>
                </div>

                <div className="mt-6 flex-1">
                    <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{service.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-2">{service.description}</p>
                </div>

                <div className="mt-8 flex items-center justify-between gap-4 pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-2 text-slate-500">
                        <Clock size={18} className="text-indigo-600" />
                        <span className="text-sm font-semibold">{service.duration_minutes} mins</span>
                    </div>
                    <Button 
                        size="sm" 
                        onClick={() => onSelect(service)}
                        className="gap-2 group/btn"
                    >
                        Book Now
                        <ChevronRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
