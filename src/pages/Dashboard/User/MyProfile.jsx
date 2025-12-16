import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { PieChart, Pie, Cell, Legend } from "recharts";
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
        <div className="p-5 max-w-6xl mx-auto">
            <Toaster position="top-right" reverseOrder={false} />

            <h2 className="text-2xl font-bold mb-6">My Profile</h2>
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <img
                        src={
                            updateData.photo ||
                            userInfo?.photo ||
                            user?.photoURL ||
                            "https://i.ibb.co/4pDNDk1/avatar.png"
                        }
                        className="h-24 w-24 rounded-full object-cover"
                        alt="Profile"
                    />
                    <div>
                        <h3 className="text-xl font-semibold">{updateData.name}</h3>
                        <p className="text-gray-500">{userInfo?.email}</p>
                        <p className="text-gray-500">Role: {userInfo?.role}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2">Contest Statistics</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className="text-gray-500 text-sm">Participated</p>
                            <p className="font-bold">{participated}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Won</p>
                            <p className="font-bold">{won}</p>
                        </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="flex justify-center">
                        <PieChart width={250} height={250}>
                            <Pie data={chartData} dataKey="value" outerRadius={90} label>
                                {chartData.map((_, i) => (<Cell key={i} fill={COLORS[i]} />))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </div>

                    <p className="text-center mt-2 text-gray-500"> Win Percentage: {winPercentage}% </p>
                </div>

                {/* 2. Update Form */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2">Update Profile Information</h3>
                    <input className="input input-bordered w-full mb-2" value={updateData.name}
                        onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })} placeholder="Name"/>
                    <input
                        className="input input-bordered w-full mb-2"
                        value={updateData.photo}
                        onChange={(e) =>
                            setUpdateData({ ...updateData, photo: e.target.value })
                        }
                        placeholder="Photo URL"
                    />
                    <textarea
                        className="textarea textarea-bordered w-full mb-4"
                        value={updateData.bio}
                        onChange={(e) =>
                            setUpdateData({ ...updateData, bio: e.target.value })
                        }
                        placeholder="Bio / Address"
                        rows="3"
                    ></textarea>
                    <button className="btn btn-primary w-full" onClick={handleUpdate}> Update Profile </button>
                </div>
            </div>

            <div className="mt-6 flex gap-3">
                <Link to="/dashboard/participated" className="btn btn-primary">
                    Participated
                </Link>
                <Link to="/dashboard/winning" className="btn btn-success">
                    Winning
                </Link>
            </div>
        </div>
    );
};
export default MyProfile;