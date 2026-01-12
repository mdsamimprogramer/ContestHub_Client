import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../components/Loading";

const Leaderboard = () => {
    const { data: users = [], isLoading } = useQuery({
        queryKey: ["leaderboard"],
        queryFn: async () => {
            const res = await axios.get("https://contests-hub.vercel.app/leaderboard");
            return res.data;
        },
    });

    if (isLoading) return <Loading></Loading>;

    return (
        <div className="min-h-screen bg-white dark:bg-slate-800 transition-colors p-4 mt-5 rounded-2xl">
            <div className="max-w-4xl mx-auto mt-2.5">
                <h1 className="text-3xl font-black text-center mb-10 text-gray-800 dark:text-white">
                    Contest <span className="text-blue-600">Champions</span>
                </h1>

                <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl">
                    <table className="table w-full bg-white dark:bg-slate-800">
                        {/* Table Header */}
                        <thead className="bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-200">
                            <tr>
                                <th className="py-4 px-6">Rank</th>
                                <th>User</th>
                                <th>Wins</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={user.email}
                                    className="hover:bg-gray-50 dark:hover:bg-slate-700/50 border-b dark:border-gray-700 transition-colors"
                                >
                                    <td className="py-4 px-6">
                                        <span className={`
                      w-8 h-8 flex items-center justify-center rounded-full font-bold
                      ${index === 0 ? "bg-yellow-400 text-white" :
                                                index === 1 ? "bg-gray-300 text-white" :
                                                    index === 2 ? "bg-orange-400 text-white" : "text-gray-500 dark:text-gray-400"}
                    `}>
                                            {index + 1}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user.photo || "https://via.placeholder.com/150"} alt={user.name} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold dark:text-white">{user.name}</div>
                                                <div className="text-xs text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-black text-blue-600 dark:text-blue-400">
                                        {user.winCount}
                                    </td>
                                    <td>
                                        {index === 0 && <div className="badge badge-warning gap-1">🏆 Elite</div>}
                                        {index > 0 && index < 3 && <div className="badge badge-info gap-1">Pro</div>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;