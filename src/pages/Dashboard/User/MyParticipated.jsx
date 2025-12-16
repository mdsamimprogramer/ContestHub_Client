import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import { toast, ToastContainer } from "react-toastify";

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
            toast.error("Please provide your submission link/details.");
            return;
        }

        try {
            await axiosSecure.post(`/submissions/${selectedContest._id}`, {
                userEmail: user.email,
                submissionLink,
            });

            toast.success("Task submitted successfully!");
            setModalOpen(false);
            queryClient.invalidateQueries(["participated-contests", user.email]);
        } catch (err) {
            console.error(err);
            toast.error("Submission failed Already submitted");
        }
    };
    if (isLoading) return <Loading />;

    return (
        <div className="p-5 max-w-7xl mx-auto">
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
            />
            <h2 className="text-2xl font-bold mb-6"> My Participated Contests: <span className="text-fuchsia-600">{contests.length}</span> </h2>

            {contests.length === 0 && (<p className="text-gray-500">You have not participated in any contest yet.</p>)}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {contests.map((contest) => {
                    const ended = contest.status === "ended";
                    const won = contest.winnerEmail === user.email;

                    return (
                        <div
                            key={contest._id}
                            className="group rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            <figure className="overflow-hidden">
                                <img
                                    src={contest.image}
                                    alt={contest.name}
                                    className="h-44 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </figure>

                            <div className="p-5 space-y-3">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {contest.name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Prize: <span className="font-medium">${contest.prizeMoney}</span>
                                </p>

                                <div className="flex items-center gap-2">
                                    <span
                                        className={`px-3 py-1 text-xs font-semibold rounded-full ${ended
                                                ? "bg-red-100 text-red-600"
                                                : "bg-green-100 text-green-600"
                                            }`}
                                    >
                                        {ended ? "Ended" : "Ongoing"}
                                    </span>

                                    {won && (
                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-600">
                                            🎉 You Won
                                        </span>
                                    )}
                                </div>

                                <div className="flex justify-between items-center pt-4">
                                    <Link
                                        to={`/contest/${contest._id}`}
                                        className="text-sm font-medium text-fuchsia-600 hover:underline"
                                    >
                                        View Details →
                                    </Link>

                                    {!ended && (
                                        <button
                                            onClick={() => handleOpenModal(contest)}
                                            className="px-4 py-1.5 text-sm rounded-full bg-fuchsia-600 text-white hover:bg-fuchsia-700 transition"
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
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-scaleIn">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4"> Submit Task </h3>
                        <p className="text-sm text-gray-500 mb-3">
                            Contest: <span className="font-medium">{selectedContest.name}</span>
                        </p>
                        <textarea
                            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 mb-4"
                            placeholder="Paste your submission link or details..."
                            value={submissionLink}
                            onChange={(e) => setSubmissionLink(e.target.value)}
                            rows={4}
                        />

                        <div className="flex justify-end gap-3">
                            <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-full border hover:bg-gray-100 transition">
                                Cancel
                            </button>

                            <button onClick={handleSubmitTask} className="px-5 py-2 rounded-full bg-fuchsia-600 text-white hover:bg-fuchsia-700 transition" >
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
