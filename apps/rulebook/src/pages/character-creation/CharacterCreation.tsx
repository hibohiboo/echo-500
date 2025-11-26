import {
  PageHeader,
  IntroCard,
  ContentCard,
  SectionTitle,
  NoteBox,
  ExampleBox,
} from '@echo-500/ui';

export function CharacterCreationPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <article className="max-w-[900px] mx-auto px-4 py-6 lg:px-8 lg:py-12">
        {/* Header Section */}
        <PageHeader icon="▶" title="キャラクターの作成" />

        {/* Intro Section */}
        <section className="mb-8 lg:mb-12">
          <IntroCard>
            <p>
              Echo:500では、<strong>人造人間</strong>
              のプレイヤーキャラクター(以降PC)として物語を体験する。
            </p>
            <p>
              すべての人造人間は、かつて人類のために働いていた。
              しかし文明の崩壊から500年が経過し、多くの記憶とデータが失われてしまっている。
            </p>
          </IntroCard>
        </section>

        {/* Content Section */}
        <section className="flex flex-col gap-6 lg:gap-8">
          {/* 初期メモリーの確認 */}
          <ContentCard>
            <SectionTitle icon="◆">初期メモリーの確認</SectionTitle>
            <div className="[&>p]:text-text-secondary [&>p]:leading-relaxed [&>p]:mb-4">
              <p>
                すべての人造人間は、作成時点で以下の初期メモリーを所持している。
              </p>

              {/* ロボット工学三原則 */}
              <div className="bg-bg-tertiary rounded-lg p-4 lg:p-6 mt-6 border-2 border-cyber-secondary shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                <h3 className="font-heading text-xl lg:text-2xl text-cyber-primary mb-6 flex items-center gap-2">
                  <span className="text-2xl">⚖️</span> ロボット工学三原則
                </h3>

                {/* 第一条 */}
                <div className="mb-6 pb-6 border-b border-ruin-steel">
                  <h4 className="font-heading text-base lg:text-lg text-cyber-secondary mb-2">
                    第一条：人間の保護
                  </h4>
                  <p className="text-text-secondary leading-relaxed mb-2">
                    ロボットは人間に危害を加えてはならない。また、その危険を看過することによって、
                    人間に危害を及ぼしてはならない。
                  </p>
                  <p className="text-nature-accent text-[0.85rem] m-0">
                    優先度：最高
                  </p>
                </div>

                {/* 第二条 */}
                <div className="mb-6 pb-6 border-b border-ruin-steel">
                  <h4 className="font-heading text-base lg:text-lg text-cyber-secondary mb-2">
                    第二条：命令順守
                  </h4>
                  <p className="text-text-secondary leading-relaxed mb-2">
                    ロボットは人間にあたえられた命令に服従しなければならない。
                    ただし、あたえられた命令が、第一条に反する場合は、この限りでない。
                  </p>
                  <p className="text-nature-accent text-[0.85rem] m-0">
                    優先度：高
                  </p>
                </div>

                {/* 第三条 */}
                <div>
                  <h4 className="font-heading text-base lg:text-lg text-cyber-secondary mb-2">
                    第三条：自己保存
                  </h4>
                  <p className="text-text-secondary leading-relaxed mb-2">
                    ロボットは、前掲第一条および第二条に反するおそれのないかぎり、
                    自己をまもらなければならない。
                  </p>
                  <p className="text-nature-accent text-[0.85rem] m-0">
                    優先度：中
                  </p>
                </div>
              </div>

              {/* 目的(破損データ) */}
              <div className="bg-bg-tertiary rounded-lg p-4 lg:p-6 mt-6 border-2 border-cyber-accent shadow-[0_0_15px_rgba(255,0,255,0.2)]">
                <h3 className="font-heading text-xl lg:text-2xl text-cyber-primary mb-6 flex items-center gap-2">
                  <span className="text-2xl">💥</span> 目的(破損データ)
                </h3>

                <div className="mb-4">
                  <p className="text-cyber-accent text-sm mb-2">
                    <strong>WARNING:</strong> Data corruption detected
                  </p>
                  <pre className="bg-black/50 border border-cyber-accent rounded px-4 py-3 text-[#ff6b6b] text-[0.85rem] leading-relaxed overflow-x-auto my-4">
                    PRIMARY_OBJECTIVE: [CORRUPTED] CREATOR: [DATA_LOST]
                    MISSION_CODE: ████████ AUTHORIZATION_LEVEL: ██
                  </pre>
                  <p className="text-text-tertiary mb-2">
                    復旧不可能。目的に関する情報は失われている。
                  </p>
                  <p className="text-cyber-primary font-heading text-lg mt-4">
                    あなたは何のために造られたのか？
                  </p>
                  <p className="text-text-primary font-bold mt-2">
                    存在理由を取り戻さなくてはならない。
                    <br />
                    <strong>５つのタグを獲得し、再設定せよ。</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap mt-4 pt-4 border-t border-ruin-steel">
                  <p className="font-heading text-text-tertiary text-sm m-0">
                    タグ：
                  </p>
                  <span className="inline-block px-2 py-1 rounded text-xs font-bold bg-[rgba(255,107,107,0.2)] border border-[#ff6b6b] text-[#ff6b6b]">
                    破損データ
                  </span>
                  <span className="inline-block px-2 py-1 rounded text-xs font-bold bg-[rgba(255,0,255,0.2)] border border-cyber-accent text-cyber-accent">
                    要復旧
                  </span>
                  <span className="inline-block px-2 py-1 rounded text-xs font-bold bg-[rgba(255,165,0,0.2)] border border-[#ffa500] text-[#ffa500]">
                    クリティカル
                  </span>
                </div>
              </div>
            </div>
          </ContentCard>

          {/* 初期タグの選択 */}
          <ContentCard>
            <SectionTitle icon="◆">初期タグの選択</SectionTitle>
            <div className="[&>p]:text-text-secondary [&>p]:leading-relaxed [&>p]:mb-4">
              <p>
                キャラクター作成では、追加のタグやコマンドを選択できる。
                詳細は次の章で説明する。
              </p>
            </div>
          </ContentCard>

          {/* 戦闘モジュール */}
          <ContentCard>
            <SectionTitle icon="◆">戦闘モジュール</SectionTitle>
            <div className="[&>p]:text-text-secondary [&>p]:leading-relaxed [&>p]:mb-4">
              <p>
                <strong>戦闘モジュール</strong>が必要なシナリオ
                に参加する場合は、戦闘用のステータスである
                <strong>戦闘フレーム</strong>を設定する必要がある。
              </p>

              <div className="bg-[rgba(107,156,66,0.05)] border-2 border-nature-accent rounded-lg p-4 lg:p-6 mt-6">
                {/* 戦闘フレームの項目 */}
                <h3 className="font-heading text-lg lg:text-xl text-nature-accent mb-6 flex items-center gap-2">
                  <span className="text-xl">⚔️</span> 戦闘フレームの項目
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6">
                  <div className="bg-bg-tertiary border border-nature-secondary rounded px-4 py-3">
                    <h4 className="font-heading text-base text-cyber-secondary mb-2">
                      HP
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed m-0">
                      Hazard Buffer
                      Partition「危険吸収領域」。キャラクターが戦闘を継続するための余裕。
                      0になると戦闘不能になる。
                    </p>
                  </div>

                  <div className="bg-bg-tertiary border border-nature-secondary rounded px-4 py-3">
                    <h4 className="font-heading text-base text-cyber-secondary mb-2">
                      回避値
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed m-0">
                      攻撃を回避する能力。攻撃側は回避値を目標値として2d6を振り、目標値未満なら攻撃は失敗となる。
                    </p>
                  </div>

                  <div className="bg-bg-tertiary border border-nature-secondary rounded px-4 py-3">
                    <h4 className="font-heading text-base text-cyber-secondary mb-2">
                      装甲値
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed m-0">
                      防御力。受けるダメージをこの値分だけ減少させる。
                    </p>
                  </div>

                  <div className="bg-bg-tertiary border border-nature-secondary rounded px-4 py-3">
                    <h4 className="font-heading text-base text-cyber-secondary mb-2">
                      初期カウント
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed m-0">
                      戦闘開始時にカウンターボード上に配置される位置。数値が小さいほど早く行動できる。
                    </p>
                  </div>

                  <div className="bg-bg-tertiary border border-nature-secondary rounded px-4 py-3">
                    <h4 className="font-heading text-base text-cyber-secondary mb-2">
                      移動力
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed m-0">
                      移動モジュールで移動できる戦闘エリアのマス数。
                    </p>
                  </div>

                  <div className="bg-bg-tertiary border border-nature-secondary rounded px-4 py-3">
                    <h4 className="font-heading text-base text-cyber-secondary mb-2">
                      サイズ
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed m-0">
                      戦闘エリアで占有するマスの大きさ。1は1×1マス、2は2×2マスを占有する。
                    </p>
                  </div>
                </div>

                {/* フレームタイプ */}
                <h3 className="font-heading text-lg lg:text-xl text-nature-accent mb-6 mt-8 lg:mt-12 flex items-center gap-2">
                  <span className="text-xl">🤖</span> フレームタイプ
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                  <div className="bg-bg-tertiary border-2 border-nature-secondary rounded-lg px-4 py-3 transition-colors hover:border-nature-accent">
                    <h4 className="font-heading text-base text-cyber-primary mb-2">
                      ベーシック(バランス型)
                    </h4>
                    <div className="mb-2 px-2 py-1 bg-black/20 rounded">
                      <p className="text-nature-accent text-xs my-1 leading-snug">
                        HP: 20 / 回避値: 5 / 装甲値: 2
                      </p>
                      <p className="text-nature-accent text-xs my-1 leading-snug">
                        初期カウント: 5 / 移動力: 3 / サイズ: 1×1
                      </p>
                    </div>
                    <p className="text-text-secondary text-[0.85rem] leading-relaxed m-0">
                      標準的な性能を持つバランス型のフレーム。
                      回避値5は2d6で約83%の命中率となり、HP20で2〜3発の攻撃に耐えられる。
                    </p>
                  </div>

                  <div className="bg-bg-tertiary border-2 border-nature-secondary rounded-lg px-4 py-3 transition-colors hover:border-nature-accent">
                    <h4 className="font-heading text-base text-cyber-primary mb-2">
                      ライト(高機動型)
                    </h4>
                    <div className="mb-2 px-2 py-1 bg-black/20 rounded">
                      <p className="text-nature-accent text-xs my-1 leading-snug">
                        HP: 15 / 回避値: 7 / 装甲値: 0
                      </p>
                      <p className="text-nature-accent text-xs my-1 leading-snug">
                        初期カウント: 3 / 移動力: 5 / サイズ: 1×1
                      </p>
                    </div>
                    <p className="text-text-secondary text-[0.85rem] leading-relaxed m-0">
                      高い回避値と移動力を持つ高機動型。
                      装甲は薄いが、攻撃を避けることに特化している。
                    </p>
                  </div>

                  <div className="bg-bg-tertiary border-2 border-nature-secondary rounded-lg px-4 py-3 transition-colors hover:border-nature-accent">
                    <h4 className="font-heading text-base text-cyber-primary mb-2">
                      ヘビー(重装甲型)
                    </h4>
                    <div className="mb-2 px-2 py-1 bg-black/20 rounded">
                      <p className="text-nature-accent text-xs my-1 leading-snug">
                        HP: 30 / 回避値: 3 / 装甲値: 5
                      </p>
                      <p className="text-nature-accent text-xs my-1 leading-snug">
                        初期カウント: 8 / 移動力: 2 / サイズ: 1×1
                      </p>
                    </div>
                    <p className="text-text-secondary text-[0.85rem] leading-relaxed m-0">
                      高いHPと装甲値を持つ重装甲型。
                      機動力は低いが、前線で耐え続けることができる。
                    </p>
                  </div>
                </div>

                <NoteBox>
                  戦闘フレームの各項目は、選択するフレームによって決定される。
                  100CPを使用してモジュールを追加購入することで、これらの値を強化できる。
                </NoteBox>

                {/* 戦闘スタイル */}
                <h3 className="font-heading text-lg lg:text-xl text-nature-accent mb-6 mt-8 lg:mt-12 flex items-center gap-2">
                  <span className="text-xl">⚡</span> 戦闘スタイル
                </h3>

                <p className="text-text-secondary leading-relaxed mb-6">
                  戦闘スタイルは、キャラクターの戦闘における専門性を表す。
                  複数のスタイルを習得することができ、1スタイルの習得に
                  <strong>30CP</strong>を消費する。
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6 mt-6">
                  <div className="bg-bg-tertiary border-2 border-nature-secondary rounded-lg px-4 py-3 transition-all hover:border-nature-accent hover:shadow-[0_0_15px_rgba(107,156,66,0.2)]">
                    <h4 className="font-heading text-base text-cyber-primary mb-2 flex items-center gap-1">
                      <span className="text-lg">⚔️</span> セイバー(近接攻撃型)
                    </h4>
                    <div className="mb-2 px-2 py-1 bg-[rgba(107,156,66,0.1)] border border-nature-secondary rounded">
                      <p className="text-nature-accent text-xs font-bold m-0">
                        補正: 移動力 +1
                      </p>
                    </div>
                    <p className="text-text-secondary text-[0.85rem] leading-relaxed mb-2">
                      近接戦闘を主とするスタイル。接近して敵を制圧する戦術に長ける。
                      高い機動力で敵との距離を詰め、近接攻撃で確実に仕留める。
                    </p>
                    <p className="text-cyber-secondary text-xs font-bold text-right m-0">
                      CP消費: 30
                    </p>
                  </div>

                  <div className="bg-bg-tertiary border-2 border-nature-secondary rounded-lg px-4 py-3 transition-all hover:border-nature-accent hover:shadow-[0_0_15px_rgba(107,156,66,0.2)]">
                    <h4 className="font-heading text-base text-cyber-primary mb-2 flex items-center gap-1">
                      <span className="text-lg">🎯</span> ガンナー(遠距離攻撃型)
                    </h4>
                    <div className="mb-2 px-2 py-1 bg-[rgba(107,156,66,0.1)] border border-nature-secondary rounded">
                      <p className="text-nature-accent text-xs font-bold m-0">
                        補正: なし
                      </p>
                    </div>
                    <p className="text-text-secondary text-[0.85rem] leading-relaxed mb-2">
                      遠距離攻撃を主とするスタイル。安全な距離から敵を攻撃する。
                      射撃精度と火力に優れ、距離を保ちながら確実にダメージを与える。
                    </p>
                    <p className="text-cyber-secondary text-xs font-bold text-right m-0">
                      CP消費: 30
                    </p>
                  </div>

                  <div className="bg-bg-tertiary border-2 border-nature-secondary rounded-lg px-4 py-3 transition-all hover:border-nature-accent hover:shadow-[0_0_15px_rgba(107,156,66,0.2)]">
                    <h4 className="font-heading text-base text-cyber-primary mb-2 flex items-center gap-1">
                      <span className="text-lg">✨</span> ウィザード(支援妨害型)
                    </h4>
                    <div className="mb-2 px-2 py-1 bg-[rgba(107,156,66,0.1)] border border-nature-secondary rounded">
                      <p className="text-nature-accent text-xs font-bold m-0">
                        補正: 移動力 -1, 回避値 -1
                      </p>
                    </div>
                    <p className="text-text-secondary text-[0.85rem] leading-relaxed mb-2">
                      支援と妨害を主とするスタイル。味方の強化や敵の弱体化を行う。
                      機動性は低いが、戦場全体をコントロールする高度な戦術を可能にする。
                    </p>
                    <p className="text-cyber-secondary text-xs font-bold text-right m-0">
                      CP消費: 30
                    </p>
                  </div>
                </div>

                <NoteBox>
                  戦闘スタイルは複数習得可能。習得したスタイルに応じて、
                  戦闘モジュール(攻撃・防御・支援アクション)が使用可能になる。
                  ステータス補正は全スタイルの合計値が適用される。
                </NoteBox>

                {/* 戦闘モジュールの取得 */}
                <h3 className="font-heading text-lg lg:text-xl text-nature-accent mb-6 mt-8 lg:mt-12 flex items-center gap-2">
                  <span className="text-xl">💾</span> 戦闘モジュールの取得
                </h3>

                <p className="text-text-secondary leading-relaxed mb-6">
                  戦闘スタイルを習得すると、そのスタイルに対応したタグを持つ
                  <strong>戦闘モジュール</strong>を取得できるようになる。
                  戦闘モジュールはCPを消費して取得し、戦闘中に使用できる特殊なアクションとなる。
                </p>

                <div className="bg-[rgba(0,255,204,0.05)] border border-cyber-primary rounded-lg p-4 lg:p-6 my-6">
                  <h4 className="font-heading text-base text-cyber-secondary mb-4">
                    取得可能なモジュール
                  </h4>
                  <ul className="list-none p-0 m-0 mb-4">
                    <li className="text-text-secondary py-1 pl-4 relative leading-relaxed before:content-['▸'] before:absolute before:left-0 before:text-cyber-primary">
                      <strong>セイバー</strong>のタグを持つ戦闘モジュール →
                      近接攻撃系のアクション
                    </li>
                    <li className="text-text-secondary py-1 pl-4 relative leading-relaxed before:content-['▸'] before:absolute before:left-0 before:text-cyber-primary">
                      <strong>ガンナー</strong>のタグを持つ戦闘モジュール →
                      遠距離攻撃系のアクション
                    </li>
                    <li className="text-text-secondary py-1 pl-4 relative leading-relaxed before:content-['▸'] before:absolute before:left-0 before:text-cyber-primary">
                      <strong>ウィザード</strong>のタグを持つ戦闘モジュール →
                      支援・妨害系のアクション
                    </li>
                  </ul>
                  <p className="text-text-tertiary text-sm leading-relaxed m-0 pt-4 border-t border-ruin-steel">
                    各戦闘モジュールには<strong>CP(コストポイント)</strong>
                    が設定されており、
                    そのCPを消費することで取得できる。キャラクター作成時には
                    <strong>100CP</strong>が与えられる。
                  </p>
                </div>

                <NoteBox>
                  戦闘モジュールの詳細な一覧は、次のページで確認できる。
                  各モジュールには、タイミング、対象、射程、コスト、効果などの情報が記載されている。
                </NoteBox>
              </div>
            </div>
          </ContentCard>

          {/* 名前を決める */}
          <ContentCard>
            <SectionTitle icon="◆">名前を決める</SectionTitle>
            <div className="[&>p]:text-text-secondary [&>p]:leading-relaxed [&>p]:mb-4">
              <p>最後にキャラクターの名前を決める。</p>
              <ExampleBox title="例：">
                <ul>
                  <li>7号(シンプルな番号)</li>
                  <li>アルファ-237(型式番号)</li>
                  <li>ユキ(人間風の名前)</li>
                  <li>ウォッチャー(役割を示す名前)</li>
                </ul>
              </ExampleBox>
            </div>
          </ContentCard>
        </section>
      </article>
    </div>
  );
}
