import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../context/AuthContext';
import { getParcelById } from '../../services/parcelApi';

const TrackingDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    // Fetch Parcel Details
    const { data: parcel, isPending: isParcelPending } = useQuery({
        queryKey: ['parcel', id],
        queryFn: async () => {
            const res = await getParcelById(axiosSecure, id);
            return res.data;
        }
    });

    // Fetch Tracking Logs ONLY if parcel has a trackingNo
    const { data: trackingLogs = [], isPending: isTrackingPending } = useQuery({
        queryKey: ['tracking', parcel?.trackingNo],
        enabled: !!parcel?.trackingNo,
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/tracking/${parcel.trackingNo}`);
            return res.data.data;
        }
    });

    if (isParcelPending) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <span className="loading loading-spinner text-[#c4f05b] loading-lg"></span>
            </div>
        );
    }

    if (!parcel) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-700">Parcel not found</h2>
                <Link to="/dashboard/my-parcels" className="text-[#3a837c] hover:underline mt-4 inline-block">Go back to My Parcels</Link>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in max-w-4xl mx-auto print:max-w-none print:w-full">
            <div className="flex items-center gap-4 border-b px-4 py-2 border-gray-100 pb-4 print:border-b-2 print:border-black">
                <Link to="/dashboard/my-parcels" className="btn btn-circle btn-sm bg-gray-100 hover:bg-gray-200 border-none print:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-[#113236] print:text-black">Tracking Details</h1>
                    <p className="text-gray-500 print:text-gray-700">ID: {parcel._id || parcel.id} {parcel.trackingNo && `| Tracking No: ${parcel.trackingNo}`}</p>
                </div>
                <button 
                    onClick={() => window.print()}
                    className="btn bg-gradient-to-r from-[#113236] to-[#3a837c] hover:from-black hover:to-[#113236] text-white border-none rounded-xl px-6 print:hidden flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                    Print Invoice
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Parcel Info Card */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                        <h2 className="text-lg font-bold text-[#113236] border-b pb-2">Parcel Info</h2>
                        <div className="space-y-2 text-sm">
                            <p><span className="text-gray-500">Title:</span> <span className="font-medium text-[#113236]">{parcel.title}</span></p>
                            <p><span className="text-gray-500">Type:</span> <span className="font-medium text-[#113236] capitalize">{parcel.type}</span></p>
                            <p><span className="text-gray-500">Weight:</span> <span className="font-medium text-[#113236]">{parcel.weight || 'N/A'} kg</span></p>
                            <p><span className="text-gray-500">Cost:</span> <span className="font-medium text-orange-600">৳ {parcel.cost || 'N/A'}</span></p>
                            <p>
                                <span className="text-gray-500">Status: </span> 
                                <span className="px-2 py-1 bg-[#eef8f8] text-[#3a837c] rounded-md font-medium text-xs capitalize">{parcel.status}</span>
                            </p>
                        </div>
                    </div>

                    {parcel.paymentMethod === 'COD' && parcel.deliveryOtp && !['delivered'].includes(parcel.status) && (
                        <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 flex items-center justify-between print:hidden">
                            <div>
                                <h3 className="font-bold text-blue-900 flex items-center gap-2">
                                    <span>🔐</span> Delivery Security Code (OTP)
                                </h3>
                                <p className="text-sm text-blue-700/80 mt-1">Please provide this code to the rider upon receiving your parcel.</p>
                            </div>
                            <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-blue-100 font-mono text-2xl font-bold tracking-widest text-blue-600">
                                {parcel.deliveryOtp}
                            </div>
                        </div>
                    )}

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                        <h2 className="text-lg font-bold text-[#113236] border-b pb-2">Delivery Details</h2>
                        <div className="space-y-3 text-sm">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">From</p>
                                <p className="font-medium text-[#113236] mt-1">{parcel.senderName}</p>
                                <p className="text-gray-500">{parcel.senderAddress}, {parcel.senderRegion}</p>
                            </div>
                            <div className="divider my-0 py-0"></div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">To</p>
                                <p className="font-medium text-[#113236] mt-1">{parcel.receiverName}</p>
                                <p className="text-gray-500">{parcel.receiverAddress}, {parcel.receiverRegion}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tracking Timeline */}
                <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-[#113236] border-b pb-4 mb-6">Tracking History</h2>
                    
                    {!parcel.trackingNo ? (
                        <div className="text-center py-10">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-500 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h3 className="text-lg font-bold text-[#113236]">Awaiting Processing</h3>
                            <p className="text-gray-500 mt-2">Your parcel is currently pending. A tracking number will be assigned once it is processed and paid.</p>
                        </div>
                    ) : isTrackingPending ? (
                        <div className="flex items-center justify-center min-h-[200px]">
                            <span className="loading loading-spinner text-[#c4f05b]"></span>
                        </div>
                    ) : trackingLogs.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">No tracking logs found.</div>
                    ) : (
                        <ul className="steps steps-vertical w-full">
                            {trackingLogs.map((log, index) => (
                                <li 
                                    key={log._id || index} 
                                    className={`step ${index === trackingLogs.length - 1 ? 'step-primary' : 'step-neutral'} text-left w-full`}
                                >
                                    <div className="ml-4 -mt-2 mb-6">
                                        <h4 className="font-bold text-[#113236] capitalize">{log.status}</h4>
                                        <p className="text-sm text-gray-500 mt-1">{log.message}</p>
                                        <p className="text-xs text-gray-400 mt-2">
                                            {new Date(log.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>
        </div>
    );
};

export default TrackingDetails;
