"use client";

import { useQuery } from "@tanstack/react-query";
import { Image } from "lucide-react";
import { motion } from "motion/react";
import { getMedia } from "~/actions/get-minio-media";
import LandingSection from "~/components/landing/landing-section";

const MediaSection = () => {
    const { isLoading, data: media } = useQuery({
        queryKey: ["media"],
        queryFn: getMedia,
    });
    // console.log(isLoading, media);

    return (
        <LandingSection
            id="media"
            icon={Image}
            title={
                <span>
                    My{" "}
                    <span className="bg-gradient-to-br from-primary to-tertiary text-transparent bg-clip-text">
                        Media
                    </span>
                </span>
            }
            description="This is just a bunch of random media of things I've made throughout the years, enjoy!"
        >
            <motion.p
                className="text-lg text-muted-foreground font-light"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.25, delay: 0.8 }}
            >
                This section isn&apos;t finished yet.
            </motion.p>
        </LandingSection>
    );
};
export default MediaSection;
