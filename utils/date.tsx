const formatDateToDateTimeLocal = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const formatDate = (date: Date, delimiter: string = '/'): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = ('0' + (d.getMonth() + 1)).slice(-2); // 月は0から始まるため+1する
  const day = ('0' + d.getDate()).slice(-2);
  return `${year}${delimiter}${month}${delimiter}${day}`;
}

const getDayOfWeek = (date: Date): string => {
  const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
}

const getWeekStartAndEndDates = (date: Date = new Date()): { startDate: Date, endDate: Date } => {
  const currentDate = new Date(date);

  // ISO 8601に従い、月曜日を週の最初の日とするための調整
  const dayOfWeek = currentDate.getDay() || 7; // 日曜日は0を返すため、7に置き換えて月曜日を1とする

  const weekStartDate = new Date(currentDate);
  weekStartDate.setDate(currentDate.getDate() - dayOfWeek + 1);

  const weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekStartDate.getDate() + 6);

  return {
    startDate: weekStartDate,
    endDate: weekEndDate
  };
};

export const dateUtils = {
    formatDateToDateTimeLocal,
    formatDate,
    getDayOfWeek,
    getWeekStartAndEndDates,
};

