import { render } from '@testing-library/react';
import { Tooltip } from './Tooltip';
describe('Tooltip Component', () => {
  it('renders without crashing', () => {
    render(
      <Tooltip content="Tooltip content">
        <span>Hover me</span>
      </Tooltip>
    );
  });
});
