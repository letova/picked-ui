import { DATA } from './data';

const EXPANDED_NODE = '1';

const EXPANDED_NODE_RESULT: [string, boolean][] = [
  ['1', true],
  ['1-1', false],
  ['1-2', false],
  ['1-3', false],
  ['1-3-1', false],
  ['1-3-2', false],
  ['1-3-3', false],
  ['1-3-2-1', false],
  ['1-3-2-2', false],
  ['2', false],
  ['2-1', false],
  ['2-1-1', false],
  ['2-1-1-1', false],
  ['2-1-1-2', false],
  ['3', false],
];

const EXPANDED_NODES = ['1', '1-3', '2'];

const EXPANDED_NODES_RESULT: [string, boolean][] = [
  ['1', true],
  ['1-1', false],
  ['1-2', false],
  ['1-3', true],
  ['1-3-1', false],
  ['1-3-2', false],
  ['1-3-3', false],
  ['1-3-2-1', false],
  ['1-3-2-2', false],
  ['2', true],
  ['2-1', false],
  ['2-1-1', false],
  ['2-1-1-1', false],
  ['2-1-1-2', false],
  ['3', false],
];

const EXPANDED_ALL_NODES = 'all';

const EXPANDED_ALL_NODES_RESULT: [string, boolean][] = [
  ['1', true],
  ['1-1', true],
  ['1-2', true],
  ['1-3', true],
  ['1-3-1', true],
  ['1-3-2', true],
  ['1-3-3', true],
  ['1-3-2-1', true],
  ['1-3-2-2', true],
  ['2', true],
  ['2-1', true],
  ['2-1-1', true],
  ['2-1-1-1', true],
  ['2-1-1-2', true],
  ['3', true],
];

const EXPANDED_LEVEL = 2;

const EXPANDED_LEVEL_RESULT: [string, boolean][] = [
  ['1', true],
  ['1-1', true],
  ['1-2', true],
  ['1-3', true],
  ['1-3-1', false],
  ['1-3-2', false],
  ['1-3-3', false],
  ['1-3-2-1', false],
  ['1-3-2-2', false],
  ['2', true],
  ['2-1', true],
  ['2-1-1', false],
  ['2-1-1-1', false],
  ['2-1-1-2', false],
  ['3', true],
];

export const expandedMocks = {
  DATA,
  EXPANDED_NODE,
  EXPANDED_NODE_RESULT,
  EXPANDED_NODES,
  EXPANDED_NODES_RESULT,
  EXPANDED_ALL_NODES,
  EXPANDED_ALL_NODES_RESULT,
  EXPANDED_LEVEL,
  EXPANDED_LEVEL_RESULT,
};
