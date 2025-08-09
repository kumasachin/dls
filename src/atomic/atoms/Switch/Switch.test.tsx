import { render } from '@testing-library/react';
import { Switch } from './Switch';

describe('Switch Component', () => {
  it('renders without crashing', () => {
    render(<Switch />);
  });
});
