"use client";

import {
    Briefcase,
    Home,
    Image,
    LucideIcon,
    PanelLeft,
    Server,
    User,
} from "lucide-react";
import { motion } from "motion/react";
import { Link } from "next-view-transitions";
import { ReactElement, useEffect, useState } from "react";
import SimpleTooltip from "~/components/simple-tooltip";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";
import { useSidebar } from "~/provider/sidebar-provider";

type NavbarLink = {
    name: string;
    icon: LucideIcon;
    tooltip: string;
    href: string;
    sectionId: string;
};

const links: NavbarLink[] = [
    {
        name: "Home",
        icon: Home,
        tooltip: "Go back home",
        href: "/",
        sectionId: "home",
    },
    {
        name: "About",
        icon: User,
        tooltip: "About me",
        href: "/#about",
        sectionId: "about",
    },
    {
        name: "Projects",
        icon: Briefcase,
        tooltip: "My projects",
        href: "/#projects",
        sectionId: "projects",
    },
    {
        name: "Homelab",
        icon: Server,
        tooltip: "My homelab",
        href: "/#homelab",
        sectionId: "homelab",
    },
    {
        name: "Media",
        icon: Image,
        tooltip: "My media",
        href: "/#media",
        sectionId: "media",
    },
];

const Navbar = (): ReactElement => {
    const { open, setOpen } = useSidebar();
    const [activeSection, setActiveSection] = useState<string>("about");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => {
                entries.forEach((entry: IntersectionObserverEntry) => {
                    if (entry.isIntersecting) {
                        console.log(entry.target.id);
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-40% 0px -40% 0px",
                threshold: 0.14,
            }
        );

        // Observe all sections
        links
            .filter((link: NavbarLink) => link.sectionId !== "home")
            .forEach((link: NavbarLink) => {
                const section: HTMLElement | null = document.getElementById(
                    link.sectionId
                );
                if (section) observer.observe(section);
            });
        return () => observer.disconnect();
    }, []);

    return (
        <motion.nav
            className="fixed top-3.5 right-3.5 sm:inset-x-0 w-fit p-1 mx-auto flex gap-1 items-center text-sm text-white/85 bg-background/60 backdrop-blur-sm border border-border rounded-2xl z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            {/* Mobile Sidebar Button */}
            <div className="lg:hidden flex items-center gap-1">
                <Button
                    className="hover:bg-zinc-900/55 rounded-xl"
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpen(!open)}
                >
                    <PanelLeft className="size-4" />
                </Button>
                <Separator
                    orientation="vertical"
                    style={{
                        height: "1.5rem",
                    }}
                />
            </div>

            {/* Links */}
            {links.map((link: NavbarLink) => {
                const active: boolean =
                    activeSection === link.sectionId &&
                    link.sectionId !== "home";
                return (
                    <SimpleTooltip
                        key={link.name}
                        content={link.tooltip}
                        side="bottom"
                    >
                        <Link
                            className={cn(
                                "px-2 sm:px-3.5 md:px-5 py-1.5 flex gap-1.5 sm:gap-2.5 items-center hover:bg-zinc-900/55 rounded-xl transition-all transform-gpu",
                                active && "bg-zinc-900/55"
                            )}
                            href={link.href}
                            draggable={false}
                        >
                            <link.icon className="size-4" />
                            <span
                                className={cn(!active && "hidden", "sm:block")}
                            >
                                {link.name}
                            </span>
                        </Link>
                    </SimpleTooltip>
                );
            })}
        </motion.nav>
    );
};

export default Navbar;
