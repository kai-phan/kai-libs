import type { Meta, StoryObj } from '@storybook/react';
import { Popup } from '.';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Popup> = {
  component: Popup,
  title: 'FloatingUiPopup',
};

export default meta;
type Story = StoryObj<typeof Popup>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to FloatingUiPopup!/gi)).toBeTruthy();
  },
};
