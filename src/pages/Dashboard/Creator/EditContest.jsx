import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";

export default function EditContest() {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [contest, setContest] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await axiosSecure.get(`/contests/${id}`);
                setContest(res.data);
                reset({
                    name: res.data.name,
                    description: res.data.description,
                    price: res.data.price,
                    prizeMoney: res.data.prizeMoney,
                    taskInstruction: res.data.taskInstruction,
                    type: res.data.type,
                });
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to fetch contest data", "error");
            }
        })();
    }, [id, reset, axiosSecure]);

    const onSubmit = async (data) => {
        try {
            let imageURL = contest.image;

            if (data.image && data.image.length) {
                const fd = new FormData();
                fd.append("image", data.image[0]);
                const imgbbKey = import.meta.env.VITE_image_host;
                const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, { method: "POST", body: fd });
                const json = await imgRes.json();
                if (!json.success) throw new Error("Image upload failed");
                imageURL = json.data.url;
            }

            const payload = { ...data, image: imageURL };

            const res = await axiosSecure.patch(`/contests/${id}`, payload);

            if (res.data.modifiedCount) {
                Swal.fire("Updated", "Contest updated successfully!", "success").then(() => {
                    navigate("/dashboard/my-contest");
                });
            } else {
                Swal.fire("Info", "Update failed or nothing changed", "info");
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error", err.message || "Error updating contest", "error");
        }
    };

    if (!contest) return <Loading></Loading>

    return (
        <div className="max-w-3xl mx-auto p-5 shadow-2xl my-5">
            <h2 className="text-2xl font-bold text-center mb-4">Edit Contest</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div>
                    <label className="block">Name</label>
                    <input {...register("name", { required: true })} className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="block">Change Image (optional)</label>
                    <input type="file" {...register("image")} className="file-input" />
                </div>

                <div>
                    <label className="block">Description</label>
                    <textarea {...register("description", { required: true })} className="textarea textarea-bordered w-full" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <input type="number" {...register("price")} className="input input-bordered" placeholder="Price" />
                    <input type="number" {...register("prizeMoney")} className="input input-bordered" placeholder="Prize Money" />
                </div>

                <div>
                    <label>Task Instruction</label>
                    <textarea {...register("taskInstruction")} className="textarea textarea-bordered w-full" />
                </div>

                <div>
                    <label>Type</label>
                    <select {...register("type")} className="select select-bordered w-full">
                        <option value="design">Design</option>
                        <option value="article">Article</option>
                        <option value="video">Video</option>
                        <option value="business">Business</option>
                    </select>
                </div>

                <button className="btn btn-primary">Update Contest</button>
            </form>
        </div>
    );
}
