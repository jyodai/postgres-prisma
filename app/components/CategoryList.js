import React from 'react';
import { dateUtils } from '@/utils/date';

const CategoryList = ({ categories }) => {
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
                </li>
            ))}
        </ul>
    );
};

export default CategoryList;

