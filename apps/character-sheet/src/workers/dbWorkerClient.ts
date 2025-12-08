import { graphDbSchemas } from '@echo-500/graphdb';
import { BaseWorkerClient } from './BaseWorkerClient';
import DBWorker from './db.worker?worker';
import type { DBWorkerRequest, DBWorkerResponse } from './db.worker';
import type { GlobalHandlerMap } from './types/handlerMaps';

const { nodes, relationships } = graphDbSchemas;
const schemas = [...nodes, ...relationships];

/**
 * DBWorkerクライアント（汎用）
 * エンティティ固有のロジックは含まない
 */
class DBWorkerClient extends BaseWorkerClient<
  DBWorkerRequest,
  DBWorkerResponse
> {
  // eslint-disable-next-line class-methods-use-this
  protected getWorkerUrl(): URL | (new () => Worker) {
    // 開発環境では new URL() を使用（HMR対応）
    if (import.meta.env.DEV) {
      return new URL('./db.worker.ts', import.meta.url);
    }
    // 本番ビルドでは ?worker インポートを使用
    return DBWorker;
  }

  /**
   * 初期化時にマイグレーションとデータロードを実行
   */
  protected async onInitialize(): Promise<void> {
    await this.sendRequest({ type: 'migrate' });
    await this.load();
  }

  /**
   * 汎用リクエスト送信メソッド
   * エンティティAPIから直接使用される
   */
  async request<K extends keyof GlobalHandlerMap>(
    type: K,
    payload?: unknown,
  ): Promise<GlobalHandlerMap[K]> {
    const response = await this.sendRequest<
      DBWorkerResponse & { data: GlobalHandlerMap[K] }
    >({
      type,
      payload,
    });
    return response.data as GlobalHandlerMap[K];
  }

  /**
   * GraphDBデータをIndexedDBに保存
   */
  async save(): Promise<void> {
    await Promise.all(nodes.map((schema) => this.saveNode(schema.name)));
    await Promise.all(
      relationships.map((schema) => this.saveEdge(schema.name)),
    );
  }

  /**
   * IndexedDBからGraphDBデータを読み込み
   */
  async load(): Promise<void> {
    await Promise.all(schemas.map((schema) => this.loadTable(schema.name)));
  }

  private async saveNode(tableName: string): Promise<void> {
    const nodeFilename = `/${tableName}.csv`;
    await this.sendRequest<DBWorkerResponse>({
      type: 'graphdb:save',
      payload: {
        path: nodeFilename,
        query: `COPY (MATCH (n:${tableName}) RETURN n.*) TO '${nodeFilename}' (header=false);`,
      },
    });
  }

  private async saveEdge(tableName: string): Promise<void> {
    const edgeFilename = `/${tableName}.csv`;
    await this.sendRequest<DBWorkerResponse>({
      type: 'graphdb:save',
      payload: {
        path: edgeFilename,
        query: `COPY (MATCH (a)-[f:${tableName}]->(b) RETURN a.id, b.id, f.*) TO '${edgeFilename}' (header=false, delim='|');`,
      },
    });
  }

  private async loadTable(tableName: string): Promise<void> {
    const path = `/${tableName}.csv`;
    await this.sendRequest<DBWorkerResponse>({
      type: 'graphdb:load',
      payload: {
        path,
        query: `COPY ${tableName} FROM '${path}'`,
      },
    });
  }
}

// シングルトンインスタンス
export const dbWorkerClient = new DBWorkerClient();
