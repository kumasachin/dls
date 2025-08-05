import { render } from '@testing-library/react';
import { Form } from './Form';
describe('Form Component', () => {
  it('renders without crashing', () => {
    render(
      <Form>
        <div>Form content</div>
      </Form>
    );
  });
});
