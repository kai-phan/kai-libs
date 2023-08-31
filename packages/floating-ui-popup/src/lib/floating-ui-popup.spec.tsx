import { render } from '@testing-library/react';

import FloatingUiPopup from './floating-ui-popup';

describe('FloatingUiPopup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FloatingUiPopup />);
    expect(baseElement).toBeTruthy();
  });
});
