import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';

const Contact = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        Swal.fire({
            title: 'Message Sent!',
            text: 'Thank you for contacting ContestHub. We will get back to you soon.',
            icon: 'success',
            confirmButtonColor: '#2563eb',
        });
        reset();
    };

    return (
        <div className="min-h-screen mt-5 rounded-md bg-gray-50 dark:bg-slate-900 transition-colors duration-300 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                        Get in <span className="text-blue-600">Touch</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Have questions about a contest or need technical support? Our team is here to help you 24/7.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Contact Information</h3>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                        <FaEnvelope className="text-blue-600 w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Email Us</p>
                                        <p className="font-semibold dark:text-gray-200">mdsamimhossen827@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                        <FaPhoneAlt className="text-green-600 w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Call Us</p>
                                        <p className="font-semibold dark:text-gray-200">+880 1743282144</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                                        <FaMapMarkerAlt className="text-orange-600 w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Our Office</p>
                                        <p className="font-semibold dark:text-gray-200">Dhaka, Bangladesh</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-700">
                                <p className="text-gray-800 dark:text-white font-bold mb-4">Follow Us</p>
                                <div className="flex gap-4">
                                    <a href="https://www.facebook.com/md.samim.khan.22906" className="p-3 bg-gray-100 dark:bg-slate-700 rounded-full hover:text-blue-600 transition-all"><FaFacebook size={20} /></a>
                                    <a href="https://www.linkedin.com/in/samim01/" className="p-3 bg-gray-100 dark:bg-slate-700 rounded-full hover:text-blue-700 transition-all"><FaLinkedin size={20} /></a>
                                    <a href="https://www.github.com/mdsamimprogramer" className="p-3 bg-gray-100 dark:bg-slate-700 rounded-full hover:text-blue-700 transition-all"><FaGithub size={20} /></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="John Doe"
                                />
                                {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                    })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                                {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                                <textarea
                                    rows="4"
                                    {...register("message", { required: "Message cannot be empty", minLength: { value: 10, message: "Minimum 10 characters required" } })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="How can we help you?"
                                ></textarea>
                                {errors.message && <span className="text-red-500 text-xs mt-1">{errors.message.message}</span>}
                            </div>

                            <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-95">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;