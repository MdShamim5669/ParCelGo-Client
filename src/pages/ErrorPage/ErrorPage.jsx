import { Link, useRouteError } from "react-router-dom";
import React from 'react';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const is404 = error?.status === 404;

  return (
    <div className="min-h-screen bg-[#eef8f8] flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] shadow-sm p-8 md:p-16 max-w-lg w-full text-center border border-gray-100">
        
        {/* Animated Icon or Text */}
        <div className="relative mb-8">
            <h1 className="text-9xl font-extrabold text-[#113236] opacity-10">
                {is404 ? '404' : 'Ops!'}
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-[#c4f05b] rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-4xl">📦</span>
                </div>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-[#113236] mb-4">
          {is404 ? 'Page Not Found' : 'Something went wrong!'}
        </h2>
        
        <p className="text-gray-500 mb-8">
          {is404 
            ? "Oops! The page you are looking for doesn't exist or has been moved." 
            : error?.statusText || error?.message || "An unexpected error occurred in our system."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
                onClick={() => window.history.back()}
                className="btn btn-outline border-gray-200 text-[#113236] hover:bg-gray-50 hover:border-gray-300 rounded-xl px-8"
            >
                Go Back
            </button>
            <Link 
                to="/" 
                className="btn bg-[#c4f05b] hover:bg-[#b5e054] text-[#113236] border-none rounded-xl px-8"
            >
                Back to Home
            </Link>
        </div>
      </div>
    </div>
  );
}
