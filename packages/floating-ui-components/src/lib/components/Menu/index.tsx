import React from 'react';

import { Root } from './Root';
import { Item } from './Item';

export interface MenuProps {
  ref?: React.Ref<any>;
  children?: React.ReactNode;
  label?: string;
}

export interface IMenu {
  (props: MenuProps): JSX.Element;
  Root: typeof Root;
  Item: typeof Item;
}

export const MenuInner = (props: MenuProps, ref) => {
  return <Menu.Root ref={ref} {...props} />;
};

export const Menu = React.forwardRef(MenuInner) as unknown as IMenu;

Menu.Root = Root;
Menu.Item = Item;
