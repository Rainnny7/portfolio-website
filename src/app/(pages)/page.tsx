"use client";

import { ReactElement } from "react";
import { DiscordUser, useTetherWS } from "use-tether";
import { appConfig } from "~/app/config";
import AboutSection from "~/components/landing/sections/about-section";
import ActivitySection from "~/components/landing/sections/activity-section";
import HomelabSection from "~/components/landing/sections/homelab-section";
import MediaSection from "~/components/landing/sections/media-section";
import ProjectsSection from "~/components/landing/sections/projects-section";
import Sidebar from "~/components/landing/sidebar";

const LandingPage = (): ReactElement => {
    // Get my Discord user to display the status indicator and some other cool stuff
    const discordUser: DiscordUser | undefined = useTetherWS(
        appConfig.discordUserId
    );

    return (
        <main className="min-h-screen flex">
            <Sidebar discordUser={discordUser} />

            {/* Content */}
            <div className="relative w-full px-7 lg:px-10 xl:px-16 flex flex-col transition-all transform-gpu overflow-hidden">
                <AboutSection discordUser={discordUser} />
                <ProjectsSection />
                <ActivitySection />
                <HomelabSection />
                <MediaSection />
            </div>
        </main>
    );
};
export default LandingPage;
