import { createSignal, For, Show } from 'solid-js';
import { TutorialSection } from '@/shared/ui/tutorial-section';
import { CommandCard } from '@/shared/ui/command-card';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';

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
}

function InteractiveTutorial() {
  const [visibleSteps, setVisibleSteps] = createSignal<string[]>(['step1']);
  const [selectedCommand, setSelectedCommand] = createSignal<string | null>(null);

  const steps: TutorialStep[] = [
    {
      id: 'step1',
      content: (
        <>
          <h2>Echo:500 チュートリアル</h2>
          <p>
            ようこそ、探索者。ここは文明が崩壊してから500年が経過した世界です。
          </p>
          <p>
            あなたは<strong>人造人間</strong>
            として、失われた記憶の断片を探し求めています。
          </p>
        </>
      ),
      showButton: true,
      buttonText: '物語を始める',
    },
    {
      id: 'step2',
      content: (
        <>
          <h2>基本ルール：行動判定</h2>
          <p>
            TRPGでは、あなたの行動の成否を<strong>ダイス</strong>で判定します。
          </p>
          <p>
            <code>1D100</code>（100面ダイス）を振り、あなたの技能値以下が出れば成功です。
          </p>
          <p>例：あなたの「調査」技能が60の場合、1~60が出れば成功です。</p>
        </>
      ),
      showButton: true,
    },
    {
      id: 'step3',
      content: (
        <>
          <h2>最初のシーン：廃墟の入り口</h2>
          <p>
            あなたは古びた研究施設の前に立っています。建物は緑のツタに覆われ、
            長い時間が経過したことを物語っています。
          </p>
          <p>
            重い金属の扉は半分開いており、中からかすかな機械音が聞こえてきます。
          </p>
          <p>どうしますか？</p>
        </>
      ),
      commands: [
        {
          id: 'investigate',
          title: '周囲を調査する',
          description: '施設の外観を詳しく調べます。（調査判定）',
        },
        {
          id: 'listen',
          title: '機械音を聞く',
          description: '耳を澄まして、機械音の正体を探ります。（聞き耳判定）',
        },
        {
          id: 'enter',
          title: 'すぐに中に入る',
          description: '慎重に扉をくぐり、施設内部へ進みます。',
        },
      ],
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
          <p>あなたは<strong>「探索者のメモ」</strong>を手に入れました！</p>
        </>
      ),
      showButton: true,
      buttonText: '施設に入る',
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
          <p>あなたは<strong>「音の記録」</strong>を手に入れました！</p>
        </>
      ),
      showButton: true,
      buttonText: '施設に入る',
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

  const handleContinue = (currentStepId: string) => {
    const currentIndex = steps.findIndex((s) => s.id === currentStepId);
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      setVisibleSteps([...visibleSteps(), nextStep.id]);
    }
  };

  const handleCommandSelect = (commandId: string) => {
    setSelectedCommand(commandId);
    const nextStepId = `step4-${commandId}`;
    setVisibleSteps([...visibleSteps(), nextStepId]);
  };

  return (
    <div style="max-width: 900px; margin: 0 auto; padding: 2rem;">
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
              <div
                style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 2rem;"
              >
                <For each={step.commands}>
                  {(command) => (
                    <CommandCard
                      title={command.title}
                      description={command.description}
                      selected={selectedCommand() === command.id}
                      disabled={selectedCommand() !== null && selectedCommand() !== command.id}
                      onClick={() => handleCommandSelect(command.id)}
                    />
                  )}
                </For>
              </div>
            </Show>
          </Show>
        )}
      </For>
    </div>
  );
}

const meta = {
  title: 'Features/Tutorial/Interactive Example',
  component: InteractiveTutorial,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof InteractiveTutorial>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
