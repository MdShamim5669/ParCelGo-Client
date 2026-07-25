import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../context/AuthContext';
import { getParcels } from '../../services/parcelApi';

const MyParcels = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], isPending } = useQuery({
        queryKey: ['my-parcels', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await getParcels(axiosSecure, user.email);
            return res.data;
        }
    });

    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <span className="loading loading-spinner text-[#c4f05b] loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#113236]">My Parcels</h1>
                    <p className="text-gray-500">View and track all your booked parcels.</p>
                </div>
                <Link to="/dashboard/book-parcel" className="btn bg-[#c4f05b] hover:bg-[#b5e054] text-[#113236] border-none rounded-xl">
                    + Book New Parcel
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                            <tr>
                                <th>Tracking ID</th>
                                <th>Title & Type</th>
                                <th>Receiver</th>
                                <th>Status</th>
                                <th className="text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel) => (
                                <tr key={parcel._id || parcel.id} className="hover">
                                    <td className="font-bold text-[#113236]">{parcel.trackingNo || parcel._id || parcel.id}</td>
                                    <td>
                                        <div className="text-[#113236] font-medium">{parcel.title}</div>
                                        <div className="text-xs text-gray-400 capitalize">{parcel.type} • {parcel.weight ? `${parcel.weight}kg` : 'N/A'}</div>
                                    </td>
                                    <td>
                                        <div className="text-[#113236] font-medium">{parcel.receiverName}</div>
                                        <div className="text-xs text-gray-400">{parcel.receiverRegion}</div>
                                    </td>
                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                                            ['delivered'].includes(parcel.status?.toLowerCase()) ? 'bg-green-100 text-green-700' :
                                            ['assigned', 'ready-for-delivery', 'shipped'].includes(parcel.status?.toLowerCase()) ? 'bg-blue-100 text-blue-700' :
                                            'bg-orange-100 text-orange-700'
                                        }`}>
                                            {parcel.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td className="text-right">
                                        <Link 
                                            to={`/dashboard/track/${parcel._id || parcel.id}`}
                                            className="btn btn-sm bg-[#eef8f8] hover:bg-[#e0f2f1] text-[#3a837c] border-none rounded-lg"
                                        >
                                            Track Status
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {parcels.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-8 text-gray-500">
                                        You haven't booked any parcels yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyParcels;
