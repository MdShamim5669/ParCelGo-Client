import React from 'react';
import CallToAction from '../CallToAction/CallToAction';

const About = () => {
    return (
        <div className="w-full bg-zap-gray pt-20 pb-16 min-h-screen">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center mb-20 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#113236] mb-6 tracking-tight">
                        About ParCelGo
                    </h1>
                    <p className="text-[16px] text-gray-500 max-w-3xl mx-auto leading-relaxed">
                        We are revolutionizing the logistics industry in Bangladesh by providing fast, reliable, and technology-driven parcel delivery services. Our goal is to bridge the gap between businesses and their customers with zero hassle.
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    <div className="bg-white rounded-[2rem] p-10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-lg transition-shadow">
                        <div className="w-14 h-14 bg-[#eef8f8] rounded-2xl flex items-center justify-center mb-6 text-[#3a837c]">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <h2 className="text-2xl font-bold text-[#113236] mb-4">Our Mission</h2>
                        <p className="text-gray-500 leading-relaxed text-[15px]">
                            To empower businesses of all sizes with seamless logistics support, ensuring that every package reaches its destination safely, securely, and on time. We strive to be the most trusted delivery partner in the region.
                        </p>
                    </div>

                    <div className="bg-[#113236] rounded-[2rem] p-10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] text-white hover:shadow-xl transition-shadow">
                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-[#c4f05b]">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                        <p className="text-gray-300 leading-relaxed text-[15px]">
                            To build a connected ecosystem where technology meets logistics, creating a world where distance is no longer a barrier to commerce. We envision a future where logistics is completely transparent and effortless.
                        </p>
                    </div>
                </div>

                {/* Core Values */}
                <div className="mb-24 text-center">
                    <h2 className="text-3xl font-bold text-[#113236] mb-12">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {[
                            { title: 'Speed & Reliability', desc: 'We value your time. Our optimized routing ensures the fastest delivery times.' },
                            { title: 'Advanced Technology', desc: 'Real-time tracking, automated updates, and seamless API integrations for merchants.' },
                            { title: 'Customer First', desc: 'A dedicated 24/7 support team to resolve all your queries and delivery issues instantly.' }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-gray-100 hover:border-[#c4f05b] hover:shadow-md transition-all cursor-default">
                                <h3 className="text-xl font-bold text-[#113236] mb-3">{item.title}</h3>
                                <p className="text-gray-500 text-[14px] leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            
            {/* Reusing Call To Action at the bottom */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <CallToAction />
            </div>
        </div>
    );
};

export default About;
