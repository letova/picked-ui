import { cx } from '@emotion/css';

import { ClassNameGenerator, getMapFromStringList } from '../utils';

import { ListboxProps } from './Listbox.types';

const getCN = (element?: string, modificator?: string) =>
  ClassNameGenerator.generate({ block: 'Listbox', element, modificator });

const Options = ({ mode = 'single-select', options, selectedIds = [], disabledIds = [], onChange }: ListboxProps) => {
  const selectedIdsMap = getMapFromStringList(selectedIds);
  const disabledIdsMap = getMapFromStringList(disabledIds);

  return options?.map((option) => {
    const selected = selectedIdsMap?.[option.id] || false;
    const disabled = disabledIdsMap?.[option.id] || false;

    return (
      <li
        key={option.id}
        id={option.id}
        role="option"
        aria-selected={selected}
        onClick={
          disabled
            ? undefined
            : () => {
                let nextValue: string | string[] = option.id;

                if (mode === 'multi-select') {
                  nextValue = selected ? selectedIds?.filter((id) => id !== option.id) : [...selectedIds, option.id];
                }

                onChange?.({ value: nextValue, target: option });
              }
        }
      >
        {option.label}
      </li>
    );
  });
};

export const Listbox = (props: ListboxProps) => {
  const { className, ariaLabelledBy, options } = props;

  const grouped = options[0]?.children;

  if (grouped) {
    return (
      <div className={cx(getCN(), className)} tabIndex={0} role="listbox" aria-labelledby={ariaLabelledBy}>
        {options?.map((group) => {
          return (
            <ul role="group" aria-labelledby={group.id}>
              <li key={group.id} id={group.id} role="presentation">
                {group.label}
              </li>
              <Options {...props} options={group.children || []} />
            </ul>
          );
        })}
      </div>
    );
  }

  return (
    <ul className={cx(getCN(), className)} tabIndex={0} role="listbox" aria-labelledby={ariaLabelledBy}>
      <Options {...props} />
    </ul>
  );
};

// Добавить классы
// Добавить cs
// Добавить навигацию по клавиатуре
// Добавить в сторибук
// Добавить sticky для групп
// Добавить слоты
