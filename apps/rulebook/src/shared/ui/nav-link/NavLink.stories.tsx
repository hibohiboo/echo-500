import type { Meta, StoryObj } from 'storybook-solidjs';
import { NavLink } from './NavLink';

const meta = {
  title: 'Shared/UI/NavLink',
  component: NavLink,
  tags: ['autodocs'],
  argTypes: {
    href: { control: 'text' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof NavLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '/example',
    children: 'Example Link',
  },
};

export const TRPGLink: Story = {
  args: {
    href: '/introduction/what-is-trpg',
    children: 'What is TRPG?',
  },
};

export const LongText: Story = {
  args: {
    href: '/scenarios/troubleshooting',
    children: 'Troubleshooting Common Issues',
  },
};
