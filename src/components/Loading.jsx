import React from "react";
import { FourSquare } from "react-loading-indicators";
export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="text-center">
                <FourSquare color="#c900ff" size="60" />
                <p className="text-gray-700 text-lg mt-4">Loading, please wait...</p>
            </div>
        </div>
    );
}
