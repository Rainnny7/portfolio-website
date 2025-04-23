import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names.
 *
 * @param inputs the class names to merge
 * @returns the merged class names
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/**
 * Format a number with commas.
 *
 * @param x the number to format
 * @returns the formatted number
 */
export const numberWithCommas = (x: number): string => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Format a response time in milliseconds to a human-readable string.
 * Returns in milliseconds if under 1 second, otherwise in seconds.
 *
 * @param ms the time in milliseconds
 * @returns formatted string with appropriate unit (ms or s)
 */
export const formatResponseTime = (ms: number): string => {
    if (ms < 1000) {
        return `${ms.toFixed(0)}ms`;
    }
    return `${(ms / 1000).toFixed(2)}s`;
};
