import { ForwardedRef, forwardRef } from 'react';
import { ButtonGroup as BaseButtonGroup } from '@picked-ui/base';

import { Button, ButtonProps } from '../Button';

import { ButtonGroupProps } from './ButtonGroup.types';
import { getCS } from './Button.styles';

type ButtonGroupComponent = ((p: ButtonGroupProps & { ref?: React.Ref<HTMLDivElement> }) => React.ReactElement) & {
  Button: React.FC<ButtonProps>;
};

const ButtonGroup = forwardRef((props: ButtonGroupProps, ref: ForwardedRef<HTMLDivElement>) => {
  const cs = getCS(props);

  return <BaseButtonGroup {...props} ref={ref} cs={cs} />;
}) as unknown as ButtonGroupComponent;

export { ButtonGroup };

ButtonGroup.Button = (props) => {
  const { custom, ...restProps } = props;

  const { defaultProps, ...userCustom } = custom as {
    defaultProps: ButtonProps;
    [x: string]: unknown;
  };

  const mergedProps = {
    ...defaultProps,
    ...restProps,
    custom: userCustom,
  };

  return <Button {...mergedProps} />;
};
