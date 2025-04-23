import { Github, Mail } from "lucide-react";
import { AppConfig } from "~/types/app-config";

export const appConfig: AppConfig = {
    discordUserId: "504147739131641857",
    socials: {
        discord: {
            name: "Discord",
            icon: "/media/discord.png",
            tooltip: "Join my Discord",
            href: "https://discord.rainnny.club",
        },
        github: {
            name: "GitHub",
            icon: Github,
            tooltip: "View my GitHub",
            href: "https://github.com/Rainnny7",
        },
        email: {
            name: "Email",
            icon: Mail,
            tooltip: "Send me an email",
            href: "mailto:braydonrainnny@gmail.com",
        },
    },
};
