import { DATA } from './data';

const DISABLED_LEAF = ['1-3-2-1'];

const DISABLED_LEAF_RESULT: [string, boolean][] = [
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

const DISABLED_PARENT = ['1-3'];

const DISABLED_PARENT_RESULT: [string, boolean][] = [
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

export const disabledMocks = {
  DATA,
  DISABLED_LEAF,
  DISABLED_LEAF_RESULT,
  DISABLED_PARENT,
  DISABLED_PARENT_RESULT,
};
