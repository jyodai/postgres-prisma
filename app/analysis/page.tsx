import Analysis from '@/components/Analysis';
import { getEntriesInRange } from '@/api/entry'
import {dateUtils } from '@/utils/date'

interface Context {
  params: {};
  searchParams: {
    startDate?: string;
    endDate?: string;
  };
}

export default async function Home(context: Context) {
    let queryStartDate, queryEndDate;
    if (Object.keys(context).indexOf('searchParams') !== -1) {
      queryStartDate = context.searchParams.startDate;
      queryEndDate = context.searchParams.endDate;
    }

    let startDate, endDate;

    if (queryStartDate && queryEndDate) {
        startDate = new Date(queryStartDate);
        endDate = new Date(queryEndDate);
    } else {
        startDate = dateUtils.getWeekStartDate();
        endDate = dateUtils.getWeekEndDate();
    }

    const entries = await getEntriesInRange(startDate, endDate);

    return (
      <Analysis entries={entries} startDate={startDate} endDate={endDate} />
    );
}

