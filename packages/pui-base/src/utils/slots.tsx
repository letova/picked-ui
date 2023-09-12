import React from 'react';

interface SlotProps {
  component?: React.ElementType;
  props?: Record<string, unknown>;
}

export const getElementFromSlot = (id: string, slotProps?: SlotProps, ownerProps?: Record<string, unknown>) => {
  // TODO sep23: create cache???
  console.info(id);
  if (!slotProps) {
    return null;
  }

  const props = {
    ...ownerProps,
    ...slotProps.props,
  };

  if (slotProps.component) {
    if (typeof slotProps.component === 'string') {
      return React.createElement(slotProps.component, props);
    }

    return <slotProps.component {...props} />;
  }

  return null;
};
