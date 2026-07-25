import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import customerTop from '../../assets/customer-top.png';

const Reviews = () => {
    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const response = await axios.get('/reviews.json');
            return response.data;
        }
    });

    const [currentIndex, setCurrentIndex] = useState(0);

    if (isLoading) return <div className="py-20 text-center">Loading reviews...</div>;
    if (reviews.length === 0) return null;

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));

    // Get 3 items for display: left, center, right
    const getVisibleReviews = () => {
        const prev = currentIndex === 0 ? reviews.length - 1 : currentIndex - 1;
        const next = currentIndex === reviews.length - 1 ? 0 : currentIndex + 1;
        return [
            { ...reviews[prev], position: 'left' }, 
            { ...reviews[currentIndex], position: 'center' }, 
            { ...reviews[next], position: 'right' }
        ];
    };

    const visibleReviews = getVisibleReviews();

    return (
        <div className="w-full bg-zap-gray py-20">
            <div className="text-center mb-16 px-4 max-w-3xl mx-auto flex flex-col items-center">
                <img src={customerTop} alt="Customer Satisfaction" className="h-24 md:h-32 mb-6 object-contain drop-shadow-sm" />
                <h2 className="text-[28px] md:text-4xl lg:text-[42px] font-bold text-[#113236] mb-6 tracking-tight">What our customers are sayings</h2>
                <p className="text-[15px] text-gray-500 leading-relaxed font-normal">
                    Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-8 min-h-[300px]">
                    {visibleReviews.map((review, idx) => {
                        const isCenter = review.position === 'center';
                        
                        return (
                            <div 
                                key={`${review.id}-${review.position}`} 
                                className={`w-full md:w-1/3 p-8 md:p-10 rounded-[2.5rem] transition-all duration-500 flex flex-col ${
                                    isCenter 
                                    ? 'bg-white shadow-[0_10px_40px_rgba(0,0,0,0.05)] scale-100 z-10 opacity-100' 
                                    : 'bg-transparent border border-gray-200/50 scale-95 opacity-50 hidden md:flex'
                                }`}
                            >
                                <div className="text-[#a8e0cb] text-6xl font-serif leading-none mb-4">"</div>
                                <p className="text-[15px] text-gray-500 leading-relaxed font-normal flex-grow">
                                    {review.review}
                                </p>
                                <div className="border-t border-dashed border-gray-300 pt-6 mt-6 flex items-center gap-4">
                                    <img src={review.user_photoURL} alt={review.userName} className={`w-12 h-12 rounded-full object-cover ${isCenter ? '' : 'grayscale opacity-70'}`} />
                                    <div>
                                        <h4 className={`font-bold text-[17px] ${isCenter ? 'text-[#113236]' : 'text-gray-500'}`}>{review.userName}</h4>
                                        <p className="text-[13px] text-gray-400">Customer</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6 mt-12">
                    <button onClick={prevSlide} className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-[#113236] transition-colors border border-gray-100 hover:border-gray-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    
                    <div className="flex gap-2">
                        {reviews.slice(0, 5).map((_, idx) => (
                            <div key={idx} className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === (currentIndex % 5) ? 'bg-[#113236] w-4' : 'bg-gray-300'}`}></div>
                        ))}
                    </div>

                    <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-[#c4f05b] hover:bg-[#b5e054] shadow-sm flex items-center justify-center text-[#113236] transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reviews;
