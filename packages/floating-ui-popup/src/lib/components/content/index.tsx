import React from 'react';

import { renderChildren, ChildrenRender, usePopupContext } from '../../core';

export type ContentProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  children?: ChildrenRender;
};

export const Content: React.FC<ContentProps> = ({
  children,
  style,
  ...rest
}) => {
  const popup = usePopupContext();
  const { floating, state, interactions } = popup;

  return (
    <div
      aria-describedby={state.descriptionId}
      aria-labelledby={state.labelId}
      ref={floating.refs.setFloating}
      style={{ ...style, ...floating.floatingStyles }}
      {...interactions.getFloatingProps(rest)}
    >
      {renderChildren(children, popup)}
    </div>
  );
};
