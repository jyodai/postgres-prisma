import prisma from '@/lib/prisma'
import { Entry, Category } from '@/types/types';
import { dateUtils } from '@/utils/date';

export const getEntry = async (): Promise<Entry[]> => {
    const entries = await prisma.dev_entry.findMany({
        include: {
            category: true,
        },
    });

    const convertEntries = entries.map((entry: Entry) => {
      return {
        ...entry,
        date: dateUtils.formatDateToDateTimeLocal(entry.date),
      };
    });

    return convertEntries;
};
