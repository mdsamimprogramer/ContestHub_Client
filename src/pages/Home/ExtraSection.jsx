import React from 'react';
import { ShieldCheckIcon, LightBulbIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

const ExtraSection = () => {
    return (
        <section className="relative mt-4 rounded-md py-16 overflow-hidden bg-gray-200"
            style={{
                backgroundImage: `radial-gradient(#3b82f6 0.5px, transparent 0.5px)`,
                backgroundSize: '30px 30px',
                backgroundOpacity: '0.05'
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/80"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10">
                <div className="mb-14">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4 tracking-tight">
                        Why Choose <span className="text-blue-600">ContestHub?</span>
                    </h2>
                    <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full mb-8"></div>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        The ultimate platform to showcase your creative skills. We provide a transparent,
                        secure, and inspiring environment for creators and participants worldwide.
                    </p>
                </div>

                {/* Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">

                    <div className="bg-white/70 backdrop-blur-md p-10 rounded-3xl border border-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                            <ShieldCheckIcon className="w-10 h-10 text-blue-600 group-hover:text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">Secure & Fair</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Our integrated payment systems and judging processes are fully transparent and
                            monitored by expert creators.
                        </p>
                    </div>

                    <div className="bg-white/70 backdrop-blur-md p-10 rounded-3xl border border-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                            <LightBulbIcon className="w-10 h-10 text-blue-600 group-hover:text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">Global Innovation</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Explore diverse categories from Graphic Design to Business Ideas.
                            There's a place for every talent here.
                        </p>
                    </div>

                    <div className="bg-white/70 backdrop-blur-md p-10 rounded-3xl border border-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                            <TrophyIcon className="w-10 h-10 text-blue-600 group-hover:text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">Prestigious Rewards</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Win cash prizes, earn digital certificates, and gain recognition within
                            our fast-growing creative community.
                        </p>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-20">
                    <Link to="/all-contests"
                        className="group inline-flex items-center gap-2 px-7 py-3 bg-slate-900 text-white text-base font-semibold rounded-full 
             shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300 active:scale-95"
                    >
                        <span>Explore All Contests</span>
                        <HiOutlineArrowNarrowRight className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default ExtraSection;