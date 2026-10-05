import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function existingId(id: number, table: string) {
    const existingId = await prisma[table].findUnique({
        where: { id },
    });

    return existingId;
}

export function serializeForRedis(obj: Record<string, any>): string[] {
    return Object.entries(obj).flatMap(([key, value]) => {
        const shouldStringify = typeof value === 'object' && value !== null;

        return [key, shouldStringify ? JSON.stringify(value) : String(value)];
    });
}

export function parseFromRedis(
    hash: Record<string, string>,
): Record<string, any> {
    return Object.fromEntries(
        Object.entries(hash).map(([key, value]) => {
            try {
                return [key, JSON.parse(value)];
            } catch {
                return [key, value];
            }
        }),
    );
}

export function convertToMs(time: string): number {
    const match = time.match(/^(\d+)([smhd])$/);
    if (!match) throw new Error(`Invalid time format: ${time}`);

    const value = parseInt(match[1], 10);
    const unit = match[2];

    const unitToMs = {
        s: 1000,
        m: 60 * 1000,
        h: 60 * 60 * 1000,
        d: 24 * 60 * 60 * 1000,
    };

    return value * unitToMs[unit];
}

export function convertToSeconds(time: string): number {
    const match = time.match(/^(\d+)([smhd])$/);
    if (!match) throw new Error(`Invalid time format: ${time}`);

    const value = parseInt(match[1], 10);
    const unit = match[2];

    const unitToSec = {
        s: 1,
        m: 60,
        h: 3600,
        d: 86400,
    };

    return value * unitToSec[unit];
}
