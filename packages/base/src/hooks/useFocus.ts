import { useState } from 'react';

interface UseFocusOptions {
  detectFocus?: boolean;
  detectFocusVisible?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onFocusVisible?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export const isFocusVisible = (element: Element): boolean => {
  try {
    return element.matches(':focus-visible');
  } catch (error) {
    console.warn('The `:focus-visible` pseudo class is not supported in this browser');
  }

  return false;
};

export const useFocus = (options?: UseFocusOptions) => {
  const { detectFocus, detectFocusVisible, onFocus, onFocusVisible, onBlur } = {
    detectFocus: true,
    detectFocusVisible: true,
    ...options,
  };

  const [hasFocus, setHasFocus] = useState<boolean>(false);
  const [hasFocusVisible, setHasFocusVisible] = useState<boolean>(false);

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
    if (detectFocus) {
      setHasFocus(true);
    }

    if (detectFocusVisible && isFocusVisible(event.target)) {
      setHasFocusVisible(true);
      onFocusVisible?.(event);
    }

    onFocus?.(event);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    if (detectFocus) {
      setHasFocus(false);
    }

    if (detectFocusVisible) {
      setHasFocusVisible(false);
    }

    onBlur?.(event);
  };

  return {
    hasFocus: detectFocus ? hasFocus : undefined,
    hasFocusVisible: detectFocus ? hasFocusVisible : undefined,
    onFocus: handleFocus,
    onBlur: handleBlur,
  };
};
