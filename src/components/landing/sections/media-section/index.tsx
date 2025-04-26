"use client";

import { useQuery } from "@tanstack/react-query";
import { Image } from "lucide-react";
import { motion } from "motion/react";
import { ReactElement, useEffect, useState } from "react";
import { getMedia } from "~/actions/get-minio-media";
import LandingSection from "~/components/landing/landing-section";
import MediaItem from "~/components/landing/sections/media-section/media-item";
import PaginationControls from "~/components/pagination-controls";
import { Skeleton } from "~/components/ui/skeleton";
import { Page, Paginator } from "~/lib/paginator";
import { MediaFile as MediaItemType } from "~/types/media";

const MediaSection = (): ReactElement => {
    const [page, setPage] = useState<number>(1);
    const { isLoading, data: media } = useQuery({
        queryKey: ["media"],
        queryFn: getMedia,
    });
    const [pagedMedia, setPagedMedia] = useState<
        Page<MediaItemType> | undefined
    >();

    useEffect(() => {
        if (!media) return;
        const getPagedMedia = async () => {
            setPagedMedia(
                await new Paginator<MediaItemType>()
                    .setItems(media)
                    .setItemsPerPage(9)
                    .setTotalItems(media.length)
                    .getPage(page)
            );
        };
        getPagedMedia();
    }, [page, media]);

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
            {isLoading ? (
                <motion.div
                    className="w-full flex flex-wrap gap-2 items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.25, delay: 0.7 }}
                >
                    {Array.from({ length: 5 }).map((_, index: number) => (
                        <Skeleton
                            key={index}
                            className="w-full max-w-[23.5rem] h-[9.5rem]"
                        />
                    ))}
                </motion.div>
            ) : (
                <div className="flex flex-col gap-4">
                    <ul className="flex flex-wrap gap-4 items-center">
                        {pagedMedia?.items?.map(
                            (media: MediaItemType, index: number) => (
                                <MediaItem
                                    key={media.id}
                                    media={media}
                                    index={index}
                                />
                            )
                        )}
                    </ul>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px" }}
                        transition={{
                            duration: 0.25,
                            delay: 0.8,
                        }}
                    >
                        <PaginationControls
                            loading={isLoading}
                            responseTime={0}
                            page={pagedMedia}
                            setPage={setPage}
                        />
                    </motion.div>
                </div>
            )}
        </LandingSection>
    );
};

export default MediaSection;
