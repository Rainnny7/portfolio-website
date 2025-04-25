import { Circle, CircleX, LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { ReactElement } from "react";
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

const SidebarIntroduction = ({
    discordUser,
}: {
    discordUser: DiscordUser | undefined;
}): ReactElement => {
    const formattedStatus: string | undefined = discordUser
        ? capitalizeWords(discordUser?.onlineStatus.replaceAll("_", " "))
        : undefined;
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
                    side="bottom"
                >
                    <motion.div
                        className="px-2 py-1.5 flex gap-2 items-center bg-muted/50 rounded-lg"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Icon className={cn("size-3.5", indicator.color)} />
                        <span className="text-xs text-muted-foreground">
                            {formattedStatus}
                        </span>
                    </motion.div>
                </SimpleTooltip>
            )}
        </div>
    );
};
export default SidebarIntroduction;
