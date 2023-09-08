import React from 'react';

interface SlotProps {
  component?: React.FC<any>;
  as?: string;
  props?: Record<string, any>;
}

export const getElementFromSlot = (id: string, slotProps?: SlotProps, ownerProps?: Record<string, any>) => {
  // TODO: create cache???
  console.log(id);
  if (!slotProps) {
    return null;
  }

  const props = {
    ...ownerProps,
    ...slotProps.props,
  };

  if (slotProps.component) {
    return <slotProps.component {...props} />;
  }

  if (slotProps.as) {
    return React.createElement(slotProps.as, props);
  }

  return null;
};
