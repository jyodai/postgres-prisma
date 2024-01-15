import prisma from '@/lib/prisma'
import { Category } from '@/types/types';

export const getCategory = async (): Promise<Category[]> => {
  const categories = await prisma.dev_categories.findMany();
  return categories;
};
