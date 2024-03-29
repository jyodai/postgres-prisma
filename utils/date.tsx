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

const getWeekStartDate = (date: Date = new Date()): Date => {
  const currentDate = new Date(date.setHours(0, 0, 0, 0));
  // ISO 8601に従い、月曜日を週の最初の日とするための調整
  const dayOfWeek = currentDate.getDay() === 0 ? 7 : currentDate.getDay(); // 日曜日は0を返すため、7に置き換えて月曜日を1とする
  currentDate.setDate(currentDate.getDate() - dayOfWeek + 1);
  return currentDate;
};

const getWeekEndDate = (date: Date = new Date()): Date => {
  const startDate = getWeekStartDate(date);
  const weekEndDate = new Date(startDate);
  weekEndDate.setDate(startDate.getDate() + 6);
  return weekEndDate;
};

const getNextWeekStartDate = (date: Date = new Date()): Date => {
  return adjustDateByDays(getWeekStartDate(date), 7);
};

const getNextWeekEndDate = (date: Date = new Date()): Date => {
  return adjustDateByDays(getWeekEndDate(date), 7);
};

const getPrevWeekStartDate = (date: Date = new Date()): Date => {
  return adjustDateByDays(getWeekStartDate(date), -7);
};

const getPrevWeekEndDate = (date: Date = new Date()): Date => {
  return adjustDateByDays(getWeekEndDate(date), -7);
};

const adjustDateByDays = (date: Date, days: number): Date => {
  const adjustedDate = new Date(date);
  adjustedDate.setDate(adjustedDate.getDate() + days);
  return adjustedDate;
};

const getMonthStartDate = (date: Date = new Date()): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

const getMonthEndDate = (date: Date = new Date()): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

const getNextMonthStartDate = (date: Date = new Date()): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
};

const getNextMonthEndDate = (date: Date = new Date()): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 2, 0);
};

const getPrevMonthStartDate = (date: Date = new Date()): Date => {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
};

const getPrevMonthEndDate = (date: Date = new Date()): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 0);
};

export const dateUtils = {
    formatDateToDateTimeLocal,
    formatDate,
    getDayOfWeek,
    getWeekStartDate,
    getWeekEndDate,
    getNextWeekStartDate,
    getNextWeekEndDate,
    getPrevWeekStartDate,
    getPrevWeekEndDate,
    getMonthStartDate,
    getMonthEndDate,
    getNextMonthStartDate,
    getNextMonthEndDate,
    getPrevMonthStartDate,
    getPrevMonthEndDate,
};

