"use client";

import { Server } from "lucide-react";
import { motion } from "motion/react";

const HomelabSection = () => (
    <section id="homelab" className="py-40 flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-col gap-2">
            <motion.h2
                className="text-4xl font-bold flex gap-4 items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 3 }}
            >
                <Server className="p-2 size-10 bg-primary/20 border border-border rounded-lg" />
                My Homelab
            </motion.h2>
            <motion.p
                className="max-w-lg text-lg text-muted-foreground font-light"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 3.1 }}
            >
                This is my homelab so far, it hosts all my services, including
                this website! I work on it in my spare time when I can (:
            </motion.p>
        </div>
        {/* Projects */}
        sdfsd
    </section>
);
export default HomelabSection;
