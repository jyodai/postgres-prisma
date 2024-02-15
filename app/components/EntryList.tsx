'use client'
import React from 'react';
import AddEntryForm from '@/app/components/AddEntryForm';
import { useState, useEffect } from 'react';
import { dateUtils } from '@/utils/date';
import { getEntriesFromSheet, deleteEntryFromSheet, editEntryInSheet, getCategory } from '@/services/sheetService';
import { Entry, Category } from '@/types/types';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


interface Props {
  entries: Entry[];
  categories: Category[];
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const EntryList = (props: Props) => {
    const [entries, setEntries] = useState<Entry[]>(props.entries);
    const [editingEntry, setEditingEntry] = useState<Entry | null>(null);

    const fetchEntries = async () => {
        const data = await getEntriesFromSheet();
        setEntries(data);
    };

    const [categories, setCategories] = useState<Category[]>(props.categories);

    const fetchCategories = async () => {
        const data = await getCategory();
        setCategories(data);
    };

    const onDelete = async (id: number) => {
        await deleteEntryFromSheet(id);
        fetchEntries();
    };

    const onEdit = (entry: Entry) => {
        setEditingEntry(entry);
    };

    const handleSave = async (entry: Entry) => {
        await editEntryInSheet(entry.id, entry);
        setEditingEntry(null);
        fetchEntries();
    };

    return (
        <ThemeProvider theme={darkTheme}>
          <div className="container mx-auto p-4">
              {editingEntry ? (
                  <>
                      <AddEntryForm initialEntry={editingEntry} categories={categories} onSave={handleSave} />
                      <button onClick={() => setEditingEntry(null)} className="mt-4 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          キャンセル
                      </button>
                  </>
              ) : (
                  <ul className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
                      {entries.map((entry, index) => (
                          <li key={index} className="flex justify-between items-center p-4 border-b border-gray-200 last:border-0">
                              <div className="flex-grow">
                                  <div className="text-sm text-gray-600">{dateUtils.formatDateToDateTimeLocal(entry.date)}</div>
                                  <div className="text-lg font-medium">{entry.category ? entry.category.name : 'No Category'}</div>
                                  <div className="text-gray-800">{entry.amount} 円</div>
                                  <div className="text-gray-500 italic">{entry.store}</div>
                                  <div className="text-gray-500 italic">{entry.memo}</div>
                              </div>
                              <div className="flex items-center space-x-2">
                                  <EditIcon sx={{ cursor: 'pointer' }} onClick={() => onEdit(entry)}>編集</EditIcon>
                                  <DeleteIcon sx={{ cursor: 'pointer' }} onClick={() => onDelete(entry.id)} >削除</DeleteIcon>
                              </div>
                          </li>
                      ))}
                  </ul>
              )}
          </div>
        </ThemeProvider>
    );
};

export default EntryList;

