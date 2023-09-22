import React from 'react';

import { useControllableValue } from '@kai/hooks';
import {
  autoUpdate,
  FloatingContext,
  ReferenceType,
  useClick,
  useDismiss,
  useFloating,
  UseFloatingOptions,
  UseFloatingReturn,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  UseRoleProps,
  OffsetOptions,
  Middleware,
} from '@floating-ui/react';

import { getFlip, getOffset, getShift } from '../utils';
import { FlipOptions, ShiftOptions } from '@floating-ui/core';

/*
 * ---------------
 * usePopup
 * ---------------
 * */

export type UsePopupState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  labelId?: string;
  descriptionId?: string;
  setLabelId: (labelId?: string) => void;
  setDescriptionId: (descriptionId?: string) => void;
  isModal: boolean;
};

export interface UsePopupOptions<RT extends ReferenceType = ReferenceType>
  extends Partial<UseFloatingOptions<RT>>,
    UsePopupInteractionsOptions {
  /** Default value for `isOpen` when uncontrolled.*/
  initialOpen?: boolean;
  /** Offset middleware params */
  offset?: OffsetOptions;
  /** Flip middleware params */
  flip?: boolean | FlipOptions;
  /** Shift middleware params */
  shift?: boolean | ShiftOptions;
  /** Whether the popup is modal or not. */
  isModal?: boolean;
}

export type UsePopupResult<RT extends ReferenceType = ReferenceType> = {
  floating: UseFloatingReturn<RT>;
  interactions: ReturnType<typeof useInteractions>;
  state: UsePopupState;
};

/**
 * @description This hook is wrapper layer of `useFloating` and `useInteractions` of @floating-ui.
 * @see {@link https://floating-ui.com/docs/react#usage | Floating UI React Usage}
 * @param {UsePopupOptions} options - The options for the hook.
 * @param {boolean} [options.open] - Whether the popup is open or not.
 * @param {boolean} [options.initialOpen] - Default value for `isOpen` when uncontrolled.
 * @param {boolean} [options.isDismissible=true] - Whether the popup is dismissible.
 * @param {On | On[]} [options.on="click"] - The interaction type.
 * @param {UseRoleProps['role']} [options.role="dialog"] - The role of the popup.
 * @param {Object | number} [options.offset=5] - Offset middleware params.
 * @param {Object | boolean} [options.flip=true] - Flip middleware params.
 * @param {Object | boolean} [options.shift=true] - Shift middleware params.
 * */
export function usePopup<RT extends ReferenceType = ReferenceType>(
  options: UsePopupOptions = {},
): UsePopupResult<RT> {
  const {
    open,
    onOpenChange,
    initialOpen,
    middleware = [],
    offset = 5,
    flip = true,
    shift = true,
    on,
    isDismissible,
    role,
    ...rest
  } = options;

  const [isOpen, setIsOpen] = useControllableValue<boolean, Event>({
    defaultValue: initialOpen,
    value: open,
    // @ts-ignore
    onChange: onOpenChange,
  });

  const floating = useFloating<RT>({
    placement: 'bottom-start',
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [getOffset(offset), getFlip(flip), getShift(shift)].concat(
      middleware as Middleware[],
    ),
    ...rest,
  });

  const interactions = usePopupInteraction<RT>(floating.context, {
    role,
    isDismissible,
    on,
  });

  const { labelId, setLabelId, setDescriptionId, descriptionId } = useAriaId();

  const state = React.useMemo(() => {
    return {
      isOpen,
      setIsOpen,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
      isModal: options.isModal || false,
    };
  }, [
    isOpen,
    setIsOpen,
    labelId,
    descriptionId,
    setLabelId,
    setDescriptionId,
    options.isModal,
  ]);

  return React.useMemo(() => {
    return {
      floating,
      interactions,
      state,
    };
  }, [floating, interactions, state]);
}

/*
 * ---------------
 * usePopupInteractions
 * ---------------
 */

export type On = 'click' | 'hover' | 'focus';

export type UsePopupInteractionsOptions = {
  /** The interaction type. */
  on?: On | On[];
  /** Whether the popup is dismissible. */
  isDismissible?: boolean;
  /** The role of the popup. */
  role?: UseRoleProps['role'];
};

/**
 * @description This hook is wrapper layer of `useInteractions` of @floating-ui.
 * @param {FloatingContext} context - The context of the floating element.
 * @param options - The options for the hook.
 * @param {On | On[]} [options.on="click"] - The interaction type.
 * @param {boolean} [options.isDismissible=true] - Whether the popup is dismissible.
 * @param {UseRoleProps['role']} [options.role="dialog"] - The role of the popup.
 * @example usePopupInteraction(context, { on: 'click' }) for click interaction.
 * @example usePopupInteraction(context, { on: ['click', 'hover'] }) for click and hover interaction.
 * @see {@link https://floating-ui.com/docs/react#interactions | Floating UI React Interactions}
 * @todo add options for useClick, useHover, useFocus, useDismiss, useRole.
 */
export function usePopupInteraction<RT extends ReferenceType = ReferenceType>(
  context: FloatingContext<RT>,
  options: UsePopupInteractionsOptions = {},
) {
  const { on = 'click', isDismissible = true } = options;

  const ons = Array.isArray(on) ? on : [on];

  const canHover = ons.includes('hover');
  const canFocus = ons.includes('focus');
  const canClick = ons.includes('click');

  const click = useClick(context, { enabled: canClick });
  const hover = useHover(context, { enabled: canHover });
  const focus = useFocus(context, { enabled: canFocus });
  const dismiss = useDismiss(context, { enabled: isDismissible });
  const role = useRole(context, { role: options.role || 'dialog' });

  return useInteractions([click, hover, focus, dismiss, role]);
}

/*
 * ---------------
 * useAriaId
 * ---------------
 */

function useAriaId() {
  const [labelId, setLabelId] = React.useState<string | undefined>();
  const [descriptionId, setDescriptionId] = React.useState<
    string | undefined
  >();

  return {
    labelId,
    descriptionId,
    setDescriptionId,
    setLabelId,
  };
}
