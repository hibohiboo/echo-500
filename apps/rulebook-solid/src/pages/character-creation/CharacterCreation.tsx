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
              Echo:500では、<strong>人造人間</strong>
              のプレイヤーキャラクター(以降PC)として物語を体験する。
            </p>
            <p>
              すべての人造人間は、かつて人類のために働いていた。
              しかし文明の崩壊から500年が経過し、多くの記憶とデータが失われてしまっている。
            </p>
          </div>
        </section>

        <section class="content-section">
          <div class="content-card">
            <h2 class="section-title">
              <span class="section-icon">◆</span> 初期メモリーの確認
            </h2>
            <div class="section-content">
              <p>
                すべての人造人間は、作成時点で以下の初期メモリーを所持している。
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
                    PRIMARY_OBJECTIVE: [CORRUPTED] CREATOR: [DATA_LOST]
                    MISSION_CODE: ████████ AUTHORIZATION_LEVEL: ██
                  </pre>
                  <p>復旧不可能。目的に関する情報は失われている。</p>
                  <p class="purpose-question">
                    あなたは何のために造られたのか？
                  </p>
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
              <span class="section-icon">◆</span> 初期タグの選択
            </h2>
            <div class="section-content">
              <p>
                キャラクター作成では、追加のタグやコマンドを選択できる。
                詳細は次の章で説明する。
              </p>
            </div>
          </div>

          <div class="content-card">
            <h2 class="section-title">
              <span class="section-icon">◆</span> 戦闘モジュール
            </h2>
            <div class="section-content">
              <p>
                <strong>戦闘モジュール</strong>が必要なシナリオ
                に参加する場合は、戦闘用のステータスである
                <strong>戦闘フレーム</strong>を設定する必要がある。
              </p>

              <div class="battle-frame-box">
                <h3 class="subsection-title">
                  <span class="subsection-icon">⚔️</span> 戦闘フレームの項目
                </h3>

                <div class="stat-grid">
                  <div class="stat-item">
                    <h4 class="stat-name">HP</h4>
                    <p class="stat-description">
                      Hazard Buffer
                      Partition「危険吸収領域」。キャラクターが戦闘を継続するための余裕。
                      0になると戦闘不能になる。
                    </p>
                  </div>

                  <div class="stat-item">
                    <h4 class="stat-name">回避値</h4>
                    <p class="stat-description">
                      攻撃を回避する能力。攻撃時に2d6を振り、この値未満なら攻撃は失敗となる。
                    </p>
                  </div>

                  <div class="stat-item">
                    <h4 class="stat-name">装甲値</h4>
                    <p class="stat-description">
                      受けるダメージをこの値分だけ減少させる防御力。
                    </p>
                  </div>

                  <div class="stat-item">
                    <h4 class="stat-name">初期カウント</h4>
                    <p class="stat-description">
                      戦闘開始時にカウンターボード上に配置される位置。数値が小さいほど早く行動できる。
                    </p>
                  </div>

                  <div class="stat-item">
                    <h4 class="stat-name">移動力</h4>
                    <p class="stat-description">
                      移動モジュールで移動できる戦闘エリアのマス数。
                    </p>
                  </div>

                  <div class="stat-item">
                    <h4 class="stat-name">サイズ</h4>
                    <p class="stat-description">
                      戦闘エリアで占有するマスの大きさ。1は1×1マス、2は2×2マスを占有する。
                    </p>
                  </div>
                </div>

                <h3 class="subsection-title" style="margin-top: var(--spacing-xl)">
                  <span class="subsection-icon">🤖</span> フレームタイプ
                </h3>

                <div class="frame-types-grid">
                  <div class="frame-type-card">
                    <h4 class="frame-type-name">ベーシック（バランス型）</h4>
                    <div class="frame-type-stats">
                      <p>HP: 20 / 回避値: 5 / 装甲値: 2</p>
                      <p>初期カウント: 5 / 移動力: 3 / サイズ: 1×1</p>
                    </div>
                    <p class="frame-type-desc">
                      標準的な性能を持つバランス型のフレーム。
                      回避値5は2d6で約83%の命中率となり、HP20で2～3発の攻撃に耐えられる。
                    </p>
                  </div>

                  <div class="frame-type-card">
                    <h4 class="frame-type-name">ライト（高機動型）</h4>
                    <div class="frame-type-stats">
                      <p>HP: 15 / 回避値: 7 / 装甲値: 0</p>
                      <p>初期カウント: 3 / 移動力: 5 / サイズ: 1×1</p>
                    </div>
                    <p class="frame-type-desc">
                      高い回避値と移動力を持つ高機動型。
                      装甲は薄いが、攻撃を避けることに特化している。
                    </p>
                  </div>

                  <div class="frame-type-card">
                    <h4 class="frame-type-name">ヘビー（重装甲型）</h4>
                    <div class="frame-type-stats">
                      <p>HP: 30 / 回避値: 3 / 装甲値: 5</p>
                      <p>初期カウント: 8 / 移動力: 2 / サイズ: 1×1</p>
                    </div>
                    <p class="frame-type-desc">
                      高いHPと装甲値を持つ重装甲型。
                      機動力は低いが、前線で耐え続けることができる。
                    </p>
                  </div>
                </div>

                <div class="note-box">
                  <span class="note-icon">※</span>
                  <p class="note-text">
                    戦闘フレームの各項目は、選択するフレームによって決定される。
                    100CPを使用してモジュールを追加購入することで、これらの値を強化できる。
                  </p>
                </div>

                <h3 class="subsection-title" style="margin-top: var(--spacing-xl)">
                  <span class="subsection-icon">⚡</span> 戦闘スタイル
                </h3>

                <p>
                  戦闘スタイルは、キャラクターの戦闘における専門性を表す。
                  複数のスタイルを習得することができ、1スタイルの習得に
                  <strong>30CP</strong>を消費する。
                </p>

                <div class="style-types-grid">
                  <div class="style-type-card">
                    <h4 class="style-type-name">
                      <span class="style-icon">⚔️</span> セイバー（近接攻撃型）
                    </h4>
                    <div class="style-type-modifier">
                      <p class="modifier-text">補正: 移動力 +1</p>
                    </div>
                    <p class="style-type-desc">
                      近接戦闘を主とするスタイル。接近して敵を制圧する戦術に長ける。
                      高い機動力で敵との距離を詰め、近接攻撃で確実に仕留める。
                    </p>
                    <p class="cp-cost">CP消費: 30</p>
                  </div>

                  <div class="style-type-card">
                    <h4 class="style-type-name">
                      <span class="style-icon">🎯</span> ガンナー（遠距離攻撃型）
                    </h4>
                    <div class="style-type-modifier">
                      <p class="modifier-text">補正: なし</p>
                    </div>
                    <p class="style-type-desc">
                      遠距離攻撃を主とするスタイル。安全な距離から敵を攻撃する。
                      射撃精度と火力に優れ、距離を保ちながら確実にダメージを与える。
                    </p>
                    <p class="cp-cost">CP消費: 30</p>
                  </div>

                  <div class="style-type-card">
                    <h4 class="style-type-name">
                      <span class="style-icon">✨</span> ウィザード（支援妨害型）
                    </h4>
                    <div class="style-type-modifier">
                      <p class="modifier-text">補正: 移動力 -1, 回避値 -1</p>
                    </div>
                    <p class="style-type-desc">
                      支援と妨害を主とするスタイル。味方の強化や敵の弱体化を行う。
                      機動性は低いが、戦場全体をコントロールする高度な戦術を可能にする。
                    </p>
                    <p class="cp-cost">CP消費: 30</p>
                  </div>
                </div>

                <div class="note-box">
                  <span class="note-icon">※</span>
                  <p class="note-text">
                    戦闘スタイルは複数習得可能。習得したスタイルに応じて、
                    戦闘モジュール（攻撃・防御・支援アクション）が使用可能になる。
                    ステータス補正は全スタイルの合計値が適用される。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="content-card">
            <h2 class="section-title">
              <span class="section-icon">◆</span> 名前を決める
            </h2>
            <div class="section-content">
              <p>最後にキャラクターの名前を決める。</p>
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

        /* Battle Frame */
        .battle-frame-box {
          background: rgba(107, 156, 66, 0.05);
          border: 2px solid var(--color-nature-accent);
          border-radius: 8px;
          padding: var(--spacing-lg);
          margin-top: var(--spacing-lg);
        }

        .subsection-title {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          color: var(--color-nature-accent);
          margin: 0 0 var(--spacing-lg) 0;
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .subsection-icon {
          font-size: 1.3rem;
        }

        .stat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-lg);
        }

        .stat-item {
          background: var(--bg-tertiary);
          border: 1px solid var(--color-nature-secondary);
          border-radius: 4px;
          padding: var(--spacing-md);
        }

        .stat-name {
          font-family: var(--font-heading);
          font-size: 1rem;
          color: var(--color-cyber-secondary);
          margin: 0 0 var(--spacing-sm) 0;
        }

        .stat-description {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
          margin: 0;
        }

        /* Frame Types */
        .frame-types-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
        }

        .frame-type-card {
          background: var(--bg-tertiary);
          border: 2px solid var(--color-nature-secondary);
          border-radius: 8px;
          padding: var(--spacing-md);
          transition: border-color 0.2s;
        }

        .frame-type-card:hover {
          border-color: var(--color-nature-accent);
        }

        .frame-type-name {
          font-family: var(--font-heading);
          font-size: 1rem;
          color: var(--color-cyber-primary);
          margin: 0 0 var(--spacing-sm) 0;
        }

        .frame-type-stats {
          margin-bottom: var(--spacing-sm);
          padding: var(--spacing-xs);
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }

        .frame-type-stats p {
          font-family: var(--font-primary);
          font-size: 0.75rem;
          color: var(--color-nature-accent);
          margin: var(--spacing-xs) 0;
          line-height: 1.4;
        }

        .frame-type-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        .note-box {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-sm);
          background: rgba(0, 255, 204, 0.05);
          border-left: 3px solid var(--color-cyber-primary);
          padding: var(--spacing-md);
          border-radius: 4px;
        }

        .note-icon {
          color: var(--color-cyber-primary);
          font-size: 1.2rem;
          font-weight: bold;
          flex-shrink: 0;
        }

        .note-text {
          color: var(--text-tertiary);
          font-size: 0.9rem;
          line-height: 1.6;
          margin: 0;
        }

        /* Battle Styles */
        .style-types-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--spacing-md);
          margin: var(--spacing-lg) 0;
        }

        .style-type-card {
          background: var(--bg-tertiary);
          border: 2px solid var(--color-nature-secondary);
          border-radius: 8px;
          padding: var(--spacing-md);
          transition: all 0.2s;
        }

        .style-type-card:hover {
          border-color: var(--color-nature-accent);
          box-shadow: 0 0 15px rgba(107, 156, 66, 0.2);
        }

        .style-type-name {
          font-family: var(--font-heading);
          font-size: 1rem;
          color: var(--color-cyber-primary);
          margin: 0 0 var(--spacing-sm) 0;
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .style-icon {
          font-size: 1.2rem;
        }

        .style-type-modifier {
          margin-bottom: var(--spacing-sm);
          padding: var(--spacing-xs);
          background: rgba(107, 156, 66, 0.1);
          border-radius: 4px;
          border: 1px solid var(--color-nature-secondary);
        }

        .modifier-text {
          font-family: var(--font-primary);
          font-size: 0.8rem;
          color: var(--color-nature-accent);
          margin: 0;
          font-weight: bold;
        }

        .style-type-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0 0 var(--spacing-sm) 0;
        }

        .cp-cost {
          font-family: var(--font-primary);
          font-size: 0.75rem;
          color: var(--color-cyber-secondary);
          margin: 0;
          text-align: right;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .stat-grid {
            grid-template-columns: 1fr;
          }

          .frame-types-grid {
            grid-template-columns: 1fr;
          }

          .style-types-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default CharacterCreation;
