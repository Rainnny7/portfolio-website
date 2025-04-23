"use client";

import { motion } from "motion/react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { ReactElement } from "react";
import { appConfig } from "~/app/config";
import SimpleTooltip from "~/components/simple-tooltip";
import { SocialConfig } from "~/types/app-config";

const AboutSection = (): ReactElement => (
    <section id="about" className="flex flex-col gap-3">
        {/* Name, Title, & Socials */}
        <div className="flex flex-col gap-2.5">
            <motion.h1
                className="text-5xl font-bold"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                I&apos;m Braydon
            </motion.h1>
            <motion.p
                className="text-lg font-light text-muted-foreground"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Full Stack Software Engineer
            </motion.p>

            <div className="flex gap-2 items-center">
                {Object.values(appConfig.socials).map(
                    (social: SocialConfig, index: number) => (
                        <motion.div
                            key={social.href}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                duration: 0.5,
                                delay: 0.3 + index * 0.1,
                            }}
                        >
                            <SimpleTooltip
                                content={social.tooltip}
                                side="bottom"
                            >
                                <Link
                                    className="px-2.5 py-1.5 flex gap-2 items-center text-sm text-white/85 bg-background/80 border border-border rounded-xl hover:bg-zinc-900/55 transition-colors transform-gpu"
                                    href={social.href}
                                    target={
                                        social.href.startsWith("http")
                                            ? "_blank"
                                            : undefined
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
                                </Link>
                            </SimpleTooltip>
                        </motion.div>
                    )
                )}
            </div>
        </div>
    </section>
);
export default AboutSection;
