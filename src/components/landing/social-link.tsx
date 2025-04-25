import { SocialConfig } from "~/types/app-config";

import { Link } from "next-view-transitions";
import { ReactElement } from "react";

import Image from "next/image";
import NextLink from "next/link";
import SimpleTooltip from "~/components/simple-tooltip";
import { cn } from "~/lib/utils";

type SocialLinkProps = {
    className?: string;
    social: SocialConfig;
    hideName?: boolean;
};

const SocialLink = ({
    className,
    social,
    hideName,
}: SocialLinkProps): ReactElement => {
    const LinkComponent = social.href.startsWith("http") ? Link : NextLink;
    return (
        <SimpleTooltip content={social.tooltip} side="bottom">
            <LinkComponent
                className={cn(
                    "px-2.5 py-1.5 flex gap-2 items-center text-sm text-white/85 bg-background/80 border border-border rounded-xl hover:bg-zinc-900/55 transition-colors transform-gpu",
                    className
                )}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                draggable={false}
            >
                {typeof social.icon === "string" ? (
                    <div className="relative size-4">
                        <Image
                            className="object-contain"
                            src={social.icon}
                            alt={`${social.name} Icon`}
                            fill
                            draggable={false}
                        />
                    </div>
                ) : (
                    <social.icon className="size-4" />
                )}
                {!hideName && <span>{social.name}</span>}
            </LinkComponent>
        </SimpleTooltip>
    );
};
export default SocialLink;
