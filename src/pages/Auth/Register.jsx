import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocialLogin';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { registerUser, updateUserProfile } = useAuth()
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure()

    const handleRegistration = (data) => {
        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then(() => {
                // store the image and get the photo url
                const formdata = new FormData()
                formdata.append('image', profileImg)
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`

                axios.post(image_API_URL, formdata)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        // create user in the database
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user created in ');
                                }
                            })

                        // update profile to firebase
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log('user profile dan');
                                navigate(location?.state || '/')

                            })
                            .catch(error => console.log(error))
                    })


            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className="card bg-base-100 mx-auto mt-10 w-full max-w-sm shrink-0 shadow-2xl">
            <h3 className='text-3xl text-center'>Welcome ContestHub</h3>
            <p className='text-center'>Please Register</p>
            <form className='card-body' onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">
                    {/* name */}
                    <label className="label">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input" placeholder="name.." />
                    {errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>}

                    {/* name */}
                    <label className="label">Photo</label>
                    <input type="file" {...register('photo', { required: true })} className="file-input" placeholder="photo" />
                    {errors.photo?.type === 'required' && <p className='text-red-500'>Photo is required</p>}

                    {/* email */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}

                    {/* password */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{6,}$/
                    })} className="input" placeholder="Password" />
                    {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                    {errors.password?.type === 'minLength' && <p className='text-red-400'>Password must have 6 carecter</p>}
                    {errors.password?.type === 'pattern' && <p className='text-red-400'>Password must have uppercase and lowercase or number.</p>}
                    <div><a className="link link-hover">Forgot password ?</a></div>
                    <button className="btn btn-neutral mt-4">Register</button>
                    <SocialLogin></SocialLogin>
                </fieldset>
                <p> Already have an account <Link state={location.state} to='/login' className='text-blue-300 font-bold'>Login</Link></p>
            </form>
        </div>
    );
};

export default Register;