import React from 'react';

const HeroSection = () => {
    return (
        <div>
            {/* Banner Section */}
            <section className="relative bg-green-200 h-96 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-4">Join Amazing Contests Today!</h1>
                    <input
                        type="text"
                        placeholder="Search contests by type..."
                        className="p-2 rounded w-80"
                    />
                </div>
            </section>
        </div>
    );
};

export default HeroSection;