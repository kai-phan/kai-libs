import React from 'react';

import { ChildrenRender, usePopupContext } from '../../base';
import { useMergeRefs } from '@floating-ui/react';

export type TriggerProps = Omit<
  React.ComponentPropsWithRef<'button'>,
  'children'
> & {
  children?: ChildrenRender;
};

export const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  function Trigger({ children, ...props }, propRef) {
    const popup = usePopupContext();
    const ref = useMergeRefs([popup.floating.refs.setReference, propRef]);

    const allProps = {
      ref,
      type: 'button',
      'data-state': popup.state.isOpen ? 'open' : 'closed',
      ...props,
    };

    if (typeof children === 'function') {
      const el = children(popup);

      if (React.isValidElement(el)) {
        return React.cloneElement(
          el,
          popup.interactions.getReferenceProps(allProps),
        );
      }

      throw new Error('Trigger render must be return a valid React element.');
    }

    if (React.isValidElement(children) && children.type === 'button') {
      return React.cloneElement(
        children,
        popup.interactions.getReferenceProps(allProps),
      );
    }

    return (
      <button {...popup.interactions.getReferenceProps(allProps)}>
        {children}
      </button>
    );
  },
);
