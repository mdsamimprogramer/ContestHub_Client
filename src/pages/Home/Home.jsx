import React from "react";
import HeroSection from "./HeroSection";
import PopularContests from "./PopularContests";
import WinnerSection from "./WinnerSection";
import ExtraSection from "./ExtraSection";

export default function Home() {
    return (
        <div className="py-6 space-y-10">
            <HeroSection></HeroSection>
            <PopularContests></PopularContests>
            <WinnerSection></WinnerSection>
            <ExtraSection></ExtraSection>
        </div>
    );
}
