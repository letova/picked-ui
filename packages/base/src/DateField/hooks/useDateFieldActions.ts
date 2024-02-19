import {
  addDay,
  addMonth,
  addYear,
  setDate,
  setHour,
  setMillisecond,
  setMinute,
  setMonth,
  setSecond,
  setYear,
  subtractDay,
  subtractMonth,
  subtractYear,
} from '../../date-utils';

import { DateFieldSectionTypes } from '../DateField.types';

interface DateFieldAction {
  type?: DateFieldSectionTypes;
  payload?: number;
}

interface DateFieldActionsOptions {
  min?: Date;
  max?: Date;
}

interface DateFieldActionsParams {
  value?: Date;
  options?: DateFieldActionsOptions;
  onChange?: (date: Date | undefined) => void;
}

export const useDateFieldActions = ({ value, onChange }: DateFieldActionsParams) => {
  const increment = (action: DateFieldAction) => {
    if (!value) {
      return;
    }

    let nextDate: Date = new Date(value);

    if (action.type === 'year') {
      nextDate = addYear(nextDate);
    }

    if (action.type === 'month') {
      nextDate = addMonth(nextDate, { isRolling: true });
    }

    if (action.type === 'day' || action.type === 'weekday') {
      nextDate = addDay(nextDate, { isRolling: true });
    }

    if (action.type === 'hour') {
      const hours = nextDate.getHours();
      nextDate = setHour(nextDate, hours + 1 > 23 ? 0 : hours + 1);
    }

    if (action.type === 'dayPeriod') {
      const hours = nextDate.getHours();
      nextDate = setHour(nextDate, hours > 11 ? hours - 12 : hours + 12);
    }

    if (action.type === 'minute') {
      const minutes = nextDate.getMinutes();
      nextDate = setMinute(nextDate, minutes + 1 > 59 ? 0 : minutes + 1);
    }

    if (action.type === 'second') {
      const seconds = nextDate.getSeconds();
      nextDate = setSecond(nextDate, seconds + 1 > 59 ? 0 : seconds + 1);
    }

    if (action.type === 'fractionalSecond') {
      const miliseconds = nextDate.getMilliseconds();
      nextDate = setMillisecond(nextDate, miliseconds + 1 > 999 ? 0 : miliseconds + 1);
    }

    onChange?.(nextDate);
  };

  const decrement = (action: DateFieldAction) => {
    if (!value) {
      return;
    }

    let nextDate: Date = new Date(value);

    if (action.type === 'year') {
      nextDate = subtractYear(nextDate);
    }

    if (action.type === 'month') {
      nextDate = subtractMonth(nextDate, { isRolling: true });
    }

    if (action.type === 'day' || action.type === 'weekday') {
      nextDate = subtractDay(nextDate, { isRolling: true });
    }

    if (action.type === 'hour') {
      const hours = nextDate.getHours();
      nextDate = setHour(nextDate, hours - 1 < 0 ? 23 : hours - 1);
    }

    if (action.type === 'dayPeriod') {
      const hours = nextDate.getHours();
      nextDate = setHour(nextDate, hours > 11 ? hours - 12 : hours + 12);
    }

    if (action.type === 'minute') {
      const minutes = nextDate.getMinutes();
      nextDate = setMinute(nextDate, minutes - 1 < 0 ? 59 : minutes - 1);
    }

    if (action.type === 'second') {
      const seconds = nextDate.getSeconds();
      nextDate = setSecond(nextDate, seconds - 1 < 0 ? 59 : seconds - 1);
    }

    if (action.type === 'fractionalSecond') {
      const miliseconds = nextDate.getMilliseconds();
      nextDate = setMillisecond(nextDate, miliseconds - 1 < 0 ? 999 : miliseconds - 1);
    }

    onChange?.(nextDate);
  };

  const incrementToMax = (action: DateFieldAction) => {
    increment(action);
  };

  const decrementToMin = (action: DateFieldAction) => {
    decrement(action);
  };

  const change = (action: DateFieldAction) => {
    if (!value || action.payload === undefined) {
      return;
    }

    let nextDate: Date = new Date(value);

    if (action.type === 'year') {
      nextDate = setYear(nextDate, action.payload);
    }

    if (action.type === 'month') {
      nextDate = setMonth(nextDate, action.payload);
    }

    if (action.type === 'day') {
      nextDate = setDate(nextDate, action.payload);
    }

    if (action.type === 'dayPeriod') {
      const hours = nextDate.getHours();
      nextDate = setHour(nextDate, hours > 11 ? hours - 12 : hours + 12);
    }

    if (action.type === 'hour') {
      nextDate = setHour(nextDate, action.payload);
    }

    if (action.type === 'minute') {
      nextDate = setMinute(nextDate, action.payload);
    }

    if (action.type === 'second') {
      nextDate = setSecond(nextDate, action.payload);
    }

    if (action.type === 'fractionalSecond') {
      nextDate = setMillisecond(nextDate, action.payload);
    }

    onChange?.(nextDate);
  };

  return {
    increment,
    decrement,
    incrementToMax,
    decrementToMin,
    change,
  };
};
