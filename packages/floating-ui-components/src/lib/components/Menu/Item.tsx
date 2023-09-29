import React from 'react';
import { useListItem, useMergeRefs } from '@floating-ui/react';

import { useMenuContext } from './Root';

export interface ItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.Ref<any>;
  children?: React.ReactNode;
  label?: string;
}

const ItemInner = (props: ItemProps, propRef) => {
  const { getItemProps } = useMenuItem({
    ref: propRef,
    ...props,
  });

  return <button {...getItemProps()}>{props.label}</button>;
};

export const useMenuItem = (options: ItemProps = {}) => {
  const item = useListItem();
  const { state, interactions, tree } = useMenuContext() || {};
  const ref = useMergeRefs([item.ref, options.ref]);
  const isActive = state?.activeIndex === item.index;

  return {
    isActive,
    getItemProps: (userProps: ItemProps = {}) => {
      return {
        ...interactions?.getItemProps({
          type: 'button',
          role: 'menuitem',
          ref,
          ...options,
          ...userProps,
          onClick: (event) => {
            userProps.onClick?.(event as any);
            options.onClick?.(event as any);
            tree?.events.emit('click', event);
          },
        }),
      };
    },
  };
};

export const Item = React.forwardRef<HTMLButtonElement, ItemProps>(ItemInner);
