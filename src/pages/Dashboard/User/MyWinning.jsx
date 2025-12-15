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
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">
                🏆 My Winning Contests{" "}
                <span className="text-fuchsia-600">({contests.length})</span>
            </h2>

            {contests.length === 0 && (
                <p className="text-gray-500">
                    😔 You have not won any contests yet.
                </p>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contests.map((contest) => (
                    <div
                        key={contest._id}
                        className="card bg-base-100 shadow-lg hover:shadow-xl transition"
                    >
                        <figure>
                            <img
                                src={contest.image}
                                alt={contest.name}
                                className="h-40 w-full object-cover"
                            />
                        </figure>

                        <div className="card-body">
                            <h3 className="card-title">{contest.name}</h3>

                            <p className="text-sm text-gray-500">
                                💰 Prize: ${contest.prizeMoney}
                            </p>

                            <p className="text-sm text-gray-500">
                                📅 Ended:{" "}
                                {contest.deadline
                                    ? new Date(contest.deadline).toLocaleDateString()
                                    : "N/A"}
                            </p>

                            <span className="badge badge-success mt-2">
                                🏆 Winner
                            </span>

                            <div className="card-actions justify-end mt-4">
                                <Link
                                    to={`/contest/${contest._id}`}
                                    className="btn btn-outline btn-sm"
                                >
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
