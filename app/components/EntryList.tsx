'use client'
import React from 'react';
import AddEntryForm from '@/app/components/AddEntryForm';
import { useState, useEffect } from 'react';
import { dateUtils } from '@/utils/date';
import { getEntriesFromSheet, deleteEntryFromSheet, editEntryInSheet, getCategory } from '@/services/sheetService';
import { Entry, Category } from '@/types/types';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CategoryIcon from '@mui/icons-material/Category';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


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

    const onDelete = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>, id: number) => {
        e.stopPropagation();
        if (!confirm('削除しますか?')) {
          return;
        }
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
          <div className="p-4">
              {editingEntry ? (
                <div key='editing' className="flex flex-col">
                  <div className="flex justify-end">
                    <ClearIcon className="cursor-pointer" onClick={(e) => setEditingEntry(null)} />
                  </div>
                  <div>
                    <AddEntryForm initialEntry={editingEntry} categories={categories} onSave={handleSave} />
                  </div>
                </div>
              ) : (
                <div>
                  {entries.map((entry, index) => (
                    <div key={entry.id}>
                      {(index === 0 || dateUtils.formatDate(entry.date) !== dateUtils.formatDate(entries[index - 1].date)) && (
                        <div className="mb-4">
                          <Typography variant="subtitle1" component="strong" color="white">
                            {dateUtils.formatDate(entry.date)} ({dateUtils.getDayOfWeek(entry.date)})
                          </Typography>
                        </div>
                      )}

                      <Card className="mb-4 ml-4">
                        <CardContent sx={{ cursor: 'pointer' }} onClick={() => onEdit(entry)}>
                          <div>
                              <div className="flex items-center justify-between text-lg">
                                <div className="flex items-center"><CurrencyYenIcon/>{entry.amount}</div>
                                <ClearIcon className="cursor-pointer" onClick={(e) => onDelete(e, entry.id)}/>
                              </div>
                              <div className="flex items-center">
                                <CategoryIcon sx={{ color: entry.category.color }} />{entry.category ? entry.category.name : 'No Category'}
                              </div>
                              <div className="flex items-center"><StorefrontIcon/>{entry.store}</div>
                              <div className="flex items-center"><AssignmentIcon/>{entry.memo}</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </ThemeProvider>
    );
};

export default EntryList;

