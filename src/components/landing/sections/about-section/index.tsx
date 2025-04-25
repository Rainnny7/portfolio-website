"use client";

import { Briefcase } from "lucide-react";
import { motion } from "motion/react";
import NextLink from "next/link";
import { ReactElement } from "react";
import { appConfig } from "~/app/config";
import AnimatedRightChevron from "~/components/animated-right-chevron";
import AboutSkill from "~/components/landing/sections/about-section/skill";
import AboutSocialLink from "~/components/landing/sections/about-section/social-link";
import { InfiniteMovingCards } from "~/components/ui/infinite-moving-cards";
import { type Skill, type SocialConfig } from "~/types/app-config";

const AboutSection = (): ReactElement => (
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
                className="text-5xl font-bold"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                I&apos;m Braydon
            </motion.h1>
            <motion.p
                className="text-lg font-light text-muted-foreground"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Full Stack Software Engineer & System Administrator
            </motion.p>

            {/* Socials */}
            <div className="flex gap-2 items-center">
                {Object.values(appConfig.socials).map(
                    (social: SocialConfig, index: number) => (
                        <AboutSocialLink
                            key={social.href}
                            social={social}
                            index={index}
                        />
                    )
                )}
            </div>
        </div>

        {/* About Me */}
        <motion.p
            className="max-w-xl text-lg font-light text-muted-foreground"
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
    </section>
);
export default AboutSection;
