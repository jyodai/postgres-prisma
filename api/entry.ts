import prisma from '@/lib/prisma'
import { Entry, Category } from '@/types/types';
import { dateUtils } from '@/utils/date';

export const findEntry = async (id: number): Promise<Entry> => {
    const entry = await prisma.dev_entry.findUnique({
        where: {
          id
        },
        include: {
            category: true,
        },
    }) as Entry;

    if (!entry) {
      throw new Error('Entry not found.');
    }

    return entry;
};

export const getEntry = async (): Promise<Entry[]> => {
    const entries = await prisma.dev_entry.findMany({
        include: {
            category: true,
        },
        orderBy: {
            date: 'desc',
        },
        take: 150,
    }) as Entry[];
    return entries;
};

export const getEntriesInRange = async (startDate: Date, endDate: Date): Promise<Entry[]> => {
    const entries = await prisma.dev_entry.findMany({
        where: {
            date: {
                gte: startDate,
                lte: endDate,
            },
        },
        include: {
            category: true,
        },
    }) as Entry[];

    return entries;
};
