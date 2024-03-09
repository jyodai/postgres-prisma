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
import CategorySummary from '@/components/CategorySummary';
import DateNavigator from '@/components/DateNavigator';

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

  const onPrev = () => {
    const startDate = dateUtils.getPrevMonthStartDate(props.startDate);
    const endDate = dateUtils.getPrevMonthEndDate(props.endDate);

    const params = {
      startDate : dateUtils.formatDate(startDate, '-'),
      endDate : dateUtils.formatDate(endDate, '-')
    }
    const urlSearchParam =  new URLSearchParams(params).toString();

    window.location.href = `/analysis/month?${urlSearchParam}`;
  }

  const onNext = () => {
    const startDate = dateUtils.getNextMonthStartDate(props.startDate);
    const endDate = dateUtils.getNextMonthEndDate(props.endDate);

    const params = {
      startDate : dateUtils.formatDate(startDate, '-'),
      endDate : dateUtils.formatDate(endDate, '-')
    }
    const urlSearchParam =  new URLSearchParams(params).toString();

    window.location.href = `/analysis/month?${urlSearchParam}`;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="p-4">
        <DateNavigator
          startDate={props.startDate}
          endDate={props.endDate}
          onPrev={onPrev}
          onNext={onNext}
        />

      <Container className="mb-4">
        <CategorySummary title="支出" entries={expenseEntries} />
      </Container>

      <Container>
        <CategorySummary title="収入" entries={incomeEntries} />
      </Container>

      </div>
    </ThemeProvider>
  );
}

export default Analysis;
