import React from 'react';
import casio from '../../assets/brands/casio.png';
import amazon from '../../assets/brands/amazon.png';
import moonstar from '../../assets/brands/moonstar.png';
import star from '../../assets/brands/star.png';
import start_people from '../../assets/brands/start_people.png';
import randstad from '../../assets/brands/randstad.png';

const Brands = () => {
    const brands = [
        { id: 1, name: 'Casio', logo: casio },
        { id: 2, name: 'Amazon', logo: amazon },
        { id: 3, name: 'Moonstar', logo: moonstar },
        { id: 4, name: 'Star+', logo: star },
        { id: 5, name: 'Startpeople', logo: start_people },
        { id: 6, name: 'Randstad', logo: randstad },
    ];

    return (
        <div className="w-full bg-zap-gray pt-16 pb-8 overflow-hidden">
            <h2 className="text-center text-xl md:text-[22px] font-bold text-[#113236] mb-12 tracking-tight">
                We've helped thousands of sales teams
            </h2>

            <div className="relative flex overflow-x-hidden max-w-full">
                <div className="animate-marquee flex items-center w-max">
                    {/* First set of brands */}
                    {brands.map((brand) => (
                        <div key={`brand-1-${brand.id}`} className="mx-8 sm:mx-12 md:mx-16 flex items-center justify-center opacity-80 hover:opacity-100 transition duration-300 flex-shrink-0">
                            <img src={brand.logo} alt={brand.name} className="h-6 sm:h-7 md:h-8 object-contain w-auto" />
                        </div>
                    ))}
                    {/* Second set of brands for infinite scrolling effect */}
                    {brands.map((brand) => (
                        <div key={`brand-2-${brand.id}`} className="mx-8 sm:mx-12 md:mx-16 flex items-center justify-center opacity-80 hover:opacity-100 transition duration-300 flex-shrink-0">
                            <img src={brand.logo} alt={brand.name} className="h-6 sm:h-7 md:h-8 object-contain w-auto" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-16 w-full">
                <div className="border-b-[1.5px] border-dashed border-[#113236]/30"></div>
            </div>
        </div>
    );
};

export default Brands;
