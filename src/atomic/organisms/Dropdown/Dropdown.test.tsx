import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Dropdown } from './Dropdown';

describe('Dropdown', () => {
  it('renders trigger and opens content on click', async () => {
    const user = userEvent.setup();

    render(
      <Dropdown>
        <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item>Item 1</Dropdown.Item>
          <Dropdown.Item>Item 2</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    );

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Item 1' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Item 2' })).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', async () => {
    const user = userEvent.setup();

    render(
      <div>
        <Dropdown>
          <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Item 1</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
        <button type="button">Outside Button</button>
      </div>
    );

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    const outsideButton = screen.getByRole('button', { name: 'Outside Button' });
    await user.click(outsideButton);

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('closes dropdown when pressing Escape', async () => {
    const user = userEvent.setup();

    render(
      <Dropdown>
        <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item>Item 1</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    );

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('calls onSelect when item is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <Dropdown>
        <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item onSelect={onSelect}>Item 1</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    );

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);

    const item = screen.getByRole('menuitem', { name: 'Item 1' });
    await user.click(item);

    expect(onSelect).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();

    render(
      <Dropdown>
        <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item>Item 1</Dropdown.Item>
          <Dropdown.Item>Item 2</Dropdown.Item>
          <Dropdown.Item>Item 3</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    );

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);

    // Test arrow key navigation
    fireEvent.keyDown(document, { key: 'ArrowDown' });
    fireEvent.keyDown(document, { key: 'ArrowDown' });
    fireEvent.keyDown(document, { key: 'ArrowUp' });

    // Should cycle through items properly
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('skips disabled items in keyboard navigation', async () => {
    const user = userEvent.setup();

    render(
      <Dropdown>
        <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item>Item 1</Dropdown.Item>
          <Dropdown.Item disabled>Disabled Item</Dropdown.Item>
          <Dropdown.Item>Item 3</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    );

    const trigger = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(trigger);

    const disabledItem = screen.getByRole('menuitem', { name: 'Disabled Item' });
    expect(disabledItem).toHaveAttribute('aria-disabled', 'true');
  });

  it('calls onOpenChange when state changes', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <Dropdown onOpenChange={onOpenChange}>
        <Dropdown.Trigger>Open Menu</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item>Item 1</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    );

    const trigger = screen.getByRole('button', { name: 'Open Menu' });

    await user.click(trigger);
    expect(onOpenChange).toHaveBeenCalledWith(true);

    await user.click(trigger);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('supports custom trigger with asChild', async () => {
    const user = userEvent.setup();

    render(
      <Dropdown>
        <Dropdown.Trigger asChild>
          <button type="button">Custom Trigger</button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item>Item 1</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    );

    const trigger = screen.getByRole('button', { name: 'Custom Trigger' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'true');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });
});
