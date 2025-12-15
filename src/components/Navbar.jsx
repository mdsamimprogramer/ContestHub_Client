import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../hooks/useAuth';

export default function Navbar() {
    const { user, logOut } = useAuth();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

    const activeClass = "text-blue-600 font-bold border-b-2 border-blue-600 pb-1";
    const normalClass = "text-gray-700 hover:text-blue-500 transition duration-150";

    const handleLogout = () => {
        logOut();
        setIsDropdownOpen(false); 
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">

                <div>
                    <Link to="/" className="text-2xl font-black text-green-600 tracking-wider">ContestHub</Link>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-6">
                        <NavLink to="/" className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink>
                        <NavLink to="/all-contests" className={({ isActive }) => isActive ? activeClass : normalClass}>All Contests</NavLink>
                        <NavLink to="/extra-section" className={({ isActive }) => isActive ? activeClass : normalClass}>Extra Section</NavLink>
                    </div>

                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <img
                                src={user.photoURL || "https://via.placeholder.com/40"}
                                alt={user.displayName || "Profile"}
                                className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-green-500 hover:ring-blue-500 transition duration-150"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                title={user.displayName}
                            />

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-3 w-48 bg-white border shadow-xl rounded-lg p-3 text-sm flex flex-col gap-2 z-20">
                                    {/* displayName */}
                                    <span className="font-semibold text-gray-800 truncate">{user.displayName || "User"}</span>

                                    {/* Dashboard */}
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="text-gray-600 hover:text-blue-600 border-t pt-2"
                                    >
                                        Dashboard
                                    </Link>

                                    {/* Logout */}
                                    <button
                                        onClick={handleLogout}
                                        className="text-red-500 hover:text-red-700 text-left"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/login" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-150">Login</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}