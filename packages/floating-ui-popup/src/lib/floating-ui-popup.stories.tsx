import type { Meta, StoryObj } from '@storybook/react';
import { FloatingUiPopup } from './floating-ui-popup';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof FloatingUiPopup> = {
  component: FloatingUiPopup,
  title: 'FloatingUiPopup',
};
export default meta;
type Story = StoryObj<typeof FloatingUiPopup>;

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
