"use client";

import AddCategory from '@/app/components/AddCategory';
import {Category } from '@/types/types';

export default function Home() {
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
    };

    return (
        <div className="container mx-auto p-4">
          <AddCategory  initialCategory={null} onSave={handleSave} />
        </div>
    );
}
