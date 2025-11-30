import {
  initializeDatabase,
  graphDbSchemas,
  executeQuery,
  readFSVFile,
  writeFSVFile,
  setItem,
  getItem,
} from '@echo-500/graphdb';
import { runMigrate } from '@echo-500/rdb/db/runMigrate';
import { battleCommandGraphHandlers } from '@/entities/battleCommand/workers/battleCommandGraphHandlers';
import { memoryGraphHandlers } from '@/entities/memory/workers/memoryGraphHandlers';
import { playerCharacterGraphHandlers } from '@/entities/playerCharacter/workers/playerCharacterGraphHandlers';
import { playerCharacterRdbHandlers } from '@/entities/playerCharacter/workers/playerCharacterRdbHandlers';

// 汎用リクエスト/レスポンス型
export interface DBWorkerRequest {
  type: string;
  payload?: unknown;
}

export interface DBWorkerResponse {
  type: string;
  data?: unknown;
  success?: boolean;
  error?: string;
  originalType?: string;
}

// ハンドラー関数の型
type HandlerFunction = (
  payload: unknown,
) => Promise<Omit<DBWorkerResponse, 'type'>>;

// ハンドラーマップ
const handlers = new Map<string, HandlerFunction>();

// マイグレーションハンドラー（共通）
handlers.set('migrate', async () => {
  console.debug('[DB Worker] Starting migration...');
  try {
    // GraphDB初期化
    console.debug('[DB Worker] Initializing GraphDB...');
    await initializeDatabase();
    console.debug('[DB Worker] GraphDB initialized successfully');

    // GraphDBスキーマ作成
    console.debug('[DB Worker] Creating GraphDB schemas...');
    const schemas = [...graphDbSchemas.nodes, ...graphDbSchemas.relationships];
    await Promise.all(schemas.map((schema) => executeQuery(schema.query)));
    console.debug('[DB Worker] GraphDB schemas created successfully');

    // RDBマイグレーション
    console.debug('[DB Worker] Running RDB migration...');
    await runMigrate();
    console.debug('[DB Worker] RDB migration completed successfully');

    return { success: true };
  } catch (error) {
    console.error('[DB Worker] Migration failed:', error);
    throw error;
  }
});

// GraphDB保存ハンドラー
handlers.set('graphdb:save', async (payload: unknown) => {
  const { query, path } = payload as { query: string; path: string };
  if (!query || !path) {
    throw new Error('Query and path are required');
  }

  // クエリを実行してCSVファイルを生成
  await executeQuery(query);

  // ファイルシステムからデータを読み取り
  const content = readFSVFile(path);

  // IndexedDBに保存
  await setItem(path, content);

  return { success: true };
});

// GraphDB読み込みハンドラー
handlers.set('graphdb:load', async (payload: unknown) => {
  const { query, path } = payload as { query: string; path: string };
  if (!query || !path) {
    throw new Error('Query and path are required');
  }

  // IndexedDBからデータを取得
  const content = await getItem(path);

  if (!content) {
    return { success: true };
  }

  // ファイルシステムに書き込み
  await writeFSVFile(path, content);

  // クエリを実行してデータをロード
  await executeQuery(query);

  return { success: true };
});

// プレイヤーキャラクターハンドラーを登録（RDB）
playerCharacterRdbHandlers.forEach(({ type, handler }) => {
  handlers.set(type, handler);
});

// プレイヤーキャラクターハンドラーを登録（GraphDB）
playerCharacterGraphHandlers.forEach(({ type, handler }) => {
  handlers.set(type, handler);
});

// バトルコマンドハンドラーを登録（GraphDB）
battleCommandGraphHandlers.forEach(({ type, handler }) => {
  handlers.set(type, handler);
});

// メモリーハンドラーを登録（GraphDB）
memoryGraphHandlers.forEach(({ type, handler }) => {
  handlers.set(type, handler);
});

// GraphDB変更操作かどうかを判定
const isGraphDBMutation = (type: string): boolean =>
  type.includes(':create') ||
  type.includes(':delete') ||
  type.includes(':update') ||
  type.includes(':link') ||
  type.includes(':unlink') ||
  type.includes('Node') ||
  type.includes('SortOrder');

// GraphDB保存処理
const saveGraphDB = async (): Promise<void> => {
  // ノードを保存
  await Promise.all(
    graphDbSchemas.nodes.map(async (schema) => {
      const nodeFilename = `/${schema.name}.csv`;
      try {
        await executeQuery(
          `COPY (MATCH (n:${schema.name}) RETURN n.*) TO '${nodeFilename}' (header=false);`,
        );
        const content = readFSVFile(nodeFilename);
        await setItem(nodeFilename, content);
      } catch (error) {
        console.error(`Failed to save node ${schema.name}:`, error);
      }
    }),
  );

  // リレーションを保存
  await Promise.all(
    graphDbSchemas.relationships.map(async (schema) => {
      const edgeFilename = `/${schema.name}.csv`;
      try {
        await executeQuery(
          `COPY (MATCH (a)-[f:${schema.name}]->(b) RETURN a.id, b.id, f.*) TO '${edgeFilename}' (header=false, delim='|');`,
        );
        const content = readFSVFile(edgeFilename);
        await setItem(edgeFilename, content);
      } catch (error) {
        console.error(`Failed to save relationship ${schema.name}:`, error);
      }
    }),
  );
};

// Workerメッセージハンドラー
const { self } = globalThis;
self.addEventListener(
  'message',
  async (event: MessageEvent<DBWorkerRequest & { id: number }>) => {
    const { type, id, payload } = event.data;

    try {
      const handler = handlers.get(type);
      if (!handler) {
        throw new Error(`No handler registered for message type: ${type}`);
      }

      const result = await handler(payload);
      const response: DBWorkerResponse = { type, ...result };

      // GraphDB変更操作の場合は自動保存
      if (isGraphDBMutation(type)) {
        await saveGraphDB();
      }

      self.postMessage({ id, ...response });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      self.postMessage({
        id,
        type: 'error',
        error: errorMessage,
        originalType: type,
      } satisfies DBWorkerResponse & { id: number });
    }
  },
);
