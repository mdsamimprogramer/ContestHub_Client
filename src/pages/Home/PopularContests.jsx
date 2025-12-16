import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router"; // react-router-dom নিশ্চিত করুন
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function PopularContests() {
    const axiosSecure = useAxiosSecure();

    const { data = [], isLoading, isError, error } = useQuery({
        queryKey: ["popular-contests"],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get("/contests/popular");
                return res.data;
            } catch (err) {
                console.error("Failed to fetch popular contests:", err);
                throw err; // react-query error handling
            }
        }
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="grid md:grid-cols-3 gap-4">
            {data.length === 0 && <p>No popular contests found.</p>}
            {data.map(contest => (
                <div key={contest._id} className="card shadow-lg p-4">
                    <img
                        src={contest.image || "/placeholder.jpg"} // fallback image
                        alt={contest.name}
                        className="h-40 w-full object-cover mb-2"
                    />
                    <h3 className="font-bold text-lg">{contest.name}</h3>
                    <p>{contest.description?.slice(0, 80) || "No description"}...</p>
                    <p>Participants: {contest.participants?.length || 0}</p>
                    <Link to={`/contest/${contest._id}`} className="btn btn-primary mt-2">
                        Details
                    </Link>
                </div>
            ))}
        </div>
    );
}
