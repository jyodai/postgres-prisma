import { Entry, Category } from '@/types/types';

export const getEntriesFromSheet = async (): Promise<Entry[]> => {
  const res = await fetch('/api/entry');
  const json = await res.json()
  const entries = json.entries;

  const convertEntries = entries.map((entry: Entry) => {
    return {
      ...entry,
      date: new Date(entry.date),
    };
  });
  return convertEntries;
};

export const addEntryToSheet = async (entry: Entry) => {
    await fetch(
        '/api/entry',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(entry)
        }
    )
    alert('登録完了');
};

export const deleteEntryFromSheet = async (id: number) => {
    await fetch(
        `/api/entry/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )

    alert('削除完了');
};

export const editEntryInSheet = async (id: number, updatedEntry: Entry) => {
    await fetch(
        `/api/entry/${id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(updatedEntry)
        }
    )

    alert('更新完了');
};

export const getCategory  = async (): Promise<Category[]> => {
  const res = await fetch('/api/category');
  const json = await res.json()
  const categories = json.categories;

  return categories;

};
