import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";

const ParticipatedContests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ["participated-contests", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/participated-contests/${user.email}`
            );
            return res.data;
        },
    });

    if (isLoading) return <Loading></Loading>

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

                    return (
                        <div key={contest._id} className="card bg-base-100 shadow-lg" >
                            <figure>
                                <img
                                    src={contest.image}
                                    alt={contest.name}
                                    className="h-40 w-full object-cover"
                                />
                            </figure>

                            <div className="card-body">
                                <h3 className="card-title">{contest.name}</h3>
                                <p className="text-sm text-gray-500"> Prize: ${contest.prizeMoney}</p>

                                <span className={`badge ${ended ? "badge-error" : "badge-success"}`}>
                                    {ended ? "Ended" : "Ongoing"}
                                </span>

                                <div className="card-actions justify-end mt-4">
                                    <Link
                                        to={`/contest/${contest._id}`}
                                        className="btn btn-outline btn-sm"
                                    >
                                        Details
                                    </Link>

                                    {!ended && (
                                        <Link
                                            to={`/contest/${contest._id}`}
                                            className="btn btn-primary btn-sm"
                                        >
                                            Submit Task
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ParticipatedContests;
