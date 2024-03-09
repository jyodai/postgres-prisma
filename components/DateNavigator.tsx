import React from 'react';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { dateUtils } from '@/utils/date';

interface DateNavigatorProps {
  startDate: Date;
  endDate: Date;
  onPrev: () => void;
  onNext: () => void;
}

const DateNavigator: React.FC<DateNavigatorProps> = (
  { startDate, endDate, onPrev, onNext }
) => {
  return (
    <div className="flex justify-center mb-4 items-center">
      <NavigateBeforeIcon onClick={onPrev} />
      <Typography variant="subtitle1" component="strong" color="white">
        {dateUtils.formatDate(startDate)} {' ~ '} {dateUtils.formatDate(endDate)}
      </Typography>
      <NavigateNextIcon onClick={onNext} />
    </div>
  );
};

export default DateNavigator;

