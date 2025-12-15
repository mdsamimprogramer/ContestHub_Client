import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";

export default function AllContests() {
    const axiosSecure = useAxiosSecure();
    const [tab, setTab] = useState("All");

    // Type mapping: UI label <> backend type
    const types = [
        { label: "All", value: "All" },
        { label: "Design", value: "design" },
        { label: "Article", value: "article" },
        { label: "Business", value: "business" },
        { label: "Video", value: "video" },
    ];

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ["all-contests", tab],
        queryFn: async () => {
            const res = await axiosSecure.get("/contests");
            // Filter only if tab !== "All"
            if (tab === "All") return res.data;
            return res.data.filter(c => c.type === tab);
        }
    });

    if (isLoading) return <Loading></Loading>

    return (
        <div className="my-5">
            <h2 className="text-2xl font-bold">All Contests</h2>

            {/* Tabs */}
            <div className="flex gap-2 my-5">
                {types.map(t => (
                    <button
                        key={t.value}
                        className={`px-3.5 py-1 rounded ${tab === t.value ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        onClick={() => setTab(t.value)}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Contests Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {contests.length === 0 && (
                    <p className="col-span-3 text-center text-gray-500">No contests found.</p>
                )}
                {contests.map(c => (
                    <div key={c._id} className="rounded-xl shadow-md overflow-hidden bg-white">
                        <img src={c.image} alt={c.name} className="h-40 w-full object-cover"/>
                        <div className="p-4">
                            <h3 className="font-bold text-lg mb-1">{c.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">
                                {c.description.slice(0, 70)}...
                            </p>
                            <div className="flex justify-between text-sm mb-2">
                                <span>👥 {c.participants}</span>
                                <span>${c.prizeMoney}</span>
                            </div>

                            <Link to={`/contest/${c._id}`} className="block text-center bg-blue-600 text-white py-2 mt-2 rounded-full hover:bg-blue-700" >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
