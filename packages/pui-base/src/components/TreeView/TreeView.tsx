import { ForwardedRef, forwardRef } from 'react';
import { cx } from '@emotion/css';

import { convertCSToClassName } from '../../utils';

import { TreeContext, NodeType, TreeViewProps } from './TreeView.types';
import { prepareMaps } from './utils';

const TreeItem = (props: NodeType & { context: TreeContext }) => {
  const { id, label, children, context } = props;
  const { cs, getStateById, onNodeExpandChange } = context;
  const { selected = false, expanded = false } = getStateById(id);

  return (
    <li
      className={cx('TreeItem', convertCSToClassName(cs?.treeItem))}
      role="treeitem"
      aria-selected={selected}
      aria-expanded={expanded}
    >
      <div className={cx('TreeItem-content', convertCSToClassName(cs?.content))}>
        {children ? (
          <button
            className={cx('TreeItem-expandButton', convertCSToClassName(cs?.expandButton))}
            onClick={(event) => onNodeExpandChange?.(props, !expanded, event)}
          >
            {expanded ? '-' : '+'}
          </button>
        ) : null}
        <span className="TreeItem-label">{label}</span>
      </div>
      {children && expanded ? <Group className="TreeItem-group" data={children} context={context} /> : null}
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

const TreeView = forwardRef((props: TreeViewProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { className, data, cs, onNodeExpandChange } = props;
  const { stateMap } = prepareMaps(props); // TODO: create hook

  console.log('stateMap', stateMap);

  const context: TreeContext = {
    level: 1,
    cs,
    getStateById: (id) => stateMap[id],
    onNodeExpandChange,
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
