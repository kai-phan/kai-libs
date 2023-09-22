import React from 'react';
import {
  FloatingPortal,
  FloatingFocusManager,
  FloatingFocusManagerProps,
} from '@floating-ui/react';

import { ChildrenRender, usePopupContext, renderChildren } from '../../core';

export interface PortalProps
  extends Omit<
    React.ComponentProps<'div'> & FloatingFocusManagerProps,
    'children' | 'context'
  > {
  children?: ChildrenRender;

  /** Floating UI portal props */
  id?: string;
  root?: HTMLElement | null | React.MutableRefObject<HTMLElement | null>;
  preserveTabOrder?: boolean;
}

/**
 * @description Portal component for popup, includes floating portal and focus manager.
 * @todo add transition for modal
 * @see {@link https://floating-ui.com/docs/FloatingPortal}
 * */
export const Portal: React.FC<PortalProps> = ({
  children,
  className,
  style,

  /** Floating Focus Manager props */
  modal,
  disabled,
  order,
  closeOnFocusOut,
  guards,
  initialFocus,
  returnFocus,
  visuallyHiddenDismiss,

  /** Floating UI portal props */
  id,
  root,
  preserveTabOrder,
  ...props
}) => {
  const popup = usePopupContext();
  const { floating, state, interactions } = popup;

  const focusManagerProps = {
    context: floating.context,
    modal: state.isModal || modal,
    disabled,
    order,
    closeOnFocusOut,
    initialFocus,
    returnFocus,
    visuallyHiddenDismiss,
  };

  const floatingPortalProps = {
    id,
    root,
    preserveTabOrder,
  };

  return state.isOpen ? (
    <FloatingPortal {...floatingPortalProps}>
      <FloatingFocusManager {...focusManagerProps}>
        <div
          aria-describedby={state.descriptionId}
          aria-labelledby={state.labelId}
          ref={floating.refs.setFloating}
          style={{ ...style, ...floating.floatingStyles }}
          className={className}
          {...interactions.getFloatingProps(props)}
        >
          {renderChildren(children, popup)}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  ) : null;
};
