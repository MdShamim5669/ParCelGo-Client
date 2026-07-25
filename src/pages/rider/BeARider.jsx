import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const BeARider = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (user) {
                // Collect form data
                const formData = new FormData(e.target);
                const applicationData = {
                    phone: formData.get('phone'),
                    vehicle: formData.get('vehicle'),
                    zone: formData.get('zone'),
                    nid: formData.get('nid')
                };
                
                await axiosSecure.patch(`/api/v1/users/apply-rider/${user.email}`, applicationData);
            }
            setIsSubmitted(true);
        } catch (error) {
            console.error('Failed to apply as rider:', error);
        }
    };

    const benefits = [
        {
            title: 'Flexible Hours',
            desc: "Choose when and where you want to work. You're fully in control of your own schedule.",
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        },
        {
            title: 'Great Earnings',
            desc: "Competitive rates per delivery with weekly payouts directly to your bank or mobile wallet.",
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        },
        {
            title: 'Health & Support',
            desc: "Dedicated 24/7 rider support and health insurance coverage for top-performing riders.",
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        },
        {
            title: 'Performance Bonuses',
            desc: "Earn extra rewards and multiplier bonuses for completing deliveries during peak hours and bad weather.",
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
        }
    ];

    return (
        <div className="w-full bg-zap-gray pt-20 pb-20 min-h-screen font-sans">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Hero Section */}
                <div className="text-center mb-16 animate-fade-in">
                    <span className="bg-[#c4f05b] text-[#113236] text-[13px] font-bold px-4 py-1.5 rounded-full inline-block mb-6 uppercase tracking-wider">
                        Join Our Fleet
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#113236] mb-6 tracking-tight">
                        Earn on your own schedule
                    </h1>
                    <p className="text-[16px] text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Become a ParCelGo delivery partner. Enjoy flexible hours, competitive payouts, and the freedom to be your own boss.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-stretch">
                    
                    {/* Benefits Section */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-6">
                        <h2 className="text-2xl font-bold text-[#113236] mb-2">Why ride with us?</h2>
                        
                        {benefits.map((benefit, index) => (
                            <div 
                                key={index}
                                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex gap-5 items-start hover:border-[#c4f05b] hover:shadow-md transition-all"
                            >
                                <div className="bg-[#eef8f8] w-14 h-14 rounded-2xl flex items-center justify-center text-[#3a837c] shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {benefit.icon}
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-[18px] font-bold text-[#113236] mb-1">{benefit.title}</h3>
                                    <p className="text-[14px] text-gray-500 leading-relaxed">{benefit.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Application Form */}
                    <div className="w-full lg:w-1/2 flex flex-col">
                        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.04)] border border-gray-100 animate-fade-in flex-grow flex flex-col justify-center">
                            {isSubmitted ? (
                                <div className="text-center py-10 animate-fade-in">
                                    <div className="w-20 h-20 bg-[#eaf4f4] rounded-full flex items-center justify-center mx-auto mb-6 text-[#3a837c]">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#113236] mb-4">Application Submitted!</h3>
                                    <p className="text-gray-500 leading-relaxed mb-8">
                                        Thank you for your interest in joining ParCelGo. Our team will review your application and contact you shortly.
                                    </p>
                                    <button 
                                        onClick={() => setIsSubmitted(false)}
                                        className="btn bg-[#c4f05b] hover:bg-[#b5e054] text-[#113236] font-bold border-none px-8 rounded-full h-12"
                                    >
                                        Submit Another
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold text-[#113236] mb-2">Apply Now</h2>
                                    <p className="text-sm text-gray-500 mb-8">Fill out the form below to get started.</p>
                                    
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="form-control">
                                                <label className="label pt-0 pb-2"><span className="label-text font-semibold text-[#113236]">Full Name</span></label>
                                                <input type="text" name="fullName" placeholder="e.g. John Doe" className="input bg-gray-50 border-gray-200 focus:border-[#c4f05b] focus:bg-white focus:outline-none w-full rounded-xl pl-8 text-black" required />
                                            </div>  
                                            <div className="form-control">
                                                <label className="label pt-0 pb-2"><span className="label-text font-semibold text-[#113236]">Phone Number</span></label>
                                                <input type="tel" name="phone" placeholder="e.g. 01XXX-XXXXXX" className="input bg-gray-50 border-gray-200 focus:border-[#c4f05b] focus:bg-white focus:outline-none w-full rounded-xl pl-8 text-black" required />
                                            </div>
                                        </div>

                                        <div className="form-control">
                                            <label className="label pt-0 pb-2"><span className="label-text font-semibold text-[#113236]">Email Address (Optional)</span></label>
                                            <input type="email" name="email" placeholder="e.g. john@example.com" className="input bg-gray-50 border-gray-200 focus:border-[#c4f05b] focus:bg-white focus:outline-none w-full rounded-xl pl-8 text-black" />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="form-control">
                                                <label className="label pt-0 pb-2 flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-[#eef8f8] text-[#3a837c] flex items-center justify-center text-xs">🛵</span>
                                                    <span className="label-text font-semibold text-[#113236]">Vehicle Type</span>
                                                </label>
                                                <select name="vehicle" className="select bg-gray-50 border-gray-200 focus:border-[#c4f05b] focus:bg-white focus:outline-none w-full rounded-xl pl-8 text-[#113236]" required defaultValue="">
                                                    <option value="" disabled className="text-gray-400">Select Vehicle</option>
                                                    <option value="motorcycle" className="text-black">Motorcycle</option>
                                                    <option value="bicycle" className="text-black">Bicycle</option>
                                                    <option value="van" className="text-black">Van / Light Truck</option>
                                                </select>
                                            </div>
                                            <div className="form-control">
                                                <label className="label pt-0 pb-2 flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-[#f4fce3] text-[#7eb316] flex items-center justify-center text-xs">📍</span>
                                                    <span className="label-text font-semibold text-[#113236]">Preferred Zone</span>
                                                </label>
                                                <select name="zone" className="select bg-gray-50 border-gray-200 focus:border-[#c4f05b] focus:bg-white focus:outline-none w-full rounded-xl pl-8 text-[#113236]" required defaultValue="">
                                                    <option value="" disabled className="text-gray-400">Select Location</option>
                                                    <option value="dhaka" className="text-black">Dhaka</option>
                                                    <option value="chittagong" className="text-black">Chittagong</option>
                                                    <option value="sylhet" className="text-black">Sylhet</option>
                                                    <option value="rajshahi" className="text-black">Rajshahi</option>
                                                    <option value="khulna" className="text-black">Khulna</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-control">
                                            <label className="label pt-0 pb-2"><span className="label-text font-semibold text-[#113236]">NID Number</span></label>
                                            <input type="number" name="nid" placeholder="10 or 17 digit NID number" className="input bg-gray-50 border-gray-200 focus:border-[#c4f05b] focus:bg-white focus:outline-none w-full rounded-xl pl-8 text-black" required />
                                        </div>

                                        <div className="form-control mt-8">
                                            <button type="submit" className="btn bg-[#113236] hover:bg-black text-white border-none w-full rounded-full h-14 text-[16px]">
                                                Submit Application
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

export default BeARider;
