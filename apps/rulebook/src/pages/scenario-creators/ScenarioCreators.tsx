function ScenarioCreators() {
  return (
    <div class="scenario-creators-container">
      <article class="scenario-creators-content">
        <section class="header-section">
          <h1 class="page-title">
            <span class="title-icon">▶</span> シナリオ製作者向け
          </h1>
          <div class="header-divider"></div>
        </section>

        <section class="intro-section">
          <div class="intro-card">
            <h2 class="section-title">製作者の負担を軽減する設計</h2>
            <p>
              Echo:500は、シナリオ製作者の負担をできるだけ少なくするための工夫を施している。
              タグ駆動のイベントシステムとモジュール構造により、シナリオの骨格を素早く構築でき、
              細部の調整に集中できる仕組みとなっている。
            </p>
          </div>
        </section>

        <section class="methods-section">
          <div class="method-card">
            <h2 class="section-title">
              <span class="title-icon">◆</span> コンストラクション
            </h2>
            <p>
              あらかじめ用意されたシナリオアーキタイプをベースに、文言やイベントを差し替えてシナリオを作成する手法だ。
              骨格となる構造は既に完成しているため、世界観やキャラクター、固有のイベント設計に注力できる。
              初めてのシナリオ製作や、短時間でのシナリオ作成に適している。
            </p>
          </div>

          <div class="method-card">
            <h2 class="section-title">
              <span class="title-icon">◆</span> フルスクラッチ
            </h2>
            <p>
              制約なく自由にシナリオを作成するスタイルだ。
              モジュールの組み合わせ、独自のコマンド定義、タグシステムの活用など、
              Echo:500の機能を最大限に活用して、オリジナリティの高いシナリオを構築できる。
              システムへの理解が深まった後に、独自の体験を創り出したい場合に適している。
            </p>
          </div>
        </section>

        <section class="archetypes-section">
          <h2 class="section-title">
            <span class="title-icon">▶</span> シナリオアーキタイプ
          </h2>
          <p class="section-description">
            コンストラクション用に用意されたアーキタイプの一覧だ。
            シナリオの方向性に合わせて選択し、カスタマイズすることで効率的にシナリオを構築できる。
          </p>

          <div class="archetypes-grid">
            <div class="archetype-card">
              <h3 class="archetype-title">ソロジャーナル</h3>
              <div class="archetype-meta">
                <span class="meta-item">人数: 1人</span>
                <span class="meta-item">戦闘: なし / 簡易</span>
              </div>
              <p class="archetype-description">
                一人のPCが荒廃した世界を探索する。
                内省的な物語や、静謐な世界観の表現に適したアーキタイプだ。
                戦闘は控えめで、発見や思索に重点を置く。
              </p>
            </div>

            <div class="archetype-card">
              <h3 class="archetype-title">アドベンチャー</h3>
              <div class="archetype-meta">
                <span class="meta-item">戦闘: なし / 簡易</span>
                <span class="meta-item">重点: 選択肢</span>
              </div>
              <p class="archetype-description">
                PCの選択が物語を大きく左右する。
                分岐が豊富で、プレイヤーの判断が結末に影響を与える構造だ。
                戦闘よりも、意思決定と結果の体験を重視する。
              </p>
            </div>

            <div class="archetype-card">
              <h3 class="archetype-title">モーメント</h3>
              <div class="archetype-meta">
                <span class="meta-item">戦闘: なし</span>
                <span class="meta-item">重点: キャラクター表現</span>
              </div>
              <p class="archetype-description">
                発生する小さなイベントに、キャラクターがどう反応するかを楽しむ。
                釣り表・採取表などのランダム要素を中心に、戦闘は発生しない。
                積み重なる “一瞬” が、キャラクターの輪郭を描き出す。
              </p>
            </div>

            <div class="archetype-card">
              <h3 class="archetype-title">バスター</h3>
              <div class="archetype-meta">
                <span class="meta-item">モジュール: 戦闘</span>
                <span class="meta-item">構成: シンプル</span>
              </div>
              <p class="archetype-description">
                事情説明のオープニング、戦闘、エンディングというシンプルな構成だ。
                戦闘モジュールを使用し、タクティカルな戦いを提供する。
                物語よりも戦術と緊張感を重視したアーキタイプだ。
              </p>
            </div>

            <div class="archetype-card">
              <h3 class="archetype-title">ジャーニー</h3>
              <div class="archetype-meta">
                <span class="meta-item">テーマ: 旅</span>
                <span class="meta-item">モジュール: 探索</span>
              </div>
              <p class="archetype-description">
                目的地へ向かう旅路を描く。
                探索モジュールを使用し、道中の発見や出会いを積み重ねていく構造だ。
                移動と探索の過程自体が物語となる。
              </p>
            </div>

            <div class="archetype-card">
              <h3 class="archetype-title">ハック&スラッシュ</h3>
              <div class="archetype-meta">
                <span class="meta-item">モジュール: 探索 + 戦闘</span>
                <span class="meta-item">重点: リソース管理</span>
              </div>
              <p class="archetype-description">
                閉鎖空間の探索に特化したアーキタイプだ。
                マッピング、罠の解除、限られたリソースでの進行など、
                古典的なダンジョン探索の要素を取り入れている。
                探索モジュールと戦闘モジュールの両方を使用し、
                資源管理と戦術の両面を求められる構造だ。
              </p>
            </div>

            <div class="archetype-card">
              <h3 class="archetype-title">サンドボックス</h3>
              <div class="archetype-meta">
                <span class="meta-item">自由度: 高</span>
                <span class="meta-item">テーマ: 箱庭</span>
              </div>
              <p class="archetype-description">
                指定された範囲で自由に行動できる箱庭型のシナリオだ。
                明確な目的はあるが、達成手段はプレイヤーに委ねられる。
                高い自由度と、それを支える豊富なイベント・NPC配置が特徴だ。
              </p>
            </div>
          </div>
        </section>

        <section class="tools-section" style="display:none;">
          <div class="tools-card">
            <h2 class="section-title">
              <span class="title-icon">▶</span> 製作支援ツール
            </h2>
            <p>
              モジュールシステム、タグ駆動イベント、コマンド定義など、
              シナリオ製作を効率化する各種機能の詳細は、
              関連ドキュメントを参照すること。
            </p>
            <div class="tools-links">
              <a class="tool-link" href="#">
                <span class="link-icon">›</span>
                <span>モジュールシステム</span>
              </a>
              <a class="tool-link" href="#">
                <span class="link-icon">›</span>
                <span>タグシステム</span>
              </a>
              <a class="tool-link" href="#">
                <span class="link-icon">›</span>
                <span>コマンド定義</span>
              </a>
            </div>
          </div>
        </section>
      </article>

      <style>{`
        .scenario-creators-container {
          max-width: 900px;
          margin: 0 auto;
          padding: var(--spacing-xl);
        }

        @scope {
          .scenario-creators-content {
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

          /* Methods Section */
          .methods-section {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-lg);
          }

          .method-card {
            background: rgba(26, 26, 26, 0.6);
            border: 1px solid var(--color-nature-secondary);
            border-left: 4px solid var(--color-nature-accent);
            border-radius: 8px;
            padding: var(--spacing-xl);
            backdrop-filter: blur(10px);
            transition: all var(--transition-normal);
          }

          .method-card:hover {
            border-left-color: var(--color-cyber-primary);
            box-shadow: 0 4px 20px rgba(0, 255, 204, 0.1);
            transform: translateX(4px);
          }

          .method-card p {
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

          /* Archetypes Section */
          .archetypes-section {
            margin-top: var(--spacing-2xl);
          }

          .section-description {
            line-height: 1.8;
            color: var(--text-secondary);
            margin-bottom: var(--spacing-xl);
          }

          .archetypes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: var(--spacing-lg);
          }

          .archetype-card {
            background: rgba(26, 26, 26, 0.6);
            border: 1px solid var(--color-cyber-secondary);
            border-radius: 8px;
            padding: var(--spacing-lg);
            backdrop-filter: blur(10px);
            transition: all var(--transition-normal);
          }

          .archetype-card:hover {
            border-color: var(--color-cyber-primary);
            box-shadow: 0 4px 20px rgba(0, 255, 204, 0.15);
            transform: translateY(-4px);
          }

          .archetype-title {
            font-size: 1.3rem;
            color: var(--color-cyber-primary);
            margin-bottom: var(--spacing-md);
          }

          .archetype-meta {
            display: flex;
            flex-wrap: wrap;
            gap: var(--spacing-sm);
            margin-bottom: var(--spacing-md);
          }

          .meta-item {
            font-size: 0.85rem;
            color: var(--text-tertiary);
            background: rgba(0, 255, 204, 0.1);
            padding: var(--spacing-xs) var(--spacing-sm);
            border-radius: 4px;
            border: 1px solid var(--color-cyber-secondary);
          }

          .archetype-description {
            font-size: 0.95rem;
            line-height: 1.7;
            color: var(--text-secondary);
            margin: 0;
          }

          /* Tools Section */
          .tools-section {
            margin-top: var(--spacing-2xl);
          }

          .tools-card {
            background: rgba(26, 26, 26, 0.6);
            border: 1px solid var(--color-nature-secondary);
            border-left: 4px solid var(--color-nature-accent);
            border-radius: 8px;
            padding: var(--spacing-xl);
            backdrop-filter: blur(10px);
          }

          .tools-card p {
            line-height: 1.8;
            color: var(--text-secondary);
            margin-bottom: var(--spacing-lg);
          }

          .tools-links {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-sm);
          }

          .tool-link {
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

          .tool-link:hover {
            background: rgba(0, 255, 204, 0.1);
            border-color: var(--color-cyber-primary);
            box-shadow: var(--shadow-cyber);
            transform: translateX(4px);
          }

          .link-icon {
            color: var(--color-cyber-primary);
            font-size: 1.2rem;
            font-weight: bold;
          }

          /* Responsive */
          @media (max-width: 768px) {
            .scenario-creators-container {
              padding: var(--spacing-md);
            }

            .page-title {
              font-size: 2rem;
            }

            .archetypes-grid {
              grid-template-columns: 1fr;
            }
          }
        }
      `}</style>
    </div>
  );
}

export default ScenarioCreators;
