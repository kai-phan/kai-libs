import { render } from '@testing-library/react';

import { Popup } from '.';

describe('FloatingUiPopup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Popup />);
    expect(baseElement).toBeTruthy();
  });
});
