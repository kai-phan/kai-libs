import React from 'react';

import { renderChildren, ChildrenRender, usePopupContext } from '../../core';

export type HeaderProps = Omit<
  React.ComponentPropsWithoutRef<'header'>,
  'children'
> & {
  closeIcon?: React.ReactNode;
  title?: string;
  hideCloseButton?: boolean;
  children?: ChildrenRender;
};

export const Header: React.FC<HeaderProps> = ({ children, ...props }) => {
  const popup = usePopupContext();

  return <header {...props}>{renderChildren(children, popup)}</header>;
};
