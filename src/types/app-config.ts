import { LucideIcon } from "lucide-react";
import { Snowflake } from "use-tether";

export type SocialConfig = {
    name: string;
    icon: LucideIcon | string;
    tooltip: string;
    href: string;
};

export type AppConfig = {
    discordUserId: Snowflake;
    socials: Record<"discord" | "github" | "email", SocialConfig>;
};
