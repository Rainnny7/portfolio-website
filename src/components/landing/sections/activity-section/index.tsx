"use client";

import { Activity } from "lucide-react";
import { motion } from "motion/react";
import LandingSection from "~/components/landing/landing-section";
import GithubCommitGraph from "~/components/landing/sections/activity-section/github-commit-graph";

const ActivitySection = () => (
    <LandingSection
        id="activity"
        icon={Activity}
        title={
            <span>
                My{" "}
                <span className="bg-gradient-to-br from-primary to-tertiary text-transparent bg-clip-text">
                    Activity
                </span>
            </span>
        }
        description="This is a little graph of what I've been up to on GitHub this year."
    >
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.25, delay: 0.8 }}
        >
            <GithubCommitGraph />
        </motion.div>
    </LandingSection>
);
export default ActivitySection;
