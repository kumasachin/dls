import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Form } from './Form';

describe('Form Component Quick Test', () => {
  it('renders without infinite loops', () => {
    // This test will timeout if there's an infinite loop
    const { container } = render(
      <Form onSubmit={() => {}}>
        <Form.Field name="test" label="Test">
          {({ id, value, onChange }) => (
            <input
              id={id}
              type="text"
              value={(value as string) || ''}
              onChange={(e) => onChange(e.target.value)}
            />
          )}
        </Form.Field>
      </Form>
    );

    expect(container).toBeInTheDocument();
  });
});
