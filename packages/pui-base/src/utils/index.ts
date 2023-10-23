export { convertCSToClassName } from './customStyles';
export type { GetCSSObjectFn } from './customStyles';
export { getElementFromSlot } from './slots';
export { mapTree, forEachTree } from './tree';

export const isNil = (value: any): value is null | undefined => {
  return value == null;
};
