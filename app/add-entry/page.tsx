'use client'

import { useState, useEffect } from 'react';
import AddEntryForm from '@/app/components/AddEntryForm';
import { addEntryToSheet, getCategory } from '@/services/sheetService';
import { Entry, Category } from '@/types/types';

export default function Home() {
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchCategories = async () => {
        const data = await getCategory();
        setCategories(data);
    };

    const [refreshKey, setRefreshKey] = useState(0);

    const handleSave = async (entry: Entry) => {
        await addEntryToSheet(entry);
        setRefreshKey(oldKey => oldKey + 1);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="container mx-auto p-4">
            {categories.length > 0 ? (
                <AddEntryForm key={refreshKey} initialEntry={null} categories={categories} onSave={handleSave} />
            ) : (
                <div>Loading categories...</div>
            )}
        </div>
    );
}
