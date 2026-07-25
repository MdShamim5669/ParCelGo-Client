import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AuthContext } from '../../context/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyProfile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: profile, isPending } = useQuery({
        queryKey: ['my-profile', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/users/${user.email}`);
            return res.data.data;
        }
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (profile) {
            reset({
                name: profile.name || user?.displayName || '',
                phone: profile.phone || '',
                address: profile.address || '',
                photoURL: profile.photoURL || user?.photoURL || ''
            });
        }
    }, [profile, user, reset]);

    const mutation = useMutation({
        mutationFn: async (updatedData) => {
            const res = await axiosSecure.put(`/api/v1/users/${user.email}`, updatedData);
            return res.data;
        },
        onSuccess: async (data, variables) => {
            queryClient.invalidateQueries(['my-profile', user?.email]);
            
            // Optionally update Firebase Profile if name or photo changed
            if (variables.name !== user?.displayName || variables.photoURL !== user?.photoURL) {
                await updateUserProfile(variables.name, variables.photoURL);
            }

            toast.success('Profile updated successfully!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        }
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <span className="loading loading-spinner text-[#c4f05b] loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold text-[#113236]">My Profile</h1>
                <p className="text-gray-500">Manage your personal information and settings.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Profile Header */}
                <div className="bg-[#0d2629] p-8 text-white relative flex flex-col md:flex-row items-center gap-6">
                    <div className="w-24 h-24 rounded-full border-4 border-[#c4f05b] overflow-hidden bg-gray-600 shrink-0 relative z-10">
                        {profile?.photoURL || user?.photoURL ? (
                            <img src={profile?.photoURL || user?.photoURL} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl">
                                👤
                            </div>
                        )}
                    </div>
                    <div className="text-center md:text-left relative z-10">
                        <h2 className="text-2xl font-bold">{profile?.name || user?.displayName || 'User'}</h2>
                        <p className="text-[#c4f05b]">{user?.email}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold capitalize">
                            Role: {profile?.role || 'User'}
                        </span>
                    </div>
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-64 h-full bg-[#c4f05b] opacity-10 skew-x-12 transform translate-x-10"></div>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                    <h3 className="text-lg font-bold text-[#113236] border-b pb-2">Update Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-semibold text-gray-700">Full Name</span></label>
                            <input 
                                type="text" 
                                {...register('name', { required: 'Name is required' })}
                                placeholder="Your Full Name"
                                className={`input input-bordered w-full rounded-xl bg-white text-gray-900 focus:border-[#c4f05b] focus:outline-none ${errors.name ? 'border-red-500' : ''}`}
                            />
                            {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
                        </div>

                        {/* Email (Disabled) */}
                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-semibold text-gray-700">Email Address</span></label>
                            <input 
                                type="email" 
                                value={user?.email || ''} 
                                disabled
                                className="input input-bordered w-full rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed"
                            />
                            <label className="label"><span className="label-text-alt text-black">Email cannot be changed</span></label>
                        </div>

                        {/* Phone */}
                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-semibold text-gray-700">Phone Number</span></label>
                            <input 
                                type="text" 
                                {...register('phone')}
                                placeholder="+880 1..."
                                className="input input-bordered w-full rounded-xl bg-white text-gray-900 focus:border-[#c4f05b] focus:outline-none"
                            />
                        </div>

                        {/* Photo URL */}
                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-semibold text-gray-700">Profile Photo URL</span></label>
                            <input 
                                type="url" 
                                {...register('photoURL')}
                                placeholder="https://example.com/photo.jpg"
                                className="input input-bordered w-full rounded-xl bg-white text-gray-900 focus:border-[#c4f05b] focus:outline-none"
                            />
                        </div>

                        {/* Address */}
                        <div className="form-control w-full md:col-span-2">
                            <label className="label"><span className="label-text font-semibold text-gray-700">Delivery Address</span></label>
                            <textarea 
                                {...register('address')}
                                className="textarea textarea-bordered w-full rounded-xl p-4 bg-white text-gray-900 focus:border-[#c4f05b] focus:outline-none min-h-[100px]"
                                placeholder="Enter your full address"
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button 
                            type="submit"
                            disabled={mutation.isPending}
                            className="btn bg-[#c4f05b] hover:bg-[#b5e054] text-[#113236] border-none rounded-xl px-10"
                        >
                            {mutation.isPending ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MyProfile;
