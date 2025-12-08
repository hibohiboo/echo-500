export function SimpleBattleRulePage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>簡易戦闘ルール</h1>

      <p>
        互いに 2D6 を振り合い、
        相手が提示した「目標値」を下回った側が敗北するシンプルな対決方式。
      </p>

      <h2>1. 基本の流れ</h2>
      <ol>
        <li>戦闘を仕掛けた側が先手になる。</li>
        <li>先手が 2D6 を振り、「最初の目標値」を決める。</li>
        <li>後手が 2D6 を振り、後述の判定処理を行う。</li>
        <li>
          以降、手番を交互に入れ替えながら「目標値の更新 → 判定」を繰り返す。
        </li>
        <li>先に「目標値未満」を出した側が敗北。</li>
      </ol>

      <h2>2. 判定（3パターン）</h2>

      <div
        style={{
          display: 'grid',
          gap: '15px',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            background: '#ffe6e6',
            padding: '15px',
            borderRadius: '8px',
            border: '2px solid #ff6b6b',
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', color: '#c92a2a' }}>
            ❌ 目標値未満 → 敗北
          </h3>
          <p style={{ margin: 0 }}>その時点で敗北</p>
        </div>

        <div
          style={{
            background: '#e7f5ff',
            padding: '15px',
            borderRadius: '8px',
            border: '2px solid #4dabf7',
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', color: '#1971c2' }}>
            🔄 目標値より大きい → 攻守交代
          </h3>
          <p style={{ margin: 0 }}>出目が新しい目標値になり、相手の手番へ</p>
        </div>

        <div
          style={{
            background: '#fff3bf',
            padding: '15px',
            borderRadius: '8px',
            border: '2px solid #ffd43b',
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', color: '#e67700' }}>
            ⚡ 同値 → 目標値を振り直して攻守交替
          </h3>
          <p style={{ margin: 0 }}>
            もう一度2D6を振り、その出目が新しい目標値になり相手の手番へ
          </p>
        </div>
      </div>

      <h2>4. 例</h2>

      <div style={{ background: '#222', padding: '15px', margin: '10px 0' }}>
        <h3>例1：すぐ決着するケース</h3>
        <ul>
          <li>先手：2D6 → 7（目標値）</li>
          <li>後手：2D6 → 5 → 7未満 → 後手敗北</li>
        </ul>
      </div>

      <div style={{ background: '#222', padding: '15px', margin: '10px 0' }}>
        <h3>例2：攻守が入れ替わるケース</h3>
        <ul>
          <li>先手：2D6 → 6（目標値）</li>
          <li>後手：2D6 → 9（上回る → 新目標値）</li>
          <li>先手：2D6 → 8 → 9未満 → 先手敗北</li>
        </ul>
      </div>

      <div style={{ background: '#222', padding: '15px', margin: '10px 0' }}>
        <h3>例3：同値の発生するケース</h3>
        <ul>
          <li>先手：2D6 → 8（目標値）</li>
          <li>後手：2D6 → 8（同値 → 振り直し）</li>
          <li>後手：振り直し → 10（新目標値）</li>
          <li>手番交代 → 先手：2D6 → 5 → 10未満 → 先手敗北</li>
        </ul>
      </div>
    </div>
  );
}
