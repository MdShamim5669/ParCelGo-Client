import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useRider = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: isRider, isPending: isRiderLoading } = useQuery({
        queryKey: [user?.email, 'isRider'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/users/role/${user.email}`);
            return res.data?.data?.rider;
        }
    });

    return [isRider, isRiderLoading];
};

export default useRider;
