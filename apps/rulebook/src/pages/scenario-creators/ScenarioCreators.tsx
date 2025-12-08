export function ScenarioCreatorsPage() {
  return (
    <div className="scenario-creators-container">
      <article className="scenario-creators-content">
        <section className="header-section">
          <h1 className="page-title">
            <span className="title-icon">▶</span> シナリオ製作者向け
          </h1>
          <div className="header-divider"></div>
        </section>

        <section className="methods-section">
          <div className="method-card">
            <h2 className="section-title">
              <span className="title-icon">◆</span> コンストラクション
            </h2>
            <p>
              あらかじめ用意されたシナリオアーキタイプをベースに、文言やイベントを差し替えてシナリオを作成する手法だ。
              骨格となる構造は既に完成しているため、世界観やキャラクター、固有のイベント設計に注力できる。
              初めてのシナリオ製作や、短時間でのシナリオ作成に適している。
            </p>
          </div>

          <div className="method-card">
            <h2 className="section-title">
              <span className="title-icon">◆</span> フルスクラッチ
            </h2>
            <p>
              制約なく自由にシナリオを作成するスタイルだ。
              モジュールの組み合わせ、独自のコマンド定義、タグシステムの活用など、
              Echo:500の機能を最大限に活用して、オリジナリティの高いシナリオを構築できる。
              システムへの理解が深まった後に、独自の体験を創り出したい場合に適している。
            </p>
          </div>
        </section>

        <section className="archetypes-section">
          <h2 className="section-title">
            <span className="title-icon">▶</span> シナリオアーキタイプ
          </h2>
          <p className="section-description">
            コンストラクション用に用意されたアーキタイプの一覧だ。
            シナリオの方向性に合わせて選択し、カスタマイズすることで効率的にシナリオを構築できる。
          </p>

          <div className="archetypes-grid">
            <div className="archetype-card">
              <h3 className="archetype-title">ソロジャーナル</h3>
              <div className="archetype-meta">
                <span className="meta-item">人数: 1人</span>
                <span className="meta-item">戦闘: なし / 簡易</span>
              </div>
              <p className="archetype-description">
                一人のPCが荒廃した世界を歩き、記録し、思索するためのアーキタイプ。
                静謐な情景描写や内省的な物語表現に向いている。
                戦闘は控えめで、発見と心の動きを丁寧に描く構造だ。
                GM不在でも遊べるのが大きな特徴でもある。
              </p>
            </div>

            <div className="archetype-card">
              <h3 className="archetype-title">アドベンチャー</h3>
              <div className="archetype-meta">
                <span className="meta-item">戦闘: なし / 簡易</span>
                <span className="meta-item">重点: 選択肢</span>
              </div>
              <p className="archetype-description">
                PCの選択が物語の行方を大きく変えていくアーキタイプ。
                分岐が多く、プレイヤーの判断が直接結末に影響する。
                戦闘よりも意思決定とその余波を体験することに重きを置く。
              </p>
            </div>

            <div className="archetype-card">
              <h3 className="archetype-title">モーメント</h3>
              <div className="archetype-meta">
                <span className="meta-item">戦闘: なし</span>
                <span className="meta-item">重点: キャラクター表現</span>
              </div>
              <p className="archetype-description">
                発生する小さなイベントに、キャラクターがどう反応するかを楽しむ。
                釣り表・採取表などのランダム要素を中心に、戦闘は発生しない。
                積み重なる "一瞬" が、キャラクターの輪郭を描き出す。
              </p>
            </div>

            <div className="archetype-card">
              <h3 className="archetype-title">バスター</h3>
              <div className="archetype-meta">
                <span className="meta-item">モジュール: 戦闘</span>
                <span className="meta-item">構成: シンプル</span>
              </div>
              <p className="archetype-description">
                オープニング（状況説明）→戦闘→エンディングという明快な三幕構成。
                戦闘モジュールを用い、タクティカルな戦いと緊張感を前面に押し出す。
                物語性よりも戦術と決断の一瞬にフォーカスしたアーキタイプだ。
              </p>
            </div>

            <div className="archetype-card">
              <h3 className="archetype-title">ジャーニー</h3>
              <div className="archetype-meta">
                <span className="meta-item">テーマ: 旅</span>
                <span className="meta-item">モジュール: 探索</span>
              </div>
              <p className="archetype-description">
                目的地を目指す旅路そのものを描くアーキタイプ。
                探索モジュールを使用し、道中での発見・交流・寄り道が物語を形作る。
                移動と探索のプロセスが体験の中心となる。
              </p>
            </div>

            <div className="archetype-card">
              <h3 className="archetype-title">ハック&スラッシュ</h3>
              <div className="archetype-meta">
                <span className="meta-item">モジュール: 探索 + 戦闘</span>
                <span className="meta-item">重点: リソース管理</span>
              </div>
              <p className="archetype-description">
                閉鎖空間の踏破に特化したアーキタイプ。
                マッピング、罠、限られたリソース管理など、古典的ダンジョン探索を踏襲する。
                探索モジュール＋戦闘モジュールを併用し、リソース管理と戦術の両方が試される構造だ。
              </p>
            </div>

            <div className="archetype-card">
              <h3 className="archetype-title">サンドボックス</h3>
              <div className="archetype-meta">
                <span className="meta-item">自由度: 高</span>
                <span className="meta-item">テーマ: 箱庭</span>
              </div>
              <p className="archetype-description">
                指定された範囲を自由に行動できる箱庭型アーキタイプ。
                明確な目標は提示されるが、達成方法はプレイヤーに委ねられる。
                高い自由度と、それを支える豊富なイベント・NPC配置が特徴となる。
              </p>
            </div>
          </div>
        </section>

        <section className="tools-section" style={{ display: 'none' }}>
          <div className="tools-card">
            <h2 className="section-title">
              <span className="title-icon">▶</span> 製作支援ツール
            </h2>
            <p>
              モジュールシステム、タグ駆動イベント、コマンド定義など、
              シナリオ製作を効率化する各種機能の詳細は、
              関連ドキュメントを参照すること。
            </p>
            <div className="tools-links">
              <a className="tool-link" href="#">
                <span className="link-icon">›</span>
                <span>モジュールシステム</span>
              </a>
              <a className="tool-link" href="#">
                <span className="link-icon">›</span>
                <span>タグシステム</span>
              </a>
              <a className="tool-link" href="#">
                <span className="link-icon">›</span>
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
