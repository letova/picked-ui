import { cx } from '@emotion/css';
import { ForwardedRef, forwardRef } from 'react';
import { TreeView as BaseTreeView, TreeViewApi } from '@picked-ui/base';

import { TreeViewProps } from './TreeView.types';
import { getCS, getClassName } from './TreeView.styles';

export type { TreeViewApi };

const TreeView = forwardRef((props: TreeViewProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { className, ...restProps } = props;
  const cs = getCS(props);

  return <BaseTreeView ref={ref} {...restProps} className={cx(className, getClassName(props))} cs={cs} />;
});

export { TreeView };
