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
        <div className="p-6">
            <h2 className="text-xl font-bold">
                Pay ${contest.price} for {contest.name}
            </h2>
            <button onClick={handlePayment} className="btn btn-primary mt-4">
                Pay Now
            </button>
        </div>
    );
};

export default Payment;