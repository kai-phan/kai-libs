import { Meta, StoryObj } from '@storybook/react';

import { Menu } from '../../components/Menu';

const meta: Meta = {
  title: 'Floating UI Components/Menu',
};

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = () => {
  return (
    <Menu label="Edit">
      <Menu.Item label="Undo" onClick={() => console.log('Undo')} />
      <Menu.Item label="Redo" disabled />
      <Menu.Item label="Cut" />
      <Menu label="Copy as">
        <Menu.Item label="Text" />
        <Menu.Item label="Video" />
        <Menu label="Image">
          <Menu.Item label=".png" />
          <Menu.Item label=".jpg" />
          <Menu.Item label=".svg" />
          <Menu.Item label=".gif" />
        </Menu>
        <Menu.Item label="Audio" />
      </Menu>
      <Menu label="Share">
        <Menu.Item label="Mail" />
        <Menu.Item label="Instagram" />
      </Menu>
    </Menu>
  );
};
