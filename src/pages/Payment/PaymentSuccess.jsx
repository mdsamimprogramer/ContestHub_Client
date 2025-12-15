import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { CheckCircle } from "lucide-react";
import Loading from "../../components/Loading";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [paymentInfo, setPaymentInfo] = useState(null);

    useEffect(() => {
        if (!sessionId) return;

        axiosSecure
            .post("/verify-payment", { sessionId })
            .then((res) => {
                setPaymentInfo(res.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                navigate("/payment-cancel");
            });
    }, [sessionId, axiosSecure, navigate]);

    if (loading) return <Loading />;

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white dark:bg-base-200 rounded-2xl shadow-lg p-6 text-center">

                <div className="flex justify-center mb-4 text-green-500">
                    <CheckCircle size={64} />
                </div>

                <h2 className="text-3xl font-bold mb-2 text-green-600">
                    Payment Successful!
                </h2>

                <p className="text-gray-600 mb-6">
                    Your contest registration has been completed successfully.
                </p>

                <div className="bg-base-100 rounded-lg p-4 text-left mb-6">
                    <p className="text-sm text-gray-500 mb-1">Stripe Session ID</p>
                    <p className="font-semibold break-all">
                        {paymentInfo?.stripeSessionId}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        to="/dashboard/participated"
                        className="btn btn-primary w-full sm:w-auto"
                    >
                        My Participated Contests
                    </Link>

                    <Link
                        to="/all-contests"
                        className="btn btn-outline w-full sm:w-auto"
                    >
                        Explore More Contests
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
