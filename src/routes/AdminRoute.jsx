import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import ErrorPage from '../components/ErrorPage';

const AdminRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole();

    // loading state
    if (loading || roleLoading) {
        return <span className="loading loading-infinity loading-xl"></span>;
    }

    // not admin
    if (role !== 'admin') {
        return <ErrorPage></ErrorPage>
    }

    // admin access granted
    return children;
};

export default AdminRoute;
