function BattleRules() {
  return (
    <div class="battle-rules-container">
      <article class="battle-rules-content">
        <section class="header-section">
          <h1 class="page-title">
            <span class="title-icon">▶</span> 戦闘ルール
          </h1>
          <div class="header-divider"></div>
        </section>

        <section class="intro-section">
          <div class="intro-card">
            <p>Echo:500の戦闘は、カウンターボードとエリアマップを使用する。</p>
          </div>
        </section>

        <section class="preparation-section">
          <h2 class="section-title">
            <span class="title-icon">▶</span> 戦闘準備
          </h2>

          <div class="step-list">
            <div class="step-item">
              <div class="step-header">
                <span class="step-number">01</span>
                <h3 class="step-title">終了条件の確認</h3>
              </div>
              <div class="step-content">
                <p class="step-description">
                  戦闘開始前に、終了条件を明確にする。
                  GMが勝利条件と敗北条件を宣言し、全員で確認する。
                </p>
                <div class="example-box">
                  <div class="example-title">終了条件の例</div>
                  <ul class="example-list">
                    <li>勝利条件: ボスの戦闘不能</li>
                    <li>敗北条件: 全PCの戦闘不能</li>
                    <li>時間制限: カウンター50到達で敵増援</li>
                    <li>特殊条件: 特定のオブジェクト破壊</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="step-item">
              <div class="step-header">
                <span class="step-number">02</span>
                <h3 class="step-title">戦闘エリアへの配置</h3>
              </div>
              <div class="step-content">
                <p class="step-description">
                  GMから配置を開始する。敵キャラクターを戦闘エリアに配置した後、
                  PLがPCを配置する。配置位置はシナリオやGMの指示に従う。
                </p>
              </div>
            </div>

            <div class="step-item">
              <div class="step-header">
                <span class="step-number">03</span>
                <h3 class="step-title">カウンターボードへの配置</h3>
              </div>
              <div class="step-content">
                <p class="step-description">
                  カウンターボードにコマを配置する。キャラクターの「初期カウント」の位置にコマを置く。
                  同じ位置に複数のコマが配置される場合は、積み上げるように配置する。どのコマを上にするかはPLGMで相談して決める。
                </p>
                <div class="note-box">
                  <span class="note-icon">※</span>
                  <span class="note-text">
                    積まれたコマは、上から順に手番を得る。
                  </span>
                </div>
              </div>
            </div>

            <div class="step-item">
              <div class="step-header">
                <span class="step-number">04</span>
                <h3 class="step-title">カウンターカーソルの配置</h3>
              </div>
              <div class="step-content">
                <p class="step-description">
                  カウンターカーソルをカウンターボードの0の位置に置く。
                  これが現在カウントを表す目印となる。
                </p>
              </div>
            </div>

            <div class="step-item">
              <div class="step-header">
                <span class="step-number">05</span>
                <h3 class="step-title">戦闘コマンド手札の準備</h3>
              </div>
              <div class="step-content">
                <p class="step-description">
                  各PLは、自分のキャラクターのモジュールのうち
                  「戦闘コマンド」タグを持つものを手札として手元に用意する。
                  これらが戦闘中に使用可能なコマンドとなる。
                </p>
              </div>
            </div>
          </div>

          <div class="ready-box">
            <div class="ready-icon">✓</div>
            <div class="ready-text">これで戦闘開始の準備が整った。</div>
          </div>
        </section>

        <section class="flow-section">
          <h2 class="section-title">
            <span class="title-icon">▶</span> 戦闘の流れ
          </h2>

          <div class="flow-description">
            <p>
              カウンターカーソルの位置にあるコマのキャラクターが手番を得る。
              手番を得たキャラクターは行動し、その後カウンターは進んでいく。
            </p>
          </div>

          <div class="flow-steps">
            <div class="flow-step">
              <div class="flow-step-number">1</div>
              <div class="flow-step-content">
                <h3 class="flow-step-title">手番の取得</h3>
                <p class="flow-step-text">
                  カウンターカーソルがある位置の、積まれたコマの一番上のキャラクターが手番を得る。
                  そのキャラクターを操作するプレイヤー（またはGM）が行動を宣言する。
                </p>
              </div>
            </div>

            <div class="flow-step">
              <div class="flow-step-number">2</div>
              <div class="flow-step-content">
                <h3 class="flow-step-title">手札の使用</h3>
                <p class="flow-step-text">
                  手番を得たキャラクターは、タイミング「手番」の手札を使用できる。
                  使用したコマンドのコスト分だけ、自分のコマをカウンターボード上で前進させる。
                </p>
                <div class="example-inline">
                  例: コスト3のコマンドを使用 →
                  現在位置から3マス進んだ位置にコマを移動
                </div>
              </div>
            </div>

            <div class="flow-step">
              <div class="flow-step-number">3</div>
              <div class="flow-step-content">
                <h3 class="flow-step-title">カウンターカーソルの進行</h3>
                <p class="flow-step-text">
                  カウンターカーソルの位置にコマがなくなったら、
                  カウンターカーソルを1進める。次のコマがある位置まで進み続ける。
                </p>
              </div>
            </div>

            <div class="flow-step">
              <div class="flow-step-number">4</div>
              <div class="flow-step-content">
                <h3 class="flow-step-title">繰り返し</h3>
                <p class="flow-step-text">
                  ステップ1に戻り、終了条件を満たすまで繰り返す。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="area-section">
          <h2 class="section-title">
            <span class="title-icon">▶</span> 戦闘エリア
          </h2>

          <div class="area-description">
            <p>
              戦闘エリアは10×10のグリッドで構成される。
              位置を示す座標系は、縦の列を算用数字（0〜9）、横の行を漢数字（零〜九）で表す。
            </p>
          </div>

          <div class="coordinate-info">
            <div class="coordinate-card">
              <h3 class="coordinate-title">座標の読み方</h3>
              <ul class="coordinate-list">
                <li>
                  <span class="coordinate-label">左上</span>
                  <span class="coordinate-value">0零</span>
                </li>
                <li>
                  <span class="coordinate-label">右下</span>
                  <span class="coordinate-value">9九</span>
                </li>
              </ul>
            </div>

            <div class="coordinate-visual">
              <div class="grid-example">
                <div class="grid-header">
                  <span class="grid-label-corner"></span>
                  <span class="grid-label">0</span>
                  <span class="grid-label">1</span>
                  <span class="grid-label">2</span>
                  <span class="grid-label">...</span>
                  <span class="grid-label">9</span>
                </div>
                <div class="grid-row">
                  <span class="grid-label">零</span>
                  <span class="grid-cell highlight">0零</span>
                  <span class="grid-cell">1零</span>
                  <span class="grid-cell">2零</span>
                  <span class="grid-cell">...</span>
                  <span class="grid-cell">9零</span>
                </div>
                <div class="grid-row">
                  <span class="grid-label">一</span>
                  <span class="grid-cell">0一</span>
                  <span class="grid-cell">1一</span>
                  <span class="grid-cell">2一</span>
                  <span class="grid-cell">...</span>
                  <span class="grid-cell">9一</span>
                </div>
                <div class="grid-row">
                  <span class="grid-label">二</span>
                  <span class="grid-cell">0二</span>
                  <span class="grid-cell">1二</span>
                  <span class="grid-cell">2二</span>
                  <span class="grid-cell">...</span>
                  <span class="grid-cell">9二</span>
                </div>
                <div class="grid-row">
                  <span class="grid-label">...</span>
                  <span class="grid-cell">...</span>
                  <span class="grid-cell">...</span>
                  <span class="grid-cell">...</span>
                  <span class="grid-cell">...</span>
                  <span class="grid-cell">...</span>
                </div>
                <div class="grid-row">
                  <span class="grid-label">九</span>
                  <span class="grid-cell">0九</span>
                  <span class="grid-cell">1九</span>
                  <span class="grid-cell">2九</span>
                  <span class="grid-cell">...</span>
                  <span class="grid-cell highlight">9九</span>
                </div>
              </div>
            </div>
          </div>

          <div class="occupation-rules">
            <h3 class="subsection-title">
              <span class="subsection-icon">◆</span> マス占有ルール
            </h3>
            <ul class="rule-list">
              <li>
                <span class="rule-bullet">•</span>
                <span class="rule-text">
                  キャラクターは1マス以上を占有する。大型キャラクターは複数マスを占有する場合がある。
                </span>
              </li>
              <li>
                <span class="rule-bullet">•</span>
                <span class="rule-text">
                  占有されているマスに他のキャラクターが入ることはできない。
                </span>
              </li>
              <li>
                <span class="rule-bullet">•</span>
                <span class="rule-text">
                  占有されているマスの通過は占有しているキャラクターの許可があれば可能。移動経路上に味方がいても、そこで停止しない限り通り抜けられる。
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section class="tips-section">
          <h2 class="section-title">
            <span class="title-icon">▶</span> 戦闘のポイント
          </h2>

          <div class="tips-grid">
            <div class="tip-card">
              <h3 class="tip-title">
                <span class="tip-icon">›</span> コスト管理
              </h3>
              <p class="tip-text">
                コストが小さいコマンドは早く次の手番が回ってくるが、効果も控えめだ。
                コストが大きいコマンドは強力だが、次の手番まで時間がかかる。
                状況に応じた使い分けが勝利への鍵となる。
              </p>
            </div>

            <div class="tip-card">
              <h3 class="tip-title">
                <span class="tip-icon">›</span> 位置取り
              </h3>
              <p class="tip-text">
                戦闘エリアでの位置は戦術的に重要だ。
                射程、移動力、地形効果などを考慮し、有利な位置を確保する。
                包囲、遮蔽、挟撃など、位置関係を活用した戦術が有効だ。
              </p>
            </div>

            <div class="tip-card">
              <h3 class="tip-title">
                <span class="tip-icon">›</span> 手番順の予測
              </h3>
              <p class="tip-text">
                カウンターボードを見れば、誰がいつ動くかが一目瞭然だ。
                敵の行動タイミングを予測し、先手を打つか後手で対応するか、
                考えよう。
              </p>
            </div>

            <div class="tip-card">
              <h3 class="tip-title">
                <span class="tip-icon">›</span> 連携プレイ
              </h3>
              <p class="tip-text">
                複数のPCが協力することで、強大な敵にも対抗できる。
                手番順を調整し、コンボを狙い、互いをサポートする。
                チームワークが戦闘の勝敗を分ける。
              </p>
            </div>
          </div>
        </section>
      </article>

      <style>{`
        .battle-rules-container {
          max-width: 900px;
          margin: 0 auto;
          padding: var(--spacing-xl);
        }

        @scope {
          .battle-rules-content {
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

          .section-title {
            font-size: 1.5rem;
            margin-bottom: var(--spacing-xl);
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            color: var(--text-primary);
          }

          /* Preparation Section */
          .preparation-section {
            margin-top: var(--spacing-2xl);
          }

          .step-list {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-xl);
          }

          .step-item {
            background: rgba(26, 26, 26, 0.6);
            border: 1px solid var(--color-cyber-secondary);
            border-left: 4px solid var(--color-nature-accent);
            border-radius: 8px;
            padding: var(--spacing-xl);
            backdrop-filter: blur(10px);
          }

          .step-header {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-md);
          }

          .step-number {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--color-cyber-primary);
            font-family: var(--font-heading);
            min-width: 3rem;
          }

          .step-title {
            font-size: 1.3rem;
            color: var(--text-primary);
            margin: 0;
          }

          .step-content {
            margin-left: calc(3rem + var(--spacing-md));
          }

          .step-description {
            line-height: 1.8;
            color: var(--text-secondary);
            margin-bottom: var(--spacing-md);
          }

          .example-box {
            background: rgba(0, 255, 204, 0.05);
            border: 1px solid var(--color-cyber-secondary);
            border-radius: 4px;
            padding: var(--spacing-md);
            margin-top: var(--spacing-md);
          }

          .example-title {
            font-size: 0.9rem;
            color: var(--color-cyber-primary);
            margin-bottom: var(--spacing-sm);
            font-weight: bold;
          }

          .example-list {
            list-style: none;
            margin: 0;
            padding: 0;
            color: var(--text-secondary);
            font-size: 0.9rem;
          }

          .example-list li {
            padding: var(--spacing-xs) 0;
            padding-left: var(--spacing-md);
            position: relative;
          }

          .example-list li::before {
            content: '›';
            position: absolute;
            left: 0;
            color: var(--color-nature-accent);
          }

          .note-box {
            display: flex;
            align-items: flex-start;
            gap: var(--spacing-sm);
            background: rgba(107, 156, 66, 0.05);
            border-left: 3px solid var(--color-nature-accent);
            padding: var(--spacing-md);
            margin-top: var(--spacing-md);
            border-radius: 4px;
          }

          .note-icon {
            color: var(--color-nature-accent);
            font-size: 1.2rem;
            font-weight: bold;
          }

          .note-text {
            color: var(--text-secondary);
            font-size: 0.9rem;
            line-height: 1.6;
          }

          .ready-box {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            background: rgba(107, 156, 66, 0.1);
            border: 2px solid var(--color-nature-accent);
            border-radius: 8px;
            padding: var(--spacing-lg);
            margin-top: var(--spacing-2xl);
          }

          .ready-icon {
            font-size: 2rem;
            color: var(--color-nature-accent);
          }

          .ready-text {
            font-size: 1.1rem;
            color: var(--color-nature-accent);
            font-weight: bold;
          }

          /* Flow Section */
          .flow-section {
            margin-top: var(--spacing-2xl);
          }

          .flow-description {
            margin-bottom: var(--spacing-xl);
          }

          .flow-description p {
            line-height: 1.8;
            color: var(--text-secondary);
          }

          .flow-steps {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-lg);
          }

          .flow-step {
            display: flex;
            gap: var(--spacing-lg);
            background: rgba(26, 26, 26, 0.6);
            border: 1px solid var(--color-cyber-secondary);
            border-radius: 8px;
            padding: var(--spacing-lg);
            backdrop-filter: blur(10px);
          }

          .flow-step-number {
            flex-shrink: 0;
            width: 3rem;
            height: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--color-cyber-primary);
            color: var(--bg-primary);
            font-size: 1.5rem;
            font-weight: bold;
            border-radius: 50%;
            font-family: var(--font-heading);
          }

          .flow-step-content {
            flex: 1;
          }

          .flow-step-title {
            font-size: 1.2rem;
            color: var(--text-primary);
            margin-bottom: var(--spacing-sm);
          }

          .flow-step-text {
            line-height: 1.7;
            color: var(--text-secondary);
            margin: 0;
          }

          .example-inline {
            margin-top: var(--spacing-sm);
            padding: var(--spacing-sm) var(--spacing-md);
            background: rgba(0, 255, 204, 0.05);
            border-left: 3px solid var(--color-cyber-primary);
            border-radius: 4px;
            font-size: 0.9rem;
            color: var(--text-tertiary);
          }

          /* Area Section */
          .area-section {
            margin-top: var(--spacing-2xl);
          }

          .area-description {
            margin-bottom: var(--spacing-xl);
          }

          .area-description p {
            line-height: 1.8;
            color: var(--text-secondary);
          }

          .coordinate-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-xl);
            margin-bottom: var(--spacing-2xl);
          }

          .coordinate-card {
            background: rgba(26, 26, 26, 0.6);
            border: 1px solid var(--color-nature-secondary);
            border-radius: 8px;
            padding: var(--spacing-lg);
            backdrop-filter: blur(10px);
          }

          .coordinate-title {
            font-size: 1.1rem;
            color: var(--text-primary);
            margin-bottom: var(--spacing-md);
          }

          .coordinate-list {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          .coordinate-list li {
            display: flex;
            justify-content: space-between;
            padding: var(--spacing-sm) 0;
            border-bottom: 1px solid rgba(107, 156, 66, 0.2);
          }

          .coordinate-list li:last-child {
            border-bottom: none;
          }

          .coordinate-label {
            color: var(--text-secondary);
          }

          .coordinate-value {
            color: var(--color-cyber-primary);
            font-weight: bold;
            font-family: var(--font-heading);
          }

          .coordinate-visual {
            background: rgba(26, 26, 26, 0.6);
            border: 1px solid var(--color-nature-secondary);
            border-radius: 8px;
            padding: var(--spacing-lg);
            backdrop-filter: blur(10px);
          }

          .grid-example {
            font-size: 0.8rem;
            font-family: var(--font-heading);
          }

          .grid-header,
          .grid-row {
            display: grid;
            grid-template-columns: 2rem repeat(5, 1fr);
            gap: 2px;
            margin-bottom: 2px;
          }

          .grid-label-corner {
            background: rgba(0, 0, 0, 0.3);
          }

          .grid-label {
            background: rgba(107, 156, 66, 0.2);
            color: var(--color-nature-accent);
            padding: var(--spacing-xs);
            text-align: center;
            border-radius: 2px;
          }

          .grid-cell {
            background: rgba(0, 212, 255, 0.05);
            border: 1px solid var(--color-cyber-secondary);
            color: var(--text-tertiary);
            padding: var(--spacing-xs);
            text-align: center;
            border-radius: 2px;
          }

          .grid-cell.highlight {
            background: rgba(0, 255, 204, 0.2);
            border-color: var(--color-cyber-primary);
            color: var(--color-cyber-primary);
            font-weight: bold;
          }

          .occupation-rules {
            background: rgba(26, 26, 26, 0.6);
            border: 1px solid var(--color-cyber-secondary);
            border-radius: 8px;
            padding: var(--spacing-xl);
            backdrop-filter: blur(10px);
          }

          .subsection-title {
            font-size: 1.2rem;
            margin-bottom: var(--spacing-md);
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            color: var(--text-primary);
          }

          .subsection-icon {
            color: var(--color-cyber-primary);
          }

          .rule-list {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          .rule-list li {
            display: flex;
            align-items: flex-start;
            gap: var(--spacing-sm);
            padding: var(--spacing-sm) 0;
          }

          .rule-bullet {
            color: var(--color-nature-accent);
            font-size: 1.2rem;
            line-height: 1.6;
          }

          .rule-text {
            flex: 1;
            color: var(--text-secondary);
            line-height: 1.7;
          }

          /* Tips Section */
          .tips-section {
            margin-top: var(--spacing-2xl);
          }

          .tips-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: var(--spacing-lg);
          }

          .tip-card {
            background: rgba(26, 26, 26, 0.6);
            border: 1px solid var(--color-cyber-secondary);
            border-left: 4px solid var(--color-nature-accent);
            border-radius: 8px;
            padding: var(--spacing-lg);
            backdrop-filter: blur(10px);
            transition: all var(--transition-normal);
          }

          .tip-card:hover {
            border-left-color: var(--color-cyber-primary);
            box-shadow: 0 4px 20px rgba(0, 255, 204, 0.1);
            transform: translateX(4px);
          }

          .tip-title {
            font-size: 1.1rem;
            margin-bottom: var(--spacing-md);
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            color: var(--text-primary);
          }

          .tip-icon {
            color: var(--color-cyber-primary);
            font-size: 1.2rem;
            font-weight: bold;
          }

          .tip-text {
            font-size: 0.95rem;
            line-height: 1.7;
            color: var(--text-secondary);
            margin: 0;
          }

          /* Responsive */
          @media (max-width: 768px) {
            .battle-rules-container {
              padding: var(--spacing-md);
            }

            .page-title {
              font-size: 2rem;
            }

            .coordinate-info {
              grid-template-columns: 1fr;
            }

            .step-content {
              margin-left: 0;
              margin-top: var(--spacing-md);
            }

            .tips-grid {
              grid-template-columns: 1fr;
            }
          }
        }
      `}</style>
    </div>
  );
}

export default BattleRules;
