import * as React from 'react';

import { act, render } from '@testing-library/react';

import { useControllableValue } from './index';

describe('useControllableValue', () => {
  it('should return the default value', () => {
    let result;

    const Component = () => {
      result = useControllableValue({
        defaultValue: 'default',
      });

      return null;
    };

    render(<Component />);
    expect(result[0]).toBe('default');
  });

  it('should return the value if value presents', () => {
    let result;

    const Component = ({ value }) => {
      result = useControllableValue({
        value,
        defaultValue: 'default',
      });

      return null;
    };

    render(<Component value={'value'} />);
    expect(result[0]).toBe('value');
  });

  it('Provide both value and onChange', () => {
    let result;

    let setValue;
    const useMockState = () => {
      const state = React.useState('default');
      setValue = state[1];

      return state;
    };

    const Component = ({ value, onChange }) => {
      result = useControllableValue({
        value,
        onChange,
      });

      return null;
    };

    const Parent = () => {
      const [value, setValue] = useMockState();
      return <Component value={value} onChange={setValue} />;
    };

    render(<Parent />);
    expect(result[0]).toBe('default');
    act(() => {
      setValue('value');
    });
    expect(result[0]).toBe('value');
    act(() => {
      setValue('value2');
    });
    expect(result[0]).toBe('value2');
  });
});
