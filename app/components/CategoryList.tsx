'use client'
import React from 'react';
import { useState } from 'react';
import { dateUtils } from '@/utils/date';
import { Category } from '@/types/types';
import { getCategory } from '@/services/sheetService';
import AddCategory from '@/app/components/AddCategory';

interface Props {
  categories: Category[];
}

const CategoryList = (props: Props) => {
    const [categories, setCategories] = useState<Category[]>(props.categories);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

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

    const onEdit = (entry: Category) => {
        setEditingCategory(entry);
    };

    const handleSave = async (category: Category) => {
      await fetch(
          `/api/category/${category.id}`,
          {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
              },
              body : JSON.stringify(category)
          }
      )

      alert('更新完了');
      setEditingCategory(null);
      fetchCategories();
    };

    return (
        <div className="container mx-auto p-4">
            {editingCategory ? (
                <>
                    <AddCategory initialCategory={editingCategory} onSave={handleSave} />
                    <button onClick={() => setEditingCategory(null)} className="mt-4 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        キャンセル
                    </button>
                </>
            ) : (
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
                                <button onClick={() => onEdit(category)} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">編集</button>
                              <button onClick={() => onDelete(category.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">削除</button>
                          </div>
                      </li>
                  ))}
              </ul>
            )}
        </div>
    );
};

export default CategoryList;

