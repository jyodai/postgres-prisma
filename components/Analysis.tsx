'use client'

import React from 'react';
import { Entry, Category } from '@/types/types';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Constants } from '@/constants';
import { dateUtils } from '@/utils/date';
import { start } from 'repl';
import { useRouter } from 'next/navigation'

interface Props {
  entries: Entry[];
  startDate: Date;
  endDate: Date;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Analysis = (props: Props) => {
  const expenseEntries = props.entries.filter((entry) => entry.category.type === Constants.CATEGORY_TYPE_EXPENSE )
  const incomeEntries = props.entries.filter((entry) => entry.category.type === Constants.CATEGORY_TYPE_INCOME )

  const sumsByExpenseCategory = expenseEntries.reduce((acc, entry) => {
    const categoryName = entry.category ? entry.category.name : 'Unknown';
    if (!acc[categoryName]) {
      acc[categoryName] = 0;
    }
    acc[categoryName] += entry.amount;
    return acc;
  }, {} as { [key: string]: number });

  const totalExpenseAmount = expenseEntries.reduce((sum, entry) => sum + entry.amount, 0);

  const sumsByIncomeCategory = incomeEntries.reduce((acc, entry) => {
    const categoryName = entry.category ? entry.category.name : 'Unknown';
    if (!acc[categoryName]) {
      acc[categoryName] = 0;
    }
    acc[categoryName] += entry.amount;
    return acc;
  }, {} as { [key: string]: number });

  const totalIncomeAmount = incomeEntries.reduce((sum, entry) => sum + entry.amount, 0);

  const onBeforeWeek = () => {
    const weekStartAndEndDates = dateUtils.getWeekStartAndEndDates(
      props.startDate.setDate(props.startDate.getDate() - 7)
    );
    const startDate = weekStartAndEndDates.startDate;
    const endDate = weekStartAndEndDates.endDate;
    const params = {
      startDate : dateUtils.formatDate(startDate, '-'),
      endDate : dateUtils.formatDate(endDate, '-')
    }
    const urlSearchParam =  new URLSearchParams(params).toString();
    window.location.href = `/analysis/?${urlSearchParam}`;
  }

  const onNextWeek = () => {
    const weekStartAndEndDates = dateUtils.getWeekStartAndEndDates(
      props.startDate.setDate(props.startDate.getDate() + 7)
    );
    const startDate = weekStartAndEndDates.startDate;
    const endDate = weekStartAndEndDates.endDate;
    const params = {
      startDate : dateUtils.formatDate(startDate, '-'),
      endDate : dateUtils.formatDate(endDate, '-')
    }
    const urlSearchParam =  new URLSearchParams(params).toString();
    window.location.href = `/analysis/?${urlSearchParam}`;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="p-4">
        <div className="flex justify-center mb-4 items-center">
          <NavigateBeforeIcon  onClick={() => onBeforeWeek()} />
          <Typography variant="subtitle1" component="strong" color="white">
            {dateUtils.formatDate(props.startDate)} 
            {' ~ '} 
            {dateUtils.formatDate(props.endDate)}
          </Typography>
          <NavigateNextIcon onClick={() => onNextWeek()}/>
        </div>

        <Container className="mb-4">
          <Paper elevation={3}>
            <List>
              <ListItem>
                <div className="flex items-center">支出 : <CurrencyYenIcon/>{totalExpenseAmount}</div>
              </ListItem>
              {Object.entries(sumsByExpenseCategory).map(([category, sum]) => (
                <ListItem key={category}>
                  <div className="flex items-center">{category} : <CurrencyYenIcon/>{sum}</div>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Container>

        <Container>
          <Paper elevation={3}>
            <List>
              <ListItem>
                <div className="flex items-center">収入 : <CurrencyYenIcon/>{totalIncomeAmount}</div>
              </ListItem>
              {Object.entries(sumsByIncomeCategory).map(([category, sum]) => (
                <ListItem key={category}>
                  <div className="flex items-center">{category} : <CurrencyYenIcon/>{sum}</div>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default Analysis;
