import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2';
import { FaCheck, FaTimes, FaTrashAlt } from 'react-icons/fa';

const ManageContests = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // 1. Data Fetching
    const { data: contests = [], isLoading } = useQuery({
        queryKey: ["all-contests-admin"],
        queryFn: async () => {
            const res = await axiosSecure.get("/contests/admin");
            return res.data;
        },
    });

    // 2. Status Update Mutation (Confirm/Reject)
    const updateStatusMutation = useMutation({
        mutationFn: async ({ id, status }) => {
            const url = status === 'confirmed' ? `/contests/confirm/${id}` : `/contests/reject/${id}`;
            const res = await axiosSecure.patch(url, { status });
            return res.data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["all-contests-admin"]);
            Swal.fire({
                title: 'Success!',
                text: `Contest has been set to ${variables.status}.`,
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        },
        onError: () => {
            Swal.fire('Error', 'Failed to update contest status.', 'error');
        }
    });

    const deleteContestMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/contests/admin/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["all-contests-admin"]);
            Swal.fire({
                title: 'Deleted!',
                text: 'Contest has been permanently deleted.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        },
        onError: () => {
            Swal.fire('Error', 'Failed to delete contest.', 'error');
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteContestMutation.mutate(id);
            }
        });
    };

    // 5. Status Badge Function
    const getStatusBadge = (status) => {
        let colorClass = 'badge-neutral';
        if (status === 'pending') colorClass = 'badge-warning';
        else if (status === 'confirmed') colorClass = 'badge-success';
        else if (status === 'rejected') colorClass = 'badge-error';

        const text = status.charAt(0).toUpperCase() + status.slice(1);

        return <span className={`badge badge-sm ${colorClass} text-white`}>{text}</span>;
    };


    if (isLoading) return <Loading />;

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">Manage Contests</h2>

            {/* Table Container - Simple Design */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className="hidden sm:table-cell">#</th>
                            <th>Name</th>
                            <th className="hidden md:table-cell">Creator</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contests.map((contest, index) => {
                            // Check loading states for the specific contest row
                            const isUpdatingStatus = updateStatusMutation.isLoading &&
                                (updateStatusMutation.variables?.id === contest._id);

                            const isDeleting = deleteContestMutation.isLoading &&
                                (deleteContestMutation.variables === contest._id);

                            const isPending = contest.status === "pending";

                            return (
                                <tr key={contest._id}>
                                    <td className="hidden sm:table-cell">{index + 1}</td>
                                    <td>{contest.name}</td>
                                    <td className="hidden md:table-cell">{contest.creatorEmail}</td>
                                    <td>{getStatusBadge(contest.status)}</td>

                                    <td className="flex flex-wrap gap-2">
                                        <button
                                            className="btn btn-sm btn-success text-white"
                                            onClick={() => updateStatusMutation.mutate({ id: contest._id, status: "confirmed" })}
                                            disabled={!isPending || isUpdatingStatus || isDeleting}
                                        >
                                            {isUpdatingStatus && updateStatusMutation.variables.status === 'confirmed' ? (
                                                <span className="loading loading-spinner loading-xs text-white"></span>
                                            ) : (
                                                <> <FaCheck /> Confirm </>
                                            )}
                                        </button>

                                        {/* REJECT Button */}
                                        <button
                                            className="btn btn-sm btn-warning text-white"
                                            onClick={() => updateStatusMutation.mutate({ id: contest._id, status: "rejected" })}
                                            disabled={!isPending || isUpdatingStatus || isDeleting}
                                        >
                                            {isUpdatingStatus && updateStatusMutation.variables.status === 'rejected' ? (
                                                <span className="loading loading-spinner loading-xs text-white"></span>
                                            ) : (
                                                <> <FaTimes /> Reject </>
                                            )}
                                        </button>

                                        {/* DELETE Button */}
                                        <button
                                            className="btn btn-sm btn-error text-white"
                                            onClick={() => handleDelete(contest._id)}
                                            disabled={isDeleting || isUpdatingStatus}
                                        >
                                            {isDeleting ? (<span className="loading loading-spinner loading-xs text-white"></span>) : (<> <FaTrashAlt /> </>)}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageContests;