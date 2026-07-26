import React from 'react';
import { Navigate } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import useRider from '../../hooks/useRider';
import runningGif from '../../assets/running.gif';

const DashboardRedirect = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isRider, isRiderLoading] = useRider();

    // While checking roles, show a loader
    if (isAdminLoading || isRiderLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <img src={runningGif} alt="Loading Dashboard..." className="w-24 h-24 object-contain drop-shadow-lg" />
                <p className="text-[#113236] font-bold tracking-widest text-sm uppercase animate-pulse">
                    Preparing Dashboard
                </p>
            </div>
        );
    }

    // Redirect based on role
    if (isAdmin) {
        return <Navigate to="/dashboard/admin" replace />;
    } else if (isRider) {
        return <Navigate to="/dashboard/rider" replace />;
    } else {
        return <Navigate to="/dashboard/my-profile" replace />;
    }
};

export default DashboardRedirect;
