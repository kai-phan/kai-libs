import React from 'react';

import { renderChildren, ChildrenRender, usePopupContext } from '../../core';

export type FooterProps = Omit<
  React.ComponentPropsWithoutRef<'footer'>,
  'children'
> & {
  children?: ChildrenRender;
};

export const Footer: React.FC<FooterProps> = ({ children, ...props }) => {
  const popup = usePopupContext();

  return <footer {...props}>{renderChildren(children, popup)}</footer>;
};
