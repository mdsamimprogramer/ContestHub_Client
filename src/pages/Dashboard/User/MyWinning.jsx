import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";

const MyWinningContests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ["winning-contests", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/wins/${user.email}`);
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    return (
        <div className="p-5 max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
                🏆 My Winning Contests
                <span className="text-fuchsia-600">({contests.length})</span>
            </h2>

            {contests.length === 0 && (
                <p className="text-gray-500 text-center py-10 text-lg">
                    😔 You have not won any contests yet.
                </p>
            )}

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {contests.map((contest) => (
                    <div key={contest._id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                        <figure className="overflow-hidden">
                            <img
                                src={contest.image || "/default-contest.jpg"}
                                alt={contest.name}
                                className="h-48 w-full object-cover transition-transform duration-300 transform hover:scale-105"
                            />
                        </figure>

                        <div className="p-5 space-y-2.5">
                            <h3 className="text-lg font-semibold text-gray-800"> {contest.name} </h3>
                            <p className="text-sm text-gray-500">
                                Prize: <span className="font-medium">${contest.prizeMoney}</span>
                            </p>
                            <p className="text-sm text-gray-500">
                                📅 Ended:{" "}
                                {contest.deadline
                                    ? new Date(contest.deadline).toLocaleDateString()
                                    : "N/A"}
                            </p>
                            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                                🏆 Winner
                            </span>
                            <div className="mt-2 flex justify-end">
                                <Link to={`/contest/${contest._id}`} className="px-4 py-2 text-sm font-medium text-fuchsia-600 border border-fuchsia-600 rounded-full hover:bg-fuchsia-50 transition">
                                    View Contest
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyWinningContests;
