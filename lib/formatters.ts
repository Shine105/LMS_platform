export function formatPlural(
    count: number,
    { singular, plural }: { singular: string; plural: string },
    { includeCount = true } = {}
) {
    const word = count === 1 ? singular : plural

    return includeCount ? `${count} ${word}`: word
}

// formatPlural(2, { singular: "course", plural: "courses"}, { includeCount: false})