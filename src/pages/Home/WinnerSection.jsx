import React from 'react';
import { Link } from 'react-router';

const WinnerSection = () => {
    return (
        <div>
            <section className="rounded-2xl bg-gradient-to-r from-green-700 to-emerald-500 text-white p-8 shadow-lg">
                <h1 className="text-3xl md:text-5xl font-black leading-tight">Build — Enter — Win.</h1>
                <p className="mt-3 max-w-2xl text-lg opacity-90">
                    ContestHub (starter): browse contests, join with payment, submit your work, and celebrate winners.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                    <Link to="/all-contests" className="btn btn-primary">Explore Contests</Link>
                    <Link to="/leaderboard" className="btn btn-outline">View Leaderboard</Link>
                </div>
            </section>
        </div>
    );
};

export default WinnerSection;