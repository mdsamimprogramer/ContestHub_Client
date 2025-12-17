import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";

export default function ContestSubmissions() {
    const { id } = useParams(); // contestId
    const axiosSecure = useAxiosSecure();
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all submissions of this contest
    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const res = await axiosSecure.get(`/submissions/contest/${id}`);
                setSubs(res.data || []);
            } catch (err) {
                console.error("Error fetching submissions:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSubmissions();
    }, [id]);

    // Declare winner
    const declareWinner = async (submissionId) => {
        if (!window.confirm("Declare this submission as winner?")) return;
        try {
            const res = await axiosSecure.post(`/contests/${id}/declare-winner`, { submissionId });
            if (res.data.ok) {
                alert("Winner declared!");
                // Refresh submissions
                const r = await axiosSecure.get(`/submissions/contest/${id}`);
                setSubs(r.data);
            }
        } catch (err) {
            console.error("Error declaring winner:", err);
            alert("Error declaring winner");
        }
    };

    if (loading) return <Loading></Loading>

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">Submissions</h2>
            {subs.length === 0 ? (
                <p>No submissions yet.</p>
            ) : (
                <div className="space-y-3">
                    {subs.map((s) => (
                        <div key={s._id} className="bg-white p-3 rounded shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold">{s.userName} ({s.userEmail})</p>
                                    <p className="text-sm text-gray-600">
                                        Submitted at: {new Date(s.createdAt).toLocaleString()}
                                    </p>
                                    <p className="mt-2">
                                        Task:{" "}
                                        <a href={s.taskLink} target="_blank" rel="noreferrer" className="text-blue-600">
                                            View submission
                                        </a>
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    {s.isWinner ? (
                                        <div className="px-2 py-1 bg-green-200 rounded">Winner</div>
                                    ) : (
                                        <button
                                            onClick={() => declareWinner(s._id)}
                                            className="btn btn-sm btn-primary"
                                        >
                                            Declare Winner
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
