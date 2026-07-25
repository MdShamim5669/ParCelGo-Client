import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AdminOverview = () => {
    const axiosSecure = useAxiosSecure();

    const { data: statsData = {}, isPending } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/v1/admin/stats');
            return res.data.data;
        }
    });

    const { totalUsers = 0, totalParcels = 0, activeRiders = 0, revenue = 0 } = statsData;

    // Mapping real stats to the existing UI structure
    const stats = [
        { title: 'Total Deliveries (Parcels)', value: totalParcels, icon: '📦', color: 'bg-[#eef8f8] text-[#3a837c]' },
        { title: 'Total Users', value: totalUsers, icon: '👥', color: 'bg-blue-50 text-blue-600' },
        { title: 'Active Riders', value: activeRiders, icon: '🛵', color: 'bg-[#f4fce3] text-[#7eb316]' },
        { title: 'Revenue', value: `৳ ${revenue.toLocaleString()}`, icon: '💰', color: 'bg-purple-50 text-purple-600' },
    ];

    // Fetch Recent Parcels for the table
    const { data: recentParcels = [], isPending: isParcelsPending } = useQuery({
        queryKey: ['recent-parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/v1/parcels');
            // Assuming the API returns all parcels, take the latest 5
            return res.data.data.slice(0, 5) || [];
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
            <div>
                <h1 className="text-2xl font-bold text-[#113236]">Admin Overview</h1>
                <p className="text-gray-500">Welcome back, Admin. Here is what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                            <p className="text-2xl font-bold text-[#113236]">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-[#113236]">Recent Activity</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th>Parcel Title</th>
                                <th>Sender</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isParcelsPending ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-8">
                                        <span className="loading loading-spinner text-[#c4f05b]"></span>
                                    </td>
                                </tr>
                            ) : recentParcels.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-8 text-gray-500">No parcels found.</td>
                                </tr>
                            ) : (
                                recentParcels.map((parcel) => (
                                    <tr key={parcel._id} className="hover">
                                        <td className="font-medium text-[#113236]">{parcel.title || 'N/A'}</td>
                                        <td className="text-gray-500">{parcel.senderName}</td>
                                        <td>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                                                ['delivered', 'received'].includes(parcel.status) ? 'bg-green-100 text-green-700' :
                                                parcel.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                                                'bg-blue-100 text-blue-700'
                                            }`}>
                                                {parcel.status}
                                            </span>
                                        </td>
                                        <td>
                                            <Link 
                                                to="/dashboard/admin/assign-riders" 
                                                className="btn btn-xs bg-[#eef8f8] text-[#3a837c] hover:bg-[#3a837c] hover:text-white border-none rounded"
                                            >
                                                Manage
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
