import React from 'react';
import { FloatingPortal } from '@floating-ui/react';

import { usePopupContext } from '../../core';

export interface PortalProps {
  id?: string;
  root?: HTMLElement | null | React.MutableRefObject<HTMLElement | null>;
  preserveTabOrder?: boolean;
  children?: React.ReactNode;
}

/**
 * @see {@link https://floating-ui.com/docs/FloatingPortal}
 * */
export const Portal: React.FC<PortalProps> = ({
  id,
  root,
  preserveTabOrder,
  children,
}) => {
  const popup = usePopupContext();
  const { state } = popup;

  const floatingPortalProps = {
    id,
    root,
    preserveTabOrder,
  };

  return state.isOpen ? (
    <FloatingPortal {...floatingPortalProps}>{children}</FloatingPortal>
  ) : null;
};
