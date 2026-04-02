import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ContestCard from "../../components/ContestCard";
import { Link } from "react-router";
import Loading from "../../components/Loading";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

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
        <section className="my-10 md:my-14">
            <h2 className="text-3xl font-bold text-center mb-8">
                🔥 Popular Contests
            </h2>

            <div className="grid md:grid-cols-3 4xl:grid-cols-4 gap-5 md:gap-8">
                {contests.map(contest => (
                    <ContestCard key={contest._id} contest={contest} />
                ))}
            </div>

            {/* Show All Button */}
            <div className="text-center mt-5 md:mt-8">
                <Link
                    to="/all-contests"
                    className="group inline-flex items-center gap-2 px-7 py-3 bg-purple-600 text-white text-base font-semibold rounded-full 
             shadow-md hover:bg-purple-700 hover:shadow-lg transition-all duration-300 active:scale-95"
                >
                    <span>Show All Contests</span>

                    <HiOutlineArrowNarrowRight
                        className="text-xl transition-transform duration-300 group-hover:translate-x-1"
                    />
                </Link>
            </div>
        </section>
    );
};

export default PopularContests;
