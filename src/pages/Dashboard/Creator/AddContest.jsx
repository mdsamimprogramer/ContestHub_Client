import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";

export default function AddContest() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [deadline, setDeadline] = useState(new Date());
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (formData) => {
        try {
            // Upload image to ImgBB
            const imageFile = formData.image[0];
            const fd = new FormData();
            fd.append("image", imageFile);
            const imgbbKey = import.meta.env.VITE_image_host;
            const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
                method: "POST",
                body: fd,
            });
            const imgJson = await imgbbRes.json();
            if (!imgJson.success) throw new Error("Image upload failed");
            const imageURL = imgJson.data.url;

            // Build contest object
            const payload = {
                name: formData.name,
                description: formData.description,
                price: Number(formData.price || 0),
                prizeMoney: Number(formData.prizeMoney || 0),
                taskInstruction: formData.taskInstruction,
                type: formData.type,
                deadline: deadline.toISOString(),
                image: imageURL,
                creatorEmail: user?.email,
                creatorName: user?.displayName || user?.name,
                status: "pending",
                participants: 0,
                createdAt: new Date().toISOString(),
            };

            // Send to backend
            const res = await axiosSecure.post("/contests", payload);
            if (res.data.insertedId) {
                toast.success("Contest created successfully (pending approval)!");
                reset();
            } else {
                toast.error("Failed to create contest");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Error creating contest");
        }
    };

    return (
        <div className="max-w-3xl mx-auto my-5 px-5 py-2.5 bg-white rounded shadow">
            {/* Toast Container */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
            />
            <h2 className="text-2xl text-center font-bold mb-4">Add New Contest</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
                <div>
                    <label className="block font-semibold">Name</label>
                    <input {...register("name", { required: true })} className="input input-bordered w-full" />
                    {errors.name && <p className="text-red-500">Name is required</p>}
                </div>

                <div>
                    <label className="block font-semibold">Image</label>
                    <input type="file" {...register("image", { required: true })} className="file-input" />
                    {errors.image && <p className="text-red-500">Image required</p>}
                </div>

                <div>
                    <label className="block font-semibold">Description</label>
                    <textarea {...register("description", { required: true })} className="textarea textarea-bordered w-full" />
                    {errors.description && <p className="text-red-500">Description required</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className="block font-semibold">Entry Price ($)</label>
                        <input type="number" {...register("price", { min: 0 })} className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label className="block font-semibold">Prize Money ($)</label>
                        <input type="number" {...register("prizeMoney", { min: 0 })} className="input input-bordered w-full" />
                    </div>
                </div>

                <div>
                    <label className="block font-semibold">Task Instruction</label>
                    <textarea {...register("taskInstruction", { required: true })} className="textarea textarea-bordered w-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-end">
                    <div>
                        <label className="block font-semibold">Contest Type</label>
                        <select {...register("type", { required: true })} className="select select-bordered w-full">
                            <option value="">Select type</option>
                            <option value="design">Design</option>
                            <option value="article">Article</option>
                            <option value="video">Video</option>
                            <option value="business">Business Idea</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-semibold">Deadline</label>
                        <DatePicker selected={deadline} onChange={(d) => setDeadline(d)} className="input input-bordered w-full" />
                    </div>
                </div>

                <button className="btn btn-primary w-full">Create Contest</button>
            </form>
        </div>
    );
}
