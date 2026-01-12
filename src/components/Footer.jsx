import React from "react";
import { FaFacebook, FaLinkedin, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-10">
            {/* Main Footer Content */}
            <div className="px-5 md:px-12 lg:px-20 xl:px-28 pt-8 pb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Logo & Description */}
                <div className="space-y-3">
                    <h1 className="text-2xl font-bold text-fuchsia-500">ContestHub</h1>
                    <p className="text-gray-400">
                        A modern platform to create, participate, and celebrate creative contests online.
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="space-y-2">
                    <h3 className="text-white font-semibold">Quick Links</h3>
                    <ul className="space-y-1">
                        <li><a href="/" className="hover:text-fuchsia-500 transition">Home</a></li>
                        <li><a href="/all-contests" className="hover:text-fuchsia-500 transition">All Contests</a></li>
                        <li><a href="/dashboard" className="hover:text-fuchsia-500 transition">Dashboard</a></li>
                        <li><a href="/leaderboard" className="hover:text-fuchsia-500 transition">Leaderboard</a></li>
                    </ul>
                </div>

                {/* Support Links */}
                <div className="space-y-2">
                    <h3 className="text-white font-semibold">Support</h3>
                    <ul className="space-y-1">
                        <li><a href="/contact" className="hover:text-fuchsia-500 transition">Contact Us</a></li>
                        <li><a href="/faq" className="hover:text-fuchsia-500 transition">FAQ</a></li>
                        <li><a href="/privacy" className="hover:text-fuchsia-500 transition">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:text-fuchsia-500 transition">Terms of Service</a></li>
                    </ul>
                </div>

                {/* Social Links */}
                <div className="space-y-2">
                    <h3 className="text-white font-semibold">Follow Us</h3>
                    <div className="flex gap-4 mt-2 md:mt-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition hover:rotate-360 duration-500 hover:scale-125">
                            <FaFacebook size={28} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition hover:rotate-360 duration-500 hover:scale-125">
                            <FaLinkedin size={28} />
                        </a>
                        <a href="https://github.com/mdsamimprogramer" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition hover:rotate-360 duration-500 hover:scale-125">
                            <FaGithub size={28} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition hover:rotate-360 duration-500 hover:scale-125">
                            <FaInstagram size={28} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-800 mt-2.5">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col items-center justify-center text-gray-500 text-sm text-center">
                    <p> Designed & Developed by <span className="text-fuchsia-500 font-semibold">Samim</span></p>
                    <p>© 2025 ContestHub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;