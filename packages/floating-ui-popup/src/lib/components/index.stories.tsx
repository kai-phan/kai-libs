import { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/addon-docs';

import { Popup, PopupProps } from './index';

const meta: Meta<PopupProps> = {
  title: 'Floating-UI-Components/Popup',
  component: Popup,
  parameters: {
    docs: {
      page: () => {
        return (
          <>
            <DocBlock.Title />
            <DocBlock.Description>
              This is an package for popup components. Using
              [floating-ui](https://floating-ui.com/) as a base. Includes normal
              components likes modals, popovers, tooltips. Also includes more
              complex components like a popconfirm, dialog, etc.
            </DocBlock.Description>
            <DocBlock.Subheading>Install</DocBlock.Subheading>
            <DocBlock.Source code={`yarn add @floating-ui/popup`} />
            <DocBlock.Subheading>Basic usage</DocBlock.Subheading>
            <DocBlock.Meta />
            <DocBlock.Primary />
            <DocBlock.Subheading>Props</DocBlock.Subheading>
            <DocBlock.StoryTable
              component={Popup}
              subcomponents={{
                'Popup.Root': Popup.Root,
                'Popup.Trigger': Popup.Trigger,
                'Popup.Portal': Popup.Portal,
              }}
              story={'Basic'}
            />
            <DocBlock.Stories />
          </>
        );
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    trigger: {
      description: 'Trigger element or render props',
    },
    children: {
      description: 'Content element or render props',
    },
    open: {
      description: 'Whether the popup open or not',
    },
    isDismissible: {
      description: 'Whether popup is dismissible or not',
    },
    on: {
      description: 'Trigger type',
    },
    placement: {
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Placement of popup',
    },
  },
};

export default meta;

export type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    trigger: 'Click',
    children: <div style={{ padding: '8px 16px' }}>Popup Content</div>,
  },
  parameters: {
    docs: {
      extractArgTypes: (component) => {
        if (component === Popup) {
          return meta.argTypes;
        }
        if (component === Popup.Root) {
          return {};
        }

        if (component === Popup.Trigger) {
          return {
            className: {
              name: 'className',
              description: 'Class name of trigger',
            },
          };
        }

        if (component === Popup.Portal) {
          return {
            className: {
              name: 'className',
              description: 'Class name of popup',
            },
          };
        }
      },
    },
  },
};

export const WithTriggerButton: Story = {
  args: {
    trigger: <button>Click</button>,
    children: <div style={{ padding: '8px 16px' }}>Popup Content</div>,
  },
};

export const WithTriggerFunction: Story = {
  render() {
    return (
      <Popup
        trigger={({ state }) => (
          <button>{state.isOpen ? 'Close' : 'Open'}</button>
        )}
      >
        <div style={{ padding: '8px 16px' }}>Popup Content</div>
      </Popup>
    );
  },
};
