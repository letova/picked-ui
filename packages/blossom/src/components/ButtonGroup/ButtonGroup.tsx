import { ForwardedRef, forwardRef } from 'react';
import { ButtonGroup as BaseButtonGroup } from '@picked-ui/base';

import { Button, ButtonProps } from '../Button';

import { ButtonGroupProps } from './ButtonGroup.types';

type ButtonGroupComponent = ((p: ButtonGroupProps & { ref?: React.Ref<HTMLDivElement> }) => React.ReactElement) & {
  Button: React.FC<ButtonProps>;
};

const ButtonGroup = forwardRef((props: ButtonGroupProps, ref: ForwardedRef<HTMLDivElement>) => {
  return <BaseButtonGroup {...props} ref={ref} />;
}) as unknown as ButtonGroupComponent;

export { ButtonGroup };

ButtonGroup.Button = (props) => {
  const { custom, ...restProps } = props;

  const { defaultProps, overridesProps, ...userCustom } = custom as {
    defaultProps: ButtonProps;
    overridesProps: ButtonProps;
    [x: string]: unknown;
  };

  const mergedProps = {
    ...defaultProps,
    ...restProps,
    ...overridesProps,
    custom: userCustom,
  };

  return <Button {...mergedProps} />;
};
