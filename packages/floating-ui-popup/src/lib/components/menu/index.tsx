import React from 'react';

import { Item, ItemProps } from './Item';

export type MenuItemsProps = ItemProps;

export interface MenuProps extends React.RefAttributes<HTMLUListElement> {
  items?: ItemProps[];
}

export interface IMenu {
  (props: MenuProps): JSX.Element;
  Item: typeof Item;
}

const InnerMenu = (props: MenuProps, ref: React.Ref<HTMLUListElement>) => {
  const { items = [], ...rest } = props;

  return (
    <ul {...rest} ref={ref}>
      {items.map((itemProps, index) => (
        <Item key={index} {...itemProps} />
      ))}
    </ul>
  );
};

export const Menu = React.forwardRef(InnerMenu) as unknown as IMenu;

Menu.Item = Item;
