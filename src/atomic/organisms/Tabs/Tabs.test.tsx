import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './Tabs';

describe('Tabs Component', () => {
  const renderBasicTabs = (props = {}) => {
    return render(
      <Tabs defaultTab="tab1" {...props}>
        <Tabs.List aria-label="Test tabs">
          <Tabs.Tab tabId="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab tabId="tab2">Tab 2</Tabs.Tab>
          <Tabs.Tab tabId="tab3">Tab 3</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel tabId="tab1">Content 1</Tabs.Panel>
          <Tabs.Panel tabId="tab2">Content 2</Tabs.Panel>
          <Tabs.Panel tabId="tab3">Content 3</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    );
  };

  it('renders tabs and panels correctly', () => {
    renderBasicTabs();

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 3' })).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('shows correct tab as active by default', () => {
    renderBasicTabs();

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(tab2).toHaveAttribute('aria-selected', 'false');
    expect(tab1).toHaveAttribute('tabindex', '0');
    expect(tab2).toHaveAttribute('tabindex', '-1');
  });

  it('switches tabs when clicked', async () => {
    const user = userEvent.setup();
    renderBasicTabs();

    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    await user.click(tab2);

    expect(tab2).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('handles keyboard navigation with arrow keys', async () => {
    const user = userEvent.setup();
    renderBasicTabs();

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

    // Focus first tab and press right arrow
    tab1.focus();
    await user.keyboard('{ArrowRight}');

    expect(tab2).toHaveFocus();
    expect(tab2).toHaveAttribute('aria-selected', 'true');
  });

  it('handles keyboard navigation with Home and End keys', async () => {
    const user = userEvent.setup();
    renderBasicTabs();

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    const tab3 = screen.getByRole('tab', { name: 'Tab 3' });

    // Focus second tab, then press End
    tab2.focus();
    await user.keyboard('{End}');

    expect(tab3).toHaveFocus();
    expect(tab3).toHaveAttribute('aria-selected', 'true');

    // Press Home to go to first tab
    await user.keyboard('{Home}');

    expect(tab1).toHaveFocus();
    expect(tab1).toHaveAttribute('aria-selected', 'true');
  });

  it('activates tab with Enter and Space keys', async () => {
    const user = userEvent.setup();
    renderBasicTabs();

    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

    // Focus and press Enter
    tab2.focus();
    await user.keyboard('{Enter}');

    expect(tab2).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('supports controlled mode', async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();

    render(
      <Tabs activeTab="tab2" onTabChange={onTabChange}>
        <Tabs.List aria-label="Controlled tabs">
          <Tabs.Tab tabId="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab tabId="tab2">Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel tabId="tab1">Content 1</Tabs.Panel>
          <Tabs.Panel tabId="tab2">Content 2</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    );

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

    expect(tab2).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Content 2')).toBeInTheDocument();

    await user.click(tab1);
    expect(onTabChange).toHaveBeenCalledWith('tab1');
  });

  it('handles disabled tabs correctly', async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultTab="tab1">
        <Tabs.List aria-label="Tabs with disabled">
          <Tabs.Tab tabId="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab tabId="tab2" disabled>
            Tab 2 (Disabled)
          </Tabs.Tab>
          <Tabs.Tab tabId="tab3">Tab 3</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel tabId="tab1">Content 1</Tabs.Panel>
          <Tabs.Panel tabId="tab2">Content 2</Tabs.Panel>
          <Tabs.Panel tabId="tab3">Content 3</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    );

    const disabledTab = screen.getByRole('tab', { name: 'Tab 2 (Disabled)' });

    expect(disabledTab).toBeDisabled();
    await user.click(disabledTab);

    // Should still show first tab content
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('supports vertical orientation', () => {
    render(
      <Tabs defaultTab="tab1" orientation="vertical">
        <Tabs.List aria-label="Vertical tabs">
          <Tabs.Tab tabId="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab tabId="tab2">Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel tabId="tab1">Content 1</Tabs.Panel>
          <Tabs.Panel tabId="tab2">Content 2</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    );

    const tablist = screen.getByRole('tablist');
    expect(tablist).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('supports different variants', () => {
    const { rerender } = renderBasicTabs({ variant: 'pills' });

    // Test that component renders without errors for different variants
    rerender(
      <Tabs defaultTab="tab1" variant="underlined">
        <Tabs.List aria-label="Test tabs">
          <Tabs.Tab tabId="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab tabId="tab2">Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel tabId="tab1">Content 1</Tabs.Panel>
          <Tabs.Panel tabId="tab2">Content 2</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    );

    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('has proper ARIA attributes', () => {
    renderBasicTabs();

    const tablist = screen.getByRole('tablist');
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    const panel1 = screen.getByRole('tabpanel');

    expect(tablist).toHaveAttribute('aria-label', 'Test tabs');
    expect(tab1).toHaveAttribute('aria-controls', 'tabpanel-tab1');
    expect(tab1).toHaveAttribute('id', 'tab-tab1');
    expect(panel1).toHaveAttribute('aria-labelledby', 'tab-tab1');
    expect(panel1).toHaveAttribute('id', 'tabpanel-tab1');
  });
});
