import { render } from '@testing-library/react';
import { AlertBox } from './AlertBox';
describe('AlertBox Component', () => {
  it('renders without crashing', () => {
    render(<AlertBox message="Test alert message" />);
  });
});
