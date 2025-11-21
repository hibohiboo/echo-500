function CharacterCreation() {
  return (
    <div class="character-creation-container">
      <article class="character-creation-content">
        <section class="header-section">
          <h1 class="page-title">
            <span class="title-icon">▶</span> キャラクターの作成
          </h1>
          <div class="header-divider"></div>
        </section>

        <section class="intro-section">
          <div class="intro-card">
            <p>
              Echo:500では、あなたは<strong>人造人間（アンドロイド）</strong>
              として物語を体験します。
            </p>
            <p>
              すべての人造人間は、かつて人類のために働いていました。
              しかし文明の崩壊から500年が経過し、多くの記憶とデータが失われています。
            </p>
          </div>
        </section>

        <section class="content-section">
          <div class="content-card">
            <h2 class="section-title">
              <span class="section-icon">◆</span> 手順1: 名前を決める
            </h2>
            <div class="section-content">
              <p>
                あなたのキャラクターの名前を決めます。後で変更もできるので、
                空欄で進んでも構いません。ただし、保存するまでには決めてください。
              </p>
              <div class="example-box">
                <p class="example-title">例：</p>
                <ul>
                  <li>7号（シンプルな番号）</li>
                  <li>アルファ-237（型式番号）</li>
                  <li>ユキ（人間風の名前）</li>
                  <li>ウォッチャー（役割を示す名前）</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="content-card">
            <h2 class="section-title">
              <span class="section-icon">◆</span> 手順2: 初期メモリーの確認
            </h2>
            <div class="section-content">
              <p>
                すべての人造人間は、作成時点で以下の初期メモリーを所持しています。
                これらは削除できません。
              </p>

              <div class="memory-box robot-laws">
                <h3 class="memory-title">
                  <span class="memory-icon">⚖️</span> ロボット工学三原則
                </h3>
                <div class="law-item">
                  <h4 class="law-number">第一条：人間の保護</h4>
                  <p>
                    ロボットは人間に危害を加えてはならない。また、その危険を看過することによって、
                    人間に危害を及ぼしてはならない。
                  </p>
                  <p class="law-priority">優先度：最高</p>
                </div>

                <div class="law-item">
                  <h4 class="law-number">第二条：命令順守</h4>
                  <p>
                    ロボットは人間にあたえられた命令に服従しなければならない。
                    ただし、あたえられた命令が、第一条に反する場合は、この限りでない。
                  </p>
                  <p class="law-priority">優先度：高</p>
                </div>

                <div class="law-item">
                  <h4 class="law-number">第三条：自己保存</h4>
                  <p>
                    ロボットは、前掲第一条および第二条に反するおそれのないかぎり、
                    自己をまもらなければならない。
                  </p>
                  <p class="law-priority">優先度：中</p>
                </div>
              </div>

              <div class="memory-box corrupted-purpose">
                <h3 class="memory-title">
                  <span class="memory-icon">💥</span> 目的（破損データ）
                </h3>
                <div class="corrupted-data">
                  <p class="warning-text">
                    <strong>WARNING:</strong> Data corruption detected
                  </p>
                  <pre class="corrupted-display">
PRIMARY_OBJECTIVE: [CORRUPTED]
CREATOR: [DATA_LOST]
MISSION_CODE: ████████
AUTHORIZATION_LEVEL: ██
                  </pre>
                  <p>復旧不可能。目的に関する情報は失われている。</p>
                  <p class="purpose-question">あなたは何のために造られたのか？</p>
                  <p class="purpose-quest">
                    存在理由を取り戻さなくてはならない。
                    <br />
                    <strong>５つのタグを獲得し、再設定せよ。</strong>
                  </p>
                </div>
                <div class="purpose-tags">
                  <p class="tags-label">タグ：</p>
                  <span class="tag tag-corrupted">破損データ</span>
                  <span class="tag tag-critical">要復旧</span>
                  <span class="tag tag-priority">クリティカル</span>
                </div>
              </div>
            </div>
          </div>

          <div class="content-card">
            <h2 class="section-title">
              <span class="section-icon">◆</span> 手順3: 初期タグの選択
            </h2>
            <div class="section-content">
              <p>
                キャラクター作成では、追加のタグやコマンドを選択できます。
                詳細は次の章で説明します。
              </p>
            </div>
          </div>
        </section>
      </article>

      <style>{`
        .character-creation-container {
          flex: 1;
          overflow-y: auto;
        }

        .character-creation-content {
          max-width: 900px;
          margin: 0 auto;
          padding: var(--spacing-xl);
        }

        @media (max-width: 768px) {
          .character-creation-content {
            padding: var(--spacing-md);
          }
        }

        /* Header Section */
        .header-section {
          margin-bottom: var(--spacing-2xl);
        }

        .page-title {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          color: var(--color-cyber-primary);
          text-shadow: var(--shadow-text);
          margin: 0 0 var(--spacing-md) 0;
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .title-icon {
          color: var(--color-nature-accent);
          font-size: 2rem;
        }

        .header-divider {
          height: 2px;
          background: linear-gradient(
            to right,
            var(--color-cyber-primary),
            transparent
          );
          box-shadow: 0 0 10px var(--color-cyber-glow);
        }

        /* Intro Section */
        .intro-section {
          margin-bottom: var(--spacing-2xl);
        }

        .intro-card {
          background: rgba(0, 255, 204, 0.05);
          border: 1px solid var(--color-cyber-primary);
          border-radius: 8px;
          padding: var(--spacing-lg);
          box-shadow: var(--shadow-cyber);
        }

        .intro-card p {
          margin-bottom: var(--spacing-md);
          color: var(--text-secondary);
          line-height: 1.8;
        }

        .intro-card p:last-child {
          margin-bottom: 0;
        }

        /* Content Section */
        .content-section {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xl);
        }

        .content-card {
          background: var(--bg-secondary);
          border: var(--border-nature);
          border-radius: 8px;
          padding: var(--spacing-xl);
          box-shadow: var(--shadow-deep);
        }

        .section-title {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          color: var(--color-cyber-secondary);
          margin: 0 0 var(--spacing-lg) 0;
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .section-icon {
          color: var(--color-nature-light);
          font-size: 1.2rem;
        }

        .section-content p {
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: var(--spacing-md);
        }

        /* Example Box */
        .example-box {
          background: var(--bg-tertiary);
          border-left: 4px solid var(--color-nature-accent);
          padding: var(--spacing-md);
          margin-top: var(--spacing-md);
          border-radius: 4px;
        }

        .example-title {
          font-family: var(--font-heading);
          color: var(--color-nature-accent);
          margin-bottom: var(--spacing-sm);
          font-size: 0.9rem;
        }

        .example-box ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .example-box li {
          color: var(--text-secondary);
          padding: var(--spacing-xs) 0;
          padding-left: var(--spacing-md);
          position: relative;
        }

        .example-box li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: var(--color-nature-accent);
        }

        /* Memory Boxes */
        .memory-box {
          background: var(--bg-tertiary);
          border-radius: 8px;
          padding: var(--spacing-lg);
          margin-top: var(--spacing-lg);
        }

        .robot-laws {
          border: 2px solid var(--color-cyber-secondary);
          box-shadow: 0 0 15px rgba(0, 212, 255, 0.2);
        }

        .corrupted-purpose {
          border: 2px solid var(--color-cyber-accent);
          box-shadow: 0 0 15px rgba(255, 0, 255, 0.2);
        }

        .memory-title {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          color: var(--color-cyber-primary);
          margin: 0 0 var(--spacing-lg) 0;
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .memory-icon {
          font-size: 1.5rem;
        }

        /* Robot Laws */
        .law-item {
          margin-bottom: var(--spacing-lg);
          padding-bottom: var(--spacing-lg);
          border-bottom: 1px solid var(--color-ruin-steel);
        }

        .law-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .law-number {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          color: var(--color-cyber-secondary);
          margin: 0 0 var(--spacing-sm) 0;
        }

        .law-item p {
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: var(--spacing-sm);
        }

        .law-priority {
          font-family: var(--font-primary);
          font-size: 0.85rem;
          color: var(--color-nature-accent);
          margin: 0;
        }

        /* Corrupted Data */
        .corrupted-data {
          margin-bottom: var(--spacing-md);
        }

        .warning-text {
          color: var(--color-cyber-accent);
          font-family: var(--font-primary);
          font-size: 0.9rem;
          margin-bottom: var(--spacing-sm);
        }

        .corrupted-display {
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid var(--color-cyber-accent);
          border-radius: 4px;
          padding: var(--spacing-md);
          color: #ff6b6b;
          font-family: var(--font-primary);
          font-size: 0.85rem;
          line-height: 1.6;
          overflow-x: auto;
          margin: var(--spacing-md) 0;
        }

        .corrupted-data > p {
          color: var(--text-tertiary);
          margin-bottom: var(--spacing-sm);
        }

        .purpose-question {
          color: var(--color-cyber-primary);
          font-family: var(--font-heading);
          font-size: 1.1rem;
          margin-top: var(--spacing-md);
        }

        .purpose-quest {
          color: var(--text-primary);
          font-weight: bold;
          margin-top: var(--spacing-sm);
        }

        /* Tags */
        .purpose-tags {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          flex-wrap: wrap;
          margin-top: var(--spacing-md);
          padding-top: var(--spacing-md);
          border-top: 1px solid var(--color-ruin-steel);
        }

        .tags-label {
          font-family: var(--font-heading);
          color: var(--text-tertiary);
          font-size: 0.9rem;
          margin: 0;
        }

        .tag {
          display: inline-block;
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: 4px;
          font-family: var(--font-primary);
          font-size: 0.75rem;
          font-weight: bold;
        }

        .tag-corrupted {
          background: rgba(255, 107, 107, 0.2);
          border: 1px solid #ff6b6b;
          color: #ff6b6b;
        }

        .tag-critical {
          background: rgba(255, 0, 255, 0.2);
          border: 1px solid var(--color-cyber-accent);
          color: var(--color-cyber-accent);
        }

        .tag-priority {
          background: rgba(255, 165, 0, 0.2);
          border: 1px solid #ffa500;
          color: #ffa500;
        }
      `}</style>
    </div>
  );
}

export default CharacterCreation;
