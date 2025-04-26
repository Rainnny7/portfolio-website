import { LucideIcon } from "lucide-react";
import Image from "next/image";
import { ReactElement } from "react";
import { DiscordUser } from "use-tether";
import SimpleTooltip from "~/components/simple-tooltip";
import { capitalizeWords } from "~/lib/string";
import { cn } from "~/lib/utils";
import { Indicator, indicators } from "~/types/discord";

type DiscordStatusProps = {
    className?: string | undefined;
    discordUser: DiscordUser;
    hideName?: boolean;
};

const DiscordStatus = ({
    className,
    discordUser,
    hideName,
}: DiscordStatusProps): ReactElement => {
    const formattedStatus: string | undefined = discordUser
        ? capitalizeWords(discordUser?.onlineStatus.replaceAll("_", " "))
        : undefined;
    const indicator: Indicator =
        indicators[discordUser?.onlineStatus ?? "OFFLINE"];
    const Icon: LucideIcon = indicator.icon;
    return (
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
            <div className={cn("group flex gap-2 items-center", className)}>
                <Icon className={cn("size-3", indicator.color)} />
                {!hideName && (
                    <span className="text-xs text-muted-foreground group-hover:opacity-90 transition-opacity transform-gpu">
                        {formattedStatus}
                    </span>
                )}
            </div>
        </SimpleTooltip>
    );
};
export default DiscordStatus;
