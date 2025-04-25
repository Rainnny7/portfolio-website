import { Link } from "next-view-transitions";
import Image from "next/image";
import { ReactElement, useEffect, useState } from "react";
import { DiscordUser } from "use-tether";
import { truncateText } from "~/lib/string";

const SpotifyStatus = ({
    discordUser,
}: {
    discordUser: DiscordUser | undefined;
}): ReactElement | undefined => {
    const spotify = discordUser?.spotify;

    // Format duration in minutes:seconds
    const formatDuration = (millis: number): string => {
        const totalSeconds = Math.floor(millis / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const [currentProgress, setCurrentProgress] = useState<string>("0:00");

    // Update the current progress every second
    useEffect(() => {
        if (!spotify?.started) return;
        const updateProgress = () => {
            setCurrentProgress(
                formatDuration(
                    Math.min(Date.now() - spotify.started, spotify.trackLength)
                )
            );
        };
        updateProgress();
        const interval = setInterval(() => updateProgress(), 1000);
        return () => clearInterval(interval);
    }, [spotify]);
    if (!spotify) return undefined;

    return (
        <div className="px-2 py-1.5 bg-muted/15 border border-border rounded-lg">
            <Link
                className="w-full flex gap-2.5 items-center hover:opacity-75 transition-opacity transform-gpu"
                href={spotify.trackUrl}
                target="_blank"
                draggable={false}
            >
                {/* Album Art */}
                <Image
                    className="rounded-lg"
                    src={spotify.albumArtUrl}
                    alt="Spotify"
                    width={38}
                    height={38}
                    draggable={false}
                />

                {/* Song Info */}
                <div className="w-full flex flex-col">
                    {/* Song Name & Spotify Logo */}
                    <div className="w-full flex gap-1 items-center">
                        <span className="text-xs font-medium">
                            {truncateText(spotify.song, 48)}
                        </span>
                        <Image
                            className="ml-auto"
                            src="/media/spotify.png"
                            alt="Spotify"
                            width={16}
                            height={16}
                            draggable={false}
                        />
                    </div>

                    {/* Song Artist & Duration */}
                    <div className="w-full flex flex-col">
                        <span className="text-xs text-muted-foreground">
                            {truncateText(spotify.artist, 24)}
                        </span>
                        <span className="text-2xs text-muted-foreground">
                            {currentProgress} /{" "}
                            {formatDuration(spotify.trackLength)}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
};
export default SpotifyStatus;
