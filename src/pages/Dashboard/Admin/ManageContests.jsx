import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const ManageContests = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ["all-contests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/contests");
            return res.data;
        },
    });

    const updateStatusMutation = useMutation({
        mutationFn: async ({ id, status }) => {
            const res = await axiosSecure.patch(`/contests/${id}`, { status });
            return res.data;
        },
        onSuccess: () => queryClient.invalidateQueries(["all-contests"]),
    });

    const deleteContestMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/contests/${id}`);
            return res.data;
        },
        onSuccess: () => queryClient.invalidateQueries(["all-contests"]),
    });

    if (isLoading) return <Loading />;

    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Creator</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contests.map((contest) => (
                        <tr key={contest._id}>
                            <td>{contest.name}</td>
                            <td>{contest.creatorEmail}</td>
                            <td>{contest.status}</td>
                            <td className="flex gap-2">
                                {contest.status === "pending" && (
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() =>
                                            updateStatusMutation.mutate({ id: contest._id, status: "confirmed" })
                                        }
                                    >
                                        Confirm
                                    </button>
                                )}
                                <button
                                    className="btn btn-error btn-sm"
                                    onClick={() => deleteContestMutation.mutate(contest._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageContests;
