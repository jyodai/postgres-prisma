"use client";

import React, { useState, useEffect } from 'react';
import { dateUtils } from '@/utils/date';
import { Constants } from '@/constants';
import Calculator from '@/components/Calculator';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Checkbox, FormControlLabel } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CalculateIcon from '@mui/icons-material/Calculate';
import ClearIcon from '@mui/icons-material/Clear';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const AddEntryForm = ({ initialEntry, categories, onSave }) => {
    const [categoryType, setCategoryType] = useState(initialEntry?.category.type || Constants.CATEGORY_TYPE_EXPENSE);

    const getDefaultCategoryId = () => {
      if(categories.length === 0) {
        return 0;
      }
      const defaultCategory = categories.find(category => category.type === Constants.CATEGORY_TYPE_EXPENSE);
      return defaultCategory ? defaultCategory.id : 0;
    }

    const [entry, setEntry] = useState({
        date:  dateUtils.formatDateToDateTimeLocal(new Date()),
        category_id: initialEntry?.category_id || getDefaultCategoryId(),
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
                date: dateUtils.formatDateToDateTimeLocal(initialEntry.date),
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

    const [showCalculator, setShowCalculator] = useState(false);
    const [calculatorTarget, setCalculatorTarget] = useState(null);

    const handleCalculatorOpen = (target) => {
        setShowCalculator(true);
        setCalculatorTarget(target);
    };

    const applyCalculatorResult = (result) => {
        if (calculatorTarget === 'amount') {
            setEntry({ ...entry, amount: result });
        } else if (calculatorTarget === 'claim_amount') {
            setEntry({ ...entry, claim_amount: result });
        }
        setShowCalculator(false);
    };

    return (
      <ThemeProvider theme={darkTheme}>
        {showCalculator ? (
          <>
            <div key='editing' className="flex flex-col">
              <div className="flex justify-end">
                <ClearIcon className="cursor-pointer" onClick={(e) => setShowCalculator(false)} />
              </div>
              <Calculator
                onCalculate={applyCalculatorResult}
                initialValue={
                  calculatorTarget === "amount"
                    ? entry.amount === 0 ? "" : entry.amount.toString()
                    : entry.claim_amount === 0 ? "" : entry.claim_amount.toString()
                }
              />
            </div>
          </>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 'lg'}}>
            <TextField
              id="date"
              label="日付"
              type="datetime-local"
              value={ entry.date }
              onChange={(e) => setEntry({ ...entry, date: new Date(e.target.value) })}
              required
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>カテゴリータイプ</InputLabel>
              <Select
                label="カテゴリータイプ"
                value={categoryType}
                onChange={(e) => setCategoryType(Number(e.target.value))}
                required
              >
                <MenuItem value={Constants.CATEGORY_TYPE_EXPENSE}>支出</MenuItem>
                <MenuItem value={Constants.CATEGORY_TYPE_INCOME}>収入</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>カテゴリ</InputLabel>
              <Select
                label="カテゴリ"
                value={entry.category_id}
                onChange={(e) => setEntry({ ...entry, category_id: Number(e.target.value) })}
                required
              >
                {categories.filter(cat => cat.type === categoryType).map((category) => (
                  <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="金額"
              type="number"
              value={entry.amount === 0 ? "" : entry.amount}
              onClick={() => handleCalculatorOpen('amount')}
              onChange={(e) => setEntry({ ...entry, amount: Number(e.target.value) })}
              required
              fullWidth
              margin="normal"
            />

            <TextField
              label="店"
              type="text"
              value={entry.store}
              onChange={(e) => setEntry({ ...entry, store: e.target.value })}
              fullWidth
              margin="normal"
            />

            <TextField
              label="メモ"
              type="text"
              value={entry.memo}
              onChange={(e) => setEntry({ ...entry, memo: e.target.value })}
              fullWidth
              margin="normal"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={entry.claim_flag === 1}
                  onChange={handleClaimFlagChange}
                />
              }
              label="請求する"
              sx={{ mt: 2 }}
            />

            {entry.claim_flag === 1 && (
              <div className="flex items-center justify-between">
                <TextField
                  label="請求金額"
                  type="number"
                  value={entry.claim_amount === 0 ? "" : entry.claim_amount}
                  onClick={(e) => handleCalculatorOpen('claim_amount')}
                  onChange={(e) => setEntry({ ...entry, claim_amount: Number(e.target.value) })}
                  disabled={entry.claim_flag !== 1}
                  fullWidth
                  margin="normal"
                />
              </div>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              {entry.id ? '更新' : '追加'}
            </Button>
          </Box>
        )}
      </ThemeProvider>
    );
};

export default AddEntryForm;
