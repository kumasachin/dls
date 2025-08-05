import { render } from '@testing-library/react';
import { Spinner } from './Spinner';
describe('Spinner Component', () => {
  it('renders without crashing', () => {
    render(<Spinner />);
  });
});
