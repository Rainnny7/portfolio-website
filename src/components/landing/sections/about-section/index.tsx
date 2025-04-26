"use client";

import { Briefcase } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import NextLink from "next/link";
import { ReactElement } from "react";
import { DiscordUser } from "use-tether";
import { appConfig } from "~/app/config";
import AnimatedRightChevron from "~/components/animated-right-chevron";
import DiscordStatus from "~/components/landing/discord-status";
import AboutSkill from "~/components/landing/sections/about-section/skill";
import SocialLink from "~/components/landing/social-link";
import SpotifyStatus from "~/components/landing/spotify-status";
import { InfiniteMovingCards } from "~/components/ui/infinite-moving-cards";
import { type Skill, type SocialConfig } from "~/types/app-config";

const AboutSection = ({
    discordUser,
}: {
    discordUser: DiscordUser | undefined;
}): ReactElement => (
    <section id="about" className="pt-40 lg:pt-32 flex flex-col gap-4">
        {/* Hire Me */}
        <NextLink
            className="w-fit"
            href={appConfig.socials.email.href}
            draggable={false}
        >
            <motion.div
                className="group w-fit px-3 py-1.5 flex gap-2 items-center text-sm text-white/90 font-light bg-primary/10 border border-border rounded-xl hover:bg-primary/15 transition-colors transform-gpu"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
            >
                <Briefcase className="size-4 text-primary" />
                Looking to hire me? Let&apos;s talk!
                <AnimatedRightChevron />
            </motion.div>
        </NextLink>

        {/* Name, Title, & Socials */}
        <div className="flex flex-col gap-2.5">
            <motion.h1
                className="flex gap-3 lg:gap-2.5 items-center text-4xl sm:text-5xl font-bold"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <Image
                    className="hidden xs:block lg:hidden"
                    src="/media/wave.gif"
                    alt="Waving Hand"
                    width={38}
                    height={38}
                    draggable={false}
                />
                <span className="lg:hidden">Hi, </span>I&apos;m{" "}
                <span className="flex gap-2.5 items-center">
                    <div className="lg:hidden relative">
                        <Image
                            className="rounded-full aspect-square object-cover"
                            src="/media/me.png"
                            alt="Hey, it's me!"
                            width={40}
                            height={40}
                            priority
                            draggable={false}
                        />

                        {/* Discord Status */}
                        {discordUser && (
                            <DiscordStatus
                                className="absolute -bottom-1.5 -right-1.5 p-1 bg-background/85 rounded-xl"
                                discordUser={discordUser}
                                hideName
                            />
                        )}
                    </div>
                    <span className="bg-gradient-to-br from-primary to-tertiary text-transparent bg-clip-text">
                        Braydon
                    </span>
                </span>
            </motion.h1>
            <motion.p
                className="sm:text-lg font-light text-muted-foreground"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Self-Taught Software Engineer & System Administrator
            </motion.p>

            {/* Socials */}
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
                            <SocialLink social={social} />
                        </motion.div>
                    )
                )}
            </div>
        </div>

        {/* About Me */}
        <motion.p
            className="max-w-xl sm:text-lg font-light text-muted-foreground"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            {appConfig.about}
        </motion.p>

        {/* Skills */}
        <motion.div
            className="max-w-xl flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.5,
                delay: 0.5,
                staggerChildren: 0.05,
                delayChildren: 0.1,
            }}
        >
            <InfiniteMovingCards>
                {appConfig.skills.map((skill: Skill, index: number) => (
                    <AboutSkill key={skill.name} skill={skill} index={index} />
                ))}
            </InfiniteMovingCards>
        </motion.div>

        {/* Spotify Status - Mobile */}
        <motion.div
            className="max-w-md lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
        >
            <SpotifyStatus discordUser={discordUser} />
        </motion.div>
    </section>
);
export default AboutSection;
