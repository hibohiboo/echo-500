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
    // 初期コマンド
    {
      id: 'cmd-investigate',
      type: 'command',
      name: '調査',
      icon: '🔍',
      rarity: 'common',
      description: '周囲を詳しく調べて、手がかりを探します。',
      details: (
        <>
          <p>
            <strong>効果:</strong>
            目標値以下でダイスを振ることで、隠された情報や手がかりを発見できます。
          </p>
          <p>
            <strong>判定:</strong> INT × 5 または 調査技能
          </p>
          <p>
            <strong>使用回数:</strong> 制限なし
          </p>
        </>
      ),
    },
    {
      id: 'cmd-listen',
      type: 'command',
      name: '聞き耳',
      icon: '👂',
      rarity: 'common',
      description: '耳を澄まして、周囲の音を聞き取ります。',
      details: (
        <>
          <p>小さな音や遠くの音も聞き取れる可能性があります。</p>
          <p>
            <strong>判定:</strong> POW × 5 または 聞き耳技能
          </p>
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
    },
    {
      id: 'step3',
      content: (
        <>
          <p>基本機能の一部が復旧した。</p>
          <p>
            重い金属の扉は半分開いており、中からかすかな機械音が聞こえてきます。
          </p>
          <p>どうしますか？</p>
        </>
      ),
    },
    {
      id: 'step4-investigate',
      content: (
        <>
          <h2>調査の結果</h2>
          <p>
            あなたは施設の周囲を注意深く観察しました。壁には古い文字で
            <strong>「第7研究所」</strong>と刻まれています。
          </p>
          <p>
            地面には最近のものと思われる足跡が残っています。あなた以外にも、
            この場所を訪れた者がいるようです。
          </p>
          <p>
            あなたは<strong>「探索者のメモ」</strong>を手に入れました！
          </p>
        </>
      ),
      showButton: true,
      buttonText: '施設に入る',
      itemReward: {
        id: 'item-memo',
        type: 'item',
        name: '探索者のメモ',
        icon: '📝',
        rarity: 'rare',
        description:
          '第7研究所についての手書きのメモ。誰かが残したもののようだ。',
        details: (
          <>
            <p>メモには以下のような内容が記されている：</p>
            <p>
              「第7研究所は人造人間の製造施設だった。しかし500年前の
              <strong>大災厄</strong>により全てが停止した。
              中央制御室には重要なデータが残されているはずだ。」
            </p>
            <p>このメモは、施設内部の構造を理解する手がかりになりそうだ。</p>
          </>
        ),
      },
    },
    {
      id: 'step4-listen',
      content: (
        <>
          <h2>聞き耳の結果</h2>
          <p>
            耳を澄ますと、規則的な機械音が聞こえてきます。まるで何かが
            <strong>起動している</strong>ような音です。
          </p>
          <p>
            この施設には、まだ稼働している設備があるようです。電源が生きているのでしょうか？
          </p>
          <p>
            あなたは<strong>「音の記録」</strong>を手に入れました！
          </p>
        </>
      ),
      showButton: true,
      buttonText: '施設に入る',
      itemReward: {
        id: 'mem-sound',
        type: 'memory',
        name: '音の記録',
        icon: '💾',
        rarity: 'epic',
        description:
          '施設から聞こえる機械音を記録したメモリチップ。解析することで何かがわかるかもしれない。',
        details: (
          <>
            <p>音声解析の結果、以下の情報が判明した：</p>
            <ul>
              <li>音源は地下3階から発生している</li>
              <li>
                音の周波数から、<strong>冷却システム</strong>
                が稼働中と推測される
              </li>
              <li>
                定期的なビープ音は、何らかのプロセスが実行中であることを示している
              </li>
            </ul>
            <p>
              施設の一部が今も稼働している可能性が高い。慎重に進む必要がある。
            </p>
          </>
        ),
      },
    },
    {
      id: 'step4-enter',
      content: (
        <>
          <h2>施設内部</h2>
          <p>
            慎重に扉をくぐると、薄暗い廊下が続いています。床には埃が積もり、
            足跡ひとつありません。
          </p>
          <p>
            廊下の奥からは青白い光が漏れており、何かが動いているような気配がします。
          </p>
        </>
      ),
      showButton: true,
      buttonText: 'チュートリアル完了',
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
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];

      // アイテム報酬がある場合、トーストを表示してインベントリに追加
      const currentStep = steps[currentIndex];
      if (currentStep.itemReward) {
        addItemWithToast(currentStep.itemReward);
      }

      setVisibleSteps([...visibleSteps(), nextStep.id]);
    }
  };

  const handleCommandSelect = (commandId: string) => {
    setSelectedCommand(commandId);
    const nextStepId = `step4-${commandId}`;
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
    <div
      style="
        max-width: 900px;
        margin: 0 auto;
        padding: 2rem;
        padding-bottom: 5rem;
        position: relative;
      "
    >
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
          <span class="inventory-icon">💾</span>
          <span class="inventory-count">{inventory().length}</span>
        </button>
      </Show>

      {/* インベントリパネル */}
      <InventoryPanel
        isOpen={isInventoryOpen()}
        items={inventory()}
        onClose={() => setIsInventoryOpen(false)}
      />

      {/* アイテム獲得トースト */}
      <For each={toastQueue()}>
        {(item) => (
          <ItemToast item={item} onAnimationEnd={() => removeToast(item)} />
        )}
      </For>

      <style>{`
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
            font-size: 1.8rem;
            line-height: 1;
            animation: float 3s ease-in-out infinite;
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
