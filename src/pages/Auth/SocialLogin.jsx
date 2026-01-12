import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FcGoogle } from "react-icons/fc";



const SocialLogin = () => {
    const { signInGoogle } = useAuth();
    const axiosSecure = useAxiosSecure()
    const location = useLocation()
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInGoogle()
            .then(result => {
                console.log(result.user);

                // create user in the database
                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL
                }
                axiosSecure.post('/users', userInfo)
                    .then(res => {
                        console.log('user data has been stored', res.data);
                        navigate(location?.state || '/')
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className="mt-4 space-y-4">
            <div className="relative flex items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-sm font-medium">OR</span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center w-full gap-3 px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 cursor-pointer transition-colors duration-200"
            >
                <FcGoogle className="text-xl" />
                <span className="text-gray-700 font-semibold text-sm">Continue with Google</span>
            </button>
        </div>
    );
};

export default SocialLogin;