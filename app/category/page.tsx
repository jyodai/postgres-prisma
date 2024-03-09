import CategoryList from '@/components/CategoryList';
import { getCategory } from '@/api/category';
import {Category } from '@/types/types';

export default async function Home() {
    const categories = await getCategory();

    return (
        <div className="container mx-auto p-4">
            <CategoryList categories={categories} />
        </div>
    );
}
