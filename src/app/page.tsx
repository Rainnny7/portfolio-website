import { ReactElement } from "react";
import AboutSection from "~/components/landing/sections/about-section";
import Sidebar from "~/components/landing/sidebar";
import HeroPattern from "~/components/ui/HeroPattern";

const LandingPage = (): ReactElement => (
    <main className="min-h-screen flex">
        <Sidebar />

        {/* Content */}
        <div className="relative w-full px-16 py-28 flex flex-col overflow-hidden">
            <HeroPattern />
            <AboutSection />
        </div>
    </main>
);
export default LandingPage;
