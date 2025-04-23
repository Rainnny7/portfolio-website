"use client";

import { Circle, CircleX, LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { ReactElement } from "react";
import { DiscordUser, useTetherWS } from "use-tether";
import { appConfig } from "~/app/config";
import SimpleTooltip from "~/components/simple-tooltip";
import { cn } from "~/lib/utils";

type Indicator = {
    icon: LucideIcon;
    color: string;
};

const indicators: Record<DiscordUser["onlineStatus"], Indicator> = {
    DO_NOT_DISTURB: {
        icon: CircleX,
        color: "text-red-500",
    },
    IDLE: {
        icon: Circle,
        color: "text-yellow-500",
    },
    ONLINE: {
        icon: Circle,
        color: "text-green-500",
    },
    OFFLINE: {
        icon: CircleX,
        color: "text-gray-500",
    },
};

const Sidebar = (): ReactElement => {
    // Get my Discord user to display the status indicator and some other cool stuff
    const discordUser: DiscordUser | undefined = useTetherWS(
        appConfig.discordUserId
    );
    const indicator = indicators[discordUser?.onlineStatus ?? "OFFLINE"];
    const Icon = indicator.icon;

    return (
        <div
            className={cn(
                "w-[20rem] py-28 bg-background/65",
                "[mask-image:linear-gradient(to_right,black_90%,transparent)]"
            )}
        >
            {/* Content */}
            <div className="-ml-7 flex flex-col gap-4 items-center">
                {/* Me */}
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Image
                        className="rounded-full aspect-square object-cover"
                        src="/media/me.png"
                        alt="Hey, it's me!"
                        width={120}
                        height={120}
                        priority
                        draggable={false}
                    />

                    {/* Status Indicator */}
                    {Icon && (
                        <SimpleTooltip
                            content={
                                discordUser && (
                                    <span className="flex gap-1 items-center">
                                        <Image
                                            className="pr-0.5"
                                            src="/media/discord.png"
                                            alt="Discord"
                                            width={15}
                                            height={15}
                                            draggable={false}
                                        />
                                        Currently on{" "}
                                        <b>
                                            {discordUser?.onlineStatus
                                                .toLowerCase()
                                                .replaceAll("_", " ")}
                                        </b>
                                    </span>
                                )
                            }
                            side="bottom"
                        >
                            <Icon
                                className={cn(
                                    "absolute -bottom-1 left-3.5 p-1 size-6 bg-background rounded-full",
                                    discordUser &&
                                        "hover:opacity-90 transition-opacity transform-gpu",
                                    indicator.color
                                )}
                            />
                        </SimpleTooltip>
                    )}
                </motion.div>

                <motion.h1
                    className="flex gap-2.5 items-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Image
                        src="/media/wave.gif"
                        alt="Waving Hand"
                        width={28}
                        height={28}
                        draggable={false}
                    />
                    <span className="text-xl font-bold">
                        Hello, I&apos;m Braydon!
                    </span>
                </motion.h1>
            </div>
        </div>
    );
};
export default Sidebar;
