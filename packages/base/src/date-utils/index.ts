import dayjs from 'dayjs';

import 'dayjs/locale/ru';

/**
 * @todo set locale dynamically
 */
dayjs.locale('ru');

export const format = (value: string | Date | undefined, token: string): string => {
  return dayjs(value).format(token);
};

/**
 * GET
 */

export const getDaysInMonth = (value: string | Date | undefined): number => {
  return dayjs(value).daysInMonth();
};

/**
 * SET
 */

export const setHour = (value: string | Date | undefined, hour: number): Date => {
  return dayjs(value).hour(hour).toDate();
};

export const setMinute = (value: string | Date | undefined, minute: number): Date => {
  return dayjs(value).minute(minute).toDate();
};

export const setSecond = (value: string | Date | undefined, second: number): Date => {
  return dayjs(value).second(second).toDate();
};

export const setMilisecond = (value: string | Date | undefined, millisecond: number): Date => {
  return dayjs(value).millisecond(millisecond).toDate();
};
