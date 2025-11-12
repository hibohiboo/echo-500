import { createSignal, For, Show } from 'solid-js';

interface NavItem {
  label: string;
  path?: string;
  children?: NavItem[];
}

const Navigation = () => {
  const [expandedSections, setExpandedSections] = createSignal<Set<string>>(
    new Set()
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = createSignal(false);

  const navItems: NavItem[] = [
    {
      label: 'Introduction',
      children: [
        { label: 'What is TRPG?', path: '/introduction/what-is-trpg' },
        { label: 'How to Play', path: '/introduction/how-to-play' },
        { label: 'Terminology', path: '/introduction/terminology' },
      ],
    },
    {
      label: 'Basic Rules',
      children: [
        { label: 'Dice Rolls', path: '/basics/dice-rolls' },
        { label: 'Skill Checks', path: '/basics/skill-checks' },
        { label: 'Combat', path: '/basics/combat' },
        { label: 'Sanity Check', path: '/basics/sanity-check' },
      ],
    },
    {
      label: 'Character Creation',
      children: [
        { label: 'Creation Steps', path: '/character/creation' },
        { label: 'Ability Scores', path: '/character/stats' },
        { label: 'Skills', path: '/character/skills' },
        { label: 'Background', path: '/character/background' },
      ],
    },
    {
      label: 'Scenario Management',
      children: [
        { label: 'GM Guide', path: '/scenarios/gm-guide' },
        { label: 'Player Guide', path: '/scenarios/player-guide' },
        { label: 'Session Prep', path: '/scenarios/session-prep' },
        { label: 'Troubleshooting', path: '/scenarios/trouble' },
      ],
    },
    {
      label: 'Advanced Rules',
      children: [
        { label: 'House Rules', path: '/advanced/house-rules' },
        { label: 'Variants', path: '/advanced/variants' },
        { label: 'Customization', path: '/advanced/customization' },
      ],
    },
    {
      label: 'Reference',
      children: [
        { label: 'Quick Reference', path: '/reference/quick-reference' },
        { label: 'Tables', path: '/reference/tables' },
        { label: 'FAQ', path: '/reference/faq' },
      ],
    },
  ];

  const toggleSection = (label: string) => {
    const newExpanded = new Set(expandedSections());
    if (newExpanded.has(label)) {
      newExpanded.delete(label);
    } else {
      newExpanded.add(label);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <>
      <button
        class="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen())}
        aria-label="Toggle navigation menu"
      >
        <span class="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <nav
        class="navigation"
        classList={{ 'mobile-open': isMobileMenuOpen() }}
      >
        <div class="nav-header">
          <h2 class="nav-title">
            <span class="nav-title-icon">▶</span> Navigation
          </h2>
        </div>

        <ul class="nav-list">
          <For each={navItems}>
            {(item) => (
              <li class="nav-item">
                <Show
                  when={item.children}
                  fallback={
                    <a href={item.path} class="nav-link">
                      {item.label}
                    </a>
                  }
                >
                  <button
                    class="nav-section-toggle"
                    classList={{
                      expanded: expandedSections().has(item.label),
                    }}
                    onClick={() => toggleSection(item.label)}
                  >
                    <span class="nav-section-icon">▶</span>
                    <span class="nav-section-label">{item.label}</span>
                  </button>
                  <Show when={expandedSections().has(item.label)}>
                    <ul class="nav-sublist">
                      <For each={item.children}>
                        {(child) => (
                          <li class="nav-subitem">
                            <a href={child.path} class="nav-sublink">
                              <span class="nav-sublink-bullet">•</span>
                              {child.label}
                            </a>
                          </li>
                        )}
                      </For>
                    </ul>
                  </Show>
                </Show>
              </li>
            )}
          </For>
        </ul>

        <style>{`
          @scope {
          .mobile-menu-toggle {
            display: none;
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 1000;
            background: var(--bg-secondary);
            border: var(--border-cyber);
            border-radius: 4px;
            width: 44px;
            height: 44px;
            cursor: pointer;
            transition: all var(--transition-fast);
          }

          .mobile-menu-toggle:hover {
            background: var(--bg-tertiary);
            box-shadow: var(--shadow-cyber);
          }

          .hamburger-icon {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5px;
            width: 100%;
            height: 100%;
          }

          .hamburger-icon span {
            display: block;
            width: 20px;
            height: 2px;
            background: var(--color-cyber-primary);
            transition: all var(--transition-fast);
          }

          .navigation {
            position: sticky;
            top: calc(var(--header-height) + var(--spacing-md));
            width: var(--sidebar-width);
            max-height: calc(100vh - var(--header-height) - var(--spacing-xl));
            background: rgba(26, 26, 26, 0.8);
            border: var(--border-nature);
            border-radius: 8px;
            padding: var(--spacing-lg);
            overflow-y: auto;
            backdrop-filter: blur(10px);
            box-shadow: var(--shadow-deep);
          }

          .nav-header {
            margin-bottom: var(--spacing-lg);
            padding-bottom: var(--spacing-md);
            border-bottom: 1px solid var(--color-nature-secondary);
          }

          .nav-title {
            font-family: var(--font-heading);
            font-size: 1.2rem;
            color: var(--color-cyber-primary);
            margin: 0;
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
          }

          .nav-title-icon {
            font-size: 0.8rem;
            color: var(--color-nature-accent);
          }

          .nav-list {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          .nav-item {
            margin-bottom: var(--spacing-sm);
          }

          .nav-link {
            display: block;
            padding: var(--spacing-sm) var(--spacing-md);
            color: var(--text-secondary);
            text-decoration: none;
            border-left: 2px solid transparent;
            transition: all var(--transition-fast);
            font-family: var(--font-primary);
            font-size: 0.9rem;
          }

          .nav-link:hover {
            color: var(--color-cyber-primary);
            border-left-color: var(--color-cyber-primary);
            background: rgba(0, 255, 204, 0.05);
            padding-left: calc(var(--spacing-md) + 4px);
          }

          .nav-section-toggle {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            width: 100%;
            padding: var(--spacing-sm) var(--spacing-md);
            background: transparent;
            border: none;
            color: var(--text-primary);
            font-family: var(--font-primary);
            font-size: 0.9rem;
            cursor: pointer;
            transition: all var(--transition-fast);
            text-align: left;
          }

          .nav-section-toggle:hover {
            color: var(--color-nature-accent);
            background: rgba(107, 156, 66, 0.05);
          }

          .nav-section-icon {
            font-size: 0.7rem;
            color: var(--color-nature-accent);
            transition: transform var(--transition-fast);
            display: inline-block;
          }

          .nav-section-toggle.expanded .nav-section-icon {
            transform: rotate(90deg);
          }

          .nav-section-label {
            flex: 1;
          }

          .nav-sublist {
            list-style: none;
            margin: 0;
            padding: 0;
            padding-left: var(--spacing-lg);
            margin-top: var(--spacing-xs);
            border-left: 1px solid var(--color-nature-secondary);
            margin-left: var(--spacing-md);
          }

          .nav-subitem {
            margin-bottom: var(--spacing-xs);
          }

          .nav-sublink {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            padding: var(--spacing-xs) var(--spacing-sm);
            color: var(--text-tertiary);
            text-decoration: none;
            font-family: var(--font-body);
            font-size: 0.85rem;
            transition: all var(--transition-fast);
            border-radius: 4px;
          }

          .nav-sublink:hover {
            color: var(--color-cyber-secondary);
            background: rgba(0, 212, 255, 0.05);
            padding-left: calc(var(--spacing-sm) + 4px);
          }

          .nav-sublink-bullet {
            color: var(--color-nature-accent);
            font-size: 1.2rem;
            line-height: 1;
          }

          /* Responsive */
          @media (max-width: 1024px) {
            .mobile-menu-toggle {
              display: flex;
            }

            .navigation {
              position: fixed;
              top: 0;
              left: -100%;
              width: 280px;
              max-height: 100vh;
              height: 100vh;
              border-radius: 0;
              border-right: var(--border-cyber);
              border-top: none;
              border-left: none;
              border-bottom: none;
              transition: left var(--transition-normal);
              z-index: 999;
            }

            .navigation.mobile-open {
              left: 0;
              box-shadow: 4px 0 20px rgba(0, 0, 0, 0.8);
            }
          }
          }
        `}</style>
      </nav>
    </>
  );
};

export default Navigation;
