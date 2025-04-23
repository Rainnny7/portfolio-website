import { ReactElement } from "react";
import HeroPattern from "~/components/hero-pattern";
import AboutSection from "~/components/landing/sections/about-section";
import ProjectsSection from "~/components/landing/sections/projects-section";
import Sidebar from "~/components/landing/sidebar";

const LandingPage = (): ReactElement => (
    <main className="min-h-screen flex">
        <Sidebar />

        {/* Content */}
        <div className="relative w-full px-7 lg:px-10 xl:px-16 pt-40 lg:pt-32 pb-7 flex flex-col transition-all transform-gpu overflow-hidden">
            <HeroPattern />
            <AboutSection />
            <ProjectsSection />
        </div>
    </main>
);
export default LandingPage;
