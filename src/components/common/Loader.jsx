import React from 'react';

const Loader = ({ fullScreen = false, size = 'lg', text = '' }) => {
    const sizeClasses = {
        xs: 'loading-xs',
        sm: 'loading-sm',
        md: 'loading-md',
        lg: 'loading-lg'
    };

    const loaderContent = (
        <div className="flex flex-col items-center justify-center gap-3">
            <span className={`loading loading-spinner text-[#c4f05b] ${sizeClasses[size]}`}></span>
            {text && <p className="text-[#113236] font-medium animate-pulse">{text}</p>}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                {loaderContent}
            </div>
        );
    }

    return (
        <div className="flex w-full items-center justify-center py-10">
            {loaderContent}
        </div>
    );
};

export default Loader;
