'use client'
import React from 'react';
import { useState } from 'react';
import { dateUtils } from '@/utils/date';
import { Category } from '@/types/types';
import { getCategory } from '@/services/sheetService';

interface Props {
  categories: Category[];
}

const CategoryList = (props: Props) => {
    const [categories, setCategories] = useState<Category[]>(props.categories);

    const fetchCategories = async () => {
        const data = await getCategory();
        setCategories(data);
    };

    const onDelete = async (id: number) => {
      await fetch(
          `/api/category/${id}`,
          {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
          }
      )

      alert('削除完了');
      fetchCategories();
    };

    return (
        <ul className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
            {categories.map((category, index) => (
                <li key={index} className="flex justify-between items-center p-4 border-b border-gray-200 last:border-0">
                    <div className="flex-grow">
                        <div className="text-gray-500 italic">{category.name}</div>
                        <div className="text-gray-500 italic">{category.type}</div>
                        <div className="text-gray-500 italic">{category.color}</div>
                        <div className="text-gray-500 italic">{category.memo}</div>
                        <div className="text-gray-500 italic">{category.sort}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => onDelete(category.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">削除</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default CategoryList;

