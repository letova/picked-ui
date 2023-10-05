import { ForwardedRef, forwardRef } from 'react';
import { cx } from '@emotion/css';

import { TreeContext, NodeType, TreeViewProps } from './TreeView.types';

import { convertCSToClassName } from '../../utils';

const TreeItem = (props: NodeType & { context: TreeContext }) => {
  const { id, label, children, context } = props;
  const { cs, getStateById } = context;
  const { selected, expanded } = getStateById(id);

  return (
    <li
      className={cx('TreeItem', convertCSToClassName(cs?.treeItem))}
      role="treeitem"
      aria-selected={selected}
      aria-expanded={expanded}
    >
      <div className={cx('TreeItem-content', convertCSToClassName(cs?.content))}>
        <button className={cx('TreeItem-expandButton', convertCSToClassName(cs?.expandButton))}>
          {expanded ? '-' : '+'}
        </button>
        <span className="TreeItem-label">{label}</span>
      </div>
      {children ? <Group className="TreeItem-group" data={children} context={context} /> : null}
    </li>
  );
};

const Group = ({ className, data, context }: { className: string; data: NodeType[]; context: TreeContext }) => {
  const { level, cs } = context;

  return (
    <ul
      className={cx('Group', convertCSToClassName(cs?.group, { level }), className)}
      role={level === 0 ? 'tree' : 'group'}
    >
      {data.map((node) => {
        return <TreeItem key={node.id} {...node} context={{ ...context, level: level + 1 }} />;
      })}
    </ul>
  );
};

const TreeView = forwardRef(({ className, data, cs }: TreeViewProps, ref: ForwardedRef<HTMLDivElement>) => {
  const context: TreeContext = {
    level: 1,
    cs,
    getStateById: () => ({ selected: false, expanded: false, indeterminate: false }),
  };

  return (
    <div ref={ref} className={cx('TreeView', convertCSToClassName(cs?.container), className)}>
      {!data?.length ? (
        <div className={cx('TreeView-noDataView', convertCSToClassName(cs?.noDataView))}>No data</div>
      ) : (
        <Group className="TreeView-group" data={data} context={context} />
      )}
    </div>
  );
});

export { TreeView };
