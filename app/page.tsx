"use client";
import { useState, useEffect } from 'react';
import EntryList from '@/app/components/EntryList';
import AddEntryForm from '@/app/components/AddEntryForm';
import { getEntriesFromSheet, deleteEntryFromSheet, editEntryInSheet } from '@/services/sheetService';
import { Entry } from '@/types/types';

export default function Home() {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [editingEntry, setEditingEntry] = useState<Entry | null>(null);

    const fetchEntries = async () => {
        const data = await getEntriesFromSheet();
        setEntries(data);
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    const handleDelete = async (id: number) => {
        await deleteEntryFromSheet(id);
        fetchEntries();
    };

    const handleEdit = (entry: Entry) => {
        setEditingEntry(entry);
    };

    const handleSave = async (entry: Entry) => {
        await editEntryInSheet(entry.id, entry);
        setEditingEntry(null);
        fetchEntries();
    };

    return (
        <div className="container mx-auto p-4">
            {editingEntry ? (
                <>
                    <AddEntryForm initialEntry={editingEntry} onSave={handleSave} />
                    <button onClick={() => setEditingEntry(null)} className="mt-4 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        キャンセル
                    </button>
                </>
            ) : (
                <EntryList entries={entries} onDelete={handleDelete} onEdit={handleEdit} />
            )}
        </div>

    );
}

