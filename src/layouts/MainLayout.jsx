import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="px-5 md:px-12 lg:px-20 xl:px-28 flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
