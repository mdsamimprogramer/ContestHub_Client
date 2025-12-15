import React from 'react';
import { ShieldCheckIcon, LightBulbIcon, TrophyIcon } from '@heroicons/react/24/outline';

const ExtraSection = () => {
    return (
        <div>
            {/* Extra Section (Static) */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">

                    <h2 className="text-4xl font-bold text-green-700 mb-4">
                        Why Choose <span className="text-green-900">ContestHub?</span>
                    </h2>

                    <p className="text-gray-600 max-w-3xl mx-auto mb-12">
                        ContestHub helps creators launch powerful creative contests and allows participants to
                        showcase their talent. A trusted platform with transparency, secure payment system,
                        fair judging, and an inspiring competitive environment.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Card 1 */}
                        <div className="bg-white shadow-md rounded-lg p-8 hover:shadow-xl transition">
                            <ShieldCheckIcon className="w-16 h-16 mx-auto mb-4 text-green-600" />
                            <h3 className="text-xl font-semibold mb-2">Secure & Fair</h3>
                            <p className="text-gray-600">
                                All contests are securely monitored and winners are selected fairly by creators.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white shadow-md rounded-lg p-8 hover:shadow-xl transition">
                            <LightBulbIcon className="w-16 h-16 mx-auto mb-4 text-green-600" />
                            <h3 className="text-xl font-semibold mb-2">Showcase Your Creativity</h3>
                            <p className="text-gray-600">
                                Join from anywhere and participate in exciting contests that boost your creativity.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white shadow-md rounded-lg p-8 hover:shadow-xl transition">
                            <TrophyIcon className="w-16 h-16 mx-auto mb-4 text-green-600" />
                            <h3 className="text-xl font-semibold mb-2">Win Big Rewards</h3>
                            <p className="text-gray-600">
                                Earn recognition, certificates, and prize money for your outstanding performance.
                            </p>
                        </div>

                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-12">
                        <a
                            href="/all-contests"
                            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow hover:bg-green-700 transition"
                        >
                            Explore All Contests
                        </a>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default ExtraSection;