export function middleTruncate(value: string, start = 10, end = 8) {
    if (!value) return ""
    if (value.length <= start + end) return value

    return `${value.slice(0, start)}...${value.slice(-end)}`
}
