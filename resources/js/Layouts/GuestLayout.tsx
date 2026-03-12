import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
            {/* Left Side: Branding & Info */}
            <div className="hidden md:flex md:w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10 max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/" className="mb-12 block w-max">
                            <ApplicationLogo className="h-20 w-auto rounded-xl shadow-lg" />
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                            Enterprise-Grade <span className="text-indigo-400">Scheduling</span> Made Simple.
                        </h1>
                        <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                            Manage bookings, teams, and customer relationships in one beautifully designed workspace.
                        </p>

                        <div className="grid gap-6">
                            {[
                                { text: 'Real-time synchronization across all devices', icon: Sparkles },
                                { text: 'Automated email and SMS notifications', icon: CheckCircle2 },
                                { text: 'Bank-grade security and data encryption', icon: ShieldCheck }
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-4 text-slate-300">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-indigo-400">
                                        <feature.icon size={20} />
                                    </div>
                                    <span className="font-medium">{feature.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Decorative element */}
                <div className="absolute bottom-12 left-12 right-12 flex justify-between items-center text-slate-500 text-sm">
                    <span>© {new Date().getFullYear()} FlowSlot Inc.</span>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                    </div>
                </div>
            </div>

            {/* Right Side: Auth Form */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-24 bg-white relative">
                <div className="md:hidden absolute top-8 left-8">
                    <Link href="/">
                        <ApplicationLogo className="h-10 w-10" />
                    </Link>
                </div>

                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
}
