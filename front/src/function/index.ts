export const formatDate = (dateString?: string): string => {
    if (!dateString) return "Date non définie";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "Date invalide";

    return date.toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

export function mergeEntity<T extends { id: number }>(
    oldData: T | null,
    newData: Partial<T>
): T {
    if (!oldData) {
        throw new Error("Cannot merge without existing entity data");
    }

    return {
        ...oldData,
        ...newData,
        id: oldData.id,
    };
}

export function calculateDuration(start: Date, end: Date): string {
    
    const milliseconds = Math.abs(end.getTime() - start.getTime());
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;

    if (weeks > 0 && remainingDays > 0) {
        return `${weeks} semaine(s) et ${remainingDays} jour(s)`;
    } else if (weeks > 0) {
        return `${weeks} semaine(s)`;
    } else {
        return `${days} jour(s)`;
    }
}
