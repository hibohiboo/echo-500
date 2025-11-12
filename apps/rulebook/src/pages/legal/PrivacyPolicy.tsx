function PrivacyPolicy() {
  return (
    <div class="legal-document">
      <h1>プライバシーポリシー</h1>
      <p class="last-updated">最終更新日: 2025年11月12日</p>

      <section>
        <h2>1. 基本方針</h2>
        <p>
          TRPG Scenario
          Maker（以下「本サービス」）は、ユーザーの個人情報の重要性を認識し、
          個人情報の保護に関する法律（個人情報保護法）を遵守し、
          適切な取り扱い及び保護に努めます。
        </p>
      </section>

      <section>
        <h2>2. 収集する情報</h2>
        <p>本サービスでは、以下の情報を収集する場合があります：</p>
        <ul>
          <li>
            <strong>アカウント情報：</strong>
            メールアドレス、ユーザー名、パスワード（暗号化して保存）
          </li>
          <li>
            <strong>作成コンテンツ：</strong>
            シナリオデータ、キャラクター情報、シーン情報、画像データ
          </li>
          <li>
            <strong>利用情報：</strong>
            アクセスログ、IPアドレス、ブラウザ情報、利用日時
          </li>
          <li>
            <strong>Cookie情報：</strong>
            収集しません。
          </li>
        </ul>
      </section>

      <section>
        <h2>3. 情報の利用目的</h2>
        <p>収集した情報は、以下の目的で利用します：</p>
        <ul>
          <li>本サービスの提供・運営・改善</li>
          <li>ユーザー認証及びアカウント管理</li>
          <li>ユーザーサポート対応</li>
          <li>利用状況の分析及びサービス改善</li>
          <li>不正利用の防止及びセキュリティ対策</li>
          <li>利用規約違反行為への対応</li>
          <li>重要なお知らせの通知</li>
        </ul>
      </section>

      <section>
        <h2>4. 情報の第三者提供</h2>
        <p>
          本サービスは、以下の場合を除き、ユーザーの個人情報を第三者に提供しません：
        </p>
        <ul>
          <li>ユーザーの同意がある場合</li>
          <li>法令に基づく場合</li>
          <li>人の生命、身体又は財産の保護のために必要がある場合</li>
          <li>
            公衆衛生の向上又は児童の健全な育成の推進のために特に必要がある場合
          </li>
          <li>
            国の機関若しくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して
            協力する必要がある場合
          </li>
        </ul>
      </section>

      <section>
        <h2>5. データの保管と保護</h2>
        <ul>
          <li>
            <strong>データベース：</strong>
            PostgreSQL及びKùzuDBを使用し、適切なアクセス制御を実施
          </li>
          <li>
            <strong>パスワード：</strong>
            ハッシュ化（bcrypt等）により暗号化して保存
          </li>
          <li>
            <strong>通信の暗号化：</strong>
            HTTPS通信により、データ送受信時の暗号化を実施
          </li>
          <li>
            <strong>バックアップ：</strong>
            定期的なバックアップにより、データ損失を防止
          </li>
        </ul>
      </section>

      <section>
        <h2>6. Cookie（クッキー）について</h2>
        <p>本サービスでは、Cookieを使用しません。</p>
        <p>ブラウザの設定により、Cookieの受け取りを拒否することができます。</p>
      </section>

      <section>
        <h2>7. ユーザーの権利</h2>
        <p>ユーザーは、以下の権利を有します：</p>
        <ul>
          <li>
            <strong>開示請求：</strong>
            保有する個人情報の開示を請求できます
          </li>
          <li>
            <strong>訂正請求：</strong>
            個人情報の訂正・追加・削除を請求できます
          </li>
          <li>
            <strong>利用停止請求：</strong>
            個人情報の利用停止・消去を請求できます
          </li>
          <li>
            <strong>アカウント削除：</strong>
            アカウント削除により、すべての個人情報を削除できます
          </li>
        </ul>
      </section>

      <section>
        <h2>8. データの保存期間</h2>
        <ul>
          <li>
            <strong>アカウント情報：</strong>
            アカウント削除まで保存
          </li>
          <li>
            <strong>作成コンテンツ：</strong>
            ユーザーによる削除操作まで保存
          </li>
          <li>
            <strong>アクセスログ：</strong>
            最大1年間保存（セキュリティ対策のため）
          </li>
        </ul>
      </section>

      <section>
        <h2>9. 子供のプライバシー</h2>
        <p>
          本サービスは、13歳未満の子供から故意に個人情報を収集しません。
          保護者の方で、お子様が個人情報を提供したことに気づかれた場合は、
          速やかにご連絡ください。
        </p>
      </section>

      <section>
        <h2>10. プライバシーポリシーの変更</h2>
        <p>
          本プライバシーポリシーは、法令の変更や本サービスの機能変更に伴い、
          予告なく変更する場合があります。
          重要な変更がある場合は、本サービス上で通知します。
        </p>
      </section>

      <style>{`
        .legal-document {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          line-height: 1.8;
        }

        .legal-document h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: #333;
        }

        .last-updated {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 2rem;
        }

        .legal-document section {
          margin-bottom: 2rem;
        }

        .legal-document h2 {
          font-size: 1.5rem;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #444;
          border-bottom: 2px solid #eee;
          padding-bottom: 0.5rem;
        }

        .legal-document ul {
          margin-left: 1.5rem;
          margin-top: 0.5rem;
        }

        .legal-document li {
          margin-bottom: 0.5rem;
        }

        .legal-document strong {
          color: #333;
        }

        .legal-document p {
          margin-bottom: 1rem;
          color: #555;
        }
      `}</style>
    </div>
  );
}

export default PrivacyPolicy;
