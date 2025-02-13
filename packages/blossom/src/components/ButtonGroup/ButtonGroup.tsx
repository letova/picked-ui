import { ForwardedRef, forwardRef } from 'react';
import { ButtonGroup as BaseButtonGroup } from '@picked-ui/base';

import { Button, ButtonProps } from '../Button';

import { ButtonGroupProps } from './ButtonGroup.types';

type ExtraProps = {
  default?: ButtonProps;
  overrides: ButtonProps;
};

type ButtonGroupComponent = ((p: ButtonGroupProps & { ref?: React.Ref<HTMLDivElement> }) => React.ReactElement) & {
  Button: React.FC<ButtonProps & { extraProps?: ExtraProps }>;
};

const ButtonGroup = forwardRef((props: ButtonGroupProps, ref: ForwardedRef<HTMLDivElement>) => {
  return <BaseButtonGroup {...props} ref={ref} />;
}) as unknown as ButtonGroupComponent;

export { ButtonGroup };

ButtonGroup.Button = (props) => {
  const { extraProps, ...restProps } = props;

  const mergedProps = {
    ...extraProps?.default,
    ...restProps,
    ...extraProps?.overrides,
  };

  return <Button {...mergedProps} />;
};
