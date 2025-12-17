import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";

const WinnerDeclare = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [selectedContest, setSelectedContest] = useState(null);

    // 1️ Fetch contests created by this user
    const { data: contests = [], isLoading } = useQuery({
        queryKey: ["my-contests", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/creator/${user.email}`);
            return res.data;
        },
    });

    // 2️ Fetch submissions for selected contest
    const { data: submissions = [], refetch: refetchSubmissions } = useQuery({
        queryKey: ["submissions", selectedContest?._id],
        enabled: !!selectedContest,
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions/contest/${selectedContest._id}`);
            return res.data;
        },
    });

    // select a contest
    const handleSelectContest = (contest) => {
        setSelectedContest(contest);
    };

    // declare winner
    const declareWinner = async (submissionId) => {
        try {
            await axiosSecure.post(
                `/contests/${selectedContest._id}/declare-winner`,
                { submissionId }
            );

            alert("Winner declared successfully!");
            // refresh submissions and contest list
            refetchSubmissions();
            queryClient.invalidateQueries(["my-contests", user.email]);
        } catch (err) {
            console.error(err);
            alert("Failed to declare winner.");
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-5 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">My Created Contests</h2>

            {/* Contest List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contests.map((contest) => (
                    <div
                        key={contest._id}
                        className={`card bg-base-100 shadow-lg cursor-pointer ${selectedContest?._id === contest._id ? "border-2 border-primary" : ""
                            }`}
                        onClick={() => handleSelectContest(contest)}
                    >
                        <figure>
                            <img src={contest.image} alt={contest.name} className="h-40 w-full object-cover"/>
                        </figure>
                        <div className="card-body">
                            <h3 className="card-title">{contest.name}</h3>
                            <p className="text-sm text-gray-500">
                                Participants: {contest.participants}
                            </p>
                            <p className="text-sm text-gray-500">Prize: ${contest.prizeMoney}</p>
                            <p className="text-sm text-gray-500">
                                Status: {contest.status === "ended" ? "Ended" : "Ongoing"}
                            </p>
                            {contest.winnerEmail && (
                                <span className="badge badge-success mt-2">
                                    Winner: {contest.winnerEmail}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Submissions Section */}
            {selectedContest && (
                <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">
                        Submissions for "{selectedContest.name}"
                    </h3>

                    {submissions.length === 0 && <p>No submissions yet.</p>}

                    <div className="grid gap-4">
                        {submissions.map((sub) => (
                            <div key={sub._id} className="card bg-base-100 shadow p-4 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{sub.userEmail}</p>
                                    <p className="text-sm text-gray-500 break-all">
                                        {sub.submissionLink}
                                    </p>
                                </div>

                                {!sub.isWinner && selectedContest.status !== "ended" ? (
                                    <button className="btn btn-primary btn-sm" onClick={() => declareWinner(sub._id)}>
                                        Declare Winner
                                    </button>
                                ) : (
                                    sub.isWinner && (<span className="badge badge-success">Winner 🏆</span>)
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WinnerDeclare;
