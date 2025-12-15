import React from "react";
import { Link } from "react-router";

const PopularCard = ({ contest }) => {
    return (
        <div className="border rounded-lg shadow-md overflow-hidden">
            <img src={contest.image} alt={contest.name} className="w-full h-40 object-cover" />
            <div className="p-4">
                <h2 className="font-bold text-lg">{contest.name}</h2>
                <p>{contest.description.slice(0, 50)}...</p>
                <p>Participants: {contest.participants}</p>
                <Link to={`/contest/${contest.id}`} className="btn btn-sm mt-2">Details</Link>
            </div>
        </div>
    );
};

export default PopularCard;
