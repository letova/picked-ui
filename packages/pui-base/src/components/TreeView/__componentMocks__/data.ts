export const UNCHECKED_DATA = [
  {
    id: 'node-1',
    label: 'Node 1',
    children: [
      {
        id: 'node-1-1',
        label: 'Node 1-1',
        children: [
          {
            id: 'node-1-1-1',
            label: 'Node 1-1-1',
            children: [
              { id: 'node-1-1-1-1', label: 'Node 1-1-1-1' },
              { id: 'node-1-1-1-2', label: 'Node 1-1-1-2' },
              { id: 'node-1-1-1-3', label: 'Node 1-1-1-3' },
            ],
          },
          { id: 'node-1-1-2', label: 'Node 1-1-2' },
        ],
      },
      {
        id: 'node-1-2',
        label: 'Node 1-2',
        children: [
          { id: 'node-1-2-1', label: 'Node 1-2-1' },
          { id: 'node-1-2-2', label: 'Node 1-2-2' },
        ],
      },
    ],
  },
  {
    id: 'node-2',
    label: 'Node 2',
    children: [
      {
        id: 'node-2-1',
        label: 'Node 2-1',
        children: [
          { id: 'node-2-1-1', label: 'Node 2-1-1' },
          { id: 'node-2-1-2', label: 'Node 2-1-2' },
        ],
      },
    ],
  },
];

export const PARTIALLY_CHECKED_DATA = [
  {
    id: 'node-1',
    label: 'Node 1',
    children: [
      {
        id: 'node-1-1',
        label: 'Node 1-1',
        children: [
          {
            id: 'node-1-1-1',
            label: 'Node 1-1-1',
            children: [
              { id: 'node-1-1-1-1', label: 'Node 1-1-1-1', checked: true },
              { id: 'node-1-1-1-2', label: 'Node 1-1-1-2' },
              { id: 'node-1-1-1-3', label: 'Node 1-1-1-3' },
            ],
          },
          { id: 'node-1-1-2', label: 'Node 1-1-2' },
        ],
      },
      {
        id: 'node-1-2',
        label: 'Node 1-2',
        children: [
          { id: 'node-1-2-1', label: 'Node 1-2-1' },
          { id: 'node-1-2-2', label: 'Node 1-2-2' },
        ],
      },
    ],
  },
  {
    id: 'node-2',
    label: 'Node 2',
    checked: true,
    children: [
      {
        id: 'node-2-1',
        label: 'Node 2-1',
        checked: true,
        children: [
          { id: 'node-2-1-1', label: 'Node 2-1-1', checked: true },
          { id: 'node-2-1-2', label: 'Node 2-1-2', checked: true },
        ],
      },
    ],
  },
];
