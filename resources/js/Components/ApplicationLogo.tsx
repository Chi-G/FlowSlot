import { usePage } from '@inertiajs/react';
import { ImgHTMLAttributes } from 'react';

export default function ApplicationLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
    const { logo_url } = usePage().props as any;

    return (
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl shadow-xl shadow-indigo-100 p-2 overflow-hidden border-2 border-white">
            <img 
                {...props} 
                src={logo_url || "/logo.jpg"} 
                alt="FlowSlot Logo" 
                className={props.className || "h-full w-full object-cover rounded-lg"} 
            />
        </div>
    );
}
