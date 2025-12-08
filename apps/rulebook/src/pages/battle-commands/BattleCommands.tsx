import {
  BattleCommandCardList,
  useBattleCommandData,
} from '@echo-500/frontend-common';
import { PageHeader, IntroCard } from '@echo-500/ui';

export function BattleCommandsPage() {
  const apiKey = import.meta.env.VITE_SPREAD_SHEET_API_KEY || '';
  const spreadSheetId = import.meta.env.VITE_SPREAD_SHEET_ID || '';

  const { data, loading, error } = useBattleCommandData(apiKey, spreadSheetId);

  return (
    <div className="flex-1 overflow-y-auto">
      <article className="max-w-[1400px] mx-auto px-4 lg:px-8 py-6 lg:py-12">
        <PageHeader icon="⚔️" title="戦闘用モジュール" />

        <section className="mb-8 lg:mb-12">
          <IntroCard>
            <p>
              <strong>戦闘モジュール</strong>
              は、戦闘中に使用できる特殊なアクションです。 各モジュールには
              <strong>CP(コストポイント)</strong>
              が設定されており、キャラクター作成時にCPを消費して取得できます。
            </p>
            <p>
              戦闘スタイル（セイバー、ガンナー、ウィザード）に応じて、
              対応するタグを持つモジュールが使用可能になります。
            </p>
          </IntroCard>
        </section>

        {error && (
          <div className="bg-[rgba(255,0,0,0.1)] border-2 border-[#ff6b6b] rounded-lg p-4 lg:p-6 mb-6 lg:mb-8">
            <p className="text-text-primary mb-2">
              データの読み込み中にエラーが発生しました。
            </p>
            <p className="font-primary text-[#ff6b6b] text-sm">
              {error.message}
            </p>
          </div>
        )}

        {!error && <BattleCommandCardList cards={data} loading={loading} />}
      </article>
    </div>
  );
}
