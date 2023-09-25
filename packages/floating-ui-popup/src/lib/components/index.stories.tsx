import { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/addon-docs';
import React from 'react';

import { Popup, PopupProps, BasePopupRef } from './index';

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

            <DocBlock.Subheading>
              Create your own components
            </DocBlock.Subheading>
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

export const WithTriggerFunction = () => {
  return (
    <Popup
      trigger={({ state }) => (
        <button>{state.isOpen ? 'Close' : 'Open'}</button>
      )}
    >
      <div style={{ padding: '8px 16px' }}>Popup Content</div>
    </Popup>
  );
};

export const PopoverExample = () => {
  return (
    <Popup trigger={<button>Click</button>}>
      {({ state }) => {
        return (
          <div style={{ padding: '8px 16px' }}>
            <p>Popover Content</p>
            <input type="text" />

            <button onClick={() => state.setIsOpen(false)}>Confirm</button>
          </div>
        );
      }}
    </Popup>
  );
};

export const ModalExample = () => {
  return (
    <Popup width={500} isModal trigger={<button>Click</button>}>
      <div style={{ padding: '8px 16px' }}>Modal Content</div>
    </Popup>
  );
};

export const ModalControlledExample = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>

      <Popup width={500} isModal open={open} onOpenChange={setOpen}>
        <div style={{ padding: '8px 16px' }}>
          <p>Modal Content</p>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>
      </Popup>
    </>
  );
};

export const ModalRefExample = () => {
  const popupRef = React.useRef<BasePopupRef>(null);

  return (
    <>
      <button onClick={() => popupRef.current?.open()}>Open</button>

      <Popup width={500} isModal ref={popupRef}>
        <div style={{ padding: '8px 16px' }}>
          <p>Modal Content</p>
          <button onClick={() => popupRef.current?.close()}>Close</button>
        </div>
      </Popup>
    </>
  );
};

export const DrawerExample = () => {
  return (
    <Popup
      width={300}
      isModal
      trigger={<button>Click</button>}
      style={{
        backgroundColor: 'white',
        position: 'fixed',
        bottom: 0,
        left: 0,
        top: 0,
      }}
    >
      <div style={{ padding: '8px 16px' }}>Drawer Content</div>
    </Popup>
  );
};
