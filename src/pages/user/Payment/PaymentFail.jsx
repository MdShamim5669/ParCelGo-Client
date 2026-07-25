import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/common/Button';

const PaymentFail = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-[70vh] animate-fade-in">
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 max-w-md w-full text-center space-y-6">
                <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-[#113236]">Payment Failed</h1>
                <p className="text-gray-500">We could not process your payment. Your parcel is saved but marked as unpaid.</p>
                
                <div className="pt-4 space-y-3">
                    <Button 
                        variant="primary" 
                        className="w-full"
                        onClick={() => navigate('/dashboard/my-parcels')}
                    >
                        Go to My Parcels
                    </Button>
                    <Button 
                        variant="ghost" 
                        className="w-full"
                        onClick={() => navigate('/dashboard/book-parcel')}
                    >
                        Try Booking Again
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PaymentFail;
