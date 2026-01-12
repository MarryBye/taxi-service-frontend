export function formatDuration(duration?: string): string {
    if (!duration) return "—";

    const match = duration.match(
        /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/
    );

    if (!match) return "—";

    const hours = Number(match[1] ?? 0);
    const minutes = Number(match[2] ?? 0);
    const seconds = Math.floor(Number(match[3] ?? 0));

    if (hours > 0) {
        return `${hours} год ${minutes} хв`;
    }

    if (minutes > 0) {
        return `${minutes} хв ${seconds} сек`;
    }

    return `${seconds} сек`;
}