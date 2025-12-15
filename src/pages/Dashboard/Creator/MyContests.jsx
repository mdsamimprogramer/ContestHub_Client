import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import Loading from "../../../components/Loading";

export default function MyContests() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ["creatorContests", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/creator/${encodeURIComponent(user.email)}`);
            return res.data;
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            return axiosSecure.delete(`/contests/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["creatorContests"]);
            alert("Contest deleted successfully");
        },
        onError: () => {
            alert("Failed to delete contest");
        },
    });

    const handleDelete = (id) => {
        if (!confirm("Delete this contest? This action cannot be undone.")) return;
        deleteMutation.mutate(id);
    };

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">My Created Contests</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Participants</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {contests.map((c) => (
                            <tr key={c._id}>
                                <td>{c.name}</td>
                                <td>{c.type}</td>
                                <td>{c.participants || 0}</td>
                                <td>{new Date(c.deadline).toLocaleString()}</td>
                                <td>
                                    <span className={`px-2 py-1 rounded text-sm ${c.status === "pending" ? "bg-yellow-200"
                                     : c.status === "rejected" ? "bg-red-200" : "bg-green-200" }`} >
                                        {c.status}
                                    </span>
                                </td>
                                <td className="space-x-2">
                                    <Link  to={`/dashboard/edit-contest/${c._id}`} className="btn btn-sm">
                                        Edit
                                    </Link>

                                    {c.status === "pending" && (
                                        <button
                                            onClick={() => handleDelete(c._id)}
                                            className="btn btn-sm btn-error"
                                        >
                                            Delete
                                        </button>
                                    )}

                                    <Link to={`/dashboard/contest-submissions/${c._id}`} className="btn btn-sm btn-primary">
                                        See Submissions
                                    </Link>
                                </td>
                            </tr>
                        ))}

                        {contests.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center text-gray-500">
                                    No contests found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
