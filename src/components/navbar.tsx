"use client";

import {
    Activity,
    Briefcase,
    Cat,
    Home,
    Image,
    LucideIcon,
    Server,
    User,
} from "lucide-react";
import { motion } from "motion/react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { toast } from "sonner";
import SimpleTooltip from "~/components/simple-tooltip";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useKitty } from "~/provider/kitty-provider";

type NavbarLink = {
    name?: string | undefined;
    icon: LucideIcon;
    tooltip: string;
    href: string;
    sectionId?: string | undefined;
};

const links: NavbarLink[] = [
    {
        icon: Home,
        tooltip: "Go back home",
        href: "/",
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
                .filter((link: NavbarLink) => link.sectionId)
                .map((link: NavbarLink) =>
                    document.getElementById(link.sectionId!)
                )
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
            {/* Links */}
            {links.map((link: NavbarLink, index: number) => {
                const active: boolean =
                    path === "/" &&
                    link.sectionId !== undefined &&
                    activeSection === link.sectionId;
                return (
                    <SimpleTooltip
                        key={index}
                        content={link.tooltip}
                        side="bottom"
                    >
                        <Link
                            className={cn(
                                link.name
                                    ? "px-2 sm:px-2.5 md:px-3 py-1.5"
                                    : "px-2 sm:px-2.5 py-2",
                                "flex gap-1.5 sm:gap-2.5 items-center hover:bg-zinc-900/55 font-light rounded-xl transition-all transform-gpu",
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

            {/* Toggle the kitty! */}
            <SimpleTooltip content="Toggle the kitty" side="bottom">
                <div>
                    <KittyToggle />
                </div>
            </SimpleTooltip>
        </motion.nav>
    );
};

const KittyToggle = (): ReactElement => {
    const { showKitty, setShowKitty } = useKitty();
    return (
        <Button
            className={cn(
                "hidden md:block size-8 rounded-xl hover:bg-zinc-900/55 transition-all transform-gpu",
                showKitty && "bg-zinc-900/55 text-primary/85 hover:text-primary"
            )}
            variant="ghost"
            size="icon"
            onClick={() => {
                setShowKitty(!showKitty);
                toast.success(
                    <span className="flex gap-1 items-center">
                        Your kitty {showKitty ? "is now" : "is no-longer"}{" "}
                        visible!
                        <Cat className="size-4" />
                    </span>
                );
            }}
        >
            <Cat className="size-4" />
        </Button>
    );
};
export default Navbar;
