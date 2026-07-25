import React from 'react';
import { NavLink } from 'react-router-dom';
import merchantBg from '../../assets/be-a-merchant-bg.png';
import locationMerchant from '../../assets/location-merchant.png';

const CallToAction = () => {
    return (
        <div className="w-full py-12">
            <div 
                className="w-full rounded-[2.5rem] p-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between"
                style={{ 
                    backgroundColor: '#113236',
                    backgroundImage: `url(${merchantBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {/* Content Left */}
                <div className="w-full md:w-3/5 z-10 relative text-center md:text-left">
                    <h2 className="text-[28px] md:text-4xl lg:text-[42px] font-bold text-white mb-6 leading-[1.2] tracking-tight">
                        Merchant and Customer Satisfaction<br className="hidden lg:block" /> is Our First Priority
                    </h2>
                    <p className="text-[15px] text-gray-300 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed font-normal">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-5">
                        <NavLink to="#" className="px-8 py-3.5 bg-[#c4f05b] hover:bg-[#b5e054] text-[#113236] font-bold rounded-full transition-all duration-300 text-center w-full sm:w-auto shadow-sm hover:shadow-md">
                            Become a Merchant
                        </NavLink>
                        <NavLink to="#" className="px-8 py-3.5 bg-transparent border border-[#c4f05b] text-[#c4f05b] hover:bg-[#c4f05b] hover:text-[#113236] font-bold rounded-full transition-all duration-300 text-center w-full sm:w-auto">
                            Earn with ZapShift Courier
                        </NavLink>
                    </div>
                </div>

                {/* Image Right */}
                <div className="w-full md:w-2/5 flex justify-center md:justify-end mt-12 md:mt-0 z-10 relative">
                    <img src={locationMerchant} alt="Merchant Location Boxes" className="w-64 md:w-80 lg:w-[400px] object-contain drop-shadow-lg" />
                </div>
            </div>
        </div>
    );
};

export default CallToAction;
