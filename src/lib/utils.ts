import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names.
 *
 * @param inputs the class names to merge
 * @returns the merged class names
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
