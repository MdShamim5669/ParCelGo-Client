import React, { useState } from 'react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalOpenIndex, setModalOpenIndex] = useState(-1);

    const mainFaqs = [
        {
            question: "How do I book a parcel delivery?",
            answer: "You can book a parcel by signing into your account, navigating to the 'Book Parcel' section, and filling out the pickup and delivery details. It's fast and easy!"
        },
        {
            question: "How can I track my parcel in real-time?",
            answer: "Once your parcel is dispatched, you will receive a tracking number. Enter this number on our tracking page or your dashboard to view live status updates."
        },
        {
            question: "How is the delivery cost calculated?",
            answer: "Delivery costs are dynamically calculated based on the parcel's weight, dimensions, and the distance between the pickup and drop-off locations."
        },
        {
            question: "What happens if no one is available to receive the parcel?",
            answer: "Our rider will attempt delivery up to 3 times. If unsuccessful, the parcel will be securely held at our local hub for pickup or returned to the sender."
        },
        {
            question: "What are the restricted items for delivery?",
            answer: "For safety reasons, we do not deliver hazardous materials, illegal substances, perishable goods without specialized packaging, or highly fragile items without insurance."
        }
    ];

    const moreFaqs = [
        {
            question: "Do you provide cash on delivery (COD) services?",
            answer: "Yes, we offer Cash on Delivery for selected merchants and locations. You can choose this option during the booking process."
        },
        {
            question: "How do I become a rider for ParCelGo?",
            answer: "You can apply through our 'Be a Rider' page by submitting your identification, driving license, and vehicle details for quick verification."
        },
        {
            question: "Is my parcel insured during transit?",
            answer: "Basic insurance is included for all parcels up to a specific value. You can easily purchase additional coverage for high-value items during booking."
        },
        {
            question: "Can I change the delivery address after dispatch?",
            answer: "Once a parcel is dispatched, address changes may incur an additional routing fee and slight delay. Please contact support immediately for assistance."
        }
    ];

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const toggleModalAccordion = (index) => {
        setModalOpenIndex(modalOpenIndex === index ? -1 : index);
    };

    return (
        <div className="w-full bg-zap-gray py-20 relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-[28px] md:text-4xl lg:text-[42px] font-bold text-[#113236] mb-6 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-[15px] text-gray-500 max-w-3xl mx-auto leading-relaxed font-normal">
                        Everything you need to know about booking, tracking, and managing your parcel deliveries with ParCelGo.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="flex flex-col gap-4 mb-12">
                    {mainFaqs.map((faq, index) => {
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

                {/* Styled Button matching the image */}
                <div className="flex justify-center">
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-white p-[3px] rounded-full border-[1.5px] border-[#111111] shadow-sm hover:scale-105 transition-transform duration-300 focus:outline-none"
                    >
                        <div className="bg-[#c4f05b] rounded-full flex items-center justify-between gap-6 py-1.5 pl-6 pr-1.5 h-full">
                            <span className="font-bold text-[#113236] text-[14px]">See More FAQ's</span>
                            <div className="bg-[#1a1a1a] w-[34px] h-[34px] rounded-full flex items-center justify-center text-white shrink-0">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 17L17 7M17 7H9M17 7v8"></path>
                                </svg>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-[#f8f9fa] w-full max-w-3xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in duration-200">
                        {/* Modal Header */}
                        <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center bg-white sticky top-0 z-10">
                            <h3 className="text-2xl font-bold text-[#113236]">Additional FAQ's</h3>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors focus:outline-none"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        {/* Modal Content - More FAQs */}
                        <div className="p-8 overflow-y-auto flex-1 bg-zap-gray">
                            <div className="flex flex-col gap-4">
                                {moreFaqs.map((faq, index) => {
                                    const isOpen = modalOpenIndex === index;
                                    return (
                                        <div 
                                            key={index} 
                                            className={`rounded-[1.2rem] overflow-hidden transition-all duration-300 cursor-pointer ${
                                                isOpen 
                                                ? 'bg-[#eaf5f5] border border-[#7dbcb8] shadow-sm' 
                                                : 'bg-white border border-transparent shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-gray-200'
                                            }`}
                                            onClick={() => toggleModalAccordion(index)}
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
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default FAQ;
