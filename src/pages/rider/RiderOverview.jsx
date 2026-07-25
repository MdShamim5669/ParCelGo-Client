import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../context/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { getRiderParcels } from '../../services/parcelApi';
import { Link } from 'react-router-dom';

const RiderOverview = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: result = {}, isLoading } = useQuery({
        queryKey: ['rider-parcels', user?.email],
        queryFn: () => getRiderParcels(axiosSecure, user?.email),
        enabled: !!user?.email,
    });

    const parcels = result.data || [];

    // Calculate stats
    const totalAssigned = parcels.length;
    const readyToPickup = parcels.filter(p => p.status === 'ready-to-pickup').length;
    const readyToDeliver = parcels.filter(p => p.status === 'ready-for-delivery').length;
    const completed = parcels.filter(p => p.status === 'delivered').length;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <span className="loading loading-spinner text-[#c4f05b] loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-3xl font-extrabold text-[#113236]">Welcome back, Rider!</h1>
                    <p className="text-gray-500 mt-2 text-lg">Here is an overview of your current tasks.</p>
                </div>
                <div className="hidden md:block">
                    <span className="text-5xl">🏍️</span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5 hover:border-[#c4f05b] transition-colors">
                    <div className="w-14 h-14 rounded-2xl bg-[#f4fce3] text-[#7eb316] flex items-center justify-center text-2xl">
                        📦
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Assigned</p>
                        <h3 className="text-2xl font-bold text-[#113236]">{totalAssigned}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5 hover:border-[#c4f05b] transition-colors">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center text-2xl">
                        🏃
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Pickups Pending</p>
                        <h3 className="text-2xl font-bold text-[#113236]">{readyToPickup}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5 hover:border-[#c4f05b] transition-colors">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center text-2xl">
                        🚚
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Deliveries Pending</p>
                        <h3 className="text-2xl font-bold text-[#113236]">{readyToDeliver}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5 hover:border-[#c4f05b] transition-colors">
                    <div className="w-14 h-14 rounded-2xl bg-[#eef8f8] text-[#3a837c] flex items-center justify-center text-2xl">
                        ✅
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Completed</p>
                        <h3 className="text-2xl font-bold text-[#113236]">{completed}</h3>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[#113236]">Quick Actions</h2>
                </div>
                <div className="flex flex-wrap gap-4">
                    <Link to="/dashboard/rider/deliveries" className="btn bg-[#c4f05b] hover:bg-[#b5e054] text-[#113236] border-none rounded-xl px-8">
                        View All Deliveries
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RiderOverview;
