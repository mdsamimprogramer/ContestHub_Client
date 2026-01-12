import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocialLogin';

const demoUsers = [
    { role: 'Admin', email: 'admin1@gmail.com', password: 'Samim123' },
    { role: 'Creator', email: 'creator@gmail.com', password: 'Samim123' },
    { role: 'User', email: 'users@gmail.com', password: 'Samim123' },
];

const Login = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [demoRole, setDemoRole] = useState('');

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(() => navigate(location?.state || '/'))
            .catch(error => alert(error.message));
    };

    const handleDemoSelect = (e) => {
        const selected = demoUsers.find(u => u.role === e.target.value);
        if (selected) {
            setDemoRole(selected.role);
            setValue('email', selected.email);
            setValue('password', selected.password);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-lg shadow-lg shadow-violet-200  rounded-2xl p-8">

                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="text-gray-500 mt-1">Login to your ContestHub account</p>
                </div>

                {/* Demo User Dropdown */}
                <div className="mb-6">
                    <select value={demoRole} onChange={handleDemoSelect} className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="">Select Demo User</option>
                        {demoUsers.map(user => (
                            <option key={user.role} value={user.role}>{user.role}</option>
                        ))}
                    </select>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input type="email" {...register('email', { required: true })}
                            className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Email"
                        />
                        {errors.email && <p className='text-red-500 text-sm mt-1'>Email is required</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input type="password" {...register('password', { required: true, minLength: 6 })}
                            className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Password"
                        />
                        {errors.password?.type === 'required' && <p className='text-red-500 text-sm mt-1'>Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className='text-red-500 text-sm mt-1'>Minimum 6 characters</p>}
                    </div>

                    <div className="text-right">
                        <Link className="text-sm text-purple-600 hover:underline">Forgot password?</Link>
                    </div>

                    <button type="submit" className="w-full py-2.5 bg-purple-600 text-white rounded-md hover:font-semibold shadow-md hover:bg-purple-700 cursor-pointer duration-400">
                        Login
                    </button>
                </form>

                <p className="text-center text-gray-500 mt-4 text-sm">
                    New to ContestHub? <Link state={location.state} to='/register' className="text-purple-600 font-semibold hover:underline">Register</Link>
                </p>

                <div className="mt-4">
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;
