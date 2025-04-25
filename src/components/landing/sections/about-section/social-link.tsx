import { SocialConfig } from "~/types/app-config";

import { motion } from "motion/react";
import { Link } from "next-view-transitions";
import { ReactElement } from "react";

import Image from "next/image";
import NextLink from "next/link";
import SimpleTooltip from "~/components/simple-tooltip";

const AboutSocialLink = ({
    social,
    index,
}: {
    social: SocialConfig;
    index: number;
}): ReactElement => {
    const LinkComponent = social.href.startsWith("http") ? Link : NextLink;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.5,
                delay: 0.3 + index * 0.1,
            }}
        >
            <SimpleTooltip content={social.tooltip} side="bottom">
                <LinkComponent
                    className="px-2.5 py-1.5 flex gap-2 items-center text-sm text-white/85 bg-background/80 border border-border rounded-xl hover:bg-zinc-900/55 transition-colors transform-gpu"
                    href={social.href}
                    target={
                        social.href.startsWith("http") ? "_blank" : undefined
                    }
                    draggable={false}
                >
                    {typeof social.icon === "string" ? (
                        <Image
                            src={social.icon}
                            alt={`${social.name} Icon`}
                            width={16}
                            height={12}
                            draggable={false}
                        />
                    ) : (
                        <social.icon className="size-4" />
                    )}
                    <span>{social.name}</span>
                </LinkComponent>
            </SimpleTooltip>
        </motion.div>
    );
};
export default AboutSocialLink;
