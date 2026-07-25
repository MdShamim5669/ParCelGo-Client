import React, { useState } from 'react';
import { calculatePrice } from '../../utils/pricing';

const SendParcel = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [weight, setWeight] = useState('');
    const [category, setCategory] = useState('');

    const currentPrice = calculatePrice(weight, category === 'documents' ? 'document' : 'non-document');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
        }, 800);
    };

    const features = [
        {
            title: 'Doorstep Pickup',
            desc: 'We will pick up your parcel right from your doorstep, saving you time and effort.',
            icon: '🏠'
        },
        {
            title: 'Live Tracking',
            desc: 'Track your parcel every step of the way with our real-time tracking system.',
            icon: '📍'
        },
        {
            title: 'Safe & Secure',
            desc: 'Your packages are handled with the utmost care and insured against damage.',
            icon: '🛡️'
        }
    ];

    return (
        <div className="w-full bg-zap-gray pt-20 pb-20 min-h-screen font-sans">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Hero Section */}
                <div className="text-center mb-16 animate-fade-in">
                    <span className="bg-[#c4f05b] text-[#113236] text-[13px] font-bold px-4 py-1.5 rounded-full inline-block mb-6 uppercase tracking-wider">
                        Send Delivery
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#113236] mb-6 tracking-tight">
                        Send a Parcel Anywhere
                    </h1>
                    <p className="text-[16px] text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Fast, secure, and reliable delivery service across the country. Just fill in the details and we'll take care of the rest.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-stretch">
                    
                    {/* Features Section */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-6">
                        <h2 className="text-2xl font-bold text-[#113236] mb-2">Why choose us?</h2>
                        
                        {features.map((feature, index) => (
                            <div 
                                key={index}
                                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex gap-5 items-start hover:border-[#c4f05b] hover:shadow-md transition-all"
                            >
                                <div className="bg-[#eef8f8] w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-[18px] font-bold text-[#113236] mb-1">{feature.title}</h3>
                                    <p className="text-[14px] text-gray-500 leading-relaxed">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Booking Form */}
                    <div className="w-full lg:w-2/3 flex flex-col">
                        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.04)] border border-gray-100 animate-fade-in flex-grow flex flex-col justify-center">
                            {isSubmitted ? (
                                <div className="text-center py-10 animate-fade-in">
                                    <div className="w-20 h-20 bg-[#eaf4f4] rounded-full flex items-center justify-center mx-auto mb-6 text-[#3a837c]">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#113236] mb-4">Request Received!</h3>
                                    <p className="text-gray-500 leading-relaxed mb-8">
                                        Your parcel pickup request has been successfully submitted. Our rider will contact you shortly.
                                    </p>
                                    <button 
                                        onClick={() => setIsSubmitted(false)}
                                        className="btn bg-[#c4f05b] hover:bg-[#b5e054] text-[#113236] font-bold border-none px-8 rounded-full h-12"
                                    >
                                        Send Another Parcel
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold text-[#113236] mb-6">Parcel Details</h2>
                                    
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        
                                        {/* Sender & Receiver Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            
                                            {/* Sender Info */}
                                            <div className="space-y-5">
                                                <h3 className="text-[16px] font-bold flex items-center gap-2 text-[#3a837c]">
                                                    <span className="w-6 h-6 rounded-full bg-[#eef8f8] flex items-center justify-center text-xs">📤</span>
                                                    Sender (From)
                                                </h3>
                                                <div className="form-control">
                                                    <input type="text" placeholder="Sender Name" className="input bg-gray-50 border-gray-200 focus:border-[#c4f05b] focus:bg-white focus:outline-none w-full rounded-xl pl-6 text-black" required />
                                                </div>  
                                                <div className="form-control">
                                                    <input type="tel" placeholder="Sender Phone (01XXX)" className="input bg-gray-50 border-gray-200 focus:border-[#c4f05b] focus:bg-white focus:outline-none w-full rounded-xl pl-6 text-black" required />
                                                </div>
                                                <div className="form-control">
                                                    <textarea placeholder="Pickup Address" className="textarea bg-gray-50 border-gray-200 focus:border-[#c4f05b] focus:bg-white focus:outline-none w-full rounded-xl pl-6 pt-4 text-black min-h-[100px]" required></textarea>
                                                </div>
                                            </div>

                                            {/* Receiver Info */}
                                            <div className="space-y-5">
                                                <h3 className="text-[16px] font-bold flex items-center gap-2 text-[#7eb316]">
                                                    <span className="w-6 h-6 rounded-full bg-[#f4fce3] flex items-center justify-center text-xs">📥</span>
                                                    Receiver (To)
                                                </h3>
                                                <div className="form-control">
                                                    <input type="text" placeholder="Receiver Name" className="input bg-gray-50 border-gray-200 focus:border-[#c4f05b] focus:bg-white focus:outline-none w-full rounded-xl pl-6 text-black" required />
                                                </div>  
                                                <div className="form-control">
                                                    <input type="tel" placeholder="Receiver Phone (01XXX)" className="input bg-gray-50 border-gray-200 focus:border-[#c4f05b] focus:bg-white focus:outline-none w-full rounded-xl pl-6 text-black" required />
                                                </div>
                                                <div className="form-control">
                                                    <textarea placeholder="Delivery Address" className="textarea bg-gray-50 border-gray-200 focus:border-[#c4f05b] focus:bg-white focus:outline-none w-full rounded-xl pl-6 pt-4 text-black min-h-[100px]" required></textarea>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="divider"></div>

                                        {/* Parcel Details */}
                                        <div className="space-y-5">
                                            <h3 className="text-[16px] font-bold text-[#113236]">Package Information</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div className="form-control">
                                                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="select bg-gray-50 border-gray-200 focus:border-[#c4f05b] focus:bg-white focus:outline-none w-full rounded-xl pl-6 text-[#113236]" required>
                                                        <option value="" disabled className="text-gray-400">Select Parcel Category</option>
                                                        <option value="documents" className="text-black">Documents & Papers</option>
                                                        <option value="electronics" className="text-black">Electronics / Gadgets</option>
                                                        <option value="clothing" className="text-black">Clothing & Apparels</option>
                                                        <option value="food" className="text-black">Food (Non-perishable)</option>
                                                        <option value="fragile" className="text-black">Fragile Items</option>
                                                        <option value="other" className="text-black">Other</option>
                                                    </select>
                                                </div>
                                                <div className="form-control flex flex-row items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#c4f05b] focus-within:bg-white">
                                                    <input type="number" step="0.1" min="0" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Estimated Weight" className="input bg-transparent border-none focus:outline-none w-full pl-6 text-black" required />
                                                    <span className="pr-6 font-semibold text-gray-400">KG</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 p-6 rounded-2xl border border-gray-100 gap-4 mt-8">
                                            <div className="flex flex-col">
                                                <span className="text-gray-500 text-sm font-medium">Estimated Cost</span>
                                                <span className="text-3xl font-extrabold text-[#113236]">
                                                    ৳ {currentPrice}
                                                </span>
                                                <span className="text-xs text-gray-400 mt-1">Based on weight and category</span>
                                            </div>
                                            <button type="submit" className="btn bg-[#113236] hover:bg-black text-white border-none w-full sm:w-auto rounded-full px-10 h-14 text-[16px]">
                                                Confirm Pickup Request
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendParcel;
