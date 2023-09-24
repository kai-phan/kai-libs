import React from 'react';
import {
  FloatingFocusManager,
  FloatingFocusManagerProps,
} from '@floating-ui/react';

import { usePopupContext } from '../../core';

type Context = FloatingFocusManagerProps['context'];

export type FocusManagerProps = Omit<FloatingFocusManagerProps, 'context'> & {
  context?: Context;
};

export const FocusManager: React.FC<FocusManagerProps> = (props) => {
  const { context, modal, children } = props;
  const { floating, state } = usePopupContext();

  return (
    <FloatingFocusManager
      {...props}
      context={context || floating.context}
      modal={modal || state.isModal}
    >
      {children}
    </FloatingFocusManager>
  );
};
