import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, X } from 'lucide-react';

interface ToastProps {
    message: string | null;
    type?: 'success' | 'error';
    onClose: () => void;
}

export default function Toast({ message, type = 'success', onClose }: ToastProps) {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed top-6 right-6 z-[300] min-w-[320px] max-w-md"
                >
                    <div className={`
                        relative overflow-hidden rounded-2xl border p-4 shadow-2xl backdrop-blur-md
                        ${type === 'success' 
                            ? 'bg-emerald-50/90 border-emerald-100 text-emerald-900' 
                            : 'bg-rose-50/90 border-rose-100 text-rose-900'}
                    `}>
                        <div className="flex items-start gap-3">
                            <div className={`
                                mt-0.5 rounded-full p-1
                                ${type === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}
                            `}>
                                {type === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                            </div>
                            
                            <div className="flex-1 pr-6">
                                <p className="text-sm font-bold uppercase tracking-wider opacity-60">
                                    {type === 'success' ? 'Success' : 'Attention'}
                                </p>
                                <p className="text-sm font-medium mt-0.5 leading-relaxed">
                                    {message}
                                </p>
                            </div>

                            <button 
                                onClick={onClose}
                                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        
                        {/* Progress bar */}
                        <motion.div 
                            initial={{ width: '100%' }}
                            animate={{ width: '0%' }}
                            transition={{ duration: 4, ease: 'linear' }}
                            className={`absolute bottom-0 left-0 h-1 ${type === 'success' ? 'bg-emerald-500/30' : 'bg-rose-500/30'}`}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
