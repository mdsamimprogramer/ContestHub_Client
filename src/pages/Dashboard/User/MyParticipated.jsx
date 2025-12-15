import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";

const ParticipatedContests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [selectedContest, setSelectedContest] = useState(null);
    const [submissionLink, setSubmissionLink] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ["participated-contests", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/participated-contests/${user.email}`);
            return res.data;
        },
    });

    const handleOpenModal = (contest) => {
        setSelectedContest(contest);
        setSubmissionLink("");
        setModalOpen(true);
    };

    const handleSubmitTask = async () => {
        if (!submissionLink.trim()) {
            alert("Please provide your submission link/details.");
            return;
        }

        try {
            await axiosSecure.post(`/submissions/${selectedContest._id}`, {
                userEmail: user.email,
                submissionLink,
            });

            alert("Task submitted successfully!");
            setModalOpen(false);
            queryClient.invalidateQueries(["participated-contests", user.email]);
        } catch (err) {
            console.error(err);
            alert("Submission failed");
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">
                My Participated Contests: <span className="text-fuchsia-600">{contests.length}</span>
            </h2>

            {contests.length === 0 && (
                <p className="text-gray-500">You have not participated in any contest yet.</p>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {contests.map((contest) => {
                    const ended = new Date(contest.deadline) < new Date();
                    const won = contest.winnerEmail === user.email;

                    return (
                        <div key={contest._id} className="card bg-base-100 shadow-lg">
                            <figure>
                                <img
                                    src={contest.image}
                                    alt={contest.name}
                                    className="h-40 w-full object-cover"
                                />
                            </figure>

                            <div className="card-body">
                                <h3 className="card-title">{contest.name}</h3>
                                <p className="text-sm text-gray-500">Prize: ${contest.prizeMoney}</p>

                                <span className={`badge ${ended ? "badge-error" : "badge-success"}`}>
                                    {ended ? "Ended" : "Ongoing"}
                                </span>

                                {won && (
                                    <span className="badge badge-success ml-2">🎉 You Won!</span>
                                )}

                                <div className="card-actions justify-end mt-4">
                                    {/* Details button */}
                                    <Link
                                        to={`/contest/${contest._id}`}
                                        className="btn btn-outline btn-sm"
                                    >
                                        Details
                                    </Link>

                                    {/* Submit Task button only for ongoing contests */}
                                    {!ended && (
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleOpenModal(contest)}
                                        >
                                            Submit Task
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Submit Task Modal */}
            {modalOpen && selectedContest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Submit Task for {selectedContest.name}</h3>
                        <textarea
                            className="w-full border p-2 mb-4"
                            placeholder="Enter your submission link or details"
                            value={submissionLink}
                            onChange={(e) => setSubmissionLink(e.target.value)}
                            rows={4}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                className="btn btn-outline"
                                onClick={() => setModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleSubmitTask}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ParticipatedContests;
