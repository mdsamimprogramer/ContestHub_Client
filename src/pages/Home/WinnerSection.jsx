import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";

const WinnerAdvertisement = () => {
    const axiosSecure = useAxiosSecure();

    // Fetching recent winners
    const { data: winners = [], isLoading } = useQuery({
        queryKey: ["recent-winners"],
        queryFn: async () => {
            const res = await axiosSecure.get("/winners/recent");
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    if (!winners.length) {
        return (
            <p className="text-center py-10 text-gray-500">
                No winners yet! Be the first one 🏆
            </p>
        );
    }

    return (
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-14 px-5 md:px-8 rounded-3xl my-12 shadow-lg">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
                🎉 Meet Our Recent Winners!
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {winners.map((winner, idx) => (
                    <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition ease-out duration-300">
                        {/* Image Section */}
                        <div className="relative">
                            <img src={winner.image} alt={winner.contestName} className="h-48 w-full object-cover"/>
                            <div className="absolute top-4 left-4 bg-yellow-500 text-white font-semibold px-3 py-1 rounded-full shadow-md">
                             🏆 Winner
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-800 truncate">
                                {winner.contestName}
                            </h3>
                            <p className="text-sm text-gray-600 mt-2">
                                🥇 <span className="font-medium">Winner: </span>
                                {winner.winnerEmail}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                💰 <span className="font-medium">Prize: </span>
                                <span className="text-green-600">
                                    ${winner.prizeMoney}
                                </span>
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                🗓️ <span className="font-medium">Ended on: </span>
                                {new Date(winner.endedAt).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="px-6 pb-5">
                            <button className="w-full bg-purple-600 text-white py-2 rounded-full font-semibold hover:bg-purple-700 transition">
                                View Contest
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WinnerAdvertisement;