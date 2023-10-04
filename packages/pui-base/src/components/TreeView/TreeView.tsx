import { ForwardedRef, forwardRef } from 'react';
import { cx } from '@emotion/css';

import { TreeContext, NodeType, TreeViewProps } from './TreeView.types';

const TreeItem = (props: NodeType & { context: TreeContext }) => {
  const { id, label, children, context } = props;
  const { getStateById } = context;
  const { selected, expanded } = getStateById(id);

  return (
    <li className="TreeItem" role="treeitem" aria-selected={selected} aria-expanded={expanded}>
      <div className="TreeItem-content">
        <button className="TreeItem-expandButton">+</button>
        <span className="TreeItem-label">{label}</span>
      </div>
      {children ? <Group className="TreeItem-group" data={children} context={context} /> : null}
    </li>
  );
};

const Group = ({ className, data, context }: { className: string; data: NodeType[]; context: TreeContext }) => {
  const { level } = context;

  return (
    <ul className={cx('Group', className)} role={level === 0 ? 'tree' : 'group'}>
      {data.map((node) => {
        return <TreeItem key={node.id} {...node} context={{ ...context, level: level + 1 }} />;
      })}
    </ul>
  );
};

const TreeView = forwardRef(({ className, data }: TreeViewProps, ref: ForwardedRef<HTMLDivElement>) => {
  const context: TreeContext = {
    level: 0,
    getStateById: () => ({ selected: false, expanded: false, indeterminate: false }),
  };

  return (
    <div ref={ref} className={cx('TreeView', className)}>
      {!data?.length ? <div>No data</div> : <Group className="TreeView-group" data={data} context={context} />}
    </div>
  );
});

export { TreeView };
