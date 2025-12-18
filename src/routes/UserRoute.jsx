import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Loading from '../components/Loading';

const CreatorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: roleData, isLoading } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            if (!user?.email) return { role: 'user' };
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (loading || isLoading) return <Loading></Loading>;

    if (roleData?.role !== 'user') {
        return <Navigate to='/' />;
    }

    return children ? children : <Outlet />;
};

export default CreatorRoute;
