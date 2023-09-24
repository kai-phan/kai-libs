import React from 'react';

import {
  BasePopupProps,
  BasePopupRef,
  BasePopup,
  ChildrenRender,
} from '../core';

import { Portal } from './portal';
import { Trigger } from './trigger';
import { Content } from './content';
import { FocusManager } from './focusManager';
import { Overlay } from './overlay';

import classes from './index.module.scss';

export interface PopupProps
  extends React.PropsWithoutRef<BasePopupProps>,
    React.RefAttributes<BasePopupRef> {
  /** Content element or render props */
  children?: ChildrenRender;
  /** Class name of popup */
  className?: string;
  /** Style of popup */
  style?: React.CSSProperties;
  /** Trigger element or render props */
  trigger?: ChildrenRender;
  /** Class name of trigger */
  triggerClassName?: string;
  /** Style of trigger */
  triggerStyle?: React.CSSProperties;
}

export interface IPopup {
  (props: PopupProps): JSX.Element;

  Root: typeof BasePopup;
  Portal: typeof Portal;
  Trigger: typeof Trigger;
  Content: typeof Content;
  FocusManager: typeof FocusManager;
  Overlay: typeof Overlay;

  CLASSNAME: string;
  TRIGGER_CLASSNAME: string;
  PORTAL_CLASSNAME: string;
}

function InnerPopup(props: PopupProps, ref) {
  const {
    trigger,
    triggerStyle,
    triggerClassName,
    className,
    children,
    style,
    ...rest
  } = props;

  const triggerProps = {
    children: trigger,
    className: triggerClassName || Popup.TRIGGER_CLASSNAME,
    style: triggerStyle,
  };

  const popupProps = {
    className: className || Popup.CLASSNAME,
    style,
    children,
  };

  return (
    <Popup.Root {...rest} ref={ref}>
      {trigger && <Popup.Trigger {...triggerProps} />}

      <Popup.Portal>
        <Popup.Overlay>
          <Popup.FocusManager>
            <Popup.Content {...popupProps} />
          </Popup.FocusManager>
        </Popup.Overlay>
      </Popup.Portal>
    </Popup.Root>
  );
}

export const Popup = React.forwardRef(InnerPopup) as unknown as IPopup;

Popup.Portal = Portal;
Popup.Trigger = Trigger;
Popup.Root = BasePopup;
Popup.Content = Content;
Popup.FocusManager = FocusManager;
Popup.Overlay = Overlay;

Popup.TRIGGER_CLASSNAME = classes.trigger;
Popup.PORTAL_CLASSNAME = classes.portal;
Popup.CLASSNAME = classes.popup;
