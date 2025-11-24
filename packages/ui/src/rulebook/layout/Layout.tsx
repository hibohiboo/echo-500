import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import '../styles/theme.css';

export function Layout() {
  return (
    <div className="app-container">
      <div className="layout-background">
        <div className="ivy-overlay"></div>
        <div className="ruin-texture"></div>
      </div>

      <div className="layout-content">
        <Header />
        <main className="site-main">
          <Outlet />
        </main>
        <Footer />
      </div>

      <style>{`
        .app-container {
          position: relative;
          min-height: 100vh;
          width: 100%;
        }

        .layout-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
        }

        /* Ivy Overlay - Nature reclaiming */
        .ivy-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background:
            radial-gradient(ellipse at 10% 20%, rgba(75, 124, 44, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 90% 80%, rgba(107, 156, 66, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(45, 80, 22, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Ruin Texture - Concrete cracks */
        .ruin-texture {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image:
            linear-gradient(rgba(58, 58, 58, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(58, 58, 58, 0.05) 1px, transparent 1px);
          background-size: 100px 100px;
          opacity: 0.3;
          pointer-events: none;
        }

        .layout-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        /* Main Content */
        .site-main {
          flex: 1;
          padding: var(--spacing-xl) var(--spacing-lg);
          max-width: var(--content-max-width);
          width: 100%;
          margin: 0 auto;
        }

        /* スマホ対応 */
        @media (max-width: 768px) {
          .site-main {
            padding: var(--spacing-md) var(--spacing-sm);
          }
        }
      `}</style>
    </div>
  );
}
