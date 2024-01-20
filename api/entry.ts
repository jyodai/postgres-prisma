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
    });

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
    });
    return entries;
};
