import React from 'react';
import { FloatingOverlay } from '@floating-ui/react';

import { usePopupContext } from '../../core';

export type OverlayProps = React.HTMLAttributes<HTMLDivElement> & {
  lockScroll?: boolean;
};

export const Overlay: React.FC<OverlayProps> = (props) => {
  const { state } = usePopupContext();

  return state.isModal ? (
    <FloatingOverlay lockScroll {...props} />
  ) : (
    props.children
  );
};
