import React from 'react';

const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    className = '', 
    isLoading = false, 
    disabled = false, 
    icon, 
    ...props 
}) => {
    // ParCelGo Theme Colors: #113236 (Dark), #c4f05b (Lime)
    const baseClasses = "btn border-none rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2";
    
    const variants = {
        primary: "bg-[#113236] hover:bg-black text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
        secondary: "bg-[#c4f05b] hover:bg-[#b5e054] text-[#113236] shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
        outline: "bg-transparent border-2 border-[#113236] text-[#113236] hover:bg-[#113236] hover:text-white",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
        danger: "bg-red-50 hover:bg-red-500 text-red-500 hover:text-white shadow-sm"
    };

    const sizes = {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-base",
        lg: "h-14 px-8 text-lg w-full sm:w-auto"
    };

    return (
        <button 
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
            ) : (
                <>
                    {icon && <span className="w-5 h-5 flex items-center justify-center">{icon}</span>}
                    {children}
                </>
            )}
        </button>
    );
};

export default Button;
