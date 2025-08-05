import { render } from '@testing-library/react';
import { Tag } from './Tag';
describe('Tag Component', () => {
  it('renders without crashing', () => {
    render(<Tag label="Test Tag" />);
  });
});
