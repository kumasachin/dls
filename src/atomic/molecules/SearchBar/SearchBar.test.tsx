import { render } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar Component', () => {
  it('renders without crashing', () => {
    render(<SearchBar value="test search" onChange={() => {}} onSearch={() => {}} />);
  });
});
