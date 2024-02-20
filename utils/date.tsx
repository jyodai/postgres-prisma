const formatDateToDateTimeLocal = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const formatDate = (date: Date): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = ('0' + (d.getMonth() + 1)).slice(-2); // 月は0から始まるため+1する
  const day = ('0' + d.getDate()).slice(-2);
  return `${year}/${month}/${day}`;
}

export const dateUtils = {
    formatDateToDateTimeLocal,
    formatDate,
};

