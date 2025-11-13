import type { Meta, StoryObj } from 'storybook-solidjs';
import Navigation from './Navigation';

const meta = {
  title: 'Widgets/Navigation',
  component: Navigation,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style="min-height: 100vh; background: #0d0d0d; padding: 2rem;">
      <Navigation />
    </div>
  ),
};

export const WithDarkBackground: Story = {
  render: () => (
    <div style="min-height: 100vh; background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%); padding: 2rem;">
      <Navigation />
    </div>
  ),
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <div style="min-height: 100vh; background: #0d0d0d; padding: 1rem;">
      <Navigation />
    </div>
  ),
};
