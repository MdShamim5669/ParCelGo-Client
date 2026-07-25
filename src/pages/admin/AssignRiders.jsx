import React, { useState } from 'react';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Button from '../../components/common/Button';

const AssignRiders = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedPickupRiders, setSelectedPickupRiders] = useState({});
    const [selectedDeliveryRiders, setSelectedDeliveryRiders] = useState({});

    // Fetch Parcels
    const { data: parcels = [], isPending: isParcelsPending } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/v1/parcels');
            return res.data.data;
        }
    });

    // Fetch Active Riders
    const { data: activeRiders = [], isPending: isRidersPending } = useQuery({
        queryKey: ['active-riders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/v1/users?role=rider');
            return res.data.data;
        }
    });

    const handlePickupSelect = (parcelId, riderEmail) => {
        setSelectedPickupRiders({ ...selectedPickupRiders, [parcelId]: riderEmail });
    };

    const handleDeliverySelect = (parcelId, riderEmail) => {
        setSelectedDeliveryRiders({ ...selectedDeliveryRiders, [parcelId]: riderEmail });
    };

    const pickupMutation = useMutation({
        mutationFn: async ({ parcelId, riderEmail }) => {
            const res = await axiosSecure.patch(`/api/v1/admin/parcels/${parcelId}/assign-pickup`, { riderEmail });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['parcels']);
            toast.success(`Pickup Rider assigned successfully!`);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to assign Pickup Rider');
        }
    });

    const deliveryMutation = useMutation({
        mutationFn: async ({ parcelId, riderEmail }) => {
            const res = await axiosSecure.patch(`/api/v1/admin/parcels/${parcelId}/assign-delivery`, { riderEmail });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['parcels']);
            toast.success(`Delivery Rider assigned successfully!`);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to assign Delivery Rider');
        }
    });

    const handleAssignPickup = (parcelId) => {
        const riderEmail = selectedPickupRiders[parcelId];
        if (!riderEmail) return toast.error('Please select a Pickup Rider first!');
        pickupMutation.mutate({ parcelId, riderEmail });
    };

    const handleAssignDelivery = (parcelId) => {
        const riderEmail = selectedDeliveryRiders[parcelId];
        if (!riderEmail) return toast.error('Please select a Delivery Rider first!');
        deliveryMutation.mutate({ parcelId, riderEmail });
    };

    if (isParcelsPending || isRidersPending) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <span className="loading loading-spinner text-[#c4f05b] loading-lg"></span>
            </div>
        );
    }

    // Sort parcels so that those needing action ('paid' or 'reached-service-center') appear first
    const sortedParcels = [...parcels].sort((a, b) => {
        const aNeedsAction = ['paid', 'reached-service-center'].includes(a.status);
        const bNeedsAction = ['paid', 'reached-service-center'].includes(b.status);
        if (aNeedsAction && !bNeedsAction) return -1;
        if (!aNeedsAction && bNeedsAction) return 1;
        return 0;
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-[#113236]">Assign Riders</h1>
                <p className="text-gray-500">Assign pending parcels to available riders dynamically based on delivery stage.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                            <tr>
                                <th>Parcel Details</th>
                                <th>Status</th>
                                <th>Assignment Stage</th>
                                <th className="text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedParcels.map((parcel) => (
                                <tr key={parcel._id || parcel.id} className="hover">
                                    <td>
                                        <div className="font-bold text-[#113236] text-[15px]">{parcel.title || 'Parcel'}</div>
                                        <div className="text-[#113236] font-medium text-sm mt-1">From: {parcel.senderAddress}</div>
                                        <div className="text-[#113236] font-medium text-sm">To: {parcel.receiverAddress}</div>
                                        <div className="text-xs text-gray-400 mt-1">ID: {parcel._id || parcel.id}</div>
                                    </td>
                                    
                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                                            ['delivered'].includes(parcel.status?.toLowerCase()) ? 'bg-green-100 text-green-700' : 
                                            ['assigned', 'ready-for-delivery', 'shipped', 'ready-to-pickup', 'picked-up', 'reached-service-center'].includes(parcel.status?.toLowerCase()) ? 'bg-blue-100 text-blue-700' : 
                                            ['paid'].includes(parcel.status?.toLowerCase()) ? 'bg-[#c4f05b] text-[#113236]' :
                                            'bg-orange-100 text-orange-700'
                                        }`}>
                                            {parcel.status?.replace(/-/g, ' ') || 'Pending'}
                                        </span>
                                    </td>

                                    <td>
                                        {/* Status: unpaid */}
                                        {parcel.status === 'unpaid' && (
                                            <span className="text-sm text-amber-500 italic">Awaiting Payment</span>
                                        )}

                                        {/* Status: paid => Needs Pickup Assignment */}
                                        {parcel.status === 'paid' && (
                                            <select 
                                                className="select select-sm select-bordered w-full max-w-xs bg-white text-gray-700 border-gray-200 focus:border-[#c4f05b] focus:ring-2 focus:ring-[#c4f05b]/20 focus:outline-none rounded-xl"
                                                value={selectedPickupRiders[parcel._id || parcel.id] || ''}
                                                onChange={(e) => handlePickupSelect(parcel._id || parcel.id, e.target.value)}
                                            >
                                                <option value="" disabled>Select Pickup Rider</option>
                                                {activeRiders.map(rider => (
                                                    <option key={rider._id || rider.id} value={rider.email}>{rider.name} ({rider.email})</option>
                                                ))}
                                            </select>
                                        )}

                                        {/* Status: ready-to-pickup or picked-up => Pickup Rider is already assigned */}
                                        {(parcel.status === 'ready-to-pickup' || parcel.status === 'picked-up') && (
                                            <span className="text-sm text-gray-500 font-medium">Pickup Assigned: <br/> <span className="text-[#3a837c]">{parcel.pickupRider}</span></span>
                                        )}

                                        {/* Status: reached-service-center => Needs Delivery Assignment */}
                                        {parcel.status === 'reached-service-center' && (
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs text-gray-400">Pickup done by {parcel.pickupRider}</span>
                                                <select 
                                                    className="select select-sm select-bordered w-full max-w-xs bg-white text-gray-700 border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none rounded-xl"
                                                    value={selectedDeliveryRiders[parcel._id || parcel.id] || ''}
                                                    onChange={(e) => handleDeliverySelect(parcel._id || parcel.id, e.target.value)}
                                                >
                                                    <option value="" disabled>Select Delivery Rider</option>
                                                    {activeRiders.map(rider => (
                                                        <option key={rider._id || rider.id} value={rider.email}>{rider.name} ({rider.email})</option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}

                                        {/* Status: ready-for-delivery, shipped, or delivered => Delivery Rider is already assigned */}
                                        {['ready-for-delivery', 'shipped', 'delivered'].includes(parcel.status) && (
                                            <span className="text-sm text-gray-500 font-medium">Delivery Assigned: <br/> <span className="text-amber-600">{parcel.deliveryRider}</span></span>
                                        )}
                                    </td>

                                    <td className="text-right">
                                        {parcel.status === 'paid' && (
                                            <Button 
                                                variant="primary"
                                                size="sm"
                                                isLoading={pickupMutation.isPending}
                                                onClick={() => handleAssignPickup(parcel._id || parcel.id)}
                                            >
                                                Assign Pickup
                                            </Button>
                                        )}
                                        {parcel.status === 'reached-service-center' && (
                                            <Button 
                                                variant="secondary"
                                                size="sm"
                                                isLoading={deliveryMutation.isPending}
                                                onClick={() => handleAssignDelivery(parcel._id || parcel.id)}
                                            >
                                                Assign Delivery
                                            </Button>
                                        )}
                                        {!['paid', 'reached-service-center'].includes(parcel.status) && (
                                            <span className="text-sm text-gray-400 italic">No action needed</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {sortedParcels.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center py-8 text-gray-500">No parcels found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AssignRiders;
