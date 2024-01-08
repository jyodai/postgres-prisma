"use client";
import { useState, useEffect } from 'react';
import CategoryList from '@/app/components/CategoryList';
import { getCategory } from '@/services/sheetService';
import {Category } from '@/types/types';

export default function Home() {
    const [categories, setCategory] = useState<Category[]>([]);

    const fetchCategories = async () => {
        const data = await getCategory();
        setCategory(data);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <CategoryList categories={categories} />
        </div>
    );
}
