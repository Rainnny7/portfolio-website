"use client";

import { Briefcase, Home, Image, LucideIcon, Server, User } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "next-view-transitions";
import { ReactElement } from "react";
import SimpleTooltip from "~/components/simple-tooltip";

type NavbarLink = {
    name: string;
    icon: LucideIcon;
    tooltip: string;
    href: string;
};

const links: NavbarLink[] = [
    {
        name: "Home",
        icon: Home,
        tooltip: "Go back home",
        href: "/",
    },
    {
        name: "About",
        icon: User,
        tooltip: "About me",
        href: "/#about",
    },
    {
        name: "Projects",
        icon: Briefcase,
        tooltip: "My projects",
        href: "/#projects",
    },
    {
        name: "Homelab",
        icon: Server,
        tooltip: "My homelab",
        href: "/#homelab",
    },
    {
        name: "Media",
        icon: Image,
        tooltip: "My media",
        href: "/#media",
    },
];

const Navbar = (): ReactElement => (
    <motion.nav
        className="fixed top-3.5 inset-x-0 w-fit p-1 mx-auto flex gap-1 items-center text-sm text-white/85 bg-background/60 backdrop-blur-sm border border-border rounded-2xl z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
    >
        {links.map((link: NavbarLink) => (
            <SimpleTooltip key={link.name} content={link.tooltip} side="bottom">
                <Link
                    className="px-5 py-1.5 flex gap-2.5 items-center hover:bg-zinc-900/55 rounded-xl transition-colors transform-gpu"
                    href={link.href}
                    draggable={false}
                >
                    <link.icon className="size-4" />
                    {link.name}
                </Link>
            </SimpleTooltip>
        ))}
    </motion.nav>
);
export default Navbar;
