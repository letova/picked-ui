import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import { cx } from '@emotion/css';

import { convertCSToClassName, getElementFromSlot } from '../utils';

import { TreeContext, TreeViewNode, TreeViewProps, LoadingExpandButtonProps } from './TreeView.types';
import { TreeInformation, useTreeInformation } from './useTreeInformation';

const LoadingExpandButton = ({ className, node, expanded, onClick, onLoadData }: LoadingExpandButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const hasChildren = Boolean(node.children?.length);
  const hasUnloadedNodeChildren = !hasChildren && !node.isLeaf && Boolean(onLoadData);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!isLoading && hasUnloadedNodeChildren) {
      setIsLoading(true);

      onLoadData(node)
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      onClick?.(event);
    }
  };

  if (!hasChildren && !hasUnloadedNodeChildren) {
    return null;
  }

  return isLoading ? (
    '...'
  ) : (
    <button className={className} onClick={handleClick}>
      {expanded ? '-' : '+'}
    </button>
  );
};

const TreeItem = (props: TreeViewNode & { context: TreeContext<TreeInformation> }) => {
  const { context, ...node } = props;
  const { id, label, children } = node;
  const { mode, treeInformationRef, slots = {}, cs, onNodeExpandChange, onNodeSelectChange, onLoadData } = context;
  const { labelStartDecorator, labelEndDecorator } = slots;

  const {
    expanded = false,
    indeterminate = false,
    selected = false,
    disabled = false,
    hidden = false,
  } = treeInformationRef.current!.getStateById(id);

  const state = { expanded, indeterminate, selected, disabled, isCurrentLeaf: !children };

  const labelStartDecoratorElement = getElementFromSlot(labelStartDecorator, state);
  const labelEndDecoratorElement = getElementFromSlot(labelEndDecorator, state);

  const handleExpandButtonClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const currentExpandedIds = treeInformationRef.current!.expandedIds;

    onNodeExpandChange?.(
      {
        node: props,
        isExpanded: !expanded,
        expandedIds: !expanded ? currentExpandedIds.concat(id) : currentExpandedIds.filter((eId) => eId !== id),
      },
      event,
    );
    event.stopPropagation();
  };

  return (
    <li
      className={cx(
        'TreeItem',
        {
          'TreeItem--expanded': expanded,
          'TreeItem--indeterminate': indeterminate,
          'TreeItem--selected': selected,
          'TreeItem--disabled': disabled,
        },
        convertCSToClassName(cs?.treeItem, state),
      )}
      role="treeitem"
      aria-expanded={expanded}
      aria-selected={selected}
    >
      {hidden ? null : (
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
                selectedIds: mode === 'single-select' ? id : treeInformationRef.current!.calculateSelectedIds(id),
              },
              event,
            );
          }}
        >
          {onLoadData ? (
            <LoadingExpandButton
              className={cx('TreeItem-expandButton', convertCSToClassName(cs?.expandButton))}
              node={node}
              expanded={expanded}
              onClick={handleExpandButtonClick}
              onLoadData={onLoadData}
            />
          ) : children ? (
            <button
              className={cx('TreeItem-expandButton', convertCSToClassName(cs?.expandButton))}
              onClick={handleExpandButtonClick}
            >
              {expanded ? '-' : '+'}
            </button>
          ) : null}
          <span className={cx('TreeItem-label', convertCSToClassName(cs?.label, state))}>
            {labelStartDecoratorElement}
            {label}
            {labelEndDecoratorElement}
          </span>
        </div>
      )}
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
  data: TreeViewNode[];
  context: TreeContext<TreeInformation>;
}) => {
  const { level, cs } = context;

  return (
    <ul
      className={cx('TreeGroup', convertCSToClassName(cs?.group, { level }), className)}
      role={level === 0 ? 'tree' : 'group'}
    >
      {data.map((node) => {
        return <TreeItem key={node.id} {...node} context={{ ...context, level: level + 1 }} />;
      })}
    </ul>
  );
};

const TreeView = forwardRef((props: TreeViewProps, ref: ForwardedRef<HTMLDivElement>) => {
  const {
    className,
    apiRef,
    mode = 'single-select',
    data,
    expanded,
    selected,
    disabled,
    search,
    slots = {},
    cs,
    onNodeExpandChange,
    onNodeSelectChange,
    onLoadData,
  } = props;
  const treeInformationRef = useTreeInformation(mode, data, { expanded, selected, disabled, search });

  useImperativeHandle(
    apiRef,
    () => {
      return {
        getStateById: (id: string) => {
          return treeInformationRef.current.getStateById(id);
        },
        getMetadataById: (id: string) => {
          return treeInformationRef.current.getMetadataById(id);
        },
      };
    },
    [],
  );

  const context: TreeContext<TreeInformation> = {
    mode,
    level: 1,
    slots,
    cs,
    treeInformationRef,
    onNodeExpandChange,
    onNodeSelectChange,
    onLoadData,
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
