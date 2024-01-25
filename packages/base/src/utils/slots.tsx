import React from 'react';

interface SlotProps {
  component?: React.ElementType;
  props?: Record<string, unknown>;
}

export const getElementFromSlot = (slotProps?: SlotProps, ownerProps?: Record<string, unknown>) => {
  if (!slotProps) {
    return null;
  }

  const props = slotProps.props
    ? {
        ...ownerProps,
        ...slotProps.props,
      }
    : ownerProps;

  if (slotProps.component) {
    if (typeof slotProps.component === 'string') {
      return React.createElement(slotProps.component, props);
    }

    return <slotProps.component {...props} />;
  }

  return null;
};
