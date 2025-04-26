import { motion } from "motion/react";
import Image from "next/image";
import { ReactElement } from "react";
import { MagicCard } from "~/components/ui/magic-card";
import { isVideo } from "~/lib/file";
import { type MediaFile } from "~/types/media";

const mediaClasses: string =
    "object-cover rounded-lg group-hover:scale-105 transition-all duration-300 transform-gpu";

const MediaItem = ({
    media,
    index,
}: {
    media: MediaFile;
    index: number;
}): ReactElement => (
    <motion.li
        key={media.id}
        className="group w-full md:w-fit"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
            duration: 0.25,
            delay: 0.7 + index * 0.1,
        }}
    >
        <MagicCard
            className="relative w-full md:w-[21rem] xl:w-[24.5rem] rounded-lg cursor-pointer"
            gradientColor="#1C1C1C"
            gradientFrom="var(--tertiary-darker)"
            gradientTo="var(--tertiary)"
        >
            <div className="p-1 h-[12rem]">
                <div className="relative h-full w-full overflow-hidden">
                    {isVideo(media.url) ? (
                        <video
                            className={mediaClasses}
                            src={media.url}
                            controls
                            muted
                            loop
                            playsInline
                        />
                    ) : (
                        <Image
                            className={mediaClasses}
                            src={media.url}
                            alt={media.name}
                            priority
                            fill
                            draggable={false}
                        />
                    )}
                </div>
            </div>
        </MagicCard>
    </motion.li>
);
export default MediaItem;
