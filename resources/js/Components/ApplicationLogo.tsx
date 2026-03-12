import { ImgHTMLAttributes } from 'react';

export default function ApplicationLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl shadow-xl shadow-indigo-100 p-2 overflow-hidden border-2 border-white">
            <img 
                {...props} 
                src="/logo.jpg" 
                alt="FlowSlot Logo" 
                className={props.className || "h-full w-full object-cover rounded-lg"} 
            />
        </div>
    );
}
