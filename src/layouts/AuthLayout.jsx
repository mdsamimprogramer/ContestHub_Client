import React from 'react';
import { Outlet } from 'react-router';
// import authImg from '../assets/authImage.png'
import authImg1 from '../assets/authImage1.png'

const AuthLayout = () => {
    return (
        <div>
            <div className='max-w-7xl mx-auto'>
        
                <div className='flex items-center'>
                    <div className='flex-1'>
                        <Outlet></Outlet>
                    </div>
                    <div className='flex-1 hidden md:block'>
                        <img src={authImg1} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;