import dayjs, { Dayjs } from "dayjs";
import { Github, Mail } from "lucide-react";
import { AppConfig } from "~/types/app-config";

const birthDate: Dayjs = dayjs("2002-11-13");
const experienceStartDate: Dayjs = dayjs("2016-09-01");

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
    about: (
        <span>
            A passionate {dayjs().diff(birthDate, "year")} year old software
            engineer living in Toronto, Canada. I primarily work with the Java
            programming language and have{" "}
            {dayjs().diff(experienceStartDate, "year")} years of experience.
        </span>
    ),
};
