"use client";

import { motion } from "motion/react";
import { ReactElement } from "react";
import { DiscordUser } from "use-tether";
import { appConfig } from "~/app/config";
import SidebarIntroduction from "~/components/landing/sidebar/introduction";
import SocialLink from "~/components/landing/social-link";
import SpotifyStatus from "~/components/landing/spotify-status";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";
import { SocialConfig } from "~/types/app-config";

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

            {/* Footer */}
            <div className="w-[calc(100%-6rem)] mt-auto">
                {/* Spotify Status */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.6 }}
                >
                    <SpotifyStatus discordUser={discordUser} />
                </motion.div>

                {/* Separator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.5 }}
                >
                    <Separator className="my-3 w-full" />
                </motion.div>

                {/* Socials */}
                <div className="flex gap-2 justify-center items-center">
                    {Object.values(appConfig.socials).map(
                        (social: SocialConfig, index: number) => (
                            <motion.div
                                key={social.href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.25,
                                    delay: 0.4 + index * 0.1,
                                }}
                            >
                                <SocialLink social={social} hideName />
                            </motion.div>
                        )
                    )}
                </div>
            </div>
        </div>
    </div>
);
export default Sidebar;
