import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: userInfo, isLoading } = useQuery({
        queryKey: ["user-profile", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">My Profile</h2>

            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <img
                        src={userInfo?.profilePic || "/default-avatar.png"}
                        alt={userInfo?.name}
                        className="h-24 w-24 rounded-full object-cover"
                    />
                    <div>
                        <h3 className="text-xl font-semibold">{userInfo?.name}</h3>
                        <p className="text-gray-500">{userInfo?.email}</p>
                        <p className="text-gray-500">Role: {userInfo?.role}</p>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-base-100 rounded-lg shadow">
                        <p className="text-sm text-gray-500">Total Participated Contests</p>
                        <p className="font-bold">{userInfo?.participatedContests || 0}</p>
                    </div>
                    <div className="p-4 bg-base-100 rounded-lg shadow">
                        <p className="text-sm text-gray-500">Total Winning Contests</p>
                        <p className="font-bold">{userInfo?.winningContests || 0}</p>
                    </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Link to="/dashboard/participated" className="btn btn-primary w-full sm:w-auto">
                        My Participated Contests
                    </Link>
                    <Link to="/dashboard/winning" className="btn btn-success w-full sm:w-auto">
                        My Winning Contests
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
