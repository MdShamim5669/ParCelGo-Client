import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/users/role/${user.email}`);
            return res.data?.data?.admin;
        }
    });

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
