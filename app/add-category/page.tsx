"use client";

import AddCategory from '@/app/components/AddCategory';
import {Category } from '@/types/types';

export default function Home() {
    const handleSave = async (category: Category) => {
        console.log(category);
    };

    return (
        <div className="container mx-auto p-4">
          <AddCategory  initialCategory={null} onSave={handleSave} />
        </div>
    );
}
