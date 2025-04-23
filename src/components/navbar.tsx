"use client";

import {
    Activity,
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
import { usePathname } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import SimpleTooltip from "~/components/simple-tooltip";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";
import { useSidebar } from "~/provider/sidebar-provider";

type NavbarLink = {
    name?: string | undefined;
    icon: LucideIcon;
    tooltip: string;
    href: string;
    sectionId: string;
};

const links: NavbarLink[] = [
    {
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
        name: "Activity",
        icon: Activity,
        tooltip: "My activity",
        href: "/#activity",
        sectionId: "activity",
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
    const path: string = usePathname();
    const { open, setOpen } = useSidebar();
    const [activeSection, setActiveSection] = useState<string>("about");
    const [hasScrolled, setHasScrolled] = useState<boolean>(false);

    // Set initial active section
    useEffect(() => {
        if (path === "/") {
            setActiveSection("about");
        }
    }, [path]);

    // Handle scroll and section visibility
    useEffect(() => {
        const handleScroll = () => {
            const sections = links
                .filter((link: NavbarLink) => link.sectionId !== "home")
                .map((link) => document.getElementById(link.sectionId))
                .filter(Boolean) as HTMLElement[];
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (const section of sections) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                if (
                    scrollPosition >= sectionTop &&
                    scrollPosition <= sectionBottom
                ) {
                    setActiveSection(section.id);
                    break;
                }
            }
        };
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Checking if the user has scrolled
    useEffect(() => {
        const handleScroll = () => setHasScrolled(window.scrollY >= 30);
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            className={cn(
                "fixed top-3.5 right-3.5 sm:inset-x-0 w-fit p-1 mx-auto flex gap-1 items-center text-sm text-white/85 bg-background/60 backdrop-blur-sm border border-border rounded-2xl duration-250 transition-all transform-gpu z-50",
                hasScrolled &&
                    "top-0 right-0 rounded-t-none rounded-br-none sm:rounded-br-2xl"
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* Mobile Sidebar Button */}
            <div className="lg:hidden flex items-center gap-1">
                <SimpleTooltip content="Open sidebar" side="bottom">
                    <Button
                        className="hover:bg-zinc-900/55 rounded-xl"
                        variant="ghost"
                        size="icon"
                        onClick={() => setOpen(!open)}
                    >
                        <PanelLeft className="size-4" />
                    </Button>
                </SimpleTooltip>
                <Separator
                    orientation="vertical"
                    style={{
                        height: "1.5rem",
                    }}
                />
            </div>

            {/* Links */}
            {links.map((link: NavbarLink, index: number) => {
                const active: boolean =
                    path === "/" &&
                    activeSection === link.sectionId &&
                    link.sectionId !== "home";
                return (
                    <SimpleTooltip
                        key={index}
                        content={link.tooltip}
                        side="bottom"
                    >
                        <Link
                            className={cn(
                                link.name
                                    ? "px-2 sm:px-3.5 md:px-5"
                                    : "px-2 sm:px-2.5",
                                "py-1.5 flex gap-1.5 sm:gap-2.5 items-center hover:bg-zinc-900/55 font-light rounded-xl transition-all transform-gpu",
                                active && "bg-zinc-900/55 text-primary"
                            )}
                            href={link.href}
                            draggable={false}
                        >
                            <link.icon className="size-4" />

                            {link.name && (
                                <>
                                    {/* Mobile name (only shows when active) */}
                                    <motion.span
                                        className={cn(!active && "hidden")}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{
                                            opacity: active ? 1 : 0,
                                            x: active ? 0 : -10,
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {link.name}
                                    </motion.span>

                                    {/* Desktop name (always visible) */}
                                    <span
                                        className={cn(
                                            "hidden",
                                            !active && "sm:block"
                                        )}
                                    >
                                        {link.name}
                                    </span>
                                </>
                            )}
                        </Link>
                    </SimpleTooltip>
                );
            })}
        </motion.nav>
    );
};

export default Navbar;
