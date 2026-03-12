import {
    Dialog,
    DialogPanel,
} from '@headlessui/react';
import { PropsWithChildren } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({
    children,
    show = false,
    maxWidth = '2xl',
    closeable = true,
    onClose = () => {},
}: PropsWithChildren<{
    show: boolean;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    closeable?: boolean;
    onClose: CallableFunction;
}>) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth];

    return (
        <AnimatePresence>
            {show && (
                <Dialog
                    static
                    open={show}
                    onClose={close}
                    className="relative z-[200]"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={close}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm shadow-2xl"
                        aria-hidden="true"
                    />

                    {/* Modal Content */}
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <DialogPanel
                            as="div"
                            className={`w-full overflow-hidden ${maxWidthClass}`}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
                                className="w-full overflow-hidden rounded-2xl bg-white shadow-2xl"
                            >
                                {children}
                            </motion.div>
                        </DialogPanel>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    );
}
