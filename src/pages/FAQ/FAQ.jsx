import React, { useState } from 'react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "How does this posture corrector work?",
            answer: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here's how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders."
        },
        {
            question: "Is it suitable for all ages and body types?",
            answer: "Yes, our product is designed with adjustable straps to comfortably fit various body types and is suitable for most age groups."
        },
        {
            question: "Does it really help with back pain and posture improvement?",
            answer: "Many users report significant improvements in posture and reduction in back pain with consistent use, as it trains your muscles to maintain proper alignment."
        },
        {
            question: "Does it have smart features like vibration alerts?",
            answer: "This specific model focuses on structural support. However, we do offer advanced models with smart sensors and vibration alerts in our premium range."
        },
        {
            question: "How will I be notified when the product is back in stock?",
            answer: "You can sign up for email notifications on the product page. We will send you an alert as soon as the item is available again."
        }
    ];

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <div className="w-full bg-zap-gray py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-[28px] md:text-4xl lg:text-[42px] font-bold text-[#113236] mb-6 tracking-tight">
                        Frequently Asked Question (FAQ)
                    </h2>
                    <p className="text-[15px] text-gray-500 max-w-3xl mx-auto leading-relaxed font-normal">
                        Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
                    </p>
                </div>

                {/* FAQ List */}
                <div className="flex flex-col gap-4 mb-12">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div 
                                key={index} 
                                className={`rounded-[1.2rem] overflow-hidden transition-all duration-300 cursor-pointer ${
                                    isOpen 
                                    ? 'bg-[#eaf5f5] border border-[#7dbcb8] shadow-sm' 
                                    : 'bg-white border border-transparent shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-gray-200'
                                }`}
                                onClick={() => toggleAccordion(index)}
                            >
                                <div className="px-6 py-5 flex justify-between items-center select-none">
                                    <h3 className="font-bold text-[15px] md:text-[16px] text-[#113236]">
                                        {faq.question}
                                    </h3>
                                    <div className="text-[#113236] shrink-0 ml-4 transition-transform duration-300">
                                        {isOpen ? (
                                            <svg className="w-5 h-5 text-[#3a837c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7"></path></svg>
                                        ) : (
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                                        )}
                                    </div>
                                </div>
                                
                                <div 
                                    className={`px-6 transition-all duration-300 ease-in-out ${
                                        isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                                    }`}
                                >
                                    <p className="text-[15px] text-gray-500 leading-relaxed font-normal">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Button */}
                <div className="flex justify-center">
                    <button className="bg-[#c4f05b] p-1.5 pl-6 rounded-full flex items-center gap-4 hover:bg-[#b5e054] transition-colors group shadow-sm">
                        <span className="font-bold text-[#113236] text-[15px]">See More FAQ's</span>
                        <div className="bg-[#1a1a1a] w-[42px] h-[42px] rounded-full flex items-center justify-center text-white transition-colors group-hover:bg-black shadow-inner">
                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H9M17 7v8"></path>
                            </svg>
                        </div>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default FAQ;
