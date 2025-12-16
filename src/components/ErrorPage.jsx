import React from 'react';
import { Link } from 'react-router';
import { Player } from '@lottiefiles/react-lottie-player';
import forbiddenAnim from "/forbidden.json";

const ErrorPage = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center text-center px-4">

            <Player
                autoplay
                loop
                src={forbiddenAnim}
                style={{ height: '250px', width: '250px' }}
            />

            <h1 className="text-6xl font-bold text-red-600 mt-4">403</h1>
            <h2 className="text-2xl font-semibold mt-2">Access Forbidden</h2>
            <p className="mt-2 text-gray-600">You don’t have permission to access this page.</p>

            <Link to="/" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;
