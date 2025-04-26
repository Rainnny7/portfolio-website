export const isVideo = (url: string): boolean =>
    [".mp4", ".webm", ".ogg"].some((ext) =>
        url.split("?")?.[0].toLowerCase().endsWith(ext)
    );
