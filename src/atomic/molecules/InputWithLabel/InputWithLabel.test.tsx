import { render } from '@testing-library/react';
import { InputWithLabel } from './InputWithLabel';

describe('InputWithLabel Component', () => {
  it('renders without crashing', () => {
    render(<InputWithLabel label="Test Label" value="test value" onChange={() => {}} />);
  });
});
