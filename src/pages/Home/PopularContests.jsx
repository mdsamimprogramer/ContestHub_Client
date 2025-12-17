import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ContestCard from "../../components/ContestCard";
import { Link } from "react-router";
import Loading from "../../components/Loading";

const PopularContests = () => {
    const axiosPublic = useAxiosSecure();

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ["popular-contests"],
        queryFn: async () => {
            const res = await axiosPublic.get("/popular-contests");
            return res.data;
        }
    });

    if (isLoading) return <Loading></Loading>

    return (
        <section className="my-10 md:my-16">
            <h2 className="text-3xl font-bold text-center mb-8">
                🔥 Popular Contests
            </h2>

            <div className="grid md:grid-cols-3 gap-5 md:gap-8">
                {contests.map(contest => (
                    <ContestCard key={contest._id} contest={contest} />
                ))}
            </div>

            {/* Show All Button */}
            <div className="text-center mt-5 md:mt-8">
                <Link to="/all-contests"
                    className="inline-block px-6 py-2 bg-purple-600 text-white text-lg font-semibold rounded-full hover:bg-purple-700 transition-shadow shadow-md">
                    Show All Contests_
                </Link>
            </div>
        </section>
    );
};

export default PopularContests;
