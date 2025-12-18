import { useState } from "react";
import { useNavigate } from "react-router";
import { MdSearch } from "react-icons/md";

const contestTypes = [
    { label: "Select Contest Type", value: "" },
    { label: "Design", value: "design" },
    { label: "Article/Writing", value: "article" },
    { label: "Business Idea", value: "business" },
    { label: "Video/Motion", value: "video" },
];

const HomeBanner = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (!search) return;
        const lowerCaseSearch = search.toLowerCase();
        navigate(`/all-contests?type=${lowerCaseSearch}`);
    };

    return (
        <div className="relative w-full min-h-[70vh] bg-gray-800 flex items-center overflow-hidden rounded-xl justify-center">
            <video className="absolute top-0 left-0 w-full h-full object-cover"
                src="/video.mp4"
                type="video/mp4"
                autoPlay
                loop
                muted
                playsInline
            ></video>

            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content Section */}
            <div className="relative z-10 text-center max-w-3xl text-white space-y-6">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                    Discover & Join <span className="text-yellow-300">Creative Contests</span>
                </h1>
                <p className="text-lg md:text-xl font-light opacity-90">
                    Be a part of design, writing, business, and video contests & win exceptional rewards.
                </p>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 justify-center pt-6 items-center">
                    <div className="relative w-full md:w-80">
                        <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />

                        {/* Search Dropdown */}
                        <select className="w-full px-10 py-3 rounded-full bg-white text-gray-800 font-medium shadow-md focus:ring-4 focus:ring-purple-600 cursor-pointer appearance-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        >
                            {/* Default Placeholder */}
                            <option value="" disabled hidden>
                                 What type of contest are you looking for?
                            </option>
                            {contestTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="px-10 py-3 rounded-full bg-yellow-300 text-indigo-800 font-semibold text-lg hover:bg-yellow-400 transition-colors duration-300 disabled:opacity-50 shadow-lg" disabled={!search} >
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HomeBanner;