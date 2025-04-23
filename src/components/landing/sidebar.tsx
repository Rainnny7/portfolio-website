"use client";

import { Circle, CircleX, LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { ReactElement, useEffect, useState } from "react";
import { DiscordUser, useTetherWS } from "use-tether";
import { appConfig } from "~/app/config";
import SimpleTooltip from "~/components/simple-tooltip";
import { capitalizeWords, truncateText } from "~/lib/string";
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

    return (
        <div
            className={cn(
                "sticky top-0 w-[20rem] h-screen pt-32 pb-7 bg-background/65 z-50",
                "[mask-image:linear-gradient(to_right,black_90%,transparent)]"
            )}
        >
            {/* Content */}
            <div className="h-full -ml-7 flex flex-col gap-4 justify-between items-center">
                <Introduction discordUser={discordUser} />
                <SpotifyStatus discordUser={discordUser} />
            </div>
        </div>
    );
};

const Introduction = ({
    discordUser,
}: {
    discordUser: DiscordUser | undefined;
}): ReactElement => {
    const indicator = indicators[discordUser?.onlineStatus ?? "OFFLINE"];
    const Icon = indicator.icon;
    return (
        <div className="flex flex-col gap-4 items-center">
            {/* Introduction */}
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
                                        {capitalizeWords(
                                            discordUser?.onlineStatus.replaceAll(
                                                "_",
                                                " "
                                            )
                                        )}
                                    </b>
                                </span>
                            )
                        }
                        side="bottom"
                    >
                        <Icon
                            className={cn(
                                "absolute -bottom-1 right-3.5 p-1 size-6 bg-background rounded-full",
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
                <span className="text-xl font-bold">Hi, I&apos;m Braydon!</span>
            </motion.h1>
        </div>
    );
};

const SpotifyStatus = ({
    discordUser,
}: {
    discordUser: DiscordUser | undefined;
}): ReactElement | undefined => {
    const spotify = discordUser?.spotify;

    // Format duration in minutes:seconds
    const formatDuration = (millis: number): string => {
        const minutes: number = Math.floor(millis / 60000);
        const seconds: number = Math.floor((millis % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const [currentProgress, setCurrentProgress] = useState<string>(
        spotify?.trackProgress ? formatDuration(spotify.trackProgress) : "0:00"
    );

    useEffect(() => {
        if (!spotify?.started) return;

        const interval = setInterval(() => {
            setCurrentProgress(formatDuration(spotify.trackProgress));
        }, 1000);

        return () => clearInterval(interval);
    }, [spotify?.started, spotify?.trackLength, spotify?.trackProgress]);
    if (!spotify) return undefined;

    return (
        <motion.div
            className="w-[calc(100%-5rem)] px-2 py-1.5 bg-muted/15 border border-border rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            <Link
                className="w-full flex gap-2.5 items-center hover:opacity-75 transition-opacity transform-gpu"
                href={spotify.trackUrl}
                target="_blank"
                draggable={false}
            >
                {/* Album Art */}
                <Image
                    className="rounded-lg"
                    src={spotify.albumArtUrl}
                    alt="Spotify"
                    width={38}
                    height={38}
                    draggable={false}
                />

                {/* Song Info */}
                <div className="w-full flex flex-col">
                    {/* Song Name & Spotify Logo */}
                    <div className="w-full flex gap-1 items-center">
                        <span className="text-xs font-medium">
                            {truncateText(spotify.song, 48)}
                        </span>
                        <Image
                            className="ml-auto"
                            src="/media/spotify.png"
                            alt="Spotify"
                            width={16}
                            height={16}
                            draggable={false}
                        />
                    </div>

                    {/* Song Artist & Duration */}
                    <div className="w-full flex flex-col">
                        <span className="text-xs text-muted-foreground">
                            {truncateText(spotify.artist, 24)}
                        </span>
                        <span className="text-2xs text-muted-foreground">
                            {currentProgress} /{" "}
                            {formatDuration(spotify.trackLength)}
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default Sidebar;
