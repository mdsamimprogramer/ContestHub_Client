import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: 'https://contests-hub.vercel.app',
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Request interceptor
        const reqInterceptor = axiosSecure.interceptors.request.use(config => {
            if (user?.accessToken) {
                config.headers.Authorization = `Bearer ${user.accessToken}`;
            }
            return config;
        });

        // Response interceptor
        const resInterceptor = axiosSecure.interceptors.response.use(
            response => response,
            async (error) => {
                const statusCode = error.response?.status;
                if (statusCode === 401 || statusCode === 403) {
                    await logOut();
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };
    }, [user, logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
