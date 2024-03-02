'use client'
import React from 'react';
import { useState } from 'react';
import { dateUtils } from '@/utils/date';
import { Category } from '@/types/types';
import { getCategory } from '@/services/sheetService';
import { Constants } from '@/constants';
import AddCategory from '@/app/components/AddCategory';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ClearIcon from '@mui/icons-material/Clear';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CategoryIcon from '@mui/icons-material/Category';
import { ThemeProvider, createTheme } from '@mui/material/styles';

interface Props {
  categories: Category[];
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const CategoryList = (props: Props) => {
    const [categories, setCategories] = useState<Category[]>(props.categories);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const fetchCategories = async () => {
        const data = await getCategory();
        setCategories(data);
    };

    const onDelete = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>, id: number) => {
        e.stopPropagation();
        if (!confirm('削除しますか?')) {
          return;
        }
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
      <ThemeProvider theme={darkTheme}>
        <div className="container mx-auto p-4">
            {editingCategory ? (
                <>
                    <AddCategory initialCategory={editingCategory} onSave={handleSave} />
                    <button onClick={() => setEditingCategory(null)} className="mt-4 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        キャンセル
                    </button>
                </>
            ) : (
              <div>
                {categories.map((category, index) => (
                  <div key={category.id}>
                    <Card className="mb-4">
                      <CardContent sx={{ cursor: 'pointer' }} onClick={() => onEdit(category)}>
                        <div>
                            <div className="flex items-center justify-between text-lg">
                              <div className="flex items-center">
                                  {category.type === Constants.CATEGORY_TYPE_EXPENSE ? (
                                    <div>支出</div>
                                  ) : (
                                    <div>収入</div>
                                  )
                                  }
                              </div>
                              <ClearIcon className="cursor-pointer" onClick={(e) => onDelete(e, category.id)}/>
                            </div>
                            <div className="flex items-center">
                              <CategoryIcon sx={{ color: category.color }}/>{category.name}
                            </div>
                            <div className="flex items-center">
                              <AssignmentIcon/>{category.memo}
                            </div>
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

export default CategoryList;

