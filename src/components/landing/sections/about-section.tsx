"use client";

import { Briefcase } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { ReactElement } from "react";
import { appConfig } from "~/app/config";
import AnimatedRightChevron from "~/components/animated-right-chevron";
import SimpleTooltip from "~/components/simple-tooltip";
import { InfiniteMovingCards } from "~/components/ui/infinite-moving-cards";
import { type Skill, type SocialConfig } from "~/types/app-config";

const AboutSection = (): ReactElement => (
    <section id="about" className="flex flex-col gap-4">
        {/* Hire Me */}
        <Link
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
        </Link>

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
                Full Stack Software Engineer
            </motion.p>

            {/* Socials */}
            <div className="flex gap-2 items-center">
                {Object.values(appConfig.socials).map(
                    (social: SocialConfig, index: number) => (
                        <SocialLink
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
                    <Skill key={skill.name} skill={skill} index={index} />
                ))}
            </InfiniteMovingCards>
        </motion.div>
    </section>
);

const SocialLink = ({
    social,
    index,
}: {
    social: SocialConfig;
    index: number;
}): ReactElement => (
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
            <Link
                className="px-2.5 py-1.5 flex gap-2 items-center text-sm text-white/85 bg-background/80 border border-border rounded-xl hover:bg-zinc-900/55 transition-colors transform-gpu"
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
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
);

const Skill = ({
    skill,
    index,
}: {
    skill: Skill;
    index: number;
}): ReactElement => (
    <motion.div
        variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
                opacity: 1,
                scale: 1,
                transition: {
                    delay: 0.5 + index * 0.07,
                    duration: 0.3,
                    ease: "easeOut",
                },
            },
        }}
    >
        <SimpleTooltip content={skill.name} side="bottom">
            <Link
                className="flex items-center gap-2 hover:opacity-75 transition-opacity transform-gpu"
                href={skill.link}
                target="_blank"
                draggable={false}
            >
                <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={32}
                    height={32}
                    draggable={false}
                />
            </Link>
        </SimpleTooltip>
    </motion.div>
);

export default AboutSection;
