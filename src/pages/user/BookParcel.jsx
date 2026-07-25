import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../context/AuthContext';
import { calculatePrice } from '../../utils/pricing';
import officeData from '../../data/Office-locations.json';

const BookParcel = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        defaultValues: {
            title: '',
            senderName: user?.displayName || '',
            senderContact: '',
            senderRegion: '',
            senderAddress: '',
            receiverName: '',
            receiverContact: '',
            receiverRegion: '',
            receiverAddress: '',
            type: 'document',
            paymentMethod: 'COD'
        }
    });

    const weight = watch('weight');
    const type = watch('type');
    const senderRegion = watch('senderRegion');
    const receiverRegion = watch('receiverRegion');

    const currentPrice = calculatePrice(weight, type, senderRegion, receiverRegion);

    const mutation = useMutation({
        mutationFn: async (parcelData) => {
            const res = await axiosSecure.post('/api/v1/parcels', parcelData);
            
            // If it's online payment, initialize payment
            if (parcelData.paymentMethod === 'Online') {
                const payRes = await axiosSecure.post('/api/v1/payments/init', {
                    parcelId: res.data.data._id || res.data.data.parcel._id,
                    amount: parcelData.price,
                    customerName: parcelData.senderName,
                    customerEmail: parcelData.senderEmail,
                    customerPhone: parcelData.senderContact,
                    customerAddress: parcelData.senderAddress
                });
                
                if (payRes.data?.data?.GatewayPageURL) {
                    window.location.replace(payRes.data.data.GatewayPageURL);
                    return; // Wait for redirect
                }
            }
            
            return res.data;
        },
        onSuccess: (data) => {
            if (!data) return; // Means we are redirecting
            queryClient.invalidateQueries(['user-parcels']);
            toast.success('Parcel booked successfully!');
            reset();
            navigate('/dashboard/my-parcels');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to book parcel. Please try again.');
        }
    });

    const onSubmit = (data) => {
        const parcelData = {
            ...data,
            senderEmail: user?.email,
            weight: data.weight ? Number(data.weight) : undefined,
            price: currentPrice
        };
        mutation.mutate(parcelData);
    };

    return (
        <div className="w-full font-sans animate-fade-in max-w-6xl mx-auto pb-10">
            {/* Header */}
            <div className="mb-10">
                <span className="bg-[#c4f05b] text-[#113236] text-[13px] font-bold px-4 py-1.5 rounded-full inline-block mb-4 uppercase tracking-wider">
                    Send Delivery
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#113236] mb-3 tracking-tight">
                    Book a Parcel
                </h1>
                <p className="text-[15px] text-gray-500 max-w-2xl leading-relaxed">
                    Fast, secure, and reliable delivery service across the country. Just fill in the details and we'll take care of the rest.
                </p>
            </div>

            {/* Booking Form Wrapper */}
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col">
                <h2 className="text-2xl font-bold text-[#113236] mb-8">Parcel Details</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                    
                    {/* Sender & Receiver Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        
                        {/* Sender Info */}
                        <div className="space-y-5">
                            <h3 className="text-[18px] font-bold flex items-center gap-3 text-[#3a837c]">
                                <span className="w-8 h-8 rounded-full bg-[#eef8f8] flex items-center justify-center text-sm">📤</span>
                                Sender (From)
                            </h3>
                            <div className="form-control">
                                <input 
                                    type="text" 
                                    placeholder="Sender Name *" 
                                    {...register('senderName', { required: 'Sender name is required' })}
                                    className={`input bg-gray-50 border-gray-200 focus:border-[#c4f05b] focus:bg-white focus:outline-none w-full rounded-xl pl-6 text-black ${errors.senderName ? 'border-red-500' : ''}`} 
                                />
                                {errors.senderName && <span className="text-red-500 text-xs mt-1">{errors.senderName.message}</span>}
                            </div>  
                            <div className="form-control">
                                <input 
                                    type="tel" 
                                    placeholder="Sender Phone (01XXX) *" 
                                    {...register('senderContact', { required: 'Sender contact is required' })}
                                    className={`input bg-gray-50 border-gray-200 focus:border-[#c4f05b] focus:bg-white focus:outline-none w-full rounded-xl pl-6 text-black ${errors.senderContact ? 'border-red-500' : ''}`} 
                                />
                                {errors.senderContact && <span className="text-red-500 text-xs mt-1">{errors.senderContact.message}</span>}
                            </div>
                            <div className="form-control">
                                <select 
                                    {...register('senderRegion', { required: 'Region is required' })}
                                    className={`select bg-gray-50 border-gray-200 focus:border-[#c4f05b] focus:bg-white focus:outline-none w-full rounded-xl pl-6 text-black ${errors.senderRegion ? 'border-red-500' : ''}`}
                                >
                                    <option value="" disabled>Select Sender Region *</option>
                                    {officeData.divisions.map((division) => (
                                        <optgroup key={division.id} label={division.name}>
                                            {division.districts.map((district) => (
                                                <option key={district.id} value={district.name}>
                                                    {district.name}
                                                </option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </select>
                                {errors.senderRegion && <span className="text-red-500 text-xs mt-1">{errors.senderRegion.message}</span>}
                            </div>
                            <div className="form-control">
                                <textarea 
                                    placeholder="Pickup Address *" 
                                    {...register('senderAddress', { required: 'Address is required' })}
                                    className={`textarea bg-gray-50 border-gray-200 focus:border-[#c4f05b] focus:bg-white focus:outline-none w-full rounded-xl pl-6 pt-4 text-black min-h-[100px] ${errors.senderAddress ? 'border-red-500' : ''}`}
                                ></textarea>
                                {errors.senderAddress && <span className="text-red-500 text-xs mt-1">{errors.senderAddress.message}</span>}
                            </div>
                        </div>

                        {/* Receiver Info */}
                        <div className="space-y-5">
                            <h3 className="text-[18px] font-bold flex items-center gap-3 text-[#7eb316]">
                                <span className="w-8 h-8 rounded-full bg-[#f4fce3] flex items-center justify-center text-sm">📥</span>
                                Receiver (To)
                            </h3>
                            <div className="form-control">
                                <input 
                                    type="text" 
                                    placeholder="Receiver Name *" 
                                    {...register('receiverName', { required: 'Receiver name is required' })}
                                    className={`input bg-gray-50 border-gray-200 focus:border-[#c4f05b] focus:bg-white focus:outline-none w-full rounded-xl pl-6 text-black ${errors.receiverName ? 'border-red-500' : ''}`} 
                                />
                                {errors.receiverName && <span className="text-red-500 text-xs mt-1">{errors.receiverName.message}</span>}
                            </div>  
                            <div className="form-control">
                                <input 
                                    type="tel" 
                                    placeholder="Receiver Phone (01XXX) *" 
                                    {...register('receiverContact', { required: 'Receiver contact is required' })}
                                    className={`input bg-gray-50 border-gray-200 focus:border-[#c4f05b] focus:bg-white focus:outline-none w-full rounded-xl pl-6 text-black ${errors.receiverContact ? 'border-red-500' : ''}`} 
                                />
                                {errors.receiverContact && <span className="text-red-500 text-xs mt-1">{errors.receiverContact.message}</span>}
                            </div>
                            <div className="form-control">
                                <select 
                                    {...register('receiverRegion', { required: 'Region is required' })}
                                    className={`select bg-gray-50 border-gray-200 focus:border-[#c4f05b] focus:bg-white focus:outline-none w-full rounded-xl pl-6 text-black ${errors.receiverRegion ? 'border-red-500' : ''}`}
                                >
                                    <option value="" disabled>Select Receiver Region *</option>
                                    {officeData.divisions.map((division) => (
                                        <optgroup key={division.id} label={division.name}>
                                            {division.districts.map((district) => (
                                                <option key={district.id} value={district.name}>
                                                    {district.name}
                                                </option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </select>
                                {errors.receiverRegion && <span className="text-red-500 text-xs mt-1">{errors.receiverRegion.message}</span>}
                            </div>
                            <div className="form-control">
                                <textarea 
                                    placeholder="Delivery Address *" 
                                    {...register('receiverAddress', { required: 'Address is required' })}
                                    className={`textarea bg-gray-50 border-gray-200 focus:border-[#c4f05b] focus:bg-white focus:outline-none w-full rounded-xl pl-6 pt-4 text-black min-h-[100px] ${errors.receiverAddress ? 'border-red-500' : ''}`}
                                ></textarea>
                                {errors.receiverAddress && <span className="text-red-500 text-xs mt-1">{errors.receiverAddress.message}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="divider"></div>

                    {/* Parcel Details */}
                    <div className="space-y-5">
                        <h3 className="text-[18px] font-bold text-[#113236] flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">📦</span>
                            Package Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="form-control">
                                <input 
                                    type="text" 
                                    placeholder="Parcel Title (e.g., Laptop) *" 
                                    {...register('title', { required: 'Title is required' })}
                                    className={`input bg-gray-50 border-gray-200 focus:border-[#c4f05b] focus:bg-white focus:outline-none w-full rounded-xl pl-6 text-black ${errors.title ? 'border-red-500' : ''}`} 
                                />
                                {errors.title && <span className="text-red-500 text-xs mt-1">{errors.title.message}</span>}
                            </div>
                            <div className="form-control">
                                <select 
                                    {...register('type', { required: 'Category is required' })}
                                    className="select bg-gray-50 border-gray-200 focus:border-[#c4f05b] focus:bg-white focus:outline-none w-full rounded-xl pl-6 text-black"
                                >
                                    <option value="document">Documents & Papers</option>
                                    <option value="non-document">Non-Document (Items)</option>
                                </select>
                            </div>
                            <div className="form-control flex flex-row items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#c4f05b] focus-within:bg-white">
                                <input 
                                    type="number" 
                                    step="0.1" 
                                    min="0" 
                                    placeholder="Weight" 
                                    {...register('weight')}
                                    className="input bg-transparent border-none focus:outline-none w-full pl-6 text-black" 
                                />
                                <span className="pr-6 font-semibold text-gray-400">KG</span>
                            </div>
                        </div>
                    </div>

                    <div className="divider"></div>

                    {/* Payment Method */}
                    <div className="space-y-5">
                        <h3 className="text-[18px] font-bold text-[#113236] flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-sm">💳</span>
                            Payment Method
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <label className={`cursor-pointer border-2 rounded-xl p-4 flex items-center gap-4 transition-all ${watch('paymentMethod') === 'COD' ? 'border-[#c4f05b] bg-[#f4fce3]' : 'border-gray-100 hover:border-gray-200'}`}>
                                <input 
                                    type="radio" 
                                    value="COD" 
                                    {...register('paymentMethod')}
                                    className="radio radio-success" 
                                />
                                <div>
                                    <h4 className="font-bold text-[#113236]">Cash on Delivery</h4>
                                    <p className="text-sm text-gray-500">Pay when you receive the parcel (via OTP)</p>
                                </div>
                            </label>
                            
                            <label className={`cursor-pointer border-2 rounded-xl p-4 flex items-center gap-4 transition-all ${watch('paymentMethod') === 'Online' ? 'border-[#c4f05b] bg-[#f4fce3]' : 'border-gray-100 hover:border-gray-200'}`}>
                                <input 
                                    type="radio" 
                                    value="Online" 
                                    {...register('paymentMethod')}
                                    className="radio radio-success" 
                                />
                                <div>
                                    <h4 className="font-bold text-[#113236]">Online Payment</h4>
                                    <p className="text-sm text-gray-500">Pay securely via SSLCommerz (bKash, Cards)</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 p-6 rounded-2xl border border-gray-100 gap-4 mt-8">
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm font-medium">Estimated Cost</span>
                            <span className="text-3xl font-extrabold text-[#113236]">
                                ৳ {currentPrice}
                            </span>
                            <span className="text-xs text-gray-400 mt-1">Based on weight, type, and regions</span>
                        </div>
                        <button 
                            type="submit" 
                            disabled={mutation.isPending}
                            className="btn bg-[#113236] hover:bg-black text-white border-none w-full sm:w-auto rounded-full px-10 h-14 text-[16px]"
                        >
                            {mutation.isPending ? 'Confirming...' : 'Confirm Pickup Request'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookParcel;
