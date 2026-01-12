import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import useAuth from "../../hooks/useAuth";

const Payment = () => {
    const { contestId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: contest = {}, isLoading } = useQuery({
        queryKey: ["contest", contestId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${contestId}`);
            return res.data;
        },
    });

    const handlePayment = async () => {
        const res = await axiosSecure.post("/create-checkout-session", {
            contestName: contest.name,
            price: contest.price,
            contestId: contest._id,
            userEmail: user?.email,
        });

        window.location.href = res.data.url;
    };

    if (isLoading) return <Loading></Loading>;

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6">
            <div className="w-full max-w-md p-5 sm:p-6 rounded-2xl border border-base-300 bg-base-100 shadow-md">
                <h2 className="text-xl sm:text-2xl font-bold text-base-content text-center">
                    Complete Your Payment
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-base-content/70 text-center">
                    You are about to pay for the contest below
                </p>
                <div className="mt-5 rounded-xl bg-base-200 p-4 flex flex-col items-center gap-2">
                    <span className="text-sm sm:text-base font-medium text-center truncate max-w-full">{contest.name}</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-primary"> ${contest.price}</span>
                </div>

                <button onClick={handlePayment} className="btn btn-primary w-full mt-6 text-base sm:text-lg font-semibold tracking-wide">
                    Pay Now
                </button>

            </div>
        </div>

    );
};

export default Payment;