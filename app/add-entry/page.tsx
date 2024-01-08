"use client";
import { useState } from 'react';
import AddEntryForm from '@/app/components/AddEntryForm';
import { addEntryToSheet } from '@/services/sheetService';
import { Entry } from '@/types/types';

export default function Home() {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSave = async (entry: Entry) => {
        await addEntryToSheet(entry);
        setRefreshKey(oldKey => oldKey + 1);
    };

    return (
        <div className="container mx-auto p-4">
            <AddEntryForm key={refreshKey} initialEntry={null} onSave={handleSave}/>
        </div>
    );
}
