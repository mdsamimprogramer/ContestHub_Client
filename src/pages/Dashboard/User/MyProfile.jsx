import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";
import toast, { Toaster } from 'react-hot-toast';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: userInfo, isLoading } = useQuery({
        queryKey: ["user-profile", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
    });

    const [updateData, setUpdateData] = useState({
        name: "", photo: "", bio: "",
    });

    useEffect(() => {
        if (userInfo) {
            setUpdateData({
                name: userInfo.name || "",
                photo: userInfo.photo || "",
                bio: userInfo.bio || "",
            });
        }
    }, [userInfo]);

    if (isLoading) return <Loading />;

    const participated = userInfo?.participatedContests || 0;
    const won = userInfo?.winningContests || 0;
    const winPercentage =
        participated > 0 ? ((won / participated) * 100).toFixed(1) : 0;

    const chartData = [
        { name: "Won", value: won },
        { name: "Lost", value: participated - won },
    ];

    const COLORS = ["#4ade80", "#f87171"];

    const handleUpdate = async () => {
        const updatePromise = axiosSecure.put(`/users/${user.email}`, updateData);

        toast.promise(updatePromise, {
            loading: 'Updating profile...',
            success: (data) => {
                queryClient.invalidateQueries(["user-profile", user.email]);
                return 'Profile updated successfully!';
            },
            error: (err) => {
                console.error(err);
                return 'Update failed! Please check your inputs.';
            },
        });
    };

    return (
        <div className="p-4 md:p-10 max-w-7xl mx-auto min-h-screen">
            <Toaster position="top-right" reverseOrder={false} />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-800">My Profile</h2>
                    <p className="text-gray-500">Manage your profile and track your performance</p>
                </div>
                <div className="flex gap-3">
                    <Link to="/dashboard/participated" className="btn btn-primary btn-outline shadow-sm">
                        Participated
                    </Link>
                    <Link to="/dashboard/winning" className="btn btn-success text-white shadow-md">
                        Winning History
                    </Link>
                </div>
            </div>

            {/* Profile Overview Card */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-6 mb-6">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="relative">
                        <img
                            src={updateData.photo || userInfo?.photo || user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                            className="h-32 w-32 rounded-full ring-4 ring-primary/10 object-cover shadow-lg"
                            alt="Profile"
                        />
                        <div className="absolute bottom-2 right-2 h-5 w-5 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-gray-800">{updateData.name || "User Name"}</h3>
                        <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2">
                            <span className="opacity-70 font-medium">{userInfo?.email}</span>
                        </p>
                        <div className="mt-3 inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold uppercase tracking-wide">
                            {userInfo?.role || 'Member'}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* 1. Statistics Section */}
                <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8">
                    <div className="flex items-center justify-between mb-8 border-b pb-4">
                        <h3 className="text-xl font-bold text-gray-800">Contest Statistics</h3>
                        <div className="badge badge-primary badge-lg font-bold">{winPercentage}% Win Rate</div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-10">
                        <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
                            <p className="text-blue-600 text-sm font-bold uppercase">Participated</p>
                            <p className="text-3xl font-black text-blue-900">{participated}</p>
                        </div>
                        <div className="p-5 bg-green-50 rounded-2xl border border-green-100">
                            <p className="text-green-600 text-sm font-bold uppercase">Won</p>
                            <p className="text-3xl font-black text-green-900">{won}</p>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl py-6">
                        <PieChart width={300} height={300}>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                innerRadius={70}
                                outerRadius={100}
                                paddingAngle={5}
                                stroke="none"
                            >
                                {chartData.map((_, i) => (<Cell key={i} fill={COLORS[i]} />))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" />
                        </PieChart>
                    </div>
                </div>

                {/* 2. Update Form Section */}
                <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-8 border-b pb-4">Update Information</h3>

                    <div className="space-y-6">
                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-bold text-gray-600">Full Name</span></label>
                            <input
                                className="input input-bordered w-full focus:ring-2 focus:ring-primary/20 transition-all"
                                value={updateData.name}
                                onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                                placeholder="Your Name"
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-bold text-gray-600">Profile Photo URL</span></label>
                            <input
                                className="input input-bordered w-full focus:ring-2 focus:ring-primary/20 transition-all"
                                value={updateData.photo}
                                onChange={(e) => setUpdateData({ ...updateData, photo: e.target.value })}
                                placeholder="https://example.com/photo.jpg"
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-bold text-gray-600">Bio / About Me</span></label>
                            <textarea
                                className="textarea textarea-bordered w-full min-h-[120px] focus:ring-2 focus:ring-primary/20 transition-all"
                                value={updateData.bio}
                                onChange={(e) => setUpdateData({ ...updateData, bio: e.target.value })}
                                placeholder="Write a short bio about yourself..."
                            ></textarea>
                        </div>

                        <button
                            className="btn btn-primary w-full text-white font-bold text-lg shadow-lg hover:shadow-primary/30 transition-all mt-4"
                            onClick={handleUpdate}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MyProfile;