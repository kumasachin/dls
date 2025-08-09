import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './Accordion';

describe('Accordion Component', () => {
  const renderBasicAccordion = (props = {}) => {
    return render(
      <Accordion {...props}>
        <Accordion.Item itemId="item1">
          <Accordion.Trigger>Section 1</Accordion.Trigger>
          <Accordion.Content>Content for section 1</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item itemId="item2">
          <Accordion.Trigger>Section 2</Accordion.Trigger>
          <Accordion.Content>Content for section 2</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item itemId="item3">
          <Accordion.Trigger>Section 3</Accordion.Trigger>
          <Accordion.Content>Content for section 3</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );
  };

  it('renders accordion items correctly', () => {
    renderBasicAccordion();

    expect(screen.getByRole('button', { name: 'Section 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Section 2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Section 3' })).toBeInTheDocument();
  });

  it('shows correct item as expanded by default', () => {
    renderBasicAccordion({ defaultOpen: 'item1' });

    const trigger1 = screen.getByRole('button', { name: 'Section 1' });
    const trigger2 = screen.getByRole('button', { name: 'Section 2' });

    expect(trigger1).toHaveAttribute('aria-expanded', 'true');
    expect(trigger2).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('Content for section 1')).toBeInTheDocument();
  });

  it('expands and collapses items when clicked', async () => {
    const user = userEvent.setup();
    renderBasicAccordion();

    const trigger1 = screen.getByRole('button', { name: 'Section 1' });

    // Initially collapsed
    expect(trigger1).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Content for section 1')).not.toBeVisible();

    // Click to expand
    await user.click(trigger1);
    expect(trigger1).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Content for section 1')).toBeInTheDocument();

    // Click again to collapse
    await user.click(trigger1);
    expect(trigger1).toHaveAttribute('aria-expanded', 'false');
  });

  it('handles single item mode (default behavior)', async () => {
    const user = userEvent.setup();
    renderBasicAccordion({ defaultOpen: 'item1' });

    const trigger1 = screen.getByRole('button', { name: 'Section 1' });
    const trigger2 = screen.getByRole('button', { name: 'Section 2' });

    // Initially item1 is open
    expect(trigger1).toHaveAttribute('aria-expanded', 'true');
    expect(trigger2).toHaveAttribute('aria-expanded', 'false');

    // Click item2 should close item1 and open item2
    await user.click(trigger2);
    expect(trigger1).toHaveAttribute('aria-expanded', 'false');
    expect(trigger2).toHaveAttribute('aria-expanded', 'true');
  });

  it('handles multiple items mode', async () => {
    const user = userEvent.setup();
    renderBasicAccordion({ allowMultiple: true, defaultOpen: ['item1'] });

    const trigger1 = screen.getByRole('button', { name: 'Section 1' });
    const trigger2 = screen.getByRole('button', { name: 'Section 2' });

    // Initially only item1 is open
    expect(trigger1).toHaveAttribute('aria-expanded', 'true');
    expect(trigger2).toHaveAttribute('aria-expanded', 'false');

    // Click item2 should keep item1 open and also open item2
    await user.click(trigger2);
    expect(trigger1).toHaveAttribute('aria-expanded', 'true');
    expect(trigger2).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Content for section 1')).toBeInTheDocument();
    expect(screen.getByText('Content for section 2')).toBeInTheDocument();
  });

  it('handles keyboard navigation with arrow keys', async () => {
    const user = userEvent.setup();
    renderBasicAccordion();

    const trigger1 = screen.getByRole('button', { name: 'Section 1' });
    const trigger2 = screen.getByRole('button', { name: 'Section 2' });
    const trigger3 = screen.getByRole('button', { name: 'Section 3' });

    // Focus first trigger and press down arrow
    trigger1.focus();
    await user.keyboard('{ArrowDown}');
    expect(trigger2).toHaveFocus();

    // Press down arrow again to move to third trigger
    await user.keyboard('{ArrowDown}');
    expect(trigger3).toHaveFocus();

    // Press up arrow to go back to second trigger
    await user.keyboard('{ArrowUp}');
    expect(trigger2).toHaveFocus();
  });

  it('expands items with Enter and Space keys', async () => {
    const user = userEvent.setup();
    renderBasicAccordion();

    const trigger1 = screen.getByRole('button', { name: 'Section 1' });

    // Focus and press Enter
    trigger1.focus();
    await user.keyboard('{Enter}');
    expect(trigger1).toHaveAttribute('aria-expanded', 'true');

    // Press Space to collapse
    await user.keyboard(' ');
    expect(trigger1).toHaveAttribute('aria-expanded', 'false');
  });

  it('supports controlled mode', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(
      <Accordion openItems={['item2']} onToggle={onToggle}>
        <Accordion.Item itemId="item1">
          <Accordion.Trigger>Section 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item itemId="item2">
          <Accordion.Trigger>Section 2</Accordion.Trigger>
          <Accordion.Content>Content 2</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );

    const trigger1 = screen.getByRole('button', { name: 'Section 1' });
    const trigger2 = screen.getByRole('button', { name: 'Section 2' });

    expect(trigger2).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Content 2')).toBeInTheDocument();

    await user.click(trigger1);
    expect(onToggle).toHaveBeenCalledWith(['item1']);
  });

  it('handles disabled items correctly', () => {
    render(
      <Accordion>
        <Accordion.Item itemId="item1">
          <Accordion.Trigger>Section 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item itemId="item2" disabled>
          <Accordion.Trigger>Section 2 (Disabled)</Accordion.Trigger>
          <Accordion.Content>Content 2</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );

    const disabledTrigger = screen.getByRole('button', { name: 'Section 2 (Disabled)' });

    expect(disabledTrigger).toBeDisabled();

    // Even though we can't click via pointer-events, we can still test the button state
    // The button should remain collapsed (disabled buttons don't respond to clicks)
    expect(disabledTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('supports different sizes', () => {
    const { rerender } = renderBasicAccordion({ size: 'small' });

    // Test that component renders without errors for different sizes
    rerender(
      <Accordion size="large">
        <Accordion.Item itemId="item1">
          <Accordion.Trigger>Section 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );

    expect(screen.getByRole('button', { name: 'Section 1' })).toBeInTheDocument();
  });

  it('supports different variants', () => {
    const { rerender } = renderBasicAccordion({ variant: 'bordered' });

    // Test that component renders without errors for different variants
    rerender(
      <Accordion variant="filled">
        <Accordion.Item itemId="item1">
          <Accordion.Trigger>Section 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );

    expect(screen.getByRole('button', { name: 'Section 1' })).toBeInTheDocument();
  });

  it('has proper ARIA attributes', () => {
    renderBasicAccordion({ defaultOpen: 'item1' });

    const trigger1 = screen.getByRole('button', { name: 'Section 1' });
    const content1 = screen.getAllByRole('region')[0]; // Get the first region

    expect(trigger1).toHaveAttribute('aria-controls', 'accordion-content-item1');
    expect(trigger1).toHaveAttribute('id', 'accordion-trigger-item1');
    expect(content1).toHaveAttribute('aria-labelledby', 'accordion-trigger-item1');
    expect(content1).toHaveAttribute('id', 'accordion-content-item1');

    // Check heading role
    const heading = trigger1.querySelector('[role="heading"]');
    expect(heading).toHaveAttribute('aria-level', '3');
  });
});
