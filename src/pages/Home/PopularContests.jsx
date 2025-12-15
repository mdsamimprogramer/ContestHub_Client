import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function PopularContests() {
    const axiosSecure = useAxiosSecure();

    const { data = [], isLoading } = useQuery({
        queryKey: ["popular-contests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/contests/popular");
            return res.data;
        }
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="grid md:grid-cols-3 gap-4">
            {data.map(contest => (
                <div key={contest._id} className="card shadow-lg p-4">
                    <img src={contest.image} className="h-40 w-full object-cover mb-2" />
                    <h3 className="font-bold text-lg">{contest.name}</h3>
                    <p>{contest.description.slice(0, 80)}...</p>
                    <p>Participants: {contest.participants}</p>
                    <Link to={`/contest/${contest._id}`} className="btn btn-primary mt-2">Details</Link>
                </div>
            ))}
        </div>
    );
}
