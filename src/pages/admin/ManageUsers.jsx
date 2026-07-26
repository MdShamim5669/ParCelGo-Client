import React, { useState } from 'react';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');

    // Fetch users
    const { data: users = [], isPending } = useQuery({
        queryKey: ['users', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/users${search ? `?searchText=${search}` : ''}`);
            return res.data.data;
        }
    });

    // Update role mutation
    const updateRoleMutation = useMutation({
        mutationFn: async ({ id, role }) => {
            const res = await axiosSecure.patch(`/api/v1/admin/users/${id}/role`, { role });
            return res.data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['users']);
            toast.success(`User role updated to ${variables.role}!`);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to update role');
        }
    });

    const handleRoleChange = (id, newRole) => {
        updateRoleMutation.mutate({ id, role: newRole });
    };

    // Delete user mutation
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/api/v1/admin/users/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
            toast.success('User deleted successfully!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to delete user');
        }
    });

    const handleDelete = (id) => {
        if(window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            deleteMutation.mutate(id);
        }
    };

    if (isPending && !users.length) {
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
                    <h1 className="text-2xl font-bold text-[#113236]">Manage Users</h1>
                    <p className="text-gray-500">View and manage all registered users and their roles.</p>
                </div>
                <div className="form-control relative w-full sm:w-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search users by name or email..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input bg-white border border-gray-200 text-black w-full sm:w-72 md:w-80 rounded-xl pl-10 focus:border-[#c4f05b] focus:ring-2 focus:ring-[#c4f05b]/20 focus:outline-none transition-all shadow-sm" 
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Joined</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id || user.id} className="hover">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="w-10 h-10 rounded-full bg-[#eef8f8] text-[#3a837c] flex items-center justify-center border border-gray-100 overflow-hidden">
                                                    {user.photoURL || user.image ? (
                                                        <img src={user.photoURL || user.image} alt={user.name} className="object-cover w-full h-full" referrerPolicy="no-referrer" />
                                                    ) : (
                                                        <span className="font-bold">{user.name?.charAt(0) || 'U'}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-[#113236]">{user.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-gray-500">{user.email}</td>
                                    <td>
                                        <div className="flex flex-col gap-1 items-start">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                                                user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                                user.role === 'rider' ? 'bg-[#f4fce3] text-[#7eb316]' :
                                                'bg-gray-100 text-gray-700'
                                            }`}>
                                                {user.role}
                                            </span>
                                            {user.riderStatus === 'pending' && (
                                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 uppercase tracking-wider">
                                                    Pending Rider
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="text-gray-500 text-sm">
                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="text-right space-x-2">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user._id || user.id, e.target.value)}
                                            className="select select-sm bg-white border border-gray-200 text-[#113236] focus:border-[#c4f05b] focus:outline-none focus:ring-1 focus:ring-[#c4f05b] w-28 md:w-32 rounded-lg cursor-pointer"
                                        >
                                            <option value="user">User</option>
                                            <option value="rider">Rider</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        <button 
                                            onClick={() => handleDelete(user._id || user.id)}
                                            className="btn btn-sm btn-square btn-ghost text-red-500 hover:bg-red-50"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && !isPending && (
                                <tr>
                                    <td colSpan="5" className="text-center py-8 text-gray-500">No users found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
