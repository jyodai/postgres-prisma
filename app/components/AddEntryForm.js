"use client";

import React, { useState, useEffect } from 'react';
import { dateUtils } from '@/utils/date';
import { Constants } from '@/constants';

const AddEntryForm = ({ initialEntry, categories, onSave }) => {
    const [categoryType, setCategoryType] = useState(initialEntry?.category.type || Constants.CATEGORY_TYPE_EXPENSE);

    const [entry, setEntry] = useState({
        date:  dateUtils.formatDateToDateTimeLocal(new Date()),
        category_id: initialEntry?.category_id || categories.length === 0 ? 0 : categories[0].id,
        amount: initialEntry?.amount || 0,
        store: initialEntry?.store || '',
        memo: initialEntry?.memo || '',
        claim_flag: initialEntry?.claim_flag || 0,
        claim_amount: initialEntry?.claim_amount || 0,
    });

    useEffect(() => {
        if (initialEntry) {
            setEntry({
                id: initialEntry.id,
                date: initialEntry.date,
                category_id: initialEntry.category_id,
                amount: initialEntry.amount,
                store: initialEntry.store,
                memo: initialEntry.memo,
                claim_flag: initialEntry.claim_flag,
                claim_amount: initialEntry.claim_amount,
            });
        }
    }, [initialEntry]);

    const handleClaimFlagChange = (e) => {
      const isClaimed = e.target.checked ? 1 : 0;
      setEntry({ ...entry, claim_flag: isClaimed, claim_amount: isClaimed ? entry.claim_amount : 0 });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave(entry);
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
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">日付</label>
                <input
                    type="datetime-local"
                    name="date"
                    value={entry.date instanceof Date ?
                      dateUtils.formatDateToDateTimeLocal(entry.date) :
                      dateUtils.formatDateToDateTimeLocal(new Date())
                    }
                    onChange={(e) => setEntry({ ...entry, date: new Date(e.target.value) })}
                    required
                    className={inputClass}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="categoryType" className="block text-sm font-medium text-gray-700">カテゴリータイプ</label>
                <select
                    name="categoryType"
                    value={categoryType}
                    onChange={(e) => setCategoryType(Number(e.target.value))}
                    className={inputClass}
                    required
                >
                    <option value={Constants.CATEGORY_TYPE_EXPENSE}>支出</option>
                    <option value={Constants.CATEGORY_TYPE_INCOME}>収入</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">カテゴリ</label>
                <select
                    name="category"
                    value={entry.category_id}
                    onChange={(e) => setEntry({ ...entry, category_id: Number(e.target.value) })}
                    className={inputClass}
                    required
                >
                    {categories.filter(cat => cat.type === categoryType).map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">金額</label>
                <input
                    type="number"
                    name="amount"
                    value={entry.amount === 0 ? "" : entry.amount}
                    onChange={(e) => setEntry({ ...entry, amount: Number(e.target.value) })}
                    required
                    className={inputClass}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="store" className="block text-sm font-medium text-gray-700">店</label>
                <input
                    type="text"
                    name="store"
                    value={entry.store}
                    onChange={(e) => setEntry({ ...entry, store: e.target.value })}
                    className={inputClass}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="memo" className="block text-sm font-medium text-gray-700">メモ</label>
                <input
                    type="text"
                    name="memo"
                    value={entry.memo}
                    onChange={(e) => setEntry({ ...entry, memo: e.target.value })}
                    className={inputClass}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="claimFlag" className="block text-sm font-medium text-gray-700">請求する</label>
                <input
                    type="checkbox"
                    name="claimFlag"
                    id="claimFlag"
                    checked={entry.claim_flag === 1}
                    onChange={handleClaimFlagChange}
                    className="mt-1"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="claimAmount" className="block text-sm font-medium text-gray-700">請求金額</label>
                <input
                    type="number"
                    name="claimAmount"
                    value={entry.claim_amount === 0 ? "" : entry.claim_amount}
                    onChange={(e) => setEntry({ ...entry, claim_amount: Number(e.target.value) })}
                    disabled={entry.claim_flag !== 1}
                    className={inputClass}
                />
            </div>

            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {entry.id ? '更新' : '追加'}
            </button>
        </form>
    );
};

export default AddEntryForm;
