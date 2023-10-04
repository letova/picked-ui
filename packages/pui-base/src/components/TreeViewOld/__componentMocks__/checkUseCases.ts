export const forUncheckedTree = {
  TRIGER_NODE_1: {
    id: 'node-1',
    label: 'Node 1',
    checked: true,
  },
  RESULT_DATA_1: [
    {
      id: 'node-1',
      label: 'Node 1',
      checked: true,
      children: [
        {
          id: 'node-1-1',
          label: 'Node 1-1',
          checked: true,
          children: [
            {
              id: 'node-1-1-1',
              label: 'Node 1-1-1',
              checked: true,
              children: [
                { id: 'node-1-1-1-1', label: 'Node 1-1-1-1', checked: true },
                { id: 'node-1-1-1-2', label: 'Node 1-1-1-2', checked: true },
                { id: 'node-1-1-1-3', label: 'Node 1-1-1-3', checked: true },
              ],
            },
            { id: 'node-1-1-2', label: 'Node 1-1-2', checked: true },
          ],
        },
        {
          id: 'node-1-2',
          label: 'Node 1-2',
          checked: true,
          children: [
            { id: 'node-1-2-1', label: 'Node 1-2-1', checked: true },
            { id: 'node-1-2-2', label: 'Node 1-2-2', checked: true },
          ],
        },
      ],
    },
    {
      id: 'node-2',
      label: 'Node 2',
      checked: false,
      children: [
        {
          id: 'node-2-1',
          label: 'Node 2-1',
          checked: false,
          children: [
            { id: 'node-2-1-1', label: 'Node 2-1-1', checked: false },
            { id: 'node-2-1-2', label: 'Node 2-1-2', checked: false },
          ],
        },
      ],
    },
  ],
};

export const forPartiallyCheckedTree = {
  TRIGER_NODE_1_1: {
    id: 'node-1-1-1-2',
    label: 'Node 1-1-1-2',
    checked: true,
  },
  RESULT_DATA_1_1: [
    {
      id: 'node-1',
      label: 'Node 1',
      checked: false,
      children: [
        {
          id: 'node-1-1',
          label: 'Node 1-1',
          checked: false,
          children: [
            {
              id: 'node-1-1-1',
              label: 'Node 1-1-1',
              checked: false,
              children: [
                { id: 'node-1-1-1-1', label: 'Node 1-1-1-1', checked: true },
                { id: 'node-1-1-1-2', label: 'Node 1-1-1-2', checked: true },
                { id: 'node-1-1-1-3', label: 'Node 1-1-1-3', checked: false },
              ],
            },
            { id: 'node-1-1-2', label: 'Node 1-1-2', checked: false },
          ],
        },
        {
          id: 'node-1-2',
          label: 'Node 1-2',
          checked: false,
          children: [
            { id: 'node-1-2-1', label: 'Node 1-2-1', checked: false },
            { id: 'node-1-2-2', label: 'Node 1-2-2', checked: false },
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
  ],
  TRIGER_NODE_1_2: {
    id: 'node-1-1-2',
    label: 'Node 1-1-2',
    checked: true,
  },
  RESULT_DATA_1_2: [
    {
      id: 'node-1',
      label: 'Node 1',
      checked: false,
      children: [
        {
          id: 'node-1-1',
          label: 'Node 1-1',
          checked: false,
          children: [
            {
              id: 'node-1-1-1',
              label: 'Node 1-1-1',
              checked: false,
              children: [
                { id: 'node-1-1-1-1', label: 'Node 1-1-1-1', checked: true },
                { id: 'node-1-1-1-2', label: 'Node 1-1-1-2', checked: true },
                { id: 'node-1-1-1-3', label: 'Node 1-1-1-3', checked: false },
              ],
            },
            { id: 'node-1-1-2', label: 'Node 1-1-2', checked: true },
          ],
        },
        {
          id: 'node-1-2',
          label: 'Node 1-2',
          checked: false,
          children: [
            { id: 'node-1-2-1', label: 'Node 1-2-1', checked: false },
            { id: 'node-1-2-2', label: 'Node 1-2-2', checked: false },
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
  ],
  TRIGER_NODE_1_3: {
    id: 'node-1-1-1-3',
    label: 'Node 1-1-1-3',
    checked: true,
  },
  RESULT_DATA_1_3: [
    {
      id: 'node-1',
      label: 'Node 1',
      checked: false,
      children: [
        {
          id: 'node-1-1',
          label: 'Node 1-1',
          checked: true,
          children: [
            {
              id: 'node-1-1-1',
              label: 'Node 1-1-1',
              checked: true,
              children: [
                { id: 'node-1-1-1-1', label: 'Node 1-1-1-1', checked: true },
                { id: 'node-1-1-1-2', label: 'Node 1-1-1-2', checked: true },
                { id: 'node-1-1-1-3', label: 'Node 1-1-1-3', checked: true },
              ],
            },
            { id: 'node-1-1-2', label: 'Node 1-1-2', checked: true },
          ],
        },
        {
          id: 'node-1-2',
          label: 'Node 1-2',
          checked: false,
          children: [
            { id: 'node-1-2-1', label: 'Node 1-2-1', checked: false },
            { id: 'node-1-2-2', label: 'Node 1-2-2', checked: false },
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
  ],
};
