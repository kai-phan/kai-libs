import React from 'react';

import { usePopup, UsePopupOptions, UsePopupResult } from './usePopup';

export type ChildrenRender =
  | ((popup: UsePopupResult) => React.ReactNode)
  | React.ReactNode;

export type BasePopupProps = UsePopupOptions & {
  children?: ChildrenRender;
};

export type BasePopupRef = React.MutableRefObject<{
  open: () => void;
  close: () => void;
}>;

const PopupContext = React.createContext<UsePopupResult | null>(null);

export const usePopupContext = () => {
  const context = React.useContext(PopupContext);

  if (!context) {
    throw new Error(
      'Popup compound components cannot be rendered outside the Popup component',
    );
  }

  return context;
};

export const renderChildren = (
  children: BasePopupProps['children'],
  value: UsePopupResult,
) => {
  if (typeof children === 'function') {
    return children(value);
  }

  return children;
};

export const BasePopup = React.forwardRef<BasePopupRef, BasePopupProps>(
  function BasePopup({ children, ...rest }, ref) {
    const popup = usePopup(rest);

    React.useImperativeHandle(ref, () => ({
      current: {
        open: () => popup.state.setIsOpen(true),
        close: () => popup.state.setIsOpen(false),
      },
    }));

    return (
      <PopupContext.Provider value={popup}>
        {renderChildren(children, popup)}
      </PopupContext.Provider>
    );
  },
);
