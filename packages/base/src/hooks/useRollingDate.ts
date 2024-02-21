import {
  DateTokenTypes,
  addDay,
  addMonth,
  addYear,
  setHour,
  setMillisecond,
  setMinute,
  setSecond,
  subtractDay,
  subtractMonth,
  subtractYear,
} from '../date-utils';

interface RollingDateAction {
  type: DateTokenTypes;
}

interface RollingDateActionParams {
  value?: Date;
  minValue?: Date;
  maxValue?: Date;
  onChange?: (date: Date | undefined) => void;
}

/**
 * @todo add incrementToMax | decrementToMin fn-s
 */
export const useRollingDate = ({ value, minValue, maxValue, onChange }: RollingDateActionParams) => {
  /**
   * @todo move the functions outside the hook
   */
  const increment = (action: RollingDateAction) => {
    if (!value) {
      return;
    }

    let nextDate: Date = value;

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

    if (!maxValue || nextDate.getTime() <= maxValue.getTime()) {
      onChange?.(nextDate);
    }
  };

  const decrement = (action: RollingDateAction) => {
    if (!value) {
      return;
    }

    let nextDate: Date = value;

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

    if (!minValue || nextDate.getTime() >= minValue.getTime()) {
      onChange?.(nextDate);
    }
  };

  return {
    increment,
    decrement,
  };
};
