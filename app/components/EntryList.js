import React from 'react';
import { dateUtils } from '@/utils/date';

const EntryList = ({ entries, onDelete, onEdit }) => {
    return (
        <ul className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
            {entries.map((entry, index) => (
                <li key={index} className="flex justify-between items-center p-4 border-b border-gray-200 last:border-0">
                    <div className="flex-grow">
                        <div className="text-sm text-gray-600">{dateUtils.formatDateToDateTimeLocal(entry.date)}</div>
                        <div className="text-lg font-medium">{entry.category.name}</div>
                        <div className="text-gray-800">{entry.amount} 円</div>
                        <div className="text-gray-500 italic">{entry.store}</div>
                        <div className="text-gray-500 italic">{entry.memo}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => onEdit(entry)} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">編集</button>
                        <button onClick={() => onDelete(entry.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">削除</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default EntryList;

