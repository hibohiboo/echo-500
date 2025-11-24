function GameMaster() {
  return (
    <div class="game-master-container">
      <article class="game-master-content">
        <section class="header-section">
          <h1 class="page-title">
            <span class="title-icon">▶</span> ゲームマスター向け
          </h1>
          <div class="header-divider"></div>
        </section>

        <section class="intro-section">
          <div class="intro-card">
            <h2 class="section-title">ゲームマスターの役割</h2>
            <p>
              ゲームマスター（以下、GM）はセッションの進行役だ。
              シナリオ一覧から遊びたいシナリオを選び、セッションを開催してプレイヤーを募る。
              セッションが開始されたら、GMがゲームの舵を取る。
            </p>
          </div>
        </section>

        <section class="flow-section">
          <h2 class="section-title">
            <span class="title-icon">▶</span> GMの基本フロー
          </h2>

          <div class="flow-grid">
            <div class="flow-card">
              <div class="flow-number">01</div>
              <h3 class="flow-title">シナリオ選択</h3>
              <p class="flow-description">
                シナリオ一覧から、自分が遊びたい、またはプレイヤーに体験してもらいたいシナリオを選ぶ。
                シナリオの内容を事前に読み込み、セッションの楽しい風景を想像しよう。
              </p>
            </div>

            <div class="flow-card">
              <div class="flow-number">02</div>
              <h3 class="flow-title">セッション開催</h3>
              <p class="flow-description">
                セッションを開催し、プレイヤーを募集する。
                プレイ時間、人数、事前準備などの情報を明確に伝える。
              </p>
            </div>

            <div class="flow-card">
              <div class="flow-number">03</div>
              <h3 class="flow-title">セッション進行</h3>
              <p class="flow-description">
                セッション開始後、シナリオに従ってゲームを進行する。
                プレイヤーの行動を受け止め、状況を描写し、判定を下す。
              </p>
            </div>

            <div class="flow-card">
              <div class="flow-number">04</div>
              <h3 class="flow-title">最終判断</h3>
              <p class="flow-description">
                セッション内での最終的な判断はGMが下す。
                ルールブックやシナリオよりも、その場のGMの判断が優先される。
              </p>
            </div>
          </div>
        </section>

        <section class="principle-section">
          <div class="principle-card highlight">
            <div class="principle-header">
              <span class="principle-icon">★</span>
              <h2 class="section-title">最も重要な原則</h2>
            </div>
            <div class="principle-content">
              <p class="principle-main">
                このゲームの成功条件は、楽しい時を過ごせたかどうかだ。
              </p>
              <p class="principle-sub">
                ルールはそのためのレールにすぎない。
                本ルールブックより、シナリオより、その場で遊んでいるGMの判断が優先される。
              </p>
            </div>
          </div>
        </section>

        <section class="authority-section">
          <h2 class="section-title">
            <span class="title-icon">▶</span> GMの権限と責任
          </h2>

          <div class="authority-grid">
            <div class="authority-card">
              <h3 class="authority-title">
                <span class="authority-icon">◆</span> ルール解釈
              </h3>
              <p>
                ルールに不明瞭な点や矛盾がある場合、GMが最終的な解釈を決定する。
                プレイヤーにも相談しよう。 納得感を得られるのが大事だ。
              </p>
            </div>

            <div class="authority-card">
              <h3 class="authority-title">
                <span class="authority-icon">◆</span> ルール変更
              </h3>
              <p>
                セッションをより楽しくするため、ルールを変更・調整する権限を持つ。
                ただし、変更はセッション開始前、または適切なタイミングで明示する。
              </p>
            </div>
          </div>
        </section>

        <section class="tips-section">
          <h2 class="section-title">
            <span class="title-icon">▶</span> GMのためのヒント
          </h2>

          <div class="tips-list">
            <div class="tip-item">
              <div class="tip-header">
                <span class="tip-icon">›</span>
                <h3 class="tip-title">柔軟性を持つ</h3>
              </div>
              <p class="tip-description">
                プレイヤーは予想外の行動をとる。
                シナリオ通りに進まなくても、その展開を楽しみ、柔軟に対応する。
                計画にこだわりすぎず、プレイヤーの選択を尊重する。
              </p>
            </div>

            <div class="tip-item">
              <div class="tip-header">
                <span class="tip-icon">›</span>
                <h3 class="tip-title">判断に迷ったら</h3>
              </div>
              <p class="tip-description">
                完璧な判断を求めすぎない。
                迷った時は、より面白くなる方、プレイヤーが喜ぶ方を選ぶ。
                間違えても構わない。修正が必要なら、後で調整すればいい。
              </p>
            </div>

            <div class="tip-item">
              <div class="tip-header">
                <span class="tip-icon">›</span>
                <h3 class="tip-title">コミュニケーション</h3>
              </div>
              <p class="tip-description">
                プレイヤーとの対話を大切にする。
                判断に困ったら、積極的に相談しよう。
              </p>
            </div>
          </div>
        </section>

        <section class="closing-section">
          <div class="closing-card">
            <p class="closing-text">
              GMは裁定者であり、語り部であり、共に遊ぶ仲間だ。
              <br />
              完璧である必要はない。楽しむことを忘れずに。
              <br />
              あなたのセッションが、プレイヤーにとって忘れられない物語になることを願う。
            </p>
          </div>
        </section>
      </article>

      <style>{`
        .game-master-container {
          max-width: 900px;
          margin: 0 auto;
          padding: var(--spacing-xl);
        }

        @scope {
          .game-master-content {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-2xl);
          }

          /* Header Section */
          .header-section {
            margin-bottom: var(--spacing-lg);
          }

          .page-title {
            font-size: 2.5rem;
            margin-bottom: var(--spacing-lg);
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            color: var(--text-primary);
          }

          .title-icon {
            color: var(--color-nature-accent);
            font-size: 1.5rem;
          }

          .header-divider {
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
            margin-bottom: var(--spacing-xl);
          }

          .intro-card {
            background: rgba(26, 26, 26, 0.6);
            border: 1px solid var(--color-nature-secondary);
            border-left: 4px solid var(--color-cyber-primary);
            border-radius: 8px;
            padding: var(--spacing-xl);
            backdrop-filter: blur(10px);
          }

          .intro-card p {
            line-height: 1.8;
            color: var(--text-secondary);
            margin: var(--spacing-md) 0 0;
          }

          .section-title {
            font-size: 1.5rem;
            margin-bottom: var(--spacing-md);
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            color: var(--text-primary);
          }

          /* Flow Section */
          .flow-section {
            margin-top: var(--spacing-2xl);
          }

          .flow-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: var(--spacing-lg);
            margin-top: var(--spacing-xl);
          }

          .flow-card {
            background: rgba(26, 26, 26, 0.6);
            border: 1px solid var(--color-cyber-secondary);
            border-radius: 8px;
            padding: var(--spacing-lg);
            backdrop-filter: blur(10px);
            transition: all var(--transition-normal);
            position: relative;
            overflow: hidden;
          }

          .flow-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(
              90deg,
              var(--color-cyber-primary),
              var(--color-nature-accent)
            );
            transform: scaleX(0);
            transform-origin: left;
            transition: transform var(--transition-normal);
          }

          .flow-card:hover::before {
            transform: scaleX(1);
          }

          .flow-card:hover {
            border-color: var(--color-cyber-primary);
            box-shadow: 0 4px 20px rgba(0, 255, 204, 0.15);
            transform: translateY(-4px);
          }

          .flow-number {
            font-size: 2rem;
            font-weight: bold;
            color: var(--color-cyber-primary);
            opacity: 0.5;
            margin-bottom: var(--spacing-sm);
            font-family: var(--font-heading);
          }

          .flow-title {
            font-size: 1.2rem;
            color: var(--text-primary);
            margin-bottom: var(--spacing-md);
          }

          .flow-description {
            font-size: 0.95rem;
            line-height: 1.7;
            color: var(--text-secondary);
            margin: 0;
          }

          /* Principle Section */
          .principle-section {
            margin-top: var(--spacing-2xl);
          }

          .principle-card {
            background: rgba(26, 26, 26, 0.6);
            border: 1px solid var(--color-nature-secondary);
            border-radius: 8px;
            padding: var(--spacing-xl);
            backdrop-filter: blur(10px);
          }

          .principle-card.highlight {
            border: 2px solid var(--color-nature-accent);
            background: rgba(107, 156, 66, 0.05);
            box-shadow: 0 0 20px rgba(107, 156, 66, 0.2);
          }

          .principle-header {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-lg);
          }

          .principle-icon {
            font-size: 2rem;
            color: var(--color-nature-accent);
          }

          .principle-content {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
          }

          .principle-main {
            font-size: 1.3rem;
            font-weight: bold;
            color: var(--color-nature-accent);
            line-height: 1.6;
            margin: 0;
          }

          .principle-sub {
            font-size: 1.05rem;
            line-height: 1.8;
            color: var(--text-secondary);
            margin: 0;
          }

          /* Authority Section */
          .authority-section {
            margin-top: var(--spacing-2xl);
          }

          .authority-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: var(--spacing-lg);
            margin-top: var(--spacing-xl);
          }

          .authority-card {
            background: rgba(26, 26, 26, 0.6);
            border: 1px solid var(--color-nature-secondary);
            border-left: 4px solid var(--color-nature-accent);
            border-radius: 8px;
            padding: var(--spacing-lg);
            backdrop-filter: blur(10px);
            transition: all var(--transition-normal);
          }

          .authority-card:hover {
            border-left-color: var(--color-cyber-primary);
            box-shadow: 0 4px 20px rgba(0, 255, 204, 0.1);
            transform: translateX(4px);
          }

          .authority-title {
            font-size: 1.1rem;
            margin-bottom: var(--spacing-md);
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            color: var(--text-primary);
          }

          .authority-icon {
            color: var(--color-cyber-secondary);
            font-size: 1rem;
          }

          .authority-card p {
            font-size: 0.95rem;
            line-height: 1.7;
            color: var(--text-secondary);
            margin: 0;
          }

          /* Tips Section */
          .tips-section {
            margin-top: var(--spacing-2xl);
          }

          .tips-list {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-lg);
            margin-top: var(--spacing-xl);
          }

          .tip-item {
            background: rgba(26, 26, 26, 0.6);
            border: 1px solid var(--color-cyber-secondary);
            border-radius: 8px;
            padding: var(--spacing-lg);
            backdrop-filter: blur(10px);
            transition: all var(--transition-normal);
          }

          .tip-item:hover {
            border-color: var(--color-nature-accent);
            box-shadow: 0 4px 20px rgba(107, 156, 66, 0.1);
            transform: translateX(4px);
          }

          .tip-header {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            margin-bottom: var(--spacing-md);
          }

          .tip-icon {
            color: var(--color-cyber-primary);
            font-size: 1.2rem;
            font-weight: bold;
          }

          .tip-title {
            font-size: 1.1rem;
            color: var(--text-primary);
            margin: 0;
          }

          .tip-description {
            font-size: 0.95rem;
            line-height: 1.7;
            color: var(--text-secondary);
            margin: 0;
          }

          /* Closing Section */
          .closing-section {
            margin-top: var(--spacing-2xl);
          }

          .closing-card {
            background: rgba(26, 26, 26, 0.6);
            border: 1px solid var(--color-cyber-secondary);
            border-radius: 8px;
            padding: var(--spacing-xl);
            backdrop-filter: blur(10px);
            text-align: center;
          }

          .closing-text {
            font-size: 1.05rem;
            line-height: 2;
            color: var(--text-secondary);
            margin: 0;
            font-style: italic;
          }

          /* Responsive */
          @media (max-width: 768px) {
            .game-master-container {
              padding: var(--spacing-md);
            }

            .page-title {
              font-size: 2rem;
            }

            .flow-grid {
              grid-template-columns: 1fr;
            }

            .authority-grid {
              grid-template-columns: 1fr;
            }
          }
        }
      `}</style>
    </div>
  );
}

export default GameMaster;
