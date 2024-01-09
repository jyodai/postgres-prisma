"use client";

import { Entry, Category } from '@/types/types';

export const getEntriesFromSheet = async (): Promise<Entry[]> => {
  const res = await fetch('/api/entry');
  const json = await res.json()
  const entries = json.entries;

  const categories = await getCategoriesFromLocalStorage();
  const convertEntries = entries.map((entry: Entry) => {
      const category = categories.find(category => category.id === entry.category_id);

      return {
          ...entry,
          date: new Date(entry.date),
          category,
      };
  });
  return convertEntries;
};

async function getAccessToken() {
    const payload = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
        refresh_token: process.env.NEXT_PUBLIC_REFRESH_TOKEN as string,
        grant_type: 'refresh_token'
    });

    const response = await fetch(
        process.env.NEXT_PUBLIC_TOKEN_URL as string,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body : payload.toString(),
        }
    )

    const data = await response.json();
    return data.access_token;
}

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
    const accessToken = await getAccessToken();

    await fetch(
        process.env.NEXT_PUBLIC_SCRIPT_URL as string,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body : JSON.stringify({function: 'deleteData', parameters: [id]})
        }
    )

    alert('削除完了');
};

export const editEntryInSheet = async (id: number, updatedEntry: Entry) => {
    const accessToken = await getAccessToken();

    await fetch(
        process.env.NEXT_PUBLIC_SCRIPT_URL as string,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body : JSON.stringify({function: 'editData', parameters: [id, updatedEntry]})
        }
    )

    alert('更新完了');
};

export const getCategory  = async (): Promise<Category[]> => {
    const accessToken = await getAccessToken();

    const response = await fetch(
        process.env.NEXT_PUBLIC_SCRIPT_URL as string,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body : JSON.stringify({function: 'getCategory'})
        }
    )

    const data = await response.json();
    const lists = JSON.parse(data.response.result) as Category[]
    const convertLists = lists.map((list: Category) => {
        return {
            ...list,
            id : Number(list.id),
            type : Number(list.type),
            sort: Number(list.sort),
        };
    });

    localStorage.setItem('categories', JSON.stringify(convertLists));

    return convertLists;
};

async function getCategoriesFromLocalStorage(): Promise<Category[]> {
    const categoriesJSON = localStorage.getItem('categories');
    if (categoriesJSON) {
        return JSON.parse(categoriesJSON);
    } else {
        return await getCategory();
    }
}
