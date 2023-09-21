import React from 'react';
import { FloatingPortal, FloatingFocusManager } from '@floating-ui/react';

import { ChildrenRender, usePopupContext, renderChildren } from '../../base';

export type PortalProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  children?: ChildrenRender;
};

/**
 * @description Portal component for popup, includes floating portal and focus manager.
 * @todo add props for FloatingPortal and FloatingFocusManager
 * @see {@link https://floating-ui.com/docs/FloatingPortal}
 * */
export const Portal: React.FC<PortalProps> = ({
  children,
  className,
  style,
  ...props
}) => {
  const popup = usePopupContext();
  const { floating, state, interactions } = popup;

  return state.isOpen ? (
    <FloatingPortal>
      <FloatingFocusManager context={floating.context} modal={state.isModal}>
        <div
          aria-describedby={state.descriptionId}
          aria-labelledby={state.labelId}
          ref={floating.refs.setFloating}
          style={{ ...style, ...floating.floatingStyles }}
          {...interactions.getFloatingProps(props)}
        >
          {renderChildren(children, popup)}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  ) : null;
};
