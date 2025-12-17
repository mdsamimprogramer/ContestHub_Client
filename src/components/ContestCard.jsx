import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

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
        <div className="card bg-white shadow-lg rounded-lg hover:shadow-xl transition-transform transform hover:-translate-y-1">
            {/* Image Section */}
            <figure className="relative">
                <img
                    src={contest.image}
                    alt={contest.name}
                    className="h-52 w-full object-cover rounded-t-lg"
                />
                <span className="absolute top-2 right-2 bg-yellow-300 text-gray-800 font-semibold px-3 py-1 text-xs rounded-full shadow-md">
                    {contest.type || "Contest"}
                </span>
            </figure>

            {/* Card Body */}
            <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800">{contest.name}</h3>
                <p className="mt-2 text-sm text-gray-600">
                    {contest.description.slice(0, 80)}...
                </p>
                <p className="mt-4 font-semibold text-gray-700">
                    👥 Participants: <span className="text-indigo-600">{contest.participants}</span>
                </p>
                <div className="mt-4 text-right">
                    <button onClick={handleDetails} className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">
                        Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContestCard;