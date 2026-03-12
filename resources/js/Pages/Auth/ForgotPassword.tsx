import Button from '@/Components/Button';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { motion } from 'framer-motion';
import { Mail, HelpCircle } from 'lucide-react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-10 text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-4">
                    <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <HelpCircle size={28} />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Forgot Password?</h2>
                <p className="text-slate-500 font-medium leading-relaxed">
                    No problem. Just let us know your email address and we will email you a password reset link.
                </p>
            </div>

            {status && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-4 rounded-xl bg-green-50 text-sm font-medium text-green-600 border border-green-100"
                >
                    {status}
                </motion.div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                            <Mail size={18} />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full pl-11 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl"
                            isFocused={true}
                            placeholder="Enter your registered email"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Button 
                        className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg transition-all" 
                        isLoading={processing}
                    >
                        Send Reset Link
                    </Button>
                </motion.div>
                
                <div className="text-center md:text-left mt-8 pt-8 border-t border-slate-100">
                    <Link href={route('login')} className="text-sm font-bold text-indigo-600 hover:underline">
                        Back to login
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}

import { Link } from '@inertiajs/react';
