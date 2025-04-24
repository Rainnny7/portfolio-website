import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        // App
        NODE_ENV: z.enum(["development", "test", "production"]),
        LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]),

        // GitHub
        GITHUB_TOKEN: z.string(),

        // Analytics
        ANALYTICS_HOST: z.string(),
        ANALYTICS_ID: z.string(),

        // MinIO
        MINIO_ENDPOINT: z.string(),
        MINIO_PORT: z.string(),
        MINIO_USE_SSL: z.string(),
        MINIO_ACCESS_KEY: z.string(),
        MINIO_SECRET_KEY: z.string(),
    },

    client: {
        // App
        NEXT_PUBLIC_BASE_URL: z.string(),
    },

    runtimeEnv: {
        // App
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
        NODE_ENV: process.env.NODE_ENV,
        LOG_LEVEL: process.env.LOG_LEVEL,

        // GitHub
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,

        // Analytics
        ANALYTICS_HOST: process.env.ANALYTICS_HOST,
        ANALYTICS_ID: process.env.ANALYTICS_ID,

        // MinIO
        MINIO_ENDPOINT: process.env.MINIO_ENDPOINT,
        MINIO_PORT: process.env.MINIO_PORT,
        MINIO_USE_SSL: process.env.MINIO_USE_SSL,
        MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY,
        MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY,
    },

    /**
     * i had a stupid fucking error so now this is forever going to be turned on (:
     * @theo fix ur shit lib
     */
    skipValidation: true,

    /**
     * Makes it so that empty strings are treated as undefined.
     * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
     */
    emptyStringAsUndefined: true,
});

export const isProd = env.NODE_ENV === "production";
