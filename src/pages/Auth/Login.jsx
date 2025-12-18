import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';

import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocialLogin';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signInUser } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogin = (data) => {
        console.log(data);
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="card bg-base-100 mx-auto w-full mt-10 max-w-sm shrink-0 shadow-2xl">
            <h3 className='text-3xl text-center'>Welcome Back</h3>
            <p className='text-center'>Please Login</p>
            <form onSubmit={handleSubmit(handleLogin)} className="card-body">
                <fieldset className="fieldset">
                    {/* email */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {errors.email?.type === 'required' && <p className='text-red-400'>Email must be added</p>}
                    {/* password */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                    <div><a className="link link-hover">Forgot password?</a></div>
                    {errors.password?.type === 'required' && <p className='text-red-400'>Password must be 6 characters</p>}
                    {errors.password?.type === 'minLength' && <p className='text-red-400'>MinLength 6 word adds</p>}
                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
                <p>New to ContestHub <Link state={location.state} to='/register' className='text-blue-300 font-bold'>Register</Link></p>
                <SocialLogin></SocialLogin>
            </form>
        </div>
    );
};

export default Login;