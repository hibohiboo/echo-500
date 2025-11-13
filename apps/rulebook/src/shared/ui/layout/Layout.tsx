import Footer from './Footer';
import Header from './Header';
import type { ParentComponent } from 'solid-js';

const Layout: ParentComponent = (props) => (
  <div class="app-container">
    <div class="layout-background">
      <div class="ivy-overlay"></div>
      <div class="ruin-texture"></div>
    </div>

    <div class="layout-content">
      <Header />
      <main class="site-main">{props.children}</main>
      <Footer />
    </div>

    <style>{`
        @scope {
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




        }
      `}</style>
  </div>
);

export default Layout;
