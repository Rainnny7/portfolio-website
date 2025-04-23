"use client";

import { Server } from "lucide-react";
import { motion } from "motion/react";

const MediaSection = () => (
    <section id="media" className="pt-40 flex flex-col gap-5">
        {/* Header */}
        <div className="flex flex-col gap-2">
            <motion.h2
                className="text-4xl font-bold flex gap-4 items-center"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <Server className="p-2 size-10 bg-primary/20 border border-border rounded-lg" />
                My Media
            </motion.h2>
            <motion.p
                className="max-w-lg text-lg text-muted-foreground font-light"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                This is just a bunch of random media of things I&apos;ve made
                throughout the years, enjoy!
            </motion.p>
        </div>

        {/* Content */}
        <motion.p
            className="text-lg text-muted-foreground font-light"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.8 }}
        >
            This section isn&apos;t finished yet.
        </motion.p>
    </section>
);
export default MediaSection;
