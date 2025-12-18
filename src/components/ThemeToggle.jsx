import React, { useEffect, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';

const ThemeToggle = () => {
    
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
    );

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 transition-all shadow-sm"
            title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
        >
            {theme === 'dark' ? (
                <HiSun className="text-yellow-400 w-6 h-6" />
            ) : (
                <HiMoon className="text-gray-600 w-6 h-6" />
            )}
        </button>
    );
};

export default ThemeToggle;