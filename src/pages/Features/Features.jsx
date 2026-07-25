import React from 'react';
import bookingIcon from '../../assets/bookingIcon.png';

const Features = () => {
    const cards = [
        {
            title: "Booking Pick & Drop",
            description: "From personal packages to business shipments — we deliver on time, every time."
        },
        {
            title: "Cash On Delivery",
            description: "From personal packages to business shipments — we deliver on time, every time."
        },
        {
            title: "Delivery Hub",
            description: "From personal packages to business shipments — we deliver on time, every time."
        },
        {
            title: "Booking SME & Corporate",
            description: "From personal packages to business shipments — we deliver on time, every time."
        }
    ];

    return (
        <div className="py-16 mt-8 w-full">
            <h2 className="text-[26px] md:text-3xl font-extrabold text-zap-dark mb-8 pl-1">How it Works</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div key={index} className="bg-white rounded-[1.5rem] p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col items-start hover:shadow-md transition-shadow">
                        <div className="mb-6">
                            <img src={bookingIcon} alt={card.title} className="w-14 h-14 object-contain" />
                        </div>
                        <h3 className="text-[17px] font-bold text-zap-dark mb-3 tracking-tight">{card.title}</h3>
                        <p className="text-[15px] text-gray-500 leading-relaxed font-normal">
                            {card.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;
