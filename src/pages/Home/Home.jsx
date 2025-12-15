import React from "react";
import HeroSection from "./HeroSection";
import PopularContests from "./PopularContests";
import WinnerSection from "./WinnerSection";

export default function Home() {
    return (
        <div className="py-10 space-y-10">
            <HeroSection></HeroSection>
            <PopularContests></PopularContests>
            <WinnerSection></WinnerSection>
        </div>
    );
}
