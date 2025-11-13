import type { Meta, StoryObj } from 'storybook-solidjs';
import { MobileMenuToggle } from './MobileMenuToggle';

const meta = {
  title: 'Shared/UI/MobileMenuToggle',
  component: MobileMenuToggle,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    ariaLabel: { control: 'text' },
  },
} satisfies Meta<typeof MobileMenuToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => console.log('Menu toggled'),
  },
};

export const CustomLabel: Story = {
  args: {
    onClick: () => console.log('Custom menu toggled'),
    ariaLabel: 'メニューを開く',
  },
};
