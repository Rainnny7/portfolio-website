"use client";

import { motion } from "framer-motion";
import { ReactElement } from "react";
import { Particles } from "~/components/magicui/particles";
import HeroPattern from "~/components/ui/hero-pattern";

const Background = (): ReactElement => (
    <>
        <motion.div
            className="fixed inset-0 h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_100%_100%,var(--tertiary-darker),rgba(255,255,255,0))] z-[-2]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        />
        <HeroPattern />
        <Particles
            className="absolute inset-0 opacity-35 z-0"
            ease={80}
            refresh
        />
    </>
);
export default Background;
