"use server";

import { getPresignedUrl, listMediaObjects } from "~/lib/minio";

export const getMedia = async (): Promise<Record<string, string>> => {
    const objects = await listMediaObjects("random");
    const urls: Record<string, string> = {};

    for (const object of objects) {
        urls[object] = await getPresignedUrl(object);
    }
    return urls;
};
