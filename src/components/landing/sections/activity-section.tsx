"use client";

import { Activity } from "lucide-react";
import { motion } from "motion/react";
import GithubCommitGraph from "~/components/landing/github-commit-graph";

const ActivitySection = () => (
    <section id="activity" className="pt-40 flex flex-col gap-5">
        {/* Header */}
        <div className="flex flex-col gap-2">
            <motion.h2
                className="text-4xl font-bold flex gap-4 items-center"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <Activity className="p-2 size-10 bg-primary/20 border border-border rounded-lg" />
                My Activity
            </motion.h2>
            <motion.p
                className="max-w-lg text-lg text-muted-foreground font-light"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                This is a little graph of what I&apos;ve been up to on GitHub
                this year.
            </motion.p>
        </div>

        {/* Content */}
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.8 }}
        >
            <GithubCommitGraph />
        </motion.div>
    </section>
);
export default ActivitySection;
