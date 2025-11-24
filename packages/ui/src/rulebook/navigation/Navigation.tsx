import { useState } from 'react';
import { MobileMenuToggle } from './MobileMenuToggle';
import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

interface NavItem {
  label: string;
  path?: string;
  children?: NavItem[];
}

interface NavigationProps {
  basePath?: string;
}

export function Navigation({ basePath = '' }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      label: 'Tutorial',
      path: `/${basePath}/content/tutorial`,
    },
    {
      label: 'Introduction',
      children: [
        { label: 'はじめに', path: '' },
        { label: 'あそびかた', path: '' },
        { label: '用語', path: `/${basePath}/content/glossary` },
      ],
    },
    {
      label: 'Basic Rules',
      children: [
        {
          label: '簡易戦闘ルール',
          path: `/${basePath}/content/simple-battle-rule`,
        },
        { label: '戦闘ルール', path: `/${basePath}/content/battle-rules` },
        {
          label: '戦闘用モジュール',
          path: `/${basePath}/content/battle-commands`,
        },
        { label: '判定', path: '' },
        { label: '戦闘', path: '' },
      ],
    },
    {
      label: 'Character Creation',
      children: [
        {
          label: 'キャラクターの作成',
          path: `/${basePath}/content/character-creation`,
        },
        { label: 'タグ', path: '' },
        { label: 'コマンド', path: '' },
        { label: '背景', path: '' },
      ],
    },
    {
      label: 'Scenario Management',
      children: [
        {
          label: 'Scenario Creators Guide',
          path: `/${basePath}/content/scenario-creators`,
        },
        {
          label: 'Game Masters Guide',
          path: `/${basePath}/content/game-master`,
        },
        { label: 'Players Guide', path: '' },
        { label: 'Session Prep', path: '' },
        { label: 'Troubleshooting', path: '' },
      ],
    },
    {
      label: 'Advanced Rules',
      children: [
        { label: 'House Rules', path: '' },
        { label: 'Variants', path: '' },
        { label: 'Customization', path: '' },
      ],
    },
    {
      label: 'Reference',
      children: [
        { label: 'Quick Reference', path: '' },
        { label: 'Tables', path: '' },
        { label: 'FAQ', path: '' },
      ],
    },
    {
      label: 'World',
      children: [
        {
          label: 'Returners～人の帰還を信じ、彼らが戻るための環境を守るもの～',
          path: '',
        },
        { label: 'Revivers～積極的に人類復活を試みるもの～', path: '' },
        { label: '神錆びた塔の村～ビーコン・ヴィレッジ～', path: '' },
      ],
    },
  ];

  return (
    <>
      <MobileMenuToggle onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      <nav className={`navigation ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="nav-header">
          <h2 className="nav-title">
            <span className="nav-title-icon">▶</span> Navigation
          </h2>
        </div>

        <ul className="nav-list">
          {navItems.map((item, index) => (
            <li key={index} className="nav-item">
              {item.children ? (
                <NavSection label={item.label}>
                  {item.children.map((child, childIndex) => (
                    <li key={childIndex} className="nav-subitem">
                      <a href={child.path} className="nav-sublink">
                        <span className="nav-sublink-bullet">•</span>
                        {child.label}
                      </a>
                    </li>
                  ))}
                </NavSection>
              ) : (
                <NavLink href={item.path!}>{item.label}</NavLink>
              )}
            </li>
          ))}
        </ul>

        <style>{`
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

          /* Responsive */
          @media (max-width: 1024px) {
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
        `}</style>
      </nav>
    </>
  );
}
