import React from 'react';

export type Updater<T> = ((prev: T) => T) | T;

export type UseControllableValueProps<T, E> = {
  value?: T;
  defaultValue?: T;
  onChange?: (update: Updater<T>, extra?: E) => void;
};

/**
 * @todo add export parser and transformer
 * @description This hook is used to manage a value that can be controlled or uncontrolled.
 * @param {Object} options - The options for the hook.
 * @param {T} options.value - The controlled value.
 * @param {T} options.defaultValue - The default value.
 * @param {(update: Updater<T>, extra?: E) => void} options.onChange - The callback when the value changes.
 * @returns {[T, (update: Updater<T>, extra?: E) => void]} - The value and the callback to update the value. Similar to useState.
 * */
export function useControllableValue<T, E = unknown>(
  options: UseControllableValueProps<T, E>,
) {
  const { value, defaultValue, onChange } = options;

  const [innerValue, setInnerValue] = React.useState<T | undefined>(
    defaultValue,
  );
  const valueRef = React.useRef<T | undefined>();

  valueRef.current = value !== undefined ? value : innerValue;

  const innerOnChange = React.useCallback(
    (updater: T, extra?: E) => {
      const newValue =
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        updater instanceof Function ? updater(valueRef.current!) : updater;

      if (onChange) {
        onChange(newValue, extra);
        valueRef.current = newValue;

        value === undefined && setInnerValue(newValue);
      } else {
        setInnerValue(newValue);
      }
    },
    [onChange, value],
  );

  return [valueRef.current, innerOnChange] as [
    T,
    (change: Updater<T>, extra?: E) => void,
  ];
}

export function parse<V, R>(value: V, parser: (value: V) => R) {
  return parser(value);
}

export function transform<V, R>(value: V, transformer: (value: V) => R) {
  return transformer(value);
}
