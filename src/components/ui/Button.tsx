import type { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "icon";
    className?: string;
}

export const Button = ({ children, onClick, variant = "primary", className = "" }: ButtonProps) => {
    const baseStyles = "transition-all active:scale-95 flex items-center justify-center gap-2 font-bold";
    
    const variants = {
        primary: "px-10 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/25 text-sm tracking-wide",
        secondary: "px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 text-slate-300",
        icon: "p-3 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white border border-transparent hover:border-slate-700"
    };

    return (
        <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
};