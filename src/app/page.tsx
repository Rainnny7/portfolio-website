import { ReactElement } from "react";
import HeroPattern from "~/components/hero-pattern";
import AboutSection from "~/components/landing/sections/about-section";
import ProjectsSection from "~/components/landing/sections/projects-section";
import Sidebar from "~/components/landing/sidebar";

const LandingPage = (): ReactElement => (
    <main className="min-h-screen flex">
        <Sidebar />

        {/* Content */}
        <div className="relative w-full px-16 pt-32 pb-7 flex flex-col gap-24 overflow-hidden">
            <HeroPattern />
            <AboutSection />
            <ProjectsSection />
        </div>
    </main>
);
export default LandingPage;
