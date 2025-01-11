export { convertCSToClassName } from './customStyles';
export { roundFractionDigits, isNumeric } from './number';
export { getElementFromSlot } from './slots';
export { mapTree, forEachTree } from './tree';

export const isNil = (value: any): value is null | undefined => {
  return value == null;
};

export const getMapFromStringList = (list?: string[]): Record<string, boolean> | null => {
  if (!list) {
    return null;
  }
  return list.reduce<Record<string, boolean>>((result, selectedId) => {
    result[selectedId] = true;
    return result;
  }, {});
};
