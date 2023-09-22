import React from 'react';

import { renderChildren, ChildrenRender, usePopupContext } from '../../core';

export type ContentProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  children?: ChildrenRender;
};

export const Content: React.FC<ContentProps> = ({ children, ...rest }) => {
  const popup = usePopupContext();

  return <div {...rest}>{renderChildren(children, popup)}</div>;
};
