import type { Meta, StoryObj } from '@storybook/react';
import { Popup } from '.';

const meta: Meta<typeof Popup> = {
  component: Popup,
  title: 'Floating-Ui-Popup',
};

export default meta;
type Story = StoryObj<typeof Popup>;

export const WithTriggerText: Story = {
  args: {
    trigger: 'Click me',
    children: (
      <div
        style={{
          padding: '1rem',
        }}
      >
        Hello world
      </div>
    ),
  },
};

export const WithTriggerButton: Story = {
  args: {
    trigger: <button>Click me</button>,
    children: (
      <div
        style={{
          padding: '1rem',
        }}
      >
        Hello world
      </div>
    ),
  },
};

export const WithTriggerFunction: Story = {
  args: {
    trigger: ({ state }) => (
      <button>Click me to {state.isOpen ? 'Close' : 'Open'}</button>
    ),
    children: (
      <div
        style={{
          padding: '1rem',
        }}
      >
        Hello world
      </div>
    ),
  },
};

export const WithChildrenFunction: Story = {
  args: {
    trigger: <button>Click me</button>,
    children: ({ state }) => (
      <div
        style={{
          padding: '1rem',
        }}
      >
        <button onClick={() => state.setIsOpen(false)}>Close</button>
      </div>
    ),
  },
};

export const CustomPopupStyles: Story = {
  args: {
    trigger: <button>Click me</button>,
    children: (
      <div
        style={{
          padding: '1rem',
        }}
      >
        Hello world
      </div>
    ),
    style: {
      background: 'red',
      borderRadius: '4px',
    },
  },
};

export const CustomTriggerStyles: Story = {
  args: {
    trigger: 'Click me',
    triggerStyle: {
      border: '1px solid black',
      background: 'none',
      padding: '4px 8px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    children: (
      <div
        style={{
          padding: '1rem',
        }}
      >
        Hello world
      </div>
    ),
  },
};
