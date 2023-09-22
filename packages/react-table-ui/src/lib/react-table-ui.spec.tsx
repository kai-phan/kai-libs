import { render } from '@testing-library/react';

import ReactTableUi from './react-table-ui';

describe('ReactTableUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactTableUi />);
    expect(baseElement).toBeTruthy();
  });
});
