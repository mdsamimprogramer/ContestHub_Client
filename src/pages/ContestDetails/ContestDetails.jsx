import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import SubmitTaskModal from "./SubmitTaskModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

export default function ContestDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [openModal, setOpenModal] = useState(false);

    // contest details
    const { data: contest = {}, isLoading } = useQuery({
        queryKey: ["contest-details", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${id}`);
            return res.data;
        }
    });

    // check user registered or not
    const { data: isRegistered = false } = useQuery({
        queryKey: ["is-registered", id, user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/payments/check?contestId=${id}&email=${user.email}`
            );
            return res.data.registered;
        }
    });

    if (isLoading) return <p className="text-center">Loading...</p>;

    const isEnded = new Date(contest.deadline) < new Date();

    return (
        <div className="max-w-6xl mx-auto p-5 my-5 rounded-md bg-gray-50">
            {/* Banner */}
            <img src={contest.image} className="w-full h-80 object-cover rounded-xl mb-6"/>

            {/* Info */}
            <h2 className="text-3xl font-bold mb-2">{contest.name}</h2>
            <p className="text-gray-600 mb-6">{contest.description}</p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div>👥 Participants: {contest.participants}</div>
                <div>💰 Prize Money: ৳{contest.prizeMoney}</div>
                <div>
                    ⏰ Deadline:{" "}
                    {isEnded ? (
                        <span className="text-red-500 font-semibold">
                            Contest Ended
                        </span>
                    ) : (
                        new Date(contest.deadline).toLocaleString()
                    )}
                </div>
            </div>

            {/* Task Instruction */}
            <div className="bg-gray-100 p-4 rounded mb-6">
                <h3 className="font-bold mb-2">Task Instruction</h3>
                <p>{contest.taskInstruction}</p>
            </div>

            {/* Winner Section */}
            {isEnded && contest.winner && (
                <div className="bg-green-100 p-4 rounded mb-6">
                    <h3 className="font-bold text-lg">🏆 Winner</h3>
                    <div className="flex items-center gap-3 mt-2">
                        <img src={contest.winner.photo} className="w-12 h-12 rounded-full"/>
                        <span className="font-semibold"> {contest.winner.name} </span>
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
                {/* Register / Pay */}
                {!isRegistered && (
                    <button
                        disabled={isEnded}
                        onClick={() => navigate(`/dashboard/payment/${contest._id}`)}
                        className="btn btn-primary"
                    >
                        Register / Pay ${contest.price}
                    </button>
                )}

                {/* Submit Task */}
                {isRegistered && !isEnded && (
                    <button
                        onClick={() => setOpenModal(true)}
                        className="btn btn-secondary"
                    >
                        Submit Task
                    </button>
                )}
            </div>

            {/* Submit Modal */}
            {openModal && (
                <SubmitTaskModal
                    contestId={contest._id}
                    close={() => setOpenModal(false)}
                />
            )}
        </div>
    );
}