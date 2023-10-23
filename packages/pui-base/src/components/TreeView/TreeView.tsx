import { ForwardedRef, forwardRef } from 'react';
import { cx } from '@emotion/css';

import { convertCSToClassName } from '../../utils';

import { TreeContext, NodeType, TreeViewProps } from './TreeView.types';
import { TreeInformation, useTreeInformation } from './useTreeInformation';

const TreeItem = (props: NodeType & { context: TreeContext<TreeInformation> }) => {
  const { context, ...node } = props;
  const { id, label, children } = node;
  const { treeInformationRef, cs, onNodeExpandChange, onNodeSelectChange } = context;

  const { expanded = false, selected = false, disabled = false } = treeInformationRef.current!.getStateById(id);

  const state = { expanded, selected, disabled, isCurrentLeaf: !children };

  return (
    <li
      className={cx('TreeItem', { 'TreeItem--selected': selected }, convertCSToClassName(cs?.treeItem))}
      role="treeitem"
      aria-expanded={expanded}
      aria-selected={selected}
    >
      <div
        className={cx('TreeItem-content', convertCSToClassName(cs?.content, state))}
        onClick={(event) => {
          if (disabled) {
            return;
          }

          onNodeSelectChange?.(
            {
              node,
              isSelected: !selected,
              // todo: remove empty array?
              selectedIds: treeInformationRef.current!.calculateSelectedIds(id) || [],
            },
            event,
          );
        }}
      >
        {children ? (
          <button
            className={cx('TreeItem-expandButton', convertCSToClassName(cs?.expandButton))}
            onClick={(event) => {
              const currentExpandedIds = treeInformationRef.current!.expandedIds;

              onNodeExpandChange?.(
                {
                  node: props,
                  isExpanded: !expanded,
                  expandedIds: !expanded
                    ? currentExpandedIds.concat(id)
                    : currentExpandedIds.filter((eId) => eId !== id),
                },
                event,
              );
              event.stopPropagation();
            }}
          >
            {expanded ? '-' : '+'}
          </button>
        ) : null}
        <span className={cx('TreeItem-label', convertCSToClassName(cs?.label, state))}>{label}</span>
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
    selected,
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
