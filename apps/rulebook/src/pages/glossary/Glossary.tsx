export function GlossaryPage() {
  return (
    <div className="glossary-container">
      <article className="glossary-content">
        <section className="header-section">
          <h1 className="page-title">
            <span className="title-icon">▶</span> 用語集
          </h1>
          <div className="header-divider"></div>
        </section>

        <section className="intro-section">
          <div className="intro-card">
            <p>
              Echo:500で使用される基本的な用語の説明。
              ゲームを理解するための基礎となる概念をここで確認できる。
            </p>
          </div>
        </section>

        <section className="terms-section">
          <div className="term-card">
            <h2 className="term-title">
              <span className="term-icon">◆</span> シナリオ
            </h2>
            <div className="term-content">
              <p className="term-definition">
                ゲームで遊ぶための物語の枠組みだ。
                状況設定、イベント、目標、展開などが記述されている。
              </p>
              <p className="term-description">
                シナリオは、プレイヤーが体験する物語の骨格を提供する。
              </p>
            </div>
          </div>

          <div className="term-card">
            <h2 className="term-title">
              <span className="term-icon">◆</span> ゲームマスター（GM）
            </h2>
            <div className="term-content">
              <p className="term-definition">
                セッションの進行役だ。
                シナリオを選び、プレイヤーを募集し、ゲームを進行させる。
              </p>
              <p className="term-description">
                GMは裁定者であり、語り部であり、共に遊ぶ仲間でもある。
                プレイヤーの行動に対して結果を描写し、判定を下し、物語を紡いでいく。
                ルールブックやシナリオより、その場のGMの判断が優先される。
                このゲームの成功条件は「楽しい時を過ごせたかどうか」であり、
                GMはそのための最適な判断を下す権限を持つ。
              </p>
            </div>
          </div>

          <div className="term-card">
            <h2 className="term-title">
              <span className="term-icon">◆</span> セッション
            </h2>
            <div className="term-content">
              <p className="term-definition">
                ゲームを実際に遊ぶ、一回のプレイのこと。
                GMとプレイヤーが集まり、シナリオに基づいて物語を進めていく。
              </p>
              <p className="term-description">
                セッションは、開始から終了までの一連のプレイを指す。
              </p>
            </div>
          </div>

          <div className="term-card">
            <h2 className="term-title">
              <span className="term-icon">◆</span> プレイヤー（PL）
            </h2>
            <div className="term-content">
              <p className="term-definition">
                ゲームに参加し、キャラクターを操作して物語を体験する人だ。
                GMが提示する状況に対して、自分のキャラクターの行動を宣言する。
              </p>
              <p className="term-description">
                プレイヤーは物語の主役だ。
                自分のキャラクター（PC）を通して、荒廃した世界を探索し、
                選択を重ね、物語を紡いでいく。
                プレイヤーの判断と行動が、物語の展開を大きく左右する。
              </p>
            </div>
          </div>

          <div className="term-card">
            <h2 className="term-title">
              <span className="term-icon">◆</span> プレイヤーキャラクター（PC）
            </h2>
            <div className="term-content">
              <p className="term-definition">
                プレイヤーが操作するキャラクターだ。
                プレイヤーの分身として、物語の中で行動し、成長していく。
              </p>
              <p className="term-description">
                Echo:500のPCは、文明崩壊後の世界で再稼働した人造人間（アンドロイド）だ。
                破損した記憶、失われた目的、終わった世界——そんな状況の中で、
                PCは自分が造られた意味を探して旅をする。
                タグとコマンドによって個性が表現され、選択と行動によって物語が紡がれる。
                PCはプレイヤーが演じる存在であり、プレイヤーの意思が反映される。
              </p>
            </div>
          </div>

          <div className="term-card">
            <h2 className="term-title">
              <span className="term-icon">◆</span>{' '}
              ノンプレイヤーキャラクター（NPC）
            </h2>
            <div className="term-content">
              <p className="term-definition">
                GMが操作するキャラクターの総称だ。
                PCが出会う人物、敵対者、協力者など、物語に登場するPC以外のキャラクターを指す。
              </p>
              <p className="term-description">
                NPCは物語に彩りを加える存在だ。
                情報を提供する案内人、立ちはだかる敵、共に旅をする仲間——
                NPCとの出会いや交流が、物語に深みを与える。
                Echo:500の世界では、他の再稼働したアンドロイド、変異した生物、
                遺跡に残された自動システムなど、様々なNPCが登場する。
                GMはNPCを演じることで、PCの行動に反応し、世界を生き生きと描写する。
              </p>
            </div>
          </div>
        </section>

        <section className="note-section">
          <div className="note-card">
            <div className="note-header">
              <span className="note-icon">※</span>
              <h3 className="note-title">用語の使い方について</h3>
            </div>
            <p className="note-text">
              これらの用語は、ゲームを円滑に進めるための共通言語だ。
              ただし、セッション内で別の呼び方をしても構わない。
              重要なのは、全員が意味を理解し、楽しく遊べることだ。
            </p>
          </div>
        </section>
      </article>

      <style>{`
        .glossary-container {
          max-width: 900px;
          margin: 0 auto;
          padding: var(--spacing-xl);
        }

        @scope {
          .glossary-content {
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
            margin: 0;
          }

          /* Terms Section */
          .terms-section {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-xl);
          }

          .term-card {
            background: rgba(26, 26, 26, 0.6);
            border: 1px solid var(--color-cyber-secondary);
            border-left: 4px solid var(--color-nature-accent);
            border-radius: 8px;
            padding: var(--spacing-xl);
            backdrop-filter: blur(10px);
            transition: all var(--transition-normal);
          }

          .term-card:hover {
            border-left-color: var(--color-cyber-primary);
            box-shadow: 0 4px 20px rgba(0, 255, 204, 0.1);
            transform: translateX(4px);
          }

          .term-title {
            font-size: 1.5rem;
            margin-bottom: var(--spacing-lg);
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            color: var(--text-primary);
          }

          .term-icon {
            color: var(--color-cyber-primary);
            font-size: 1.2rem;
          }

          .term-content {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
          }

          .term-definition {
            font-size: 1.1rem;
            font-weight: bold;
            color: var(--color-nature-accent);
            line-height: 1.7;
            margin: 0;
            padding: var(--spacing-md);
            background: rgba(107, 156, 66, 0.05);
            border-radius: 4px;
            border-left: 3px solid var(--color-nature-accent);
          }

          .term-description {
            font-size: 0.95rem;
            line-height: 1.8;
            color: var(--text-secondary);
            margin: 0;
          }

          /* Note Section */
          .note-section {
            margin-top: var(--spacing-2xl);
          }

          .note-card {
            background: rgba(26, 26, 26, 0.6);
            border: 1px solid var(--color-cyber-secondary);
            border-radius: 8px;
            padding: var(--spacing-xl);
            backdrop-filter: blur(10px);
          }

          .note-header {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            margin-bottom: var(--spacing-md);
          }

          .note-icon {
            font-size: 1.5rem;
            color: var(--color-cyber-primary);
          }

          .note-title {
            font-size: 1.1rem;
            color: var(--text-primary);
            margin: 0;
          }

          .note-text {
            font-size: 0.95rem;
            line-height: 1.8;
            color: var(--text-secondary);
            margin: 0;
          }

          /* Responsive */
          @media (max-width: 768px) {
            .glossary-container {
              padding: var(--spacing-md);
            }

            .page-title {
              font-size: 2rem;
            }

            .term-title {
              font-size: 1.3rem;
            }
          }
        }
      `}</style>
    </div>
  );
}
