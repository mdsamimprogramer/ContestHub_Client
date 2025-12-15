import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function MyWinning() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ["winning-contests", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/wins/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">My Winning Contests</h2>
            {contests.length === 0 && <p>You haven't won any contest yet.</p>}
            <div className="grid md:grid-cols-3 gap-4">
                {contests.map(c => (
                    <div key={c._id} className="card shadow-lg p-4">
                        <img src={c.image} className="h-40 w-full object-cover rounded mb-2" />
                        <h3 className="font-bold">{c.name}</h3>
                        <p>Prize: ${c.prize}</p>
                        <p>Winner!</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
