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
              <div className="flex items-baseline gap-4 mb-4">
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
              <div className="flex items-baseline gap-4 mb-4">
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
              <div className="flex items-baseline gap-4 mb-4">
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
              <div className="flex items-baseline gap-4 mb-4">
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
                      {Array.from({ length: 10 }).map((__, x) => {
                        const isCorner =
                          (x === 0 && y === 0) || (x === 9 && y === 9);

                        let cellClass =
                          'bg-cyber-primary/5 border border-cyber-secondary text-text-tertiary';
                        if (isCorner) {
                          cellClass =
                            'bg-cyber-primary/20 border border-cyber-primary text-cyber-primary font-bold';
                        }
                        const dispCellNumber = (_x: number, _y: number) => {
                          if ((_x === 0 && _y === 0) || (_x === 9 && _y === 9))
                            return `x${_x}y${_y}`;
                          return '';
                        };
                        return (
                          <span
                            key={`cell-${x}-${y}`}
                            className={`${cellClass} p-1 text-center rounded-sm flex items-center justify-center aspect-square`}
                          >
                            {dispCellNumber(x, y)}
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

        {/* Battle Commands Section */}
        <section className="mt-8">
          <SectionTitle icon="▶">戦闘コマンド</SectionTitle>

          <div className="mb-6">
            <p className="leading-relaxed text-text-secondary">
              戦闘コマンドは、キャラクターが戦闘中に行うアクションである。
              各コマンドには以下の要素が設定されている。
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Timing */}
            <ContentCard>
              <h3 className="text-xl mb-4 flex items-center gap-2 text-text-primary">
                <span className="text-cyber-primary">◆</span> タイミング
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-bg-tertiary p-3 rounded border border-cyber-secondary/30">
                  <div className="font-bold text-cyber-primary mb-1">手番</div>
                  <p className="text-sm text-text-secondary m-0">
                    自分の手番でのみ使用可能。
                  </p>
                </div>
                <div className="bg-bg-tertiary p-3 rounded border border-cyber-secondary/30">
                  <div className="font-bold text-cyber-alert mb-1">割込</div>
                  <p className="text-sm text-text-secondary m-0">
                    相手の手番や特定の行動に対して割り込んで使用可能。
                  </p>
                </div>
                <div className="bg-bg-tertiary p-3 rounded border border-cyber-secondary/30">
                  <div className="font-bold text-nature-accent mb-1">常時</div>
                  <p className="text-sm text-text-secondary m-0">
                    常に効果を発揮する。パッシブスキル。
                  </p>
                </div>
              </div>
            </ContentCard>

            {/* Target */}
            <ContentCard>
              <h3 className="text-xl mb-4 flex items-center gap-2 text-text-primary">
                <span className="text-cyber-primary">◆</span> 対象
              </h3>
              <ul className="list-none m-0 p-0 grid grid-cols-1 gap-4">
                <li className="flex flex-col sm:flex-row sm:items-baseline gap-2 pb-2 border-b border-cyber-secondary/20">
                  <span className="font-bold text-text-primary min-w-[6rem]">
                    n体
                  </span>
                  <span className="text-text-secondary text-sm">
                    射程内の任意のキャラクターを n 体選ぶ。
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-baseline gap-2 pb-2 border-b border-cyber-secondary/20">
                  <span className="font-bold text-text-primary min-w-[6rem]">
                    範囲 n
                  </span>
                  <span className="text-text-secondary text-sm">
                    射程内の任意のマスを 1 つ選び、そこから上下左右に n
                    マス分の範囲の任意のキャラクターを選ぶ。
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                  <span className="font-bold text-text-primary min-w-[6rem]">
                    グループ
                  </span>
                  <span className="text-text-secondary text-sm">
                    射程内のグループの任意のキャラクターを選ぶ。
                    <br />
                    <span className="text-xs text-text-tertiary">
                      ※グループとは互いに隣接するキャラクターのひとまとまり。グループ内は互いに射程1として扱う。
                    </span>
                  </span>
                </li>
              </ul>
            </ContentCard>

            {/* Range */}
            <ContentCard>
              <h3 className="text-xl mb-4 flex items-center gap-2 text-text-primary">
                <span className="text-cyber-primary">◆</span> 射程
              </h3>
              <ul className="list-none m-0 p-0 grid grid-cols-1 gap-4">
                <li className="flex flex-col sm:flex-row sm:items-baseline gap-2 pb-2 border-b border-cyber-secondary/20">
                  <span className="font-bold text-text-primary min-w-[6rem]">
                    0
                  </span>
                  <span className="text-text-secondary text-sm">
                    スキル使用者がいるマス。
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-baseline gap-2 pb-2 border-b border-cyber-secondary/20">
                  <span className="font-bold text-text-primary min-w-[6rem]">
                    n
                  </span>
                  <span className="text-text-secondary text-sm">
                    使用者のマスから、上下左右に n マス分の距離まで。
                    <br />
                    <span className="text-xs text-text-tertiary">
                      (例: 射程1 = 隣接する上下左右のマス)
                    </span>
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                  <span className="font-bold text-text-primary min-w-[6rem]">
                    n-m
                  </span>
                  <span className="text-text-secondary text-sm">
                    n マス目から m マス目までの距離。
                    <br />
                    <span className="text-xs text-text-tertiary">
                      (例: 射程2-3 = 隣接マスや自身のマスは含まない)
                    </span>
                  </span>
                </li>
              </ul>
            </ContentCard>

            {/* Notes */}
            <NoteBox>
              <ul className="list-disc list-inside m-0 p-0 text-sm text-text-secondary space-y-1">
                <li>1マスには1キャラクターのみ存在できる。</li>
                <li>
                  1キャラクターが複数マスを占めることもある。その場合、1マスでも射程内に入っていれば対象にとれる。
                </li>
                <li>
                  複数マスを占めるキャラクターが範囲ダメージを受けたときは、
                  <span className="text-cyber-alert font-bold">
                    [ダメージ] × [範囲内の占有マス数]
                  </span>
                  のダメージを受ける。
                </li>
              </ul>
            </NoteBox>

            {/* Example Command */}
            <ExampleBox title="コマンド使用例">
              <div className="flex flex-col gap-4">
                <div className="bg-bg-primary/80 border border-cyber-primary rounded p-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-cyber-primary text-bg-primary text-xs font-bold px-2 py-1 rounded-bl">
                    近接攻撃
                  </div>
                  <h4 className="text-lg font-bold text-cyber-primary mb-2">
                    近接攻撃
                  </h4>
                  <div className="grid grid-cols-2 gap-y-2 text-sm mb-3">
                    <div className="flex gap-2">
                      <span className="text-text-tertiary">射程:</span>
                      <span className="text-text-primary">1</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-text-tertiary">コスト:</span>
                      <span className="text-text-primary">5</span>
                    </div>
                    <div className="flex gap-2 col-span-2">
                      <span className="text-text-tertiary">対象:</span>
                      <span className="text-text-primary">1体</span>
                    </div>
                  </div>
                  <div className="border-t border-cyber-primary/30 pt-2 mb-2">
                    <p className="text-text-secondary text-sm m-0">
                      対象に2d6のダメージを与える。
                    </p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[10px] border border-cyber-secondary text-cyber-secondary px-1 rounded">
                      攻撃
                    </span>
                    <span className="text-[10px] border border-cyber-secondary text-cyber-secondary px-1 rounded">
                      近接攻撃
                    </span>
                  </div>
                </div>
                <p className="text-sm text-text-secondary m-0">
                  <span className="text-cyber-primary font-bold">処理:</span>{' '}
                  手番プレイヤーはコスト5を支払い(カウンターを5進める)、
                  射程1(隣接マス)にいる敵1体を選択して攻撃を行う。
                  詳細は以下の「攻撃の処理」を参照。
                </p>
              </div>
            </ExampleBox>
          </div>
        </section>

        {/* Attack Resolution Section */}
        <section className="mt-8">
          <SectionTitle icon="▶">攻撃の処理</SectionTitle>

          <div className="mb-6">
            <p className="leading-relaxed text-text-secondary">
              攻撃タグを持つコマンドを使用した場合、以下の手順で処理を行う。
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Step 1: Hit Check */}
            <ContentCard>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-cyber-primary text-bg-primary text-xl font-bold rounded font-heading">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    命中判定
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    攻撃が対象に命中したかどうかを判定する。
                    攻撃側は2d6を振り、その結果と対象の<strong>回避値</strong>
                    を比較する。
                  </p>
                  <div className="bg-bg-tertiary p-4 rounded border border-cyber-secondary/30">
                    <div className="flex items-center gap-4 text-sm justify-center">
                      <div className="text-center">
                        <div className="font-bold text-cyber-primary mb-1">
                          攻撃側
                        </div>
                        <div className="bg-black/30 px-3 py-1 rounded text-text-primary">
                          2d6の出目
                        </div>
                      </div>
                      <div className="text-text-tertiary font-bold">≧</div>
                      <div className="text-center">
                        <div className="font-bold text-cyber-alert mb-1">
                          防御側
                        </div>
                        <div className="bg-black/30 px-3 py-1 rounded text-text-primary">
                          回避値
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-xs text-text-secondary mt-3 m-0">
                      以上なら
                      <span className="text-cyber-primary font-bold">命中</span>
                      、未満なら
                      <span className="text-text-tertiary font-bold">失敗</span>
                      (攻撃終了)
                    </p>
                  </div>
                </div>
              </div>
            </ContentCard>

            {/* Step 2: Damage Calculation */}
            <ContentCard>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-cyber-primary text-bg-primary text-xl font-bold rounded font-heading">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    ダメージ算出
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    命中した場合、ダメージを算出する。
                    コマンドに記述されたダメージ量(例:
                    2d6)を振り、そこから対象の
                    <strong>装甲値</strong>を引く。
                  </p>
                  <div className="bg-bg-tertiary p-4 rounded border border-cyber-secondary/30">
                    <div className="flex items-center gap-2 text-sm justify-center flex-wrap">
                      <div className="bg-black/30 px-3 py-1 rounded text-text-primary">
                        コマンドの威力
                      </div>
                      <div className="text-text-tertiary font-bold">-</div>
                      <div className="bg-black/30 px-3 py-1 rounded text-text-primary">
                        装甲値
                      </div>
                      <div className="text-text-tertiary font-bold">=</div>
                      <div className="font-bold text-cyber-alert">
                        最終ダメージ
                      </div>
                    </div>
                    <p className="text-center text-xs text-text-secondary mt-3 m-0">
                      ※最終ダメージが0以下の場合は0となる。
                    </p>
                  </div>
                </div>
              </div>
            </ContentCard>

            {/* Step 3: HP Reduction */}
            <ContentCard>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-cyber-primary text-bg-primary text-xl font-bold rounded font-heading">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    HPの減少
                  </h3>
                  <p className="text-text-secondary leading-relaxed m-0">
                    算出された最終ダメージの分だけ、対象の<strong>HP</strong>
                    を減らす。 HPが0以下になったキャラクターは戦闘不能となる。
                  </p>
                </div>
              </div>
            </ContentCard>
          </div>
        </section>
      </article>
    </div>
  );
}
