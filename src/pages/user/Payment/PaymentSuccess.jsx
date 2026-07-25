import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Button from '../../../components/common/Button';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const tranId = searchParams.get('transactionId');
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-[70vh] animate-fade-in">
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 max-w-md w-full text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-[#113236]">Payment Successful!</h1>
                <p className="text-gray-500">Your parcel payment has been successfully processed.</p>
                
                {tranId && (
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm">
                        <span className="text-gray-400 block mb-1">Transaction ID</span>
                        <span className="font-mono font-bold text-[#113236]">{tranId}</span>
                    </div>
                )}

                <div className="pt-4">
                    <Button 
                        variant="primary" 
                        className="w-full"
                        onClick={() => navigate('/dashboard/my-parcels')}
                    >
                        Go to My Parcels
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
