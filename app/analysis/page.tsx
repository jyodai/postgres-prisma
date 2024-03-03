import Analysis from '@/components/Analysis';
import { getEntriesInRange } from '@/api/entry'
import {dateUtils } from '@/utils/date'

export default async function Home() {
    const now = Date.now();
    const weekStartAndEndDates = dateUtils.getWeekStartAndEndDates(now);
    const entries = await getEntriesInRange(weekStartAndEndDates.startDate, weekStartAndEndDates.endDate);

    return (
      <Analysis entries={entries} />
    );
}

