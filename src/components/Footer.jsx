import React from "react";
import { FaFacebook, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-10">
            <div className="max-w-7xl mx-auto px-5 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Logo & Description */}
                <div className="space-y-3">
                    <h1 className="text-2xl font-bold text-white">ContestHub</h1>
                    <p className="text-gray-400">
                        A modern contest platform to create, participate, and celebrate creative contests online.
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
                    <div className="flex gap-4 mt-2">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
                            <FaFacebook size={24} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                            <FaLinkedin size={24} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition">
                            <FaTwitter size={24} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
                            <FaInstagram size={24} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-800 mt-6">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>© 2025 ContestHub. All rights reserved.</p>
                    <p>Designed & Developed by <span className="text-fuchsia-500 font-semibold">Your Name</span></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
