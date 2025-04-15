import { cx } from '@emotion/css';
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { ClassNameGenerator, convertCSToClassName, getElementFromSlot } from '../utils';

import { TreeContext, TreeViewNode, TreeViewProps, LoadingExpandButtonProps } from './TreeView.types';
import { TreeInformation, useTreeInformation, useTreeViewFocus } from './hooks';

const getCN = (element?: string, modificator?: string) =>
  ClassNameGenerator.generate({ block: 'TreeView', element, modificator });

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
  const {
    mode,
    selectionMode,
    treeInformationRef,
    slots = {},
    cs,
    focusApi,
    onExpandedIdsChange,
    onNodeExpansionChange,
    onSelectedIdsChange,
    onNodeSelectionChange,
    onLoadData,
  } = context;

  const {
    expanded = false,
    indeterminate = false,
    selected = false,
    disabled = false,
    hidden = false,
  } = treeInformationRef.current!.getStateById(id);

  const state = { expanded, indeterminate, selected, disabled, isCurrentLeaf: !children };

  const { prevInteractionId, nextInteractionId } = treeInformationRef.current!.getMetadataById(id);

  const handleExpandChange = (event: React.KeyboardEvent<HTMLLIElement> | React.MouseEvent<HTMLButtonElement>) => {
    const currentExpandedIds = treeInformationRef.current!.expandedIds;

    const expandedIds = !expanded ? currentExpandedIds.concat(id) : currentExpandedIds.filter((eId) => eId !== id);

    onExpandedIdsChange?.({ expandedIds });

    onNodeExpansionChange?.(event, {
      node: props,
      isExpanded: !expanded,
      expandedIds,
    });

    // event.stopPropagation(); // ???
  };

  const handleSelectChange = (event: React.KeyboardEvent<HTMLLIElement> | React.MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    let selectedIds: string | string[] | undefined = id;

    if (mode === 'multi-select') {
      selectedIds = treeInformationRef.current!.calculateSelectedIds(id);

      if (selectionMode === 'parent') {
        selectedIds = treeInformationRef.current!.filterSelectedParentIds(selectedIds);
      }

      if (selectionMode === 'child') {
        selectedIds = treeInformationRef.current!.filterSelectedChildIds(selectedIds);
      }
    }

    onSelectedIdsChange?.({ selectedIds });

    onNodeSelectionChange?.(event, {
      node,
      isSelected: !selected,
      selectedIds,
    });
  };

  const handleFocusedSelectChange = (e: React.MouseEvent<HTMLElement>) => {
    if (focusApi.getFocusedNodeId() !== id) {
      focusApi.focus(id);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    handleSelectChange(e as any);
  };

  const labelStartDecoratorElement = getElementFromSlot(slots?.labelStartDecorator, { state });
  const labelEndDecoratorElement = getElementFromSlot(slots?.labelEndDecorator, { state });

  const labelElement = getElementFromSlot(
    { component: 'span', ...slots?.label },
    {
      className: cx('TreeItem-label', convertCSToClassName(cs?.label, state)),
      ...(slots?.label?.component ? { state } : undefined),
      children: (
        <>
          {labelStartDecoratorElement}
          {label}
          {labelEndDecoratorElement}
        </>
      ),
    },
  );

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
      onKeyDown={(event) => {
        event.stopPropagation();

        switch (event.key) {
          case 'ArrowLeft': {
            if (expanded) {
              handleExpandChange(event);
            } else {
              prevInteractionId && focusApi.focus(prevInteractionId);
            }
            break;
          }

          case 'ArrowRight': {
            if (expanded) {
              nextInteractionId && focusApi.focus(nextInteractionId);
            } else {
              handleExpandChange(event);
            }
            break;
          }

          case 'ArrowUp': {
            prevInteractionId && focusApi.focus(prevInteractionId);
            break;
          }

          case 'ArrowDown': {
            nextInteractionId && focusApi.focus(nextInteractionId);
            break;
          }

          case 'Enter':
          case ' ': {
            handleSelectChange(event);
            break;
          }
        }
      }}
    >
      {hidden ? null : (
        <div
          className={cx('TreeItem-content', convertCSToClassName(cs?.content, state))}
          onClick={handleFocusedSelectChange}
        >
          {onLoadData ? (
            <LoadingExpandButton
              className={cx('TreeItem-expandButton', convertCSToClassName(cs?.expandButton))}
              node={node}
              expanded={expanded}
              onClick={handleExpandChange}
              onLoadData={onLoadData}
            />
          ) : children?.length ? (
            <button
              className={cx('TreeItem-expandButton', convertCSToClassName(cs?.expandButton))}
              onClick={handleExpandChange}
            >
              {expanded ? '-' : '+'}
            </button>
          ) : null}
          {labelElement}
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
    selectionMode = 'all',
    data,
    expandedIds,
    selectedIds,
    disabledIds,
    search,
    slots = {},
    cs,
    autoFocus = false,
    onInitState,
    onExpandedIdsChange,
    onNodeExpansionChange,
    onSelectedIdsChange,
    onNodeSelectionChange,
    onLoadData,
    onUpdateState,
  } = props;
  const treeInformationRef = useTreeInformation(mode, data, { expandedIds, selectedIds, disabledIds, search });

  useEffect(() => {
    onInitState?.({
      expandedIds: treeInformationRef.current.expandedIds,
      selectedIds: treeInformationRef.current.selectedIds,
      disabledIds: treeInformationRef.current.disabledIds,
    });
  }, []);

  useEffect(() => {
    onUpdateState?.({
      expandedIds: treeInformationRef.current.expandedIds,
      selectedIds: treeInformationRef.current.selectedIds,
      disabledIds: treeInformationRef.current.disabledIds,
    });
  }, [data, expandedIds, selectedIds, disabledIds]);

  const focusApi = useTreeViewFocus({ initialNodeId: data?.[0]?.id, autoFocus });

  useImperativeHandle(
    apiRef,
    () => {
      return {
        getNodeById: (id: string) => {
          return treeInformationRef.current.getNodeById(id);
        },
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
    selectionMode,
    level: 1,
    slots,
    cs,
    treeInformationRef,

    focusApi,

    onExpandedIdsChange,
    onNodeExpansionChange,
    onSelectedIdsChange,
    onNodeSelectionChange,
    onLoadData,
  };

  return (
    <div ref={ref} className={cx(getCN(), convertCSToClassName(cs?.container), className)}>
      {!data?.length ? (
        <div className={cx(getCN('noDataView'), convertCSToClassName(cs?.noDataView))}>No data</div>
      ) : (
        <Group className={getCN('group')} data={data} context={context} />
      )}
    </div>
  );
});

export { TreeView };
