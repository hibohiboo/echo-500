interface NavLinkProps {
  href: string;
  children: string;
}

export function NavLink(props: NavLinkProps) {
  return (
    <a href={props.href} class="nav-link">
      {props.children}
      <style>{`
        @scope {
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
        }
      `}</style>
    </a>
  );
}
