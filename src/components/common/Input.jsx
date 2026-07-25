import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
    label, 
    error, 
    type = 'text', 
    className = '', 
    wrapperClassName = '',
    iconLeft,
    iconRight,
    ...props 
}, ref) => {
    return (
        <div className={`form-control w-full ${wrapperClassName}`}>
            {label && (
                <label className="label">
                    <span className="label-text font-medium text-gray-700">{label}</span>
                </label>
            )}
            
            <div className="relative flex items-center">
                {iconLeft && (
                    <div className="absolute left-4 text-gray-400">
                        {iconLeft}
                    </div>
                )}
                
                <input 
                    type={type}
                    ref={ref}
                    className={`input bg-gray-50 border-gray-200 focus:border-[#c4f05b] focus:bg-white focus:outline-none w-full rounded-xl text-black transition-colors ${iconLeft ? 'pl-11' : 'pl-4'} ${iconRight ? 'pr-11' : 'pr-4'} ${error ? 'border-red-500 focus:border-red-500' : ''} ${className}`}
                    {...props}
                />
                
                {iconRight && (
                    <div className="absolute right-4 text-gray-400">
                        {iconRight}
                    </div>
                )}
            </div>

            {error && (
                <span className="text-red-500 text-xs mt-1.5 ml-1 animate-fade-in">
                    {error.message || error}
                </span>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
