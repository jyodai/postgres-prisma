import prisma from '@/lib/prisma'
import { Entry, Category } from '@/types/types';
import { dateUtils } from '@/utils/date';

export const findEntry = async (id: number): Promise<Entry> => {
    const entrie = await prisma.dev_entry.findUnique({
        where: {
          id
        },
        include: {
            category: true,
        },
    });
    return entrie;
};

export const getEntry = async (): Promise<Entry[]> => {
    const entries = await prisma.dev_entry.findMany({
        include: {
            category: true,
        },
    });
    return entries;
};
