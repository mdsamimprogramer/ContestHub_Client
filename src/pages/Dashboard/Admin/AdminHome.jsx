import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
const AdminDashboard = () => {
    const axiosSecure = useAxiosSecure();

    const { data = {}, isLoading, isError, error } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get("/admin/stats");
                return res.data;
            } catch (err) {
                console.error("Error fetching admin stats:", err);
                throw err; // react-query will handle this as isError
            }
        },
    });

    if (isLoading) return <Loading />;

    if (isError)
        return (
            <div className="p-6 text-red-600">
                Failed to load admin stats: {error?.response?.data?.error || error.message}
            </div>
        );

    const { totalUsers = 0, totalCreators = 0, totalContests = 0, totalEarnings = 0 } = data;

    return (
        <div className="p-5 md:p-8">
            <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Users" value={totalUsers} />
                <StatCard title="Creators" value={totalCreators} />
                <StatCard title="Contests" value={totalContests} />
                <StatCard title="Earnings ($)" value={totalEarnings} />
            </div>
        </div>
    );
};

const StatCard = ({ title, value }) => (
    <div className="bg-white shadow rounded-lg p-6 text-center">
        <p className="text-gray-500">{title}</p>
        <h3 className="text-3xl font-bold text-fuchsia-600">{value}</h3>
    </div>
);

export default AdminDashboard;
