"use client";

import { Circle, CircleX, LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { ReactElement, useEffect, useState } from "react";
import { DiscordUser, useTetherWS } from "use-tether";
import { appConfig } from "~/app/config";
import { truncateText } from "~/lib/string";
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
                "hidden lg:block sticky top-0 w-[20rem] h-screen pt-32 pb-7 bg-background/65 z-40",
                "[mask-image:linear-gradient(to_right,black_90%,transparent)]"
            )}
        >
            {/* Content */}
            <div className="h-full lg:-ml-7 flex flex-col gap-4 justify-between items-center">
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
    const indicator: Indicator =
        indicators[discordUser?.onlineStatus ?? "OFFLINE"];
    const Icon: LucideIcon = indicator.icon;
    return (
        <div className="flex flex-col gap-4 items-center">
            {/* Introduction */}
            <motion.div
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
            </motion.div>

            {/* Name */}
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

            {/* Online Status & Bio */}
            <motion.div
                className="flex gap-2.5 items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Icon className={indicator.color} />
                <span className="text-sm text-muted-foreground">
                    {discordUser?.onlineStatus}
                </span>
            </motion.div>
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
        const totalSeconds = Math.floor(millis / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const [currentProgress, setCurrentProgress] = useState<string>("0:00");

    // Update the current progress every second
    useEffect(() => {
        if (!spotify?.started) return;
        const updateProgress = () => {
            setCurrentProgress(
                formatDuration(
                    Math.min(Date.now() - spotify.started, spotify.trackLength)
                )
            );
        };
        updateProgress();
        const interval = setInterval(() => updateProgress(), 1000);
        return () => clearInterval(interval);
    }, [spotify]);
    if (!spotify) return undefined;

    return (
        <motion.div
            className="w-[calc(100%-2rem)] lg:w-[calc(100%-5rem)] px-2 py-1.5 bg-muted/15 border border-border rounded-lg"
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
