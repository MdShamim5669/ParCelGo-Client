import React, { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../context/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { getRiderParcels, updateParcelStatus } from '../../services/parcelApi';
import { toast } from 'sonner';

const MyDeliveries = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: result = {}, isLoading } = useQuery({
        queryKey: ['rider-parcels', user?.email],
        queryFn: () => getRiderParcels(axiosSecure, user?.email),
        enabled: !!user?.email,
    });

    const parcels = result.data || [];

    const statusMutation = useMutation({
        mutationFn: ({ id, status, message }) => updateParcelStatus(axiosSecure, id, { status, message, riderEmail: user?.email }),
        onSuccess: () => {
            queryClient.invalidateQueries(['rider-parcels', user?.email]);
            toast.success('Parcel status updated successfully!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to update status');
        }
    });

    const handleUpdateStatus = (parcel, newStatus, message) => {
        statusMutation.mutate({ id: parcel._id, status: newStatus, message });
    };

    const deliverMutation = useMutation({
        mutationFn: async ({ id, trackingNo, otp }) => {
            const res = await axiosSecure.post(`/api/v1/riders/parcels/${id}/deliver`, { tracking_no: trackingNo, otp });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['rider-parcels', user?.email]);
            toast.success('Parcel delivered successfully!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to deliver parcel');
        }
    });

    const handleDeliver = (parcel) => {
        const trackingNo = window.prompt("Enter the Parcel Tracking Number to confirm delivery:");
        if (!trackingNo) return;
        
        let otp;
        if (parcel.paymentMethod === 'COD') {
            otp = window.prompt("This is a Cash on Delivery parcel. Enter the OTP provided by the customer:");
            if (!otp) return;
        }
        
        deliverMutation.mutate({ id: parcel._id, trackingNo, otp });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <span className="loading loading-spinner text-[#c4f05b] loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-extrabold text-[#113236]">My Deliveries</h1>
                    <p className="text-gray-500 mt-1">Manage your assigned pickups and deliveries.</p>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 font-medium text-sm border-b border-gray-100">
                                <th className="px-6 py-4">Parcel Details</th>
                                <th className="px-6 py-4">Address</th>
                                <th className="px-6 py-4">Status / Role</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-[#113236]">
                            {parcels.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-10 text-gray-500">
                                        No parcels assigned to you currently.
                                    </td>
                                </tr>
                            ) : (
                                parcels.map((parcel) => {
                                    const isPickupRider = parcel.pickupRider === user?.email;
                                    const isDeliveryRider = parcel.deliveryRider === user?.email;
                                    
                                    // Determine role label
                                    let roleLabel = '';
                                    if (isPickupRider && isDeliveryRider) roleLabel = 'Pickup & Delivery';
                                    else if (isPickupRider) roleLabel = 'Pickup Rider';
                                    else if (isDeliveryRider) roleLabel = 'Delivery Rider';

                                    return (
                                        <tr key={parcel._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-[15px]">{parcel.title}</div>
                                                <div className="text-sm text-gray-500 flex gap-2 items-center mt-1">
                                                    <span className="capitalize">{parcel.type}</span>
                                                    <span>•</span>
                                                    <span>{parcel.weight || 0} KG</span>
                                                </div>
                                            </td>
                                            
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-2 text-sm">
                                                    {isPickupRider && (
                                                        <div className="flex items-start gap-2">
                                                            <span className="text-[#3a837c] mt-0.5">📤</span>
                                                            <div>
                                                                <span className="font-semibold block">Pickup:</span>
                                                                <span className="text-gray-500">{parcel.senderAddress}, {parcel.senderRegion}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {isDeliveryRider && (
                                                        <div className="flex items-start gap-2">
                                                            <span className="text-amber-500 mt-0.5">📥</span>
                                                            <div>
                                                                <span className="font-semibold block">Delivery:</span>
                                                                <span className="text-gray-500">{parcel.receiverAddress}, {parcel.receiverRegion}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-2 items-start">
                                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#f4fce3] text-[#7eb316] uppercase tracking-wider">
                                                        {parcel.status.replace(/-/g, ' ')}
                                                    </span>
                                                    <span className="text-xs font-medium text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full">
                                                        {roleLabel}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                {/* Action Buttons based on status and role */}
                                                
                                                {parcel.status === 'ready-to-pickup' && isPickupRider && (
                                                    <button 
                                                        onClick={() => handleUpdateStatus(parcel, 'picked-up', 'Parcel has been picked up from sender.')}
                                                        className="btn btn-sm bg-[#113236] hover:bg-black text-white border-none rounded-lg"
                                                    >
                                                        Mark Picked Up
                                                    </button>
                                                )}

                                                {parcel.status === 'picked-up' && isPickupRider && (
                                                    <button 
                                                        onClick={() => handleUpdateStatus(parcel, 'reached-service-center', 'Parcel reached the local service center.')}
                                                        className="btn btn-sm bg-blue-100 hover:bg-blue-200 text-blue-700 border-none rounded-lg"
                                                    >
                                                        Drop at Center
                                                    </button>
                                                )}

                                                {parcel.status === 'ready-for-delivery' && isDeliveryRider && (
                                                    <button 
                                                        onClick={() => handleDeliver(parcel)}
                                                        disabled={deliverMutation.isPending}
                                                        className="btn btn-sm bg-[#c4f05b] hover:bg-[#b5e054] text-[#113236] font-bold border-none rounded-lg"
                                                    >
                                                        {deliverMutation.isPending ? 'Processing...' : 'Mark Delivered'}
                                                    </button>
                                                )}

                                                {/* Statuses that require no action from rider currently */}
                                                {(parcel.status === 'reached-service-center' || parcel.status === 'shipped' || parcel.status === 'delivered') && (
                                                    <span className="text-sm text-gray-400 italic">No action required</span>
                                                )}
                                                
                                                {/* If rider is assigned but parcel is not yet ready for their stage */}
                                                {parcel.status === 'ready-to-pickup' && isDeliveryRider && !isPickupRider && (
                                                    <span className="text-sm text-amber-500 italic">Waiting for pickup</span>
                                                )}
                                                
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyDeliveries;
