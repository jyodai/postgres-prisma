"use client";

import React, { useState, useEffect } from 'react';
import { Constants } from '@/constants';

const AddCategory = ({ initialCategory, onSave }) => {
    const [category, setCategory] = useState({
        name: initialCategory?.name || '',
        type: initialCategory?.type || Constants.CATEGORY_TYPE_EXPENSE,
        color: initialCategory?.color || '',
        memo: initialCategory?.memo || '',
        sort: initialCategory?.sort || 0,
    });

    useEffect(() => {
        if (initialCategory) {
            setCategory({
                id: initialCategory.id,
                name: initialCategory.name,
                type: initialCategory.type,
                color: initialCategory.color,
                memo: initialCategory.memo,
                sort: initialCategory.sort,
            });
        }
    }, [initialCategory]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave(category);
    };

    const inputClass = `
        mt-1 block w-full 
        border-gray-300 rounded-md shadow-sm 
        focus:ring-indigo-500 focus:border-indigo-500 
        sm:text-sm
    `;

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow-lg rounded-lg bg-white">

            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">カテゴリー名</label>
                <input
                    type="text"
                    name="name"
                    value={category.name}
                    onChange={(e) => setCategory({ ...category, name: e.target.value })}
                    className={inputClass}
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">カテゴリータイプ</label>
                <select
                    name="type"
                    value={category.type}
                    onChange={(e) => setCategory({ ...category, type: Number(e.target.value) })}
                    className={inputClass}
                    required
                >
                    <option value={Constants.CATEGORY_TYPE_EXPENSE}>支出</option>
                    <option value={Constants.CATEGORY_TYPE_INCOME}>収入</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="color" className="block text-sm font-medium text-gray-700">色</label>
                <input
                    type="text"
                    name="color"
                    value={category.color}
                    onChange={(e) => setCategory({ ...category, color: e.target.value })}
                    className={inputClass}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="memo" className="block text-sm font-medium text-gray-700">メモ</label>
                <input
                    type="text"
                    name="memo"
                    value={category.memo}
                    onChange={(e) => setCategory({ ...category, memo: e.target.value })}
                    className={inputClass}
                />
            </div>

            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {category.id ? '更新' : '追加'}
            </button>
        </form>
    );
};

export default AddCategory;
