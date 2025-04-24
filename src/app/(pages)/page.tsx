import { Metadata } from "next";
import { ReactElement } from "react";
import AboutSection from "~/components/landing/sections/about-section";
import ActivitySection from "~/components/landing/sections/activity-section";
import HomelabSection from "~/components/landing/sections/homelab-section";
import MediaSection from "~/components/landing/sections/media-section";
import ProjectsSection from "~/components/landing/sections/projects-section";
import Sidebar from "~/components/landing/sidebar";

export const metadata: Metadata = {
    title: "Hi there!",
};

export const dynamic = "force-dynamic";

const LandingPage = (): ReactElement => (
    <main className="min-h-screen flex">
        <Sidebar />

        {/* Content */}
        <div className="relative w-full px-7 lg:px-10 xl:px-16 flex flex-col transition-all transform-gpu overflow-hidden">
            <AboutSection />
            <ProjectsSection />
            <ActivitySection />
            <HomelabSection />
            <MediaSection />
        </div>
    </main>
);
export default LandingPage;
