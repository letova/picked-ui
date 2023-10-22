import { DATA } from './data';

const SELECTED_LEAF = ['1-3-2-1'];

const SELECTED_LEAF_RESULT: [string, boolean][] = [
  ['1', false],
  ['1-1', false],
  ['1-2', false],
  ['1-3', false],
  ['1-3-1', false],
  ['1-3-2', false],
  ['1-3-3', false],
  ['1-3-2-1', true],
  ['1-3-2-2', false],
  ['2', false],
  ['2-1', false],
  ['2-1-1', false],
  ['2-1-1-1', false],
  ['2-1-1-2', false],
  ['3', false],
];

const INDETERMINATE_LEAF_RESULT: [string, boolean][] = [
  ['1', true],
  ['1-1', false],
  ['1-2', false],
  ['1-3', true],
  ['1-3-1', false],
  ['1-3-2', true],
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

const SELECTED_LEAFS = ['1-3-2-1', '1-3-2-2'];

const SELECTED_LEAFS_RESULT: [string, boolean][] = [
  ['1', false],
  ['1-1', false],
  ['1-2', false],
  ['1-3', false],
  ['1-3-1', false],
  ['1-3-2', true],
  ['1-3-3', false],
  ['1-3-2-1', true],
  ['1-3-2-2', true],
  ['2', false],
  ['2-1', false],
  ['2-1-1', false],
  ['2-1-1-1', false],
  ['2-1-1-2', false],
  ['3', false],
];

const INDETERMINATE_LEAFS_RESULT: [string, boolean][] = [
  ['1', true],
  ['1-1', false],
  ['1-2', false],
  ['1-3', true],
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

const SELECTED_ALL_LEAFS = ['2-1-1-1', '2-1-1-2'];

const SELECTED_ALL_LEAFS_RESULT: [string, boolean][] = [
  ['1', false],
  ['1-1', false],
  ['1-2', false],
  ['1-3', false],
  ['1-3-1', false],
  ['1-3-2', false],
  ['1-3-3', false],
  ['1-3-2-1', false],
  ['1-3-2-2', false],
  ['2', true],
  ['2-1', true],
  ['2-1-1', true],
  ['2-1-1-1', true],
  ['2-1-1-2', true],
  ['3', false],
];

const INDETERMINATE_ALL_LEAFS_RESULT: [string, boolean][] = [
  ['1', false],
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

const SELECTED_ROOT_PARENT = ['1'];

const SELECTED_ROOT_PARENT_RESULT: [string, boolean][] = [
  ['1', true],
  ['1-1', true],
  ['1-2', true],
  ['1-3', true],
  ['1-3-1', true],
  ['1-3-2', true],
  ['1-3-3', true],
  ['1-3-2-1', true],
  ['1-3-2-2', true],
  ['2', false],
  ['2-1', false],
  ['2-1-1', false],
  ['2-1-1-1', false],
  ['2-1-1-2', false],
  ['3', false],
];

const INDETERMINATE_ROOT_PARENT_RESULT: [string, boolean][] = [
  ['1', false],
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

const SELECTED_PARENT = ['1-3'];

const SELECTED_PARENT_RESULT: [string, boolean][] = [
  ['1', false],
  ['1-1', false],
  ['1-2', false],
  ['1-3', true],
  ['1-3-1', true],
  ['1-3-2', true],
  ['1-3-3', true],
  ['1-3-2-1', true],
  ['1-3-2-2', true],
  ['2', false],
  ['2-1', false],
  ['2-1-1', false],
  ['2-1-1-1', false],
  ['2-1-1-2', false],
  ['3', false],
];

const INDETERMINATE_PARENT_RESULT: [string, boolean][] = [
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

const SELECTED_PARENTS = ['1-3-2', '2-1'];

const SELECTED_PARENTS_RESULT: [string, boolean][] = [
  ['1', false],
  ['1-1', false],
  ['1-2', false],
  ['1-3', false],
  ['1-3-1', false],
  ['1-3-2', true],
  ['1-3-3', false],
  ['1-3-2-1', true],
  ['1-3-2-2', true],
  ['2', true],
  ['2-1', true],
  ['2-1-1', true],
  ['2-1-1-1', true],
  ['2-1-1-2', true],
  ['3', false],
];

const INDETERMINATE_PARENTS_RESULT: [string, boolean][] = [
  ['1', true],
  ['1-1', false],
  ['1-2', false],
  ['1-3', true],
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

const SELECTED_ALL = 'all';

const SELECTED_ALL_RESULT: [string, boolean][] = [
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
const INDETERMINATE_ALL_RESULT: [string, boolean][] = [
  ['1', false],
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

export const selectedMocks = {
  DATA,
  SELECTED_LEAF,
  SELECTED_LEAF_RESULT,
  INDETERMINATE_LEAF_RESULT,
  SELECTED_LEAFS,
  SELECTED_LEAFS_RESULT,
  INDETERMINATE_LEAFS_RESULT,
  SELECTED_ALL_LEAFS,
  SELECTED_ALL_LEAFS_RESULT,
  INDETERMINATE_ALL_LEAFS_RESULT,
  SELECTED_ROOT_PARENT,
  SELECTED_ROOT_PARENT_RESULT,
  INDETERMINATE_ROOT_PARENT_RESULT,
  SELECTED_PARENT,
  SELECTED_PARENT_RESULT,
  INDETERMINATE_PARENT_RESULT,
  SELECTED_PARENTS,
  SELECTED_PARENTS_RESULT,
  INDETERMINATE_PARENTS_RESULT,
  SELECTED_ALL,
  SELECTED_ALL_RESULT,
  INDETERMINATE_ALL_RESULT,
};
