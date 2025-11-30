# Memory機能実装計画

## 概要

キャラクターが複数のメモリー（Memory）を所持できる機能を実装する。
`BattleCommand`の実装パターンを踏襲し、GraphDBで`PlayerCharacter`と`Memory`をリレーションで管理する。

## ネーミング

- **エンティティ名**: `Memory`
- **理由**:
  - シンプルで直感的
  - `BattleCommand`と同様の粒度感
  - GraphDBノード名としても自然

## データ構造

### GraphDB構造

```cypher
(:PlayerCharacter {id})-[:HAS_MEMORY {sortOrder}]->(:Memory {
  id: STRING,
  title: STRING,
  description: STRING,
  tags: STRING  // JSON文字列
})
```

### スキーマ構造

```typescript
// 基本データ
interface Memory {
  title: string;
  description: string;
  tags: string[];
}

// GraphDBノード（ID付き）
interface GraphDbMemoryNode extends Memory {
  id: string;
}

// PlayerCharacterのMemory（sortOrder付き）
interface PlayerCharacterMemory extends GraphDbMemoryNode {
  sortOrder: number;
}
```

## 実装範囲

### 1. スキーマ層

**ファイル**: `packages/schema/src/memory.ts`（新規作成）

#### スキーマ定義
- `MemorySchema` - 基本データ（title, description, tags）
- `GraphDbMemoryNodeOnlySchema` - ID付き、sortOrderなし
- `GraphDbMemorySchema` - ID付き、sortOrder付き
- `PlayerCharacterMemorySchema` - GraphDbMemorySchemaのエイリアス
- `MemoryFormDataSchema` - 作成・更新用（IDなし）

#### Payload定義
- `CreateMemoryPayloadSchema` - { title, description, tags }
- `UpdateMemoryPayloadSchema` - { id, data: { title, description, tags } }
- `MemoryIdPayloadSchema` - { id }
- `LinkMemoryPayloadSchema` - { characterId, memoryId, sortOrder }
- `UnlinkMemoryPayloadSchema` - { characterId, memoryId }
- `UpdateMemorySortOrderPayloadSchema` - { characterId, memoryId, sortOrder }

#### Parse関数
- `parseToMemory()` - MemorySchema
- `parseToMemoryList()` - Memory[]
- `parseToPlayerCharacterMemory()` - PlayerCharacterMemorySchema
- `parseToPlayerCharacterMemoryList()` - PlayerCharacterMemory[]
- `parseToGraphDbMemoryNodeList()` - tagsをJSON.parse
- `parseToGraphDbMemoryList()` - tagsをJSON.parse + sortOrder

#### Payload Parse関数
- `parseCreateMemoryPayload()`
- `parseUpdateMemoryPayload()`
- `parseMemoryIdPayload()`
- `parseLinkMemoryPayload()`
- `parseUnlinkMemoryPayload()`
- `parseUpdateMemorySortOrderPayload()`

#### Worker Handler Parse関数
- `parseMemoryFormData()`
- `parseMemoryId()`
- `parseUpdateSortOrderPayload()`

#### GraphDB Parse関数
- `GraphDbMemoryNodeSchema` - tagsがJSON文字列、sortOrderなし
- `GraphDbMemoryRawSchema` - tagsがJSON文字列、sortOrder付き、OptionalToStringSchema使用

#### 型定義
- `Memory`
- `GraphDbMemoryNode`
- `GraphDbMemory`
- `PlayerCharacterMemory`
- `MemoryFormData`

### 2. GraphDBスキーマ層

**ファイル**: `packages/graphdb/src/schemas.ts`

#### 追加内容
```typescript
// Memoryノード定義
CREATE NODE TABLE IF NOT EXISTS Memory(
  id STRING,
  title STRING,
  description STRING,
  tags STRING,  // JSON文字列
  PRIMARY KEY (id)
);

// HAS_MEMORYリレーション定義
CREATE REL TABLE IF NOT EXISTS HAS_MEMORY(
  FROM PlayerCharacter TO Memory,
  sortOrder INT64
);
```

### 3. GraphDB Repository層

**ファイル**: `packages/graphdb/src/queries/memoryRepository.ts`（新規作成）

#### メソッド一覧

```typescript
export const memoryGraphRepository = {
  /**
   * Memoryノードを作成
   * tagsはJSON文字列として保存
   */
  async create(params: {
    id: string;
    title: string;
    description: string;
    tags: string[];
  }): Promise<QueryResult>

  /**
   * PlayerCharacterとMemoryをHAS_MEMORYリレーションで接続
   */
  async linkToCharacter(
    characterId: string,
    memoryId: string,
    sortOrder: number,
  ): Promise<QueryResult>

  /**
   * PlayerCharacterとMemoryのリレーションを削除
   */
  async unlinkFromCharacter(
    characterId: string,
    memoryId: string,
  ): Promise<QueryResult>

  /**
   * Memoryの並び順を更新
   */
  async updateSortOrder(
    characterId: string,
    memoryId: string,
    sortOrder: number,
  ): Promise<QueryResult>

  /**
   * Memoryノードとそのリレーションを削除
   */
  async delete(memoryId: string): Promise<QueryResult>

  /**
   * Memoryノードを更新
   */
  async update(params: {
    id: string;
    title: string;
    description: string;
    tags: string[];
  }): Promise<QueryResult>
}
```

#### Cypher クエリ例

```cypher
-- create
CREATE (m:Memory {
  id: 'xxx',
  title: 'タイトル',
  description: '説明',
  tags: '["tag1","tag2"]'
})
RETURN m.id AS id, m.title AS title, m.description AS description, m.tags AS tags

-- linkToCharacter
MATCH (pc:PlayerCharacter {id: 'characterId'})
MATCH (m:Memory {id: 'memoryId'})
CREATE (pc)-[r:HAS_MEMORY {sortOrder: 0}]->(m)
RETURN r

-- unlinkFromCharacter
MATCH (pc:PlayerCharacter {id: 'characterId'})-[r:HAS_MEMORY]->(m:Memory {id: 'memoryId'})
DELETE r

-- updateSortOrder
MATCH (pc:PlayerCharacter {id: 'characterId'})-[r:HAS_MEMORY]->(m:Memory {id: 'memoryId'})
SET r.sortOrder = 1
RETURN r

-- delete
MATCH (m:Memory {id: 'memoryId'})
DETACH DELETE m

-- update
MATCH (m:Memory {id: 'xxx'})
SET m.title = '新タイトル', m.description = '新説明', m.tags = '["new1","new2"]'
RETURN m.id AS id, m.title AS title, m.description AS description, m.tags AS tags
```

### 4. ユニットテスト

**ファイル**: `packages/graphdb/src/queries/memoryRepository.test.ts`（新規作成）

#### テストケース
- `create()` - Memoryノード作成成功
- `linkToCharacter()` - リレーション作成成功
- `unlinkFromCharacter()` - リレーション削除成功
- `updateSortOrder()` - sortOrder更新成功
- `delete()` - ノード削除成功
- `update()` - ノード更新成功

#### テストデータ
```typescript
const testMemory = {
  id: 'memory-001',
  title: 'テストメモリー',
  description: 'これはテストです',
  tags: ['test', 'memory'],
};
```

### 5. Worker統合

**ファイル**:
- `apps/character-sheet/src/workers/db/handlers/memoryHandlers.ts`（新規作成）
- `apps/character-sheet/src/workers/db/dbWorker.ts`（ハンドラー追加）

#### Worker操作一覧

```typescript
// memoryHandlers.ts
export const memoryHandlers = {
  'memory:createNode': async (payload) => {
    const { id, title, description, tags } = parseMemoryFormData(payload);
    return memoryGraphRepository.create({ id, title, description, tags });
  },

  'memory:updateNode': async (payload) => {
    const { id, title, description, tags } = parseUpdateMemoryPayload(payload);
    return memoryGraphRepository.update({ id, title, description, tags });
  },

  'memory:deleteNode': async (payload) => {
    const { id } = parseMemoryId(payload);
    return memoryGraphRepository.delete(id);
  },

  'memory:linkToCharacter': async (payload) => {
    const { characterId, memoryId, sortOrder } = parseLinkMemoryPayload(payload);
    return memoryGraphRepository.linkToCharacter(characterId, memoryId, sortOrder);
  },

  'memory:unlinkFromCharacter': async (payload) => {
    const { characterId, memoryId } = parseUnlinkMemoryPayload(payload);
    return memoryGraphRepository.unlinkFromCharacter(characterId, memoryId);
  },

  'memory:updateSortOrder': async (payload) => {
    const { characterId, memoryId, sortOrder } = parseUpdateSortOrderPayload(payload);
    return memoryGraphRepository.updateSortOrder(characterId, memoryId, sortOrder);
  },

  'memory:getMemories': async (payload) => {
    const { id } = parsePlayerCharacterId(payload);
    return playerCharacterGraphRepository.getMemories(id);
  },
};
```

#### PlayerCharacter Repository追加

**ファイル**: `packages/graphdb/src/queries/playerCharacterRepository.ts`

```typescript
/**
 * PlayerCharacterのメモリーを取得（sortOrder順）
 */
async getMemories(characterId: string): Promise<PlayerCharacterMemory[]> {
  const result = await executeQuery(`
    MATCH (pc:PlayerCharacter {id: '${characterId}'})-[r:HAS_MEMORY]->(m:Memory)
    RETURN
      m.id AS id,
      m.title AS title,
      m.description AS description,
      m.tags AS tags,
      r.sortOrder AS sortOrder
    ORDER BY r.sortOrder ASC
  `);
  return parseToGraphDbMemoryList(result);
}
```

### 6. フロントエンド Entity層

**ディレクトリ**: `apps/character-sheet/src/entities/memory/`（新規作成）

#### ファイル構成

```
apps/character-sheet/src/entities/memory/
├── api/
│   └── memoryGraphApi.ts       # GraphDB通信（Worker経由）
├── actions/
│   └── memoryActions.ts        # 純粋なAPI操作（Redux操作なし）
└── index.ts                    # エクスポート
```

#### memoryGraphApi.ts

```typescript
import { dbWorkerClient } from '@/workers/dbWorkerClient';
import type { PlayerCharacterMemory } from '@echo-500/schema';

/**
 * MemoryのGraphDB API（IndexedDB経由）
 */
export const memoryGraphApi = {
  /**
   * Memoryノードを作成
   */
  create: (params: {
    id: string;
    title: string;
    description: string;
    tags: string[];
  }): Promise<void> =>
    dbWorkerClient.request('memory:createNode', params),

  /**
   * Memoryノードを更新
   */
  update: (params: {
    id: string;
    title: string;
    description: string;
    tags: string[];
  }): Promise<void> =>
    dbWorkerClient.request('memory:updateNode', params),

  /**
   * Memoryノードを削除
   */
  delete: (id: string): Promise<void> =>
    dbWorkerClient.request('memory:deleteNode', { id }),

  /**
   * PlayerCharacterにMemoryをリンク
   */
  linkToCharacter: (
    characterId: string,
    memoryId: string,
    sortOrder: number,
  ): Promise<void> =>
    dbWorkerClient.request('memory:linkToCharacter', {
      characterId,
      memoryId,
      sortOrder,
    }),

  /**
   * PlayerCharacterからMemoryのリンクを解除
   */
  unlinkFromCharacter: (
    characterId: string,
    memoryId: string,
  ): Promise<void> =>
    dbWorkerClient.request('memory:unlinkFromCharacter', {
      characterId,
      memoryId,
    }),

  /**
   * Memoryの並び順を更新
   */
  updateSortOrder: (
    characterId: string,
    memoryId: string,
    sortOrder: number,
  ): Promise<void> =>
    dbWorkerClient.request('memory:updateSortOrder', {
      characterId,
      memoryId,
      sortOrder,
    }),
};
```

#### memoryActions.ts

```typescript
import { memoryGraphApi } from '../api/memoryGraphApi';

/**
 * Memoryノードを作成（Redux操作なし）
 */
export const createMemoryNode = (params: {
  id: string;
  title: string;
  description: string;
  tags: string[];
}): Promise<void> => memoryGraphApi.create(params);

/**
 * Memoryノードを更新（Redux操作なし）
 */
export const updateMemoryNode = (params: {
  id: string;
  title: string;
  description: string;
  tags: string[];
}): Promise<void> => memoryGraphApi.update(params);

/**
 * Memoryノードを削除（Redux操作なし）
 */
export const deleteMemoryNode = (id: string): Promise<void> =>
  memoryGraphApi.delete(id);

/**
 * PlayerCharacterにMemoryをリンク（Redux操作なし）
 */
export const linkMemoryToCharacter = (
  characterId: string,
  memoryId: string,
  sortOrder: number,
): Promise<void> =>
  memoryGraphApi.linkToCharacter(characterId, memoryId, sortOrder);

/**
 * PlayerCharacterからMemoryのリンクを解除（Redux操作なし）
 */
export const unlinkMemoryFromCharacter = (
  characterId: string,
  memoryId: string,
): Promise<void> =>
  memoryGraphApi.unlinkFromCharacter(characterId, memoryId);

/**
 * Memoryの並び順を更新（Redux操作なし）
 */
export const updateMemorySortOrder = (
  characterId: string,
  memoryId: string,
  sortOrder: number,
): Promise<void> =>
  memoryGraphApi.updateSortOrder(characterId, memoryId, sortOrder);
```

### 7. PlayerCharacter Entity層への統合

**ファイル**: `apps/character-sheet/src/entities/playerCharacter/api/playerCharacterGraphApi.ts`

```typescript
/**
 * PlayerCharacterのメモリーを取得（sortOrder順）
 */
getMemories: (
  characterId: string,
): Promise<PlayerCharacterMemory[]> =>
  dbWorkerClient.request('memory:getMemories', { id: characterId }),
```

**ファイル**: `apps/character-sheet/src/entities/playerCharacter/actions/playerCharacterMemoryActions.ts`（新規作成）

```typescript
import { playerCharacterGraphApi } from '../api/playerCharacterGraphApi';
import type { PlayerCharacterMemory } from '@echo-500/schema';

/**
 * プレイヤーキャラクターのメモリー一覧を取得
 */
export const fetchPlayerCharacterMemories = (
  characterId: string,
): Promise<PlayerCharacterMemory[]> =>
  playerCharacterGraphApi.getMemories(characterId);
```

## BattleCommandとの対応表

| BattleCommand | Memory |
|--------------|--------|
| `BattleCommandSchema` | `MemorySchema` |
| `GraphDbBattleCommandNodeOnlySchema` | `GraphDbMemoryNodeOnlySchema` |
| `GraphDbBattleCommandSchema` | `GraphDbMemorySchema` |
| `PlayerCharacterBattleCommandSchema` | `PlayerCharacterMemorySchema` |
| `HAS_BATTLE_COMMAND` | `HAS_MEMORY` |
| `battleCommandRepository.ts` | `memoryRepository.ts` |
| `battleCommand:createNode` | `memory:createNode` |
| `battleCommand:linkToCharacter` | `memory:linkToCharacter` |
| `playerCharacterBattleCommandActions.ts` | `playerCharacterMemoryActions.ts` |

## 実装順序

1. ✅ **計画ドキュメント作成**
2. スキーマ層実装 - `packages/schema/src/memory.ts`
3. GraphDBスキーマ更新 - `packages/graphdb/src/schemas.ts`
4. GraphDB Repository実装 - `packages/graphdb/src/queries/memoryRepository.ts`
5. ユニットテスト作成 - `packages/graphdb/src/queries/memoryRepository.test.ts`
6. PlayerCharacter Repository更新 - `getMemories()` 追加
7. Worker統合 - `memoryHandlers.ts` 作成、`dbWorker.ts` 更新
8. フロントエンド Entity層実装 - `entities/memory/`
9. PlayerCharacter Actions追加 - `playerCharacterMemoryActions.ts`
10. 動作確認 - `Page.tsx` でメモリー追加が可能か確認

## 動作確認方法

### バックエンド（ユニットテスト）

```bash
cd packages/graphdb
bun run test src/queries/memoryRepository.test.ts
```

### フロントエンド（手動テスト）

1. `Page.tsx` でMemory作成フォームを実装（ユーザー側）
2. Memory作成
3. PlayerCharacterにリンク
4. Memory一覧表示
5. sortOrder更新
6. Memory削除

## 備考

- tagsは配列だがGraphDBにはJSON文字列として保存
- sortOrderはリレーション（HAS_MEMORY）のプロパティ
- BattleCommandの実装パターンを完全に踏襲
- Redux Stateは今回の実装範囲外（ユーザー側で実装）
