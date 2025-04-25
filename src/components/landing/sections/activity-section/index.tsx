"use client";

import { Activity } from "lucide-react";
import { motion } from "motion/react";
import GithubCommitGraph from "~/components/landing/sections/activity-section/github-commit-graph";
import LandingSection from "~/components/landing/sections/landing-section";

const ActivitySection = () => (
    <LandingSection
        id="activity"
        icon={Activity}
        title="My Activity"
        description="This is a little graph of what I've been up to on GitHub this year."
    >
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.8 }}
        >
            <GithubCommitGraph />
        </motion.div>
    </LandingSection>
);
export default ActivitySection;
