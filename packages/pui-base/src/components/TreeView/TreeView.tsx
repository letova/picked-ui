import { ForwardedRef, forwardRef } from 'react';
import { cx } from '@emotion/css';

import { convertCSToClassName } from '../../utils';

import { TreeContext, NodeType, TreeViewProps } from './TreeView.types';
import { TreeInformation, useTreeInformation } from './useTreeInformation';

const TreeItem = (props: NodeType & { context: TreeContext<TreeInformation> }) => {
  const { id, label, children, context } = props;
  const { treeInformationRef, cs, onNodeExpandChange, onNodeSelectChange } = context;

  const { selected = false, expanded = false } = treeInformationRef.current!.getStateById(id);

  return (
    <li
      className={cx('TreeItem', { 'TreeItem--selected': selected }, convertCSToClassName(cs?.treeItem))}
      role="treeitem"
      aria-expanded={expanded}
      aria-selected={selected}
    >
      <div
        className={cx('TreeItem-content', convertCSToClassName(cs?.content, { expanded, selected }))}
        onClick={(event) => {
          onNodeSelectChange?.({ node: props, isSelected: !selected }, event);
        }}
      >
        {children ? (
          <button
            className={cx('TreeItem-expandButton', convertCSToClassName(cs?.expandButton))}
            onClick={(event) => {
              const currentExpandedIds = treeInformationRef.current!.expandedIds;
              const nextExpandedIds = !expanded
                ? currentExpandedIds.concat(id)
                : currentExpandedIds.filter((eId) => eId !== id);

              onNodeExpandChange?.({ node: props, isExpanded: !expanded, expandedIds: nextExpandedIds }, event);
              event.stopPropagation();
            }}
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

const Group = ({
  className,
  data,
  context,
}: {
  className: string;
  data: NodeType[];
  context: TreeContext<TreeInformation>;
}) => {
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
  const { className, data, expanded, selected, disabled, cs, onNodeExpandChange, onNodeSelectChange } = props;

  const treeInformationRef = useTreeInformation(data, { expanded, selected, disabled });

  const context: TreeContext<TreeInformation> = {
    level: 1,
    cs,
    treeInformationRef,
    onNodeExpandChange,
    onNodeSelectChange,
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
