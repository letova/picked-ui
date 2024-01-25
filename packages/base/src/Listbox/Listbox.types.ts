export interface ListboxOption {
  id: string;
  label: string;
  children?: Omit<ListboxOption, 'children'>[];
}

export interface ListBoxChangeEvent {
  value: string | string[];
  target: ListboxOption;
}

export interface ListboxProps {
  className?: string;
  ariaLabelledBy?: string;
  /**
   * Defines how the component behaves. 'multi-select' allows selecting multiple values
   */
  mode?: 'single-select' | 'multi-select';
  /**
   * List of options
   */
  options: ListboxOption[];
  /**
   * Selected option ids to display
   */
  selectedIds?: string[];
  /**
   * Disabled option ids
   */
  disabledIds?: string[];
  /**
   * Callback to invoke when value of listbox changes
   */
  onChange?: (event: ListBoxChangeEvent) => void;
}
