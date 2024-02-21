import dayjs from 'dayjs';
import { useRef } from 'react';

import {
  DateTokenTypes,
  getDaysInMonth,
  setDate,
  setHour,
  setMillisecond,
  setMinute,
  setMonth,
  setSecond,
  setYear,
} from '../../date-utils';

import { DateFieldSection } from '../DateField.types';

interface DateInputParams {
  value?: Date;
  selectedSection: DateFieldSection;
  setNextSection: VoidFunction;
  onChange?: (date: Date | undefined) => void;
}

const DATE_SETTERS_MAP = {
  year: setYear,
  month: setMonth,
  day: setDate,
  hour: setHour,
  minute: setMinute,
  second: setSecond,
  fractionalSecond: setMillisecond,
};

/**
 * Section min max
 * */
export const getSectionLimits = (section: DateFieldSection, date: Date) => {
  const { type, token } = section;

  switch (type) {
    case 'year': {
      const isFourDigit = token === 'YYYY';

      return {
        minValue: isFourDigit ? 1 : 0,
        maxValue: isFourDigit ? 9999 : 99,
      };
    }
    case 'month': {
      return {
        minValue: 0,
        maxValue: 11,
      };
    }
    case 'weekday': {
      return {
        minValue: 0,
        maxValue: 6,
      };
    }
    case 'day': {
      return {
        minValue: 1,
        maxValue: getDaysInMonth(date),
      };
    }
    case 'hour': {
      if (token === 'h' || token === 'hh') {
        const isPM = date.getHours() >= 12;

        return {
          minValue: isPM ? 12 : 0,
          maxValue: isPM ? 23 : 11,
        };
      }

      return {
        minValue: 0,
        maxValue: 23,
      };
    }
    case 'minute':
    case 'second': {
      return {
        minValue: 0,
        maxValue: 59,
      };
    }
    case 'fractionalSecond': {
      return {
        minValue: 0,
        maxValue: 999,
      };
    }
  }
  return {};
};

/**
 * Section options
 */

export const getSectionOptions = (section: DateFieldSection) => {
  const { type, token } = section;

  switch (type) {
    case 'month': {
      let date = dayjs().startOf('year');
      const options: string[] = [];

      for (let i = 0; i < 12; i++) {
        options.push(date.format(token).toLocaleUpperCase());
        date = date.add(1, 'months');
      }

      return options;
    }
    case 'dayPeriod': {
      const amDayPeriod = dayjs().hour(0);
      const pmDayPeriod = amDayPeriod.hour(12);

      const options = [amDayPeriod.format(token).toLocaleUpperCase(), pmDayPeriod.format(token).toLocaleUpperCase()];

      return options;
    }
    case 'weekday': {
      let date = dayjs().day(0);
      const options: string[] = [];

      for (let i = 0; i < 7; i++) {
        options.push(date.format(token).toLocaleUpperCase());
        date = date.add(1, 'day');
      }

      return options;
    }
  }

  return [];
};

export const useDateInput = ({ value, selectedSection, setNextSection, onChange }: DateInputParams) => {
  const enteredKeys = useRef('');

  const handleChange = (type: DateTokenTypes, sectionValue?: number) => {
    if (!value || sectionValue === undefined) {
      return;
    }

    let nextDate: Date = new Date(value);

    switch (type) {
      case 'year':
      case 'month':
      case 'day':
      case 'hour':
      case 'minute':
      case 'second':
      case 'fractionalSecond': {
        nextDate = DATE_SETTERS_MAP[type](nextDate, sectionValue);
        break;
      }

      case 'dayPeriod': {
        const hours = nextDate.getHours();
        nextDate = setHour(nextDate, hours > 11 ? hours - 12 : hours + 12);
        break;
      }
    }

    onChange?.(nextDate);
  };

  const handleBeforeInput: React.FormEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();

    // @ts-expect-error fix this
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const key: string | null | undefined = e.data;

    if (key === undefined || key === null) {
      return;
    }

    if (!selectedSection) {
      return;
    }

    let nextValue = enteredKeys.current + key;

    const onInputNumber = (numberValue: number) => {
      const { type } = selectedSection;
      const { minValue, maxValue } = getSectionLimits(selectedSection, value || new Date());

      if (type === 'literal') {
        return;
      }

      let sectionValue = type === 'month' ? numberValue - 1 : numberValue;
      const allowsZero = minValue === 0;

      if (type === 'hour' && (minValue === 12 || maxValue === 11)) {
        if (numberValue > 12) {
          sectionValue = Number(key);
        }

        if (minValue === 12 && sectionValue > 1) {
          sectionValue += 12;
        }
      } else if (sectionValue > (maxValue ?? 0)) {
        sectionValue = Number(key) - (type === 'month' ? 1 : 0);

        nextValue = key;

        if (sectionValue > (maxValue ?? 0)) {
          enteredKeys.current = '';
          return;
        }
      }

      const shouldSetValue = sectionValue > 0 || (sectionValue === 0 && allowsZero);

      if (shouldSetValue) {
        handleChange(type, sectionValue);
      }

      if (Number(numberValue + '0') > (maxValue ?? 0) || nextValue.length >= String(maxValue).length) {
        enteredKeys.current = '';

        if (shouldSetValue) {
          setNextSection();
        }
      } else {
        enteredKeys.current = nextValue;
      }
    };

    const onInputString = (stringValue: string) => {
      const { type } = selectedSection;

      if (type === 'literal') {
        return;
      }

      const options = getSectionOptions(selectedSection);

      let sectionValue = stringValue.toLocaleUpperCase();
      let foundOptions = options.filter((v) => v.startsWith(sectionValue));

      if (foundOptions.length === 0) {
        if (stringValue !== key) {
          sectionValue = key.toLocaleUpperCase();
          foundOptions = options.filter((v) => v.startsWith(sectionValue));
        }
        if (foundOptions.length === 0) {
          enteredKeys.current = '';
          return;
        }
      }

      const foundValue = foundOptions[0];
      const index = options.indexOf(foundValue);

      if (type === 'dayPeriod') {
        handleChange(type, index === 1 ? 12 : 0);
      } else {
        handleChange(type, index);
      }

      if (foundOptions.length > 1) {
        enteredKeys.current = nextValue;
      } else {
        enteredKeys.current = '';
        setNextSection();
      }
    };

    switch (selectedSection.type) {
      case 'day':
      case 'hour':
      case 'minute':
      case 'second':
      case 'year': {
        if (!Number.isInteger(Number(nextValue))) {
          return;
        }

        const numberValue = Number(nextValue);

        onInputNumber(numberValue);
        break;
      }
      case 'dayPeriod': {
        onInputString(nextValue);
        break;
      }
      case 'weekday':
      case 'month': {
        if (Number.isInteger(Number(nextValue))) {
          const numberValue = Number(nextValue);

          onInputNumber(numberValue);
        } else {
          onInputString(nextValue);
        }

        break;
      }
    }
  };

  return {
    onBeforeInput: handleBeforeInput,
  };
};
