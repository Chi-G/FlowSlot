import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Button from '@/Components/Button';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, ArrowRight } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Create Admin Account" />

            <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Join the Team</h2>
                <p className="text-slate-500 font-medium">Create your administrative account to start managing bookings.</p>
            </div>

            <form onSubmit={submit} className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <InputLabel htmlFor="name" value="Full Name" className="mb-2 block text-slate-700 font-semibold" />
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                            <User size={18} />
                        </div>
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="block w-full pl-11 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl"
                            autoComplete="name"
                            isFocused={true}
                            placeholder="John Doe"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.name} className="mt-2" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <InputLabel htmlFor="email" value="Email Address" className="mb-2 block text-slate-700 font-semibold" />
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
                            autoComplete="username"
                            placeholder="you@flowslot.com"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <InputLabel htmlFor="password" value="Password" className="mb-2 block text-slate-700 font-semibold" />
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                <Lock size={18} />
                            </div>
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="block w-full pl-11 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl text-sm"
                                autoComplete="new-password"
                                placeholder="••••••••"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <InputLabel htmlFor="password_confirmation" value="Confirm" className="mb-2 block text-slate-700 font-semibold" />
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                <ShieldCheck size={18} />
                            </div>
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="block w-full pl-11 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl text-sm"
                                autoComplete="new-password"
                                placeholder="••••••••"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                        </div>
                    </motion.div>
                </div>
                
                <div className="col-span-2">
                    <InputError message={errors.password} className="mt-2" />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Button 
                        type="submit"
                        className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 group transition-all"
                        isLoading={processing}
                    >
                        Create Admin Account
                        <UserPlus size={18} className="group-hover:scale-110 transition-transform" />
                    </Button>
                </motion.div>
                
                <div className="text-center md:text-left mt-8 pt-8 border-t border-slate-100">
                    <p className="text-slate-500 text-sm font-medium">
                        Already have an account? <Link href={route('login')} className="text-indigo-600 hover:underline font-bold">Sign in here</Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}

// Helper component for context (though not strictly needed in the file, but good for Lucide)
import { ShieldCheck } from 'lucide-react';
