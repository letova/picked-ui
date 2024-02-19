import dayjs from 'dayjs';

import 'dayjs/locale/ru';

/**
 * @todo set locale dynamically
 */
dayjs.locale('ru');

export const formatDate = (value: string | Date | undefined, token: string): string => {
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

/**
 * MANIPULATE
 **/

export const addYear = (userValue: Date | undefined, options?: { yearsNumber?: number }): Date => {
  const { yearsNumber = 1 } = options || {};
  const value = userValue || new Date();

  return dayjs(value).add(yearsNumber, 'year').toDate();
};

export const addMonth = (
  userValue: Date | undefined,
  options?: { monthsNumber?: number; isRolling?: boolean },
): Date => {
  const { monthsNumber = 1, isRolling } = options || {};
  const value = userValue || new Date();

  const month = value.getMonth();
  const nextMonth = month + 1 > 11 ? 0 : month + 1;

  if (isRolling && nextMonth === 0) {
    return dayjs(value).month(nextMonth).toDate();
  }

  return dayjs(value).add(monthsNumber, 'month').toDate();
};

export const addDay = (userValue: Date | undefined, options?: { daysNumber?: number; isRolling?: boolean }): Date => {
  const { daysNumber = 1, isRolling } = options || {};
  const value = userValue || new Date();

  if (!isRolling) {
    return dayjs(value).add(daysNumber, 'day').toDate();
  }

  const incrementedDate = value.getDate() + 1;
  const daysInMonth = getDaysInMonth(value);

  return dayjs(value)
    .date(incrementedDate > daysInMonth ? 1 : incrementedDate)
    .toDate();
};

export const subtractYear = (userValue: Date | undefined, options?: { yearsNumber?: number }): Date => {
  const { yearsNumber = 1 } = options || {};
  const value = userValue || new Date();

  return dayjs(value).subtract(yearsNumber, 'year').toDate();
};

export const subtractMonth = (
  userValue: Date | undefined,
  options?: { monthsNumber?: number; isRolling?: boolean },
): Date => {
  const { monthsNumber = 1, isRolling } = options || {};
  const value = userValue || new Date();

  const month = value.getMonth();
  const nextMonth = month - 1 < 0 ? 11 : month - 1;

  if (isRolling && nextMonth === 11) {
    return dayjs(value).month(nextMonth).toDate();
  }

  return dayjs(value).subtract(monthsNumber, 'month').toDate();
};

export const subtractDay = (
  userValue: Date | undefined,
  options?: { daysNumber?: number; isRolling?: boolean },
): Date => {
  const { daysNumber = 1, isRolling } = options || {};
  const value = userValue || new Date();

  if (!isRolling) {
    return dayjs(value).subtract(daysNumber, 'day').toDate();
  }

  const decrementedDate = value.getDate() - 1;
  const daysInMonth = getDaysInMonth(value);

  return dayjs(value)
    .date(decrementedDate < 1 ? daysInMonth : decrementedDate)
    .toDate();
};
