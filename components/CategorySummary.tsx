import React from 'react';
import { Entry } from '@/types/types';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';

interface CategorySummaryProps {
  title: string; // "収入" or "支出"
  entries: Entry[];
}

const CategorySummary: React.FC<CategorySummaryProps> = ({ title, entries }) => {
  const sumsByCategory = entries.reduce((acc, entry) => {
    const categoryName = entry.category ? entry.category.name : 'Unknown';
    if (!acc[categoryName]) {
      acc[categoryName] = 0;
    }
    acc[categoryName] += entry.amount;
    return acc;
  }, {} as { [key: string]: number });

  const totalAmount = entries.reduce((sum, entry) => sum + entry.amount, 0);

  return (
    <Paper elevation={3}>
      <List>
        <ListItem>
          <div className="flex items-center">{title} : <CurrencyYenIcon />{totalAmount}</div>
        </ListItem>
        {Object.entries(sumsByCategory).map(([category, sum]) => (
          <ListItem key={category}>
            <div className="flex items-center">{category} : <CurrencyYenIcon />{sum}</div>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default CategorySummary;

