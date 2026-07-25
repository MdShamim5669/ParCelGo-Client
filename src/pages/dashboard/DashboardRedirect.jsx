import React from 'react';
import { Navigate } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import useRider from '../../hooks/useRider';

const DashboardRedirect = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isRider, isRiderLoading] = useRider();

    // While checking roles, show a loader
    if (isAdminLoading || isRiderLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <span className="loading loading-spinner text-[#c4f05b] loading-lg"></span>
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
