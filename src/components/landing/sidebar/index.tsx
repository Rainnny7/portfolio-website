"use client";

import { ReactElement } from "react";
import { DiscordUser } from "use-tether";
import SidebarIntroduction from "~/components/landing/sidebar/introduction";
import SpotifyStatus from "~/components/landing/spotify-status";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

const Sidebar = ({
    discordUser,
}: {
    discordUser: DiscordUser | undefined;
}): ReactElement => (
    <div
        className={cn(
            "hidden lg:block sticky top-0 w-[20rem] h-screen pt-32 pb-7 bg-background/65 z-40",
            "[mask-image:linear-gradient(to_right,black_90%,transparent)]"
        )}
    >
        {/* Content */}
        <div className="h-full lg:-ml-7 flex flex-col gap-6 items-center">
            <SidebarIntroduction discordUser={discordUser} />
            <SpotifyStatus discordUser={discordUser} />

            {/* Footer */}
            <div className="w-[calc(100%-6rem)] mt-auto">
                <Separator className="w-full" />
                Footer
            </div>
        </div>
    </div>
);
export default Sidebar;
