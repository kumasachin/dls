import type { Meta, StoryObj } from '@storybook/react-vite';
import { Rating } from '../../../atomic/molecules/Rating/Rating';

const meta: Meta<typeof Rating> = {
  title: 'Molecules/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible rating component that supports 5, 10, or 20 star ratings with various color options, sizes, and interaction modes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    max: {
      control: { type: 'select' },
      options: [5, 10, 20],
      description: 'Maximum number of stars',
    },
    value: {
      control: { type: 'range', min: 0, max: 20, step: 0.5 },
      description: 'Current rating value',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the rating component',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'warning', 'success', 'danger'],
      description: 'Color variant',
    },
    precision: {
      control: { type: 'select' },
      options: ['full', 'half', 'quarter'],
      description: 'Rating precision',
    },
    allowHalf: {
      control: 'boolean',
      description: 'Allow half-star ratings',
    },
    allowClear: {
      control: 'boolean',
      description: 'Allow clearing the rating by clicking the same star',
    },
    readOnly: {
      control: 'boolean',
      description: 'Make the rating read-only',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the rating',
    },
    showValue: {
      control: 'boolean',
      description: 'Show the numeric value',
    },
    showTooltip: {
      control: 'boolean',
      description: 'Show tooltip on hover',
    },
  },
  args: {
    onChange: () => {},
    onHover: () => {},
    onHoverEnd: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 3,
    max: 5,
  },
};

export const FiveStars: Story = {
  args: {
    value: 4,
    max: 5,
    showValue: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard 5-star rating with value display.',
      },
    },
  },
};

export const TenStars: Story = {
  args: {
    value: 7,
    max: 10,
    showValue: true,
  },
  parameters: {
    docs: {
      description: {
        story: '10-star rating for more granular feedback.',
      },
    },
  },
};

export const TwentyStars: Story = {
  args: {
    value: 15,
    max: 20,
    showValue: true,
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: '20-star rating with small size for detailed ratings.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '60px', fontSize: '14px' }}>Small:</span>
        <Rating value={4} size="sm" showValue />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '60px', fontSize: '14px' }}>Medium:</span>
        <Rating value={4} size="md" showValue />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '60px', fontSize: '14px' }}>Large:</span>
        <Rating value={4} size="lg" showValue />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '60px', fontSize: '14px' }}>X-Large:</span>
        <Rating value={4} size="xl" showValue />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different size variants of the rating component.',
      },
    },
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '14px' }}>Default:</span>
        <Rating value={4} variant="default" showValue />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '14px' }}>Primary:</span>
        <Rating value={4} variant="primary" showValue />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '14px' }}>Secondary:</span>
        <Rating value={4} variant="secondary" showValue />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '14px' }}>Warning:</span>
        <Rating value={4} variant="warning" showValue />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '14px' }}>Success:</span>
        <Rating value={4} variant="success" showValue />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ width: '80px', fontSize: '14px' }}>Danger:</span>
        <Rating value={4} variant="danger" showValue />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different color variants for various contexts.',
      },
    },
  },
};

export const HalfStars: Story = {
  args: {
    value: 3.5,
    max: 5,
    allowHalf: true,
    showValue: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Rating with half-star precision.',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    defaultValue: 0,
    max: 5,
    allowHalf: true,
    allowClear: true,
    showValue: true,
    showTooltip: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive rating with half-stars, clear functionality, and tooltips.',
      },
    },
  },
};

export const ReadOnly: Story = {
  args: {
    value: 4.5,
    max: 5,
    readOnly: true,
    showValue: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Read-only rating for displaying existing ratings.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    value: 3,
    max: 5,
    disabled: true,
    showValue: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled rating component.',
      },
    },
  },
};

export const WithLabels: Story = {
  args: {
    value: 4,
    max: 5,
    labels: ['Terrible', 'Bad', 'Okay', 'Good', 'Excellent'],
    showValue: true,
    showTooltip: true,
    tooltipContent: (value: number) => {
      const labels = ['', 'Terrible', 'Bad', 'Okay', 'Good', 'Excellent'];
      return labels[Math.ceil(value)] || `${value} stars`;
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Rating with custom labels and tooltip content.',
      },
    },
  },
};

export const CustomFormatting: Story = {
  args: {
    value: 8.5,
    max: 10,
    showValue: true,
    formatValue: (value: number, max: number) => `${value}★ / ${max}★`,
  },
  parameters: {
    docs: {
      description: {
        story: 'Rating with custom value formatting.',
      },
    },
  },
};

export const ComparisonSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '16px' }}>5-Star Rating</h3>
        <Rating value={4} max={5} showValue size="lg" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '16px' }}>10-Star Rating</h3>
        <Rating value={7} max={10} showValue size="md" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '16px' }}>20-Star Rating</h3>
        <Rating value={15} max={20} showValue size="sm" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different star counts with appropriate sizes.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    value: 3.5,
    max: 5,
    allowHalf: true,
    allowClear: true,
    showValue: true,
    showTooltip: true,
    size: 'md',
    variant: 'default',
    readOnly: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Playground to experiment with all rating options.',
      },
    },
  },
};
