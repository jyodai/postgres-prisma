"use client";

import React, { useState, useEffect } from 'react';
import { Constants } from '@/constants';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Checkbox, FormControlLabel } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const AddCategory = ({ initialCategory, onSave }) => {
    const [category, setCategory] = useState({
        name: initialCategory?.name || '',
        type: initialCategory?.type || Constants.CATEGORY_TYPE_EXPENSE,
        color: initialCategory?.color || '#FFFFFF',
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
      <ThemeProvider theme={darkTheme}>
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 'lg'}}>
            <TextField
              label="カテゴリー名"
              type="text"
              value={category.name}
              onChange={(e) => setCategory({ ...category, name: e.target.value })}
              fullWidth
              margin="normal"
            />

          <FormControl fullWidth margin="normal">
            <InputLabel>カテゴリータイプ</InputLabel>
            <Select
              label="カテゴリータイプ"
              value={category.type}
              onChange={(e) => setCategory({ ...category, type: Number(e.target.value) })}
              required
            >
              <MenuItem value={Constants.CATEGORY_TYPE_EXPENSE}>支出</MenuItem>
              <MenuItem value={Constants.CATEGORY_TYPE_INCOME}>収入</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="色"
            type="color"
            value={category.color}
            onChange={(e) => setCategory({ ...category, color: e.target.value })}
            fullWidth
            margin="normal"
          />

          <TextField
            label="メモ"
            type="text"
            value={category.memo}
            onChange={(e) => setCategory({ ...category, memo: e.target.value })}
            fullWidth
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            {category.id ? '更新' : '追加'}
          </Button>

        </Box>
      </ThemeProvider>
    );
};

export default AddCategory;
