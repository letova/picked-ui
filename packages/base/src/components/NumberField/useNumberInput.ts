import { useState } from 'react';

import { isNil } from '../../utils';

export interface CompositeValue {
  value?: number;
  fractionDigits?: number;
  separator?: '.' | ',';
}

export type OnChange = (value?: number, fractionDigits?: number) => void;

export interface InputProps {
  value: string | undefined;
  onChange: (nextValue: string) => void;
}

const isNumeric = (value: any, options?: { allowComma: boolean }) => {
  if (typeof value === 'number') {
    return true;
  }

  if (typeof value === 'string') {
    return options?.allowComma ? /^-?\d*((\.|,)(\d+)?)?$/.test(value) : /^-?\d*(\.(\d+)?)?$/.test(value);
  }

  return false;
};

const countFractionDigits = (value: string) => {
  const dotIndex = value.indexOf('.');

  if (dotIndex === -1) {
    return 0;
  }

  return value.length - dotIndex - 1;
};

export const useNumberInput = (compositeValue: CompositeValue, onChange: OnChange) => {
  const [temporaryValue, setTemporaryValue] = useState<string>();

  const { value: userValue, fractionDigits, separator = '.' } = compositeValue;

  const handleOnChange = (nextValue: string) => {
    if (!nextValue) {
      onChange?.(undefined);

      if (temporaryValue) {
        setTemporaryValue(undefined);
      }

      return;
    }

    if (!isNumeric(nextValue, { allowComma: true })) {
      return;
    }

    const lastSymbol = nextValue.slice(-1);

    if (lastSymbol === separator || nextValue === '-') {
      setTemporaryValue(lastSymbol === '.' && separator === ',' ? nextValue.replace('.', ',') : nextValue);
    } else {
      const numericValue = nextValue.replace(',', '.');

      onChange?.(parseFloat(numericValue), countFractionDigits(numericValue));
      setTemporaryValue(undefined);
    }
  };

  let value: string | number | undefined = userValue;

  if (!isNil(value) && !isNil(fractionDigits)) {
    value = value.toFixed(fractionDigits);
  }

  if (typeof value === 'number') {
    value = String(value);
  }

  if (value && separator === ',') {
    value = value.replace('.', ',');
  }

  if (isNil(value)) {
    value = '';
  }

  return { value, onChange: handleOnChange };
};
