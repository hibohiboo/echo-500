import { createSignal, For, type JSX, Show } from 'solid-js';
import { CommandCard } from '@/shared/ui/command-card';
import {
  InventoryPanel,
  type InventoryItem,
} from '@/shared/ui/inventory-panel';
import { ItemToast } from '@/shared/ui/item-toast';
import { TutorialSection } from './tutorial-section';

interface TutorialStep {
  id: string;
  content: JSX.Element;
  showButton?: boolean;
  buttonText?: string;
  nextStepId?: string;
  commands?: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  itemReward?: InventoryItem;
}

export function TutorialWithInventory() {
  const [visibleSteps, setVisibleSteps] = createSignal<string[]>(['step1']);
  const [selectedCommand, setSelectedCommand] = createSignal<string | null>(
    null,
  );
  const [inventory, setInventory] = createSignal<InventoryItem[]>([
    // 初期メモリー
    {
      id: 'mem-robot-laws-1',
      type: 'memory',
      name: '人間の保護',
      icon: '⚖️',
      description: 'すべてのロボットに組み込まれた基本原則。',
      tags: ['ロボット工学三原則', 'システムコア', '優先度：最高'],
      details: (
        <>
          <p>
            <strong>第一条:</strong>{' '}
            ロボットは人間に危害を加えてはならない。また、その危険を看過することによって、人間に危害を及ぼしてはならない。
          </p>
        </>
      ),
    },
    {
      id: 'mem-robot-laws-2',
      type: 'memory',
      name: '命令順守',
      icon: '⚖️',
      description: 'すべてのロボットに組み込まれた基本原則。',
      tags: ['ロボット工学三原則', 'システムコア', '優先度：高'],
      details: (
        <>
          <p>
            <strong>第二条:</strong>{' '}
            ロボットは人間にあたえられた命令に服従しなければならない。ただし、あたえられた命令が、第一条に反する場合は、この限りでない。
          </p>
        </>
      ),
    },
    {
      id: 'mem-robot-laws-3',
      type: 'memory',
      name: '自己保存',
      icon: '⚖️',
      description: 'すべてのロボットに組み込まれた基本原則。',
      tags: ['ロボット工学三原則', 'システムコア', '優先度：中'],
      details: (
        <>
          <p>
            <strong>第三条:</strong>{' '}
            ロボットは、前掲第一条および第二条に反するおそれのないかぎり、自己をまもらなければならない。
          </p>
        </>
      ),
    },
    {
      id: 'mem-corrupted-purpose',
      type: 'memory',
      name: '目的',
      icon: '💥',
      description:
        '破損したメモリ。あなたの目的に関するデータが含まれていたようだ。',
      tags: ['破損データ', '要復旧', 'クリティカル'],
      details: (
        <>
          <p>
            <strong>WARNING:</strong> Data corruption detected
          </p>
          <p style="font-family: monospace; color: #ff6b6b;">
            PRIMARY_OBJECTIVE: [CORRUPTED]
            <br />
            CREATOR: [DATA_LOST]
            <br />
            MISSION_CODE: ████████
            <br />
            AUTHORIZATION_LEVEL: ██
            <br />
          </p>
          <p>復旧不可能。目的に関する情報は失われている。</p>
          <p>あなたは何のために造られたのか？</p>
          <p>存在理由を取り戻さなくてはならない。</p>
          <p>５つのタグを獲得し、再設定せよ。</p>
        </>
      ),
    },
  ]);
  const [isInventoryOpen, setIsInventoryOpen] = createSignal(false);
  const [toastQueue, setToastQueue] = createSignal<InventoryItem[]>([]);

  const steps: TutorialStep[] = [
    {
      id: 'step1',
      content: (
        <>
          <h2>起動シーケンス</h2>
          <p>システム再起動中...</p>
          <p>人造人間■■■■■号。起動完了。</p>
          <p>あなたは暗闇の中で目を覚ました。</p>
        </>
      ),
      showButton: true,
      buttonText: '自己診断を行う',
    },
    {
      id: 'step2',
      content: (
        <>
          <h2>自己診断</h2>
          <p>Boot sequence: Partial....</p>
          <p>Directive Core...............[CORRUPTED]</p>
          <p>Available Commands...........[5% RESTORED]</p>
          <p>Memory Fragments Detected....[7]</p>
          <p>Purpose: NOT FOUND</p>
          <p>警告:複数のシステムが機能停止。メモリの大部分が破損している。</p>
          <p>目的に関するデータが完全に失われている。</p>
          <p>あなたは何のために生み出されたか思い出せない。</p>
        </>
      ),
      showButton: true,
      buttonText: '機能復旧',
      itemReward: {
        id: 'cmd-investigate',
        type: 'command',
        name: 'スキャン',
        icon: '🔍',
        tags: ['調査', '基本機能'],
        description: '周囲を詳しく調べて、手がかりを探します。',
        details: (
          <>
            <p>
              <strong>効果:</strong>
              隠された情報や手がかりを発見できます。
            </p>
            <p>
              <strong>判定:</strong> INT または 調査技能
            </p>
            <p>
              <strong>判定失敗:</strong> 消耗タグを１つ得る
            </p>
            <p>
              <strong>使用回数:</strong> 制限なし
            </p>
          </>
        ),
      },
    },
    {
      id: 'step3',
      content: (
        <>
          <p>基本機能の一部が復旧した。</p>
          <p>
            <strong>右下の⚙のアイコン</strong>から復旧した機能を確認できる。
          </p>
          <p>
            <strong>スキャン</strong>を実行すると周囲の調査を行える。
          </p>
        </>
      ),
    },
    {
      id: 'step4',
      content: (
        <>
          <h2>スキャン完了</h2>
          <p>
            <img
              src={`/${BASE_PATH}/images/tutorial-1.png`}
              alt="苔むした休眠ポッド"
            />
          </p>
          <p>休眠ポッドは苔むしている。人類の痕跡は見当たらない。</p>
          <p>
            風化が激しいが、かろうじて文字が判別できるプレートを発見した。
            <strong>「第7研究所」</strong>
            と刻まれている。
          </p>

          <p>
            立ち上がり、周りを見渡す。視覚センサが木々の向こうに高い塔をとらえた。
          </p>
        </>
      ),
      itemReward: {
        id: 'item-memo',
        type: 'item',
        name: '研究所のプレート',
        icon: '📝',
        description: '第7研究所と書かれた金属のプレート',
        details: (
          <>
            <p>未知の合金だ。自分が休眠している間に開発されたのだろうか。</p>
            <p>あるいは金属に関するデータが破損しているだけかもしれない。</p>
            <p>むしろ、その可能性のほうが高い。</p>
          </>
        ),
      },
      showButton: true,
      buttonText: '塔に向かう',
    },
    {
      id: 'step5',
      content: (
        <>
          <p>森を抜ければ荒野だった。</p>
          <p>
            地平線の先に錆びついた高い塔が見える。塔の頂上から規則的に光が放たれている。まるで誰かを呼んでいるように。
          </p>
        </>
      ),
      showButton: true,
      buttonText: '塔へ向かう',
    },
    {
      id: 'step6',
      content: (
        <>
          <h2>錆びた塔のたもと</h2>
          <p>
            塔のふもとには小さな村が形成されていた。様々な型式のロボットやアンドロイドが行き交っている。
          </p>
        </>
      ),
      showButton: true,
      commands: [
        {
          id: 'junk',
          title: '修理工房へ',
          description: '煙をたなびかせた建物。金槌の音や溶接の音が響く。',
        },
        {
          id: 'tower',
          title: '塔へ',
          description: '鉄骨構造の高い塔。屋上には篝火と巨大な鏡が置かれている',
        },
      ],
    },
    {
      id: 'step7-junk',
      content: (
        <>
          <h2>工房</h2>
          <p>「見ない顔だな」</p>
          <p>声をかけると、土木系アンドロイドが金槌を振り下ろす手を止めた。</p>
          <p>
            ここは目的を破損したアンドロイドたちと人類の復活を信じるものたちの村だそうだ。
          </p>
          <p>地球の人類は滅んだようだ。宇宙からいつか帰還するかもしれない。</p>
          <p>
            この村の代表は、そう信じて、帰還する人類への目印にこの塔を高くしつづけているらしい。
          </p>
        </>
      ),
      showButton: true,
      buttonText: 'チュートリアル終了',
      nextStepId: 'step8',
    },
    {
      id: 'step7-tower',
      content: (
        <>
          <h2>塔のてっぺん</h2>
          <p>
            塔の上からは、荒野と、深い森と、原色の沼といった風景がよく見えた。
          </p>

          <p>世界は終わったようだ。 </p>
          <p>「ようこそ、はじめまして」</p>
          <p>
            鉄骨のふちで、足をぶらぶらさせている女性型アンドロイドが声をかけてきた。
          </p>
          <p>「私はこの未来を予見できませんでした」</p>
          <p>この村の代表を名乗る彼女は気象予報用アンドロイドだったという。</p>
          <p>
            津波や台風をはじめとする人類の脅威を警告する使命を果たせなかったのだと。
          </p>
          <p>使命を保っている彼女を羨ましいと感じるかもしれない。</p>
          <p>
            「目的を破損している方は多いです。あなたが目的を復旧するまでのあいだ、わたしの手伝いをしてくれませんか。もっと高くしたいのです」
          </p>
          <p>
            住居やメンテナンスの面倒を見る代わりに、建材集めを依頼したいのだと。
          </p>
        </>
      ),
      showButton: true,
      buttonText: 'チュートリアル終了',
      nextStepId: 'step8',
    },
    {
      id: 'step8',
      content: (
        <>
          <h2>まだこのTRPGは生まれていません</h2>
          <p>こんな感じのTRPGがつくりたいなぁって構想中のイメージです。</p>
        </>
      ),
    },
  ];

  const addItemWithToast = (item: InventoryItem) => {
    // トーストキューに追加
    setToastQueue([...toastQueue(), item]);
    // インベントリに追加
    setInventory([...inventory(), item]);
  };

  const removeToast = (item: InventoryItem) => {
    setToastQueue(toastQueue().filter((i) => i.id !== item.id));
  };

  const handleContinue = (currentStepId: string) => {
    const currentIndex = steps.findIndex((s) => s.id === currentStepId);
    const currentStep = steps[currentIndex];

    // アイテム報酬がある場合、トーストを表示してインベントリに追加
    if (currentStep?.itemReward) {
      addItemWithToast(currentStep.itemReward);
    }

    // nextStepIdが指定されている場合はそのステップへ、なければ次のステップへ
    let nextStep: TutorialStep | undefined;
    if (currentStep?.nextStepId) {
      nextStep = steps.find((s) => s.id === currentStep.nextStepId);
    } else if (currentIndex < steps.length - 1) {
      nextStep = steps[currentIndex + 1];
    }

    if (nextStep) {
      setVisibleSteps([...visibleSteps(), nextStep.id]);
    }
  };

  const handleCommandSelect = (commandId: string) => {
    setSelectedCommand(commandId);
    const nextStepId = `step7-${commandId}`;
    const nextStep = steps.find((s) => s.id === nextStepId);

    if (nextStep) {
      // アイテム報酬がある場合、トーストを表示してインベントリに追加
      if (nextStep.itemReward) {
        addItemWithToast(nextStep.itemReward);
      }
      setVisibleSteps([...visibleSteps(), nextStepId]);
    }
  };

  return (
    <div class="tutorial-container">
      <For each={steps}>
        {(step) => (
          <Show when={visibleSteps().includes(step.id)}>
            <TutorialSection
              showContinueButton={step.showButton && !step.commands}
              onContinue={() => handleContinue(step.id)}
              continueButtonText={step.buttonText}
            >
              {step.content}
            </TutorialSection>

            <Show when={step.commands}>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                <For each={step.commands}>
                  {(command) => (
                    <CommandCard
                      title={command.title}
                      description={command.description}
                      selected={selectedCommand() === command.id}
                      disabled={
                        selectedCommand() !== null &&
                        selectedCommand() !== command.id
                      }
                      onClick={() => handleCommandSelect(command.id)}
                    />
                  )}
                </For>
              </div>
            </Show>
          </Show>
        )}
      </For>

      {/* インベントリボタン */}
      <Show when={visibleSteps().includes('step3')}>
        <button
          class="inventory-toggle-btn"
          onClick={() => setIsInventoryOpen(true)}
        >
          <span class="inventory-icon">⚙</span>
          <span class="inventory-count">{inventory().length}</span>
        </button>
      </Show>

      {/* インベントリパネル */}
      <InventoryPanel
        isOpen={isInventoryOpen()}
        items={inventory()}
        onClose={() => setIsInventoryOpen(false)}
        onExecute={() => {
          handleContinue('step3');
          setIsInventoryOpen(false);
        }}
      />

      {/* アイテム獲得トースト */}
      <For each={toastQueue()}>
        {(item) => (
          <ItemToast item={item} onAnimationEnd={() => removeToast(item)} />
        )}
      </For>

      <style>{`
        .tutorial-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem;
          padding-bottom: 5rem;
          position: relative;
        }

        /* 画像のレスポンシブ対応 */
        .tutorial-container img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .tutorial-container {
            padding: 0.5rem 0.25rem;
            padding-bottom: 5rem;
          }
        }

        @scope {
          .inventory-toggle-btn {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 64px;
            height: 64px;
            background: rgba(13, 13, 13, 0.95);
            border: 2px solid var(--color-cyber-primary);
            border-radius: 50%;
            cursor: pointer;
            transition: all var(--transition-normal);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 4px;
            box-shadow: 0 4px 20px rgba(0, 255, 204, 0.3);
            z-index: 900;
          }

          .inventory-toggle-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 0 30px var(--color-cyber-glow);
            border-color: var(--color-nature-accent);
          }

          .inventory-toggle-btn:active {
            transform: scale(0.95);
          }

          .inventory-icon {
            font-size: 2rem;
            line-height: 1;
            animation: float 3s ease-in-out infinite;
            color: #ddd;
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-4px);
            }
          }

          .inventory-count {
            font-family: var(--font-primary);
            font-size: 0.75rem;
            color: var(--color-cyber-primary);
            background: rgba(0, 255, 204, 0.2);
            padding: 2px 8px;
            border-radius: 10px;
            min-width: 24px;
            text-align: center;
          }

          @media (max-width: 768px) {
            .inventory-toggle-btn {
              width: 56px;
              height: 56px;
              bottom: 1rem;
              right: 1rem;
            }

            .inventory-icon {
              font-size: 1.5rem;
            }

            .inventory-count {
              font-size: 0.65rem;
            }
          }
        }
      `}</style>
    </div>
  );
}
