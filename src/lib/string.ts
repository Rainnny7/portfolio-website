/**
 * Capitalize the first letter of
 * each word in the given string.
 *
 * @param str the string to capitalize
 * @return the capitalized string
 */
export const capitalizeWords = (
    str: string | undefined | null
): string | undefined =>
    str?.toLowerCase().replace(/\b\w/g, (char: string) => char.toUpperCase());

/**
 * Truncate text to a maximum length.
 *
 * @param text the text to truncate
 * @param maxLength the maximum length
 */
export const truncateText = (text: string, maxLength: number): string =>
    text.length > maxLength
        ? text.slice(0, maxLength - 3).trim() + "..."
        : text;
