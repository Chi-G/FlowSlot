import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertCircle, Trash2, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
    show: boolean;
    title: string;
    description: string;
    onClose: () => void;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'primary' | 'warning';
    isLoading?: boolean;
}

export default function ConfirmationModal({
    show,
    title,
    description,
    onClose,
    onConfirm,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger',
    isLoading = false
}: Props) {
    const icons = {
        danger: <Trash2 className="text-rose-600" size={24} />,
        primary: <LogOut className="text-indigo-600" size={24} />,
        warning: <AlertCircle className="text-amber-600" size={24} />,
    };

    const variantStyles = {
        danger: 'bg-rose-50 text-rose-600 border-rose-100',
        primary: 'bg-indigo-50 text-indigo-600 border-indigo-100',
        warning: 'bg-amber-50 text-amber-600 border-amber-100',
    };

    const buttonVariants: Record<string, 'primary' | 'danger' | 'success' | 'outline' | 'ghost'> = {
        danger: 'danger',
        primary: 'primary',
        warning: 'primary',
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className={`h-12 w-12 rounded-2xl border flex items-center justify-center ${variantStyles[variant]}`}>
                        {icons[variant]}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                        <p className="text-sm text-slate-500 font-medium mt-1">{description}</p>
                    </div>
                </div>

                <div className="flex gap-3 mt-8">
                    <Button
                        variant="ghost"
                        className="flex-1 h-12 rounded-xl text-slate-500 font-bold hover:bg-slate-50"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant={buttonVariants[variant]}
                        className="flex-1 h-12 rounded-xl font-bold shadow-lg"
                        onClick={onConfirm}
                        isLoading={isLoading}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
