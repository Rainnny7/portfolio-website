import { BellMinus, Circle, CircleX, Moon } from "lucide-react";

import { LucideIcon } from "lucide-react";
import { DiscordUser } from "use-tether";

export type Indicator = {
    icon: LucideIcon;
    color: string;
};

export const indicators: Record<DiscordUser["onlineStatus"], Indicator> = {
    DO_NOT_DISTURB: {
        icon: BellMinus,
        color: "text-red-400",
    },
    IDLE: {
        icon: Moon,
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
