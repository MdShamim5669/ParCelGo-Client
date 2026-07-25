import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import serviceIcon from '../../assets/service.png'; // Using service.png as a placeholder for the icon, you might want to use the exact one if different

const Services = () => {
    // Fetch data using React Query and Axios
    const { data: services = [], isLoading, isError } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const response = await axios.get('/services.json');
            return response.data;
        }
    });

    if (isLoading) {
        return <div className="py-16 w-full text-center">Loading services...</div>;
    }

    if (isError) {
        return <div className="py-16 w-full text-center text-red-500">Error loading services.</div>;
    }

    return (
        <div className="py-16 w-full">
            <div className="bg-[#113236] rounded-[2.5rem] py-16 px-6 sm:px-12 md:px-16 w-full text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Our Services</h2>
                <p className="text-[15px] text-gray-300 max-w-3xl mx-auto mb-14 leading-relaxed">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to
                    business shipments — we deliver on time, every time.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                    {services.map((service, index) => (
                        <div 
                            key={index} 
                            className="bg-white hover:bg-[#c4f05b] rounded-[1.5rem] p-8 transition-colors duration-300 flex flex-col items-center text-center cursor-pointer"
                        >
                            <div className="bg-[#f0f4f8] rounded-full w-16 h-16 flex items-center justify-center mb-6">
                                <img src={serviceIcon} alt={service.title} className="w-8 h-8 object-contain" />
                            </div>
                            <h3 className="text-[18px] font-bold text-[#113236] mb-4 tracking-tight px-2">{service.title}</h3>
                            <p className="text-[14px] text-gray-600 leading-relaxed font-normal">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
