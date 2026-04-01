import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { FaUsers, FaArrowRight } from "react-icons/fa";

const ContestCard = ({ contest }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleDetails = () => {
        if (!user) {
            navigate("/login");
        } else {
            navigate(`/contest/${contest._id}`);
        }
    };

    return (
        <div className="group relative bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500">

            {/* Image Section with Overlay */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={contest.image}
                    alt={contest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-gray-800 text-xs font-black uppercase tracking-widest rounded-full shadow-lg border border-white/20">
                        {contest.type || "Global"}
                    </span>
                </div>
                {/* Image Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Card Content */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-black text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">
                        {contest.name}
                    </h3>
                </div>

                <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6 line-clamp-2">
                    {contest.description}
                </p>

                <div className="flex items-center justify-between pt-5 border-t border-gray-50">
                    {/* Participants Info */}
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <FaUsers className="text-blue-500 text-sm" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Entries</p>
                            <p className="text-sm font-black text-gray-700">{contest.participants}</p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={handleDetails}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-gray-200 hover:shadow-blue-200"
                    >
                        Details
                        <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Subtle Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>
    );
};

export default ContestCard;