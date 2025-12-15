import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManagePayments = () => {
    const axiosSecure = useAxiosSecure();

    const { data = [] } = useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/payments");
            return res.data;
        },
    });

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Payments</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Contest</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(pay => (
                        <tr key={pay._id}>
                            <td>{pay.userEmail}</td>
                            <td>{pay.contestId}</td>
                            <td>${pay.amount}</td>
                            <td>{new Date(pay.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManagePayments;
