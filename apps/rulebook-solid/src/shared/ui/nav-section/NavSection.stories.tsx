import { NavSection } from './NavSection';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';

const meta = {
  title: 'Shared/UI/NavSection',
  component: NavSection,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    open: { control: 'boolean' },
  },
} satisfies Meta<typeof NavSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: {
    label: 'Basic Rules',
    open: false,
    children: (
      <>
        <li>
          <a
            href="/basics/dice-rolls"
            style="display: block; padding: 0.25rem 0.5rem; color: #808080;"
          >
            <span style="color: #6b9c42; font-size: 1.2rem; margin-right: 0.5rem;">
              •
            </span>
            Dice Rolls
          </a>
        </li>
        <li>
          <a
            href="/basics/skill-checks"
            style="display: block; padding: 0.25rem 0.5rem; color: #808080;"
          >
            <span style="color: #6b9c42; font-size: 1.2rem; margin-right: 0.5rem;">
              •
            </span>
            Skill Checks
          </a>
        </li>
        <li>
          <a
            href="/basics/combat"
            style="display: block; padding: 0.25rem 0.5rem; color: #808080;"
          >
            <span style="color: #6b9c42; font-size: 1.2rem; margin-right: 0.5rem;">
              •
            </span>
            Combat
          </a>
        </li>
      </>
    ),
  },
};

export const Open: Story = {
  args: {
    label: 'Character Creation',
    open: true,
    children: (
      <>
        <li>
          <a
            href="/character/creation"
            style="display: block; padding: 0.25rem 0.5rem; color: #808080;"
          >
            <span style="color: #6b9c42; font-size: 1.2rem; margin-right: 0.5rem;">
              •
            </span>
            Creation Steps
          </a>
        </li>
        <li>
          <a
            href="/character/stats"
            style="display: block; padding: 0.25rem 0.5rem; color: #808080;"
          >
            <span style="color: #6b9c42; font-size: 1.2rem; margin-right: 0.5rem;">
              •
            </span>
            Ability Scores
          </a>
        </li>
        <li>
          <a
            href="/character/skills"
            style="display: block; padding: 0.25rem 0.5rem; color: #808080;"
          >
            <span style="color: #6b9c42; font-size: 1.2rem; margin-right: 0.5rem;">
              •
            </span>
            Skills
          </a>
        </li>
      </>
    ),
  },
};

export const SingleItem: Story = {
  args: {
    label: 'Reference',
    open: false,
    children: (
      <li>
        <a
          href="/reference/quick-reference"
          style="display: block; padding: 0.25rem 0.5rem; color: #808080;"
        >
          <span style="color: #6b9c42; font-size: 1.2rem; margin-right: 0.5rem;">
            •
          </span>
          Quick Reference
        </a>
      </li>
    ),
  },
};
