import { BucketStream, Client } from "minio";
import { env } from "~/lib/env";

// Initialize MinIO client
const minioClient = new Client({
    endPoint: env.MINIO_ENDPOINT,
    port: parseInt(env.MINIO_PORT),
    useSSL: env.MINIO_USE_SSL === "true",
    accessKey: env.MINIO_ACCESS_KEY,
    secretKey: env.MINIO_SECRET_KEY,
});
const BUCKET_NAME = "rainnny-club";
const MEDIA_TTL = 60 * 60; // 1 hour

/**
 * Lists all media objects in the MinIO bucket.
 *
 * @param folder the folder to list objects from
 * @returns array of object names
 */
export const listMediaObjects = async (folder: string): Promise<string[]> => {
    const objects: string[] = [];
    const stream: BucketStream<any> = minioClient.listObjects(
        BUCKET_NAME,
        `${folder}/`
    );
    for await (const obj of stream) {
        if (obj.name && obj.name.startsWith(`${folder}/`)) {
            objects.push(obj.name);
        }
    }
    return objects;
};

/**
 * Gets a presigned URL for a media object.
 *
 * @param objectName the name of the object to get a URL for
 * @returns presigned URL for the object
 */
export const getPresignedUrl = async (objectName: string): Promise<string> =>
    await minioClient.presignedGetObject(BUCKET_NAME, objectName, MEDIA_TTL);
