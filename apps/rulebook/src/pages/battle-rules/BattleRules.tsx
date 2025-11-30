import {
  PageHeader,
  IntroCard,
  ContentCard,
  SectionTitle,
  NoteBox,
  ExampleBox,
} from '@echo-500/ui';

export function BattleRulesPage() {
  return (
    <div className="max-w-[900px] mx-auto px-8 lg:px-16 py-8">
      <article className="flex flex-col gap-12">
        {/* Header Section */}
        <PageHeader title="戦闘ルール" icon="▶" />

        {/* Intro Section */}
        <IntroCard>
          Echo:500の戦闘は、カウンターボードとエリアマップを使用する。
          <br />
          ターン制ではなく、行動コストによって手番が回ってくる「カウントタイムバトル」方式を採用している。
        </IntroCard>

        {/* Preparation Section */}
        <section className="mt-8">
          <SectionTitle icon="▶">戦闘準備</SectionTitle>

          <div className="flex flex-col gap-6">
            {/* Step 01 */}
            <ContentCard>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-2xl font-bold text-cyber-primary font-heading min-w-[3rem]">
                  01
                </span>
                <h3 className="text-xl text-text-primary m-0">
                  終了条件の確認
                </h3>
              </div>
              <div className="ml-[calc(3rem+1rem)]">
                <p className="leading-relaxed text-text-secondary mb-4">
                  戦闘開始前に、終了条件を明確にする。
                  GMが勝利条件と敗北条件を宣言し、全員で確認する。
                </p>
                <ExampleBox title="終了条件の例">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-bg-primary/50 p-3 rounded border-l-2 border-nature-accent">
                      <div className="font-bold text-nature-accent mb-1">
                        勝利条件
                      </div>
                      <ul className="list-none m-0 p-0 text-text-secondary">
                        <li>› ボスの戦闘不能</li>
                        <li>› 敵の全滅</li>
                        <li>› 特定エリアへの到達</li>
                      </ul>
                    </div>
                    <div className="bg-bg-primary/50 p-3 rounded border-l-2 border-cyber-alert">
                      <div className="font-bold text-cyber-alert mb-1">
                        敗北条件
                      </div>
                      <ul className="list-none m-0 p-0 text-text-secondary">
                        <li>› 全PCの戦闘不能</li>
                        <li>› 護衛対象の死亡</li>
                        <li>› 制限時間の超過</li>
                      </ul>
                    </div>
                  </div>
                </ExampleBox>
              </div>
            </ContentCard>

            {/* Step 02 */}
            <ContentCard>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold text-cyber-primary font-heading min-w-[3rem]">
                  02
                </span>
                <h3 className="text-xl text-text-primary m-0">
                  戦闘エリアへの配置
                </h3>
              </div>
              <div className="ml-[calc(3rem+1rem)]">
                <p className="leading-relaxed text-text-secondary">
                  GMから配置を開始する。敵キャラクターを戦闘エリアに配置した後、
                  PLがPCを配置する。配置位置はシナリオやGMの指示に従う。
                </p>
              </div>
            </ContentCard>

            {/* Step 03 */}
            <ContentCard>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold text-cyber-primary font-heading min-w-[3rem]">
                  03
                </span>
                <h3 className="text-xl text-text-primary m-0">
                  カウンターボードへの配置
                </h3>
              </div>
              <div className="ml-[calc(3rem+1rem)]">
                <p className="leading-relaxed text-text-secondary mb-4">
                  カウンターボードにコマを配置する。キャラクターの「初期カウント」の位置にコマを置く。
                  同じ位置に複数のコマが配置される場合は、積み上げるように配置する。どのコマを上にするかはPLGMで相談して決める。
                </p>
                <NoteBox variant="nature">
                  積まれたコマは、上から順に手番を得る。
                </NoteBox>
              </div>
            </ContentCard>

            {/* Step 04 */}
            <ContentCard>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold text-cyber-primary font-heading min-w-[3rem]">
                  04
                </span>
                <h3 className="text-xl text-text-primary m-0">
                  カウンターカーソルの配置
                </h3>
              </div>
              <div className="ml-[calc(3rem+1rem)]">
                <p className="leading-relaxed text-text-secondary">
                  カウンターカーソルをカウンターボードの0の位置に置く。
                  これが現在カウントを表す目印となる。
                </p>
              </div>
            </ContentCard>

            {/* Step 05 */}
            <ContentCard>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold text-cyber-primary font-heading min-w-[3rem]">
                  05
                </span>
                <h3 className="text-xl text-text-primary m-0">
                  戦闘コマンド手札の準備
                </h3>
              </div>
              <div className="ml-[calc(3rem+1rem)]">
                <p className="leading-relaxed text-text-secondary">
                  各PLは、自分のキャラクターのモジュールのうち
                  「戦闘コマンド」タグを持つものを手札として手元に用意する。
                  これらが戦闘中に使用可能なコマンドとなる。
                </p>
              </div>
            </ContentCard>
          </div>

          {/* Ready Box */}
          <div className="flex items-center gap-4 bg-nature-accent/10 border-2 border-nature-accent rounded-lg p-6 mt-12">
            <div className="text-3xl text-nature-accent">✓</div>
            <div className="text-lg text-nature-accent font-bold">
              これで戦闘開始の準備が整った。
            </div>
          </div>
        </section>

        {/* Flow Section */}
        <section className="mt-8">
          <SectionTitle icon="▶">戦闘の流れ</SectionTitle>

          <div className="mb-6">
            <p className="leading-relaxed text-text-secondary">
              カウンターカーソルの位置にあるコマのキャラクターが手番を得る。
              手番を得たキャラクターは行動し、その後カウンターは進んでいく。
            </p>
          </div>

          <div className="flex flex-col gap-6 relative">
            {/* Connecting Line (Visual only) */}
            <div className="absolute left-[1.5rem] top-8 bottom-8 w-0.5 bg-cyber-primary/20 -z-10 hidden lg:block" />

            {/* Flow Step 1 */}
            <ContentCard>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-cyber-primary text-bg-primary text-2xl font-bold rounded-full font-heading shadow-[0_0_10px_rgba(var(--color-cyber-primary),0.5)]">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl text-text-primary mb-2">手番の取得</h3>
                  <p className="leading-relaxed text-text-secondary m-0">
                    カウンターカーソルがある位置の、積まれたコマの一番上のキャラクターが手番を得る。
                    そのキャラクターを操作するプレイヤー(またはGM)が行動を宣言する。
                  </p>
                </div>
              </div>
            </ContentCard>

            {/* Flow Step 2 */}
            <ContentCard>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-cyber-primary text-bg-primary text-2xl font-bold rounded-full font-heading shadow-[0_0_10px_rgba(var(--color-cyber-primary),0.5)]">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl text-text-primary mb-2">手札の使用</h3>
                  <p className="leading-relaxed text-text-secondary m-0">
                    手番を得たキャラクターは、タイミング「手番」の手札を使用できる。
                    使用したコマンドのコスト分だけ、自分のコマをカウンターボード上で前進させる。
                  </p>
                  <div className="mt-4 p-3 bg-cyber-primary/5 border-l-4 border-cyber-primary rounded text-sm text-text-secondary">
                    <span className="font-bold text-cyber-primary block mb-1">
                      例
                    </span>
                    コスト3のコマンドを使用 →
                    現在位置から3マス進んだ位置にコマを移動
                  </div>
                </div>
              </div>
            </ContentCard>

            {/* Flow Step 3 */}
            <ContentCard>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-cyber-primary text-bg-primary text-2xl font-bold rounded-full font-heading shadow-[0_0_10px_rgba(var(--color-cyber-primary),0.5)]">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl text-text-primary mb-2">
                    カウンターカーソルの進行
                  </h3>
                  <p className="leading-relaxed text-text-secondary m-0">
                    カウンターカーソルの位置にコマがなくなったら、
                    カウンターカーソルを1進める。次のコマがある位置まで進み続ける。
                  </p>
                </div>
              </div>
            </ContentCard>

            {/* Flow Step 4 */}
            <ContentCard>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-cyber-primary text-bg-primary text-2xl font-bold rounded-full font-heading shadow-[0_0_10px_rgba(var(--color-cyber-primary),0.5)]">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl text-text-primary mb-2">繰り返し</h3>
                  <p className="leading-relaxed text-text-secondary m-0">
                    ステップ1に戻り、終了条件を満たすまで繰り返す。
                  </p>
                </div>
              </div>
            </ContentCard>
          </div>
        </section>

        {/* Area Section */}
        <section className="mt-8">
          <SectionTitle icon="▶">戦闘エリア</SectionTitle>

          <div className="mb-6">
            <p className="leading-relaxed text-text-secondary">
              戦闘エリアは10×10のグリッドで構成される。
              位置を示す座標系は、縦の列をx数字(x0〜x9)、横の行をy数字(y0〜y9)で表す。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Coordinate Card */}
            <ContentCard>
              <h3 className="text-lg text-text-primary mb-4">座標の読み方</h3>
              <ul className="list-none m-0 p-0">
                <li className="flex justify-between py-2 border-b border-nature-accent/20">
                  <span className="text-text-secondary">左上</span>
                  <span className="text-cyber-primary font-bold font-heading">
                    x0y0
                  </span>
                </li>
                <li className="flex justify-between py-2">
                  <span className="text-text-secondary">右下</span>
                  <span className="text-cyber-primary font-bold font-heading">
                    x9y9
                  </span>
                </li>
              </ul>
            </ContentCard>

            {/* Coordinate Visual */}
            <ContentCard>
              <div className="text-xs font-heading overflow-x-auto">
                <div className="min-w-[300px]">
                  {/* Header Row (x-axis) */}
                  <div className="grid grid-cols-[2rem_repeat(10,1fr)] gap-[2px] mb-[2px]">
                    <span className="bg-transparent"></span>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <span
                        key={`x${i}`}
                        className="bg-nature-accent/20 text-nature-accent p-1 text-center rounded-sm"
                      >
                        x{i}
                      </span>
                    ))}
                  </div>

                  {/* Grid Rows */}
                  {Array.from({ length: 10 }).map((_, y) => (
                    <div
                      key={`row-${y}`}
                      className="grid grid-cols-[2rem_repeat(10,1fr)] gap-[2px] mb-[2px]"
                    >
                      {/* Y-axis label */}
                      <span className="bg-nature-accent/20 text-nature-accent p-1 text-center rounded-sm flex items-center justify-center">
                        y{y}
                      </span>

                      {/* Cells */}
                      {Array.from({ length: 10 }).map((_, x) => {
                        const isCorner =
                          (x === 0 && y === 0) || (x === 9 && y === 9);

                        let cellClass =
                          'bg-cyber-primary/5 border border-cyber-secondary text-text-tertiary';
                        if (isCorner) {
                          cellClass =
                            'bg-cyber-primary/20 border border-cyber-primary text-cyber-primary font-bold';
                        }

                        return (
                          <span
                            key={`cell-${x}-${y}`}
                            className={`${cellClass} p-1 text-center rounded-sm flex items-center justify-center aspect-square`}
                          >
                            {x === 0 && y === 0
                              ? 'x0y0'
                              : x === 9 && y === 9
                                ? 'x9y9'
                                : ''}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </ContentCard>
          </div>

          {/* Occupation Rules */}
          <ContentCard>
            <h3 className="text-xl mb-4 flex items-center gap-2 text-text-primary">
              <span className="text-cyber-primary">◆</span> マス占有ルール
            </h3>
            <ul className="list-none m-0 p-0">
              <li className="flex items-start gap-2 py-2">
                <span className="text-nature-accent text-xl leading-normal">
                  •
                </span>
                <span className="flex-1 text-text-secondary leading-relaxed">
                  キャラクターは1マス以上を占有する。
                  <br />
                  <span className="text-sm text-text-tertiary">
                    (例: 人間サイズは1x1マス、大型メカは2x2マスなど)
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-2 py-2">
                <span className="text-nature-accent text-xl leading-normal">
                  •
                </span>
                <span className="flex-1 text-text-secondary leading-relaxed">
                  占有されているマスに他のキャラクターが入ることはできない。
                </span>
              </li>
              <li className="flex items-start gap-2 py-2">
                <span className="text-nature-accent text-xl leading-normal">
                  •
                </span>
                <span className="flex-1 text-text-secondary leading-relaxed">
                  占有されているマスの通過は占有しているキャラクターの許可があれば可能。移動経路上に味方がいても、そこで停止しない限り通り抜けられる。
                </span>
              </li>
            </ul>
          </ContentCard>
        </section>
      </article>
    </div>
  );
}
