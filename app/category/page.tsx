import CategoryList from '@/app/components/CategoryList';
import { getCategory, getcategory } from '@/api/category';
import {Category } from '@/types/types';

export default async function Home() {
    const categories = await getCategory();

    return (
        <div className="container mx-auto p-4">
            <CategoryList categories={categories} />
        </div>
    );
}
