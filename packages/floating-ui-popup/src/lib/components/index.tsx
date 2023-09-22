import React from 'react';

import {
  BasePopupProps,
  BasePopupRef,
  BasePopup,
  ChildrenRender,
} from '../core';

import { Header } from './header';
import { Content } from './content';
import { Footer } from './footer';
import { Portal } from './portal';
import { Trigger } from './trigger';

export type PopupProps = React.PropsWithoutRef<BasePopupProps> &
  React.RefAttributes<BasePopupRef> & {
    header?: ChildrenRender;
    content?: ChildrenRender;
    footer?: ChildrenRender;
  };

export interface IPopup {
  (props: PopupProps): JSX.Element;

  Portal: typeof Portal;
  Header: typeof Header;
  Content: typeof Content;
  Footer: typeof Footer;
  Trigger: typeof Trigger;
}

function InnerPopup({ children, ...props }: PopupProps, ref) {
  return (
    <BasePopup {...props} ref={ref}>
      {(popup) => {
        if (typeof children === 'function') {
          return children(popup);
        }

        return (
          children || (
            <React.Fragment>
              <Popup.Trigger />

              <Popup.Portal>
                <Popup.Header />
                <Popup.Content />
                <Popup.Footer />
              </Popup.Portal>
            </React.Fragment>
          )
        );
      }}
    </BasePopup>
  );
}

export const Popup = React.forwardRef(InnerPopup) as unknown as IPopup;

Popup.Portal = Portal;
Popup.Header = Header;
Popup.Content = Content;
Popup.Footer = Footer;
Popup.Trigger = Trigger;
