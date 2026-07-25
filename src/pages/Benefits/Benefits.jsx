import React from 'react';
import liveTracking from '../../assets/live-tracking.png';
import safeDelivery from '../../assets/safe-delivery.png';

const Benefits = () => {
    const benefits = [
        {
            title: "Live Parcel Tracking",
            description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
            image: liveTracking
        },
        {
            title: "100% Safe Delivery",
            description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
            image: safeDelivery
        },
        {
            title: "24/7 Call Center Support",
            description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
            image: safeDelivery // Using safe-delivery image as per the design mockup which repeats it
        }
    ];

    return (
        <div className="w-full py-12">
            <div className="flex flex-col gap-6">
                {benefits.map((benefit, index) => (
                    <div key={index} className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/50 flex flex-col md:flex-row items-center gap-8 md:gap-12 transition-transform duration-300 hover:-translate-y-1">
                        {/* Image Section */}
                        <div className="w-full md:w-1/3 flex justify-center shrink-0">
                            <img src={benefit.image} alt={benefit.title} className="h-40 sm:h-48 md:h-56 object-contain" />
                        </div>
                        
                        {/* Divider - only visible on md+ screens */}
                        <div className="hidden md:block w-0 self-stretch border-l-2 border-dashed border-gray-300/80 my-4"></div>
                        
                        {/* Text Section */}
                        <div className="w-full md:w-2/3 text-center md:text-left pr-0 md:pr-8">
                            <h3 className="text-xl md:text-[22px] font-bold text-[#113236] mb-4 tracking-tight">{benefit.title}</h3>
                            <p className="text-[15px] text-gray-500 leading-relaxed font-normal">
                                {benefit.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Benefits;
