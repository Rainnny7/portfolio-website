import { Github, Mail } from "lucide-react";
import Birthday from "~/components/landing/sections/about-section/birthday";
import ExperienceTime from "~/components/landing/sections/about-section/experience-time";
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
    about: (
        <span>
            A passionate <Birthday /> software engineer living in Toronto,
            Canada. I primarily work with the Java programming language and have{" "}
            <ExperienceTime /> of experience. Below is a list of my skills and
            technologies I&apos;ve worked with:
        </span>
    ),
    skills: [
        // Languages
        {
            name: "Java",
            icon: "https://img.icons8.com/color/2x/java-coffee-cup-logo.png",
            link: "https://www.java.com",
        },
        {
            name: "TypeScript",
            icon: "https://img.icons8.com/fluent/2x/typescript.png",
            link: "https://www.typescriptlang.org",
        },
        {
            name: "JavaScript",
            icon: "https://img.icons8.com/fluent/2x/javascript.png",
            link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        },
        {
            name: "CSS",
            icon: "https://img.icons8.com/fluent/2x/css3.png",
            link: "https://www.w3schools.com/css",
        },

        // Operating Systems
        {
            name: "Linux",
            icon: "https://img.icons8.com/color/2x/linux.png",
            link: "https://www.linux.org",
        },
        {
            name: "Bash",
            icon: "https://img.icons8.com/color/2x/bash.png",
            link: "https://www.gnu.org/software/bash",
        },

        // Databases
        {
            name: "MariaDB",
            icon: "https://img.icons8.com/fluent/2x/maria-db.png",
            link: "https://mariadb.org",
        },
        {
            name: "MongoDB",
            icon: "https://img.icons8.com/color/2x/mongodb.png",
            link: "https://www.mongodb.com",
        },
        {
            name: "Redis",
            icon: "https://img.icons8.com/color/2x/redis.png",
            link: "https://redis.io",
        },

        // Software
        {
            name: "Git",
            icon: "https://img.icons8.com/color/2x/git.png",
            link: "https://git-scm.com",
        },
        {
            name: "Docker",
            icon: "https://img.icons8.com/fluent/2x/docker.png",
            link: "https://www.docker.com",
        },
        {
            name: "Jenkins",
            icon: "https://img.icons8.com/color/2x/jenkins.png",
            link: "https://www.jenkins.io",
        },
        {
            name: "Figma",
            icon: "https://img.icons8.com/fluent/2x/figma.png",
            link: "https://www.figma.com",
        },

        // Frameworks & Libraries
        {
            name: "Maven",
            icon: "/media/maven.png",
            link: "https://maven.apache.org",
        },
        {
            name: "NPM",
            icon: "https://img.icons8.com/color/2x/npm.png",
            link: "https://www.npmjs.com",
        },
        {
            name: "React",
            icon: "https://img.icons8.com/dusk/2x/react.png",
            link: "https://reactjs.org/",
        },
        {
            name: "NextJS",
            icon: "https://img.icons8.com/color/2x/nextjs.png",
            link: "https://nextjs.org/",
        },
        {
            name: "TailwindCSS",
            icon: "https://img.icons8.com/color/2x/tailwindcss.png",
            link: "https://tailwindcss.com",
        },
        {
            name: "Redux",
            icon: "https://img.icons8.com/color/2x/redux.png",
            link: "https://redux.js.org",
        },
        {
            name: "Nginx",
            icon: "https://img.icons8.com/color/2x/nginx.png",
            link: "https://www.nginx.com",
        },
    ],
    themes: [
        {
            id: "default",
            name: "Default",
            color: "#FE5454",
        },
        {
            id: "blue",
            name: "Blue",
            color: "#5555FF",
        },
    ],
};
