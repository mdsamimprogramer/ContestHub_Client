import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../hooks/useAuth';
import { FaTrophy, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
    const { user, logOut } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    const activeClass = "text-blue-600 font-bold border-b-2 border-blue-600 pb-1";
    const normalClass = "text-gray-700 hover:text-blue-500 transition duration-150 font-medium";

    const handleLogout = () => {
        logOut();
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinks = (
        <>
            <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink>
            <NavLink to="/all-contests" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>All Contests</NavLink>
            <NavLink to="/extra-section" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : normalClass}>About Us</NavLink>
        </>
    );

    return (
        <nav className="bg-gray-50 shadow-lg sticky top-0 z-50">
            <div className="px-5 md:px-12 lg:px-20 xl:px-28">
                <div className="flex items-center justify-between h-16">

                    {/* 1. Left: Logo Section */}
                    <div className="flex-shrink-0 flex items-center w-1/4">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-orange-100 p-2 rounded-lg group-hover:bg-orange-200 transition-colors">
                                <FaTrophy className="text-orange-500 text-xl md:text-2xl" />
                            </div>
                            <span className="hidden sm:block text-2xl font-black text-gray-800 tracking-tight">
                                Contest<span className="text-fuchsia-500">Hub</span>
                            </span>
                        </Link>
                    </div>

                    {/* 2. Middle: Desktop Menu (Centralized) */}
                    <div className="hidden md:flex flex-grow justify-center items-center gap-8">
                        {navLinks}
                    </div>

                    {/* 3. Right: Action Section */}
                    <div className="flex items-center justify-end gap-4 w-1/4">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <img
                                    src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-orange-500 hover:ring-blue-500 transition duration-150 object-cover"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                />

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-100 shadow-xl rounded-xl p-2 z-50">
                                        <div className="px-4 py-3 border-b border-gray-50 mb-1">
                                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Signed in as</p>
                                            <p className="font-bold text-gray-800 truncate">{user?.displayName || "User"}</p>
                                        </div>
                                        <Link to="/dashboard" onClick={() => setIsDropdownOpen(false)}
                                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
                                        >
                                            Dashboard
                                        </Link>
                                        <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition mt-1">
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="px-6 py-2 text-sm font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition shadow-md">
                                Login
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-blue-600 p-2">
                                {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Menu (Vertical) */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-lg p-6 space-y-4 text-center">
                    <div className="flex flex-col gap-5">{navLinks}</div>
                </div>
            )}
        </nav>
    );
}