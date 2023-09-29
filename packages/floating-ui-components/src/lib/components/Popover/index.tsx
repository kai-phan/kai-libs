import React from 'react';

export interface PopoverProps {
  children: React.ReactNode;
}

const PopoverInner = (props, ref) => {
  return <div></div>;
};

export const Popover = React.forwardRef(PopoverInner);
