import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const SubmitTaskModal = ({ contestId, close }) => {
    const axiosSecure = useAxiosSecure();
    const [task, setTask] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!task.trim()) return toast.error("Task cannot be empty!");

        setLoading(true);
        try {
            await axiosSecure.post("/submissions", { contestId, task });
            toast.success("Task submitted successfully!");
            close();
        } catch (err) {
            console.error(err);
            toast.error("Submission failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
                <button onClick={close} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800" > ✕ </button>
                <h2 className="text-xl font-bold mb-4">Submit Your Task</h2>
                <textarea
                    rows={6}
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 mb-4"
                    placeholder="Provide your submission link or description..."
                />
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="btn btn-primary w-full"
                >
                    {loading ? "Submitting..." : "Submit Task"}
                </button>
            </div>
        </div>
    );
};

export default SubmitTaskModal;
