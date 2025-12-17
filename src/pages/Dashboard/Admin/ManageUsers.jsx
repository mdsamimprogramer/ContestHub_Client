import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ["all-users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    const changeRoleMutation = useMutation({
        mutationFn: async ({ email, role }) => {
            const res = await axiosSecure.patch(`/users/${email}`, { role });
            return res.data;
        },
        onSuccess: (data, variables) => {
            Swal.fire({
                title: 'Role Updated!',
                text: `${variables.email}'s role changed to ${variables.role}.`,
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
            queryClient.invalidateQueries(["all-users"]);
        },
        onError: (error) => {
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'Failed to change role.',
                icon: 'error',
                timer: 3000
            });
        }
    });

    if (isLoading) return <Loading />;

    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Current Role</th>
                        <th>Change Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.email}</td>
                            <td>{user.displayName}</td>
                            <td>{user.role}</td>
                            <td className="flex gap-2">
                                {["user", "creator", "admin"].map((r) => (
                                    <button
                                        key={r}
                                        className={`btn btn-sm ${user.role === r ? "btn-disabled" : "btn-primary"}`}
                                        disabled={user.role === r || changeRoleMutation.isLoading}
                                        onClick={() => changeRoleMutation.mutate({ email: user.email, role: r })}
                                    >
                                        {changeRoleMutation.isLoading && changeRoleMutation.variables?.email === user.email
                                            ? 'Updating...'
                                            : r}
                                    </button>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;