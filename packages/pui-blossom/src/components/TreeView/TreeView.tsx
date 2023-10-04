import { cx } from '@emotion/css';
import { ForwardedRef, forwardRef } from 'react';

import { TreeView as BaseTreeView } from '../../../../pui-base/src/components/TreeView';

import { TreeViewProps } from './TreeView.types';
import { getClassName } from './TreeView.styles';

const TreeView = forwardRef((props: TreeViewProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { className, ...restProps } = props;

  return <BaseTreeView ref={ref} className={cx(className, getClassName(props))} {...restProps} />;
});

export { TreeView };
