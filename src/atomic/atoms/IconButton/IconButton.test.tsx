import { render } from '@testing-library/react';
import { IconButton } from './IconButton';
describe('IconButton Component', () => {
  it('renders without crashing', () => {
    render(<IconButton icon={<span>Icon</span>} />);
  });
});
