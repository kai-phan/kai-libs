import {
  offset,
  OffsetOptions,
  flip,
  FlipOptions,
  shift,
  ShiftOptions,
} from '@floating-ui/core';

export function getOffset(offsetOptions?: OffsetOptions) {
  return offsetOptions === undefined ? undefined : offset(offsetOptions);
}

export function getFlip(flipOptions?: FlipOptions | boolean) {
  if (flipOptions === true) return flip();
  if (!flipOptions) return undefined;

  return flip(flipOptions);
}

export function getShift(shiftOptions?: ShiftOptions | boolean) {
  if (shiftOptions === true) return shift();
  if (!shiftOptions) return undefined;

  return shift(shiftOptions);
}
