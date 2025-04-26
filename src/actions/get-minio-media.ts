"use server";

import { getPresignedUrl, listMediaObjects } from "~/lib/minio";
import { MediaFile } from "~/types/media";

export const getMedia = async (): Promise<MediaFile[]> => {
    const objects = await listMediaObjects("random");
    const mediaItems: MediaFile[] = [];

    for (const object of objects) {
        const url = await getPresignedUrl(object);
        mediaItems.push({
            id: object,
            name: object.split("/").pop()?.split(".")[0] ?? object,
            url,
        });
    }
    return mediaItems;
};
