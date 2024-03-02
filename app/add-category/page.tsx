"use client";

import AddCategory from '@/app/components/AddCategory';
import {Category } from '@/types/types';
import { useState, useEffect } from 'react';

export default function Home() {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSave = async (category: Category) => {
      await fetch(
          '/api/category',
          {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body : JSON.stringify(category)
          }
      )
      alert('登録完了');
      setRefreshKey(oldKey => oldKey + 1);
    };

    return (
        <div className="container mx-auto p-4">
          <AddCategory key={refreshKey} initialCategory={null} onSave={handleSave} />
        </div>
    );
}
