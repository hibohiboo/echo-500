import { Navigation } from '@/widgets/navigation';

function Home() {
  return (
    <div class="home-container">
      <div class="home-content">
        <aside class="home-sidebar">
          <Navigation />
        </aside>

        <article class="home-main">
          <section class="hero-section">
            <div class="hero-glitch">
              <h1 class="hero-title">
                <span class="title-line">Welcome to</span>
                <span class="title-main">
                  <span class="cyber">Echo:</span>
                  <span class="nature">500</span>
                </span>
              </h1>
            </div>

            <p class="hero-subtitle">
              Post-Apocalyptic TRPG where synthetic beings explore the ruins of
              civilization
            </p>

            <div class="hero-divider"></div>
          </section>

          <section class="intro-section">
            <div class="intro-card">
              <h2 class="section-title">
                <span class="title-icon">▶</span> The World
              </h2>
              <p>——そして、停止していたあなたは目覚めた。</p>
              <p>荒れた大地。歪んだ生命。緑に沈む都市の亡骸。</p>
              <p>守るべき人類は残響に痕跡を残すのみ。</p>
              <p>壊れたメモリ。己が造られた意味は遠い過去に。</p>
              <p>人のいない世界で、人に造られたものたちが紡ぐ物語。</p>
            </div>

            <div class="intro-card">
              <h2 class="section-title">
                <span class="title-icon">▶</span> About This Rulebook
              </h2>
              <p>
                本ゲームは、文明崩壊後の世界で再稼働した人造人間を演じるゲームだ。
                プレイヤーの分身であるキャラクター（以下、PC）は、
                破損した目的を取り戻すため、終わった世界をめぐることになる。
              </p>
              <ul class="feature-list">
                <li>
                  <span class="feature-bullet">◆</span>
                  ポストアポカリプス × アンドロイド × 自分探し
                </li>
                <li>
                  <span class="feature-bullet">◆</span>
                  シナリオに合わせてモジュールをインストール
                </li>
                <li>
                  <span class="feature-bullet">◆</span>
                  コマンドによるストーリー進行
                </li>
                <li>
                  <span class="feature-bullet">◆</span>
                  タグ駆動のイベントシステム
                </li>
              </ul>
            </div>

            <div class="intro-card">
              <h2 class="section-title">
                <span class="title-icon">▶</span> Getting Started
              </h2>
              <div class="quick-links">
                <a class="quick-link" href={`/${BASE_PATH}/content/tutorial`}>
                  <span class="link-icon">›</span>
                  <span class="link-text">チュートリアル</span>
                </a>
                <a
                  class="quick-link"
                  href={`/${BASE_PATH}/content/scenario-creators`}
                >
                  <span class="link-icon">›</span>
                  <span class="link-text">シナリオ製作者向け</span>
                </a>
                <a class="quick-link" href={`/${BASE_PATH}/content/game-master`}>
                  <span class="link-icon">›</span>
                  <span class="link-text">ゲームマスター向け</span>
                </a>
                <a class="quick-link">
                  <span class="link-icon">›</span>
                  <span class="link-text">プレイヤー向け</span>
                </a>
              </div>
            </div>
          </section>

          <section class="warning-section">
            <div class="warning-box">
              <div class="warning-header">
                <span class="warning-icon">⚠</span>
                <span class="warning-title">SYSTEM NOTICE</span>
              </div>
              <p class="warning-text">
                このルールブックは現在開発中です。内容は予告なく変更される場合があります。
              </p>
            </div>
          </section>
        </article>
      </div>

      <style>{`
        .home-container {
          width: 100%;
        }
       @scope {
        .home-content {
          display: flex;
          gap: var(--spacing-xl);
          max-width: var(--content-max-width);
          margin: 0 auto;
        }

        .home-sidebar {
          flex-shrink: 0;
        }

        .home-main {
          flex: 1;
          min-width: 0;
        }

        /* Hero Section */
        .hero-section {
          margin-bottom: var(--spacing-2xl);
        }

        .hero-glitch {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .hero-title {
          font-size: 3.5rem;
          margin-bottom: var(--spacing-lg);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .title-line {
          font-size: 1.2rem;
          color: var(--text-tertiary);
          font-family: var(--font-primary);
          letter-spacing: 0.1em;
        }

        .title-main {
          display: flex;
          gap: 0.3rem;
          align-items: baseline;
        }

        .title-main .cyber {
          color: var(--color-cyber-primary);
          text-shadow:
            0 0 20px var(--color-cyber-glow),
            0 0 40px var(--color-cyber-glow);
          animation: cyber-flicker 3s ease-in-out infinite;
        }

        .title-main .nature {
          color: var(--color-nature-accent);
          text-shadow: 0 0 20px rgba(107, 156, 66, 0.5);
        }

        @keyframes cyber-flicker {
          0%, 100% {
            opacity: 1;
            filter: brightness(1);
          }
          50% {
            opacity: 0.95;
            filter: brightness(1.1);
          }
        }

        .hero-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          font-family: var(--font-primary);
          letter-spacing: 0.05em;
          margin-bottom: var(--spacing-xl);
        }

        .hero-divider {
          height: 2px;
          background: linear-gradient(
            90deg,
            var(--color-cyber-primary) 0%,
            var(--color-nature-accent) 50%,
            transparent 100%
          );
          box-shadow: 0 0 10px var(--color-cyber-glow);
        }

        /* Intro Section */
        .intro-section {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xl);
          margin-bottom: var(--spacing-2xl);
        }

        .intro-card {
          background: rgba(26, 26, 26, 0.6);
          border: 1px solid var(--color-nature-secondary);
          border-left: 4px solid var(--color-cyber-primary);
          border-radius: 8px;
          padding: var(--spacing-xl);
          backdrop-filter: blur(10px);
          transition: all var(--transition-normal);
        }

        .intro-card:hover {
          border-left-color: var(--color-nature-accent);
          box-shadow: 0 4px 20px rgba(0, 255, 204, 0.1);
          transform: translateX(4px);
        }

        .section-title {
          font-size: 1.8rem;
          margin-bottom: var(--spacing-lg);
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .title-icon {
          color: var(--color-nature-accent);
          font-size: 1rem;
        }

        .intro-card p {
          line-height: 1.8;
          margin-bottom: var(--spacing-md);
        }

        .feature-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .feature-list li {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-sm) 0;
          color: var(--text-secondary);
        }

        .feature-bullet {
          color: var(--color-cyber-secondary);
          font-size: 1.2rem;
        }

        /* Quick Links */
        .quick-links {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-md);
        }

        .quick-link {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-md);
          background: rgba(0, 255, 204, 0.05);
          border: var(--border-cyber);
          border-radius: 4px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .quick-link:hover {
          background: rgba(0, 255, 204, 0.1);
          border-color: var(--color-cyber-primary);
          box-shadow: var(--shadow-cyber);
          transform: translateY(-2px);
        }

        .link-icon {
          color: var(--color-cyber-primary);
          font-size: 1.5rem;
          font-weight: bold;
        }

        .link-text {
          flex: 1;
        }

        /* Warning Section */
        .warning-section {
          margin-top: var(--spacing-2xl);
        }

        .warning-box {
          background: rgba(139, 69, 19, 0.1);
          border: 1px solid var(--color-ruin-rust);
          border-left: 4px solid var(--color-ruin-rust);
          border-radius: 8px;
          padding: var(--spacing-lg);
        }

        .warning-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-md);
        }

        .warning-icon {
          font-size: 1.5rem;
          color: var(--color-ruin-rust);
        }

        .warning-title {
          font-family: var(--font-heading);
          color: var(--color-ruin-rust);
          font-size: 1.1rem;
          letter-spacing: 0.05em;
        }

        .warning-text {
          color: var(--text-secondary);
          margin: 0;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .home-content {
            flex-direction: column;
          }

          .home-sidebar {
            order: 2;
          }

          .home-main {
            order: 1;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .title-line {
            font-size: 1rem;
          }

          .hero-subtitle {
            font-size: 0.95rem;
          }

          .section-title {
            font-size: 1.5rem;
          }

          .quick-links {
            grid-template-columns: 1fr;
          }
        }
        }
      `}</style>
    </div>
  );
}

export default Home;
