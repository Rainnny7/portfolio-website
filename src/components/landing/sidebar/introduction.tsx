import { Circle, CircleX, Clock, LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { ReactElement, useEffect, useState } from "react";
import { DiscordUser } from "use-tether";
import SimpleTooltip from "~/components/simple-tooltip";
import { capitalizeWords } from "~/lib/string";
import { cn } from "~/lib/utils";

type Indicator = {
    icon: LucideIcon;
    color: string;
};

const indicators: Record<DiscordUser["onlineStatus"], Indicator> = {
    DO_NOT_DISTURB: {
        icon: CircleX,
        color: "text-primary",
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

const SidebarIntroduction = ({
    discordUser,
}: {
    discordUser: DiscordUser | undefined;
}): ReactElement => {
    const [timeInfo, setTimeInfo] = useState<{
        time: string;
        difference: string;
    }>({ time: "", difference: "" });

    useEffect(() => {
        const updateTime = () => {
            // Calculate time difference in hours between EST and the user's timezone
            const diffHours: number = Math.floor(
                (new Date().getTime() -
                    new Date(
                        new Date().toLocaleString("en-US", {
                            timeZone: "America/Toronto",
                        })
                    ).getTime()) /
                    (1000 * 60 * 60)
            );

            // Get the current time in EST as well as the difference
            setTimeInfo({
                time: new Date().toLocaleString("en-US", {
                    timeZone: "America/Toronto",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                }),
                difference:
                    diffHours === 0
                        ? "Same Time"
                        : `${Math.abs(diffHours)}h ${
                              diffHours > 0 ? "ahead" : "behind"
                          }`,
            });
        };
        // Update immediately and then every minute
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    const formattedStatus: string | undefined = discordUser
        ? capitalizeWords(discordUser?.onlineStatus.replaceAll("_", " "))
        : undefined;
    const indicator: Indicator =
        indicators[discordUser?.onlineStatus ?? "OFFLINE"];
    const Icon: LucideIcon = indicator.icon;

    return (
        <div className="flex flex-col gap-3.5 items-center">
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

            {/* Online Status & Timezone */}
            <div className="flex flex-col gap-1.5 items-center">
                {discordUser && (
                    <SimpleTooltip
                        content={
                            <span className="flex gap-1 items-center">
                                <Image
                                    className="pr-0.5"
                                    src="/media/discord.png"
                                    alt="Discord"
                                    width={15}
                                    height={15}
                                    draggable={false}
                                />
                                Currently on <b>{formattedStatus}</b>
                            </span>
                        }
                        side="right"
                    >
                        <motion.div
                            className="group flex gap-2 items-center"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Icon className={cn("size-3.5", indicator.color)} />
                            <span className="text-xs text-muted-foreground group-hover:opacity-90 transition-opacity transform-gpu">
                                {formattedStatus}
                            </span>
                        </motion.div>
                    </SimpleTooltip>
                )}

                {/* Timezone */}
                <SimpleTooltip
                    content={
                        <>
                            It&apos;s currently <b>{timeInfo.time} EST</b> for
                            me! ({timeInfo.difference})
                        </>
                    }
                    side="right"
                >
                    <motion.div
                        className="group flex gap-2 items-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.75 }}
                    >
                        <Clock className="size-3.5 text-primary" />
                        <span className="text-xs text-muted-foreground group-hover:opacity-90 transition-opacity transform-gpu">
                            {timeInfo.time} EST ({timeInfo.difference})
                        </span>
                    </motion.div>
                </SimpleTooltip>
            </div>
        </div>
    );
};
export default SidebarIntroduction;
