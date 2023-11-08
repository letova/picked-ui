import { cx } from '@emotion/css';
import { ForwardedRef, forwardRef } from 'react';

import { TreeView as BaseTreeView, Api } from '../../../../pui-base/src/components/TreeView';

import { TreeViewProps } from './TreeView.types';
import { getCS, getClassName } from './TreeView.styles';

export type { Api as TreeViewApi };

const TreeView = forwardRef((props: TreeViewProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { className, ...restProps } = props;
  const cs = getCS(props);

  return <BaseTreeView ref={ref} {...restProps} className={cx(className, getClassName(props))} cs={cs} />;
});

export { TreeView };
