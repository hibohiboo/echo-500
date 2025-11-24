import {
  BattleCommandCardList,
  useBattleCommandData,
} from '@echo-500/frontend-common';

export function BattleCommandsPage() {
  const apiKey = import.meta.env.VITE_SPREAD_SHEET_API_KEY || '';
  const spreadSheetId = import.meta.env.VITE_SPREAD_SHEET_ID || '';

  const { data, loading, error } = useBattleCommandData(apiKey, spreadSheetId);

  return (
    <div className="battle-commands-container">
      <article className="battle-commands-content">
        <section className="header-section">
          <h1 className="page-title">
            <span className="title-icon">⚔️</span> 戦闘用モジュール
          </h1>
          <div className="header-divider"></div>
        </section>

        <section className="intro-section">
          <div className="intro-card">
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
          </div>
        </section>

        {error && (
          <div className="error-box">
            <p>データの読み込み中にエラーが発生しました。</p>
            <p className="error-message">{error.message}</p>
          </div>
        )}

        {!error && <BattleCommandCardList cards={data} loading={loading} />}
      </article>

      <style>{`
        .battle-commands-container {
          flex: 1;
          overflow-y: auto;
        }

        .battle-commands-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: var(--spacing-xl);
        }

        @media (max-width: 768px) {
          .battle-commands-content {
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

        /* Error Box */
        .error-box {
          background: rgba(255, 0, 0, 0.1);
          border: 2px solid #ff6b6b;
          border-radius: 8px;
          padding: var(--spacing-lg);
          margin-bottom: var(--spacing-xl);
        }

        .error-box p {
          color: var(--text-primary);
          margin-bottom: var(--spacing-sm);
        }

        .error-message {
          font-family: var(--font-primary);
          color: #ff6b6b;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}
