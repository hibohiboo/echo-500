# Memory機能 Lintエラー修正計画

## 現状の問題

### Lintエラー内容
```
src/entities/memory/workers/memoryGraphHandlers.ts(4,3): error TS2305: Module '"@echo-500/schema"' has no exported member 'parseLinkMemoryPayload'.
src/entities/memory/workers/memoryGraphHandlers.ts(5,3): error TS2724: '"@echo-500/schema"' has no exported member named 'parseUnlinkMemoryPayload'.
src/entities/memory/workers/memoryGraphHandlers.ts(6,3): error TS2305: Module '"@echo-500/schema"' has no exported member 'parseUpdateMemorySortOrder'.
src/entities/memory/workers/memoryGraphHandlers.ts(7,3): error TS2305: Module '"@echo-500/schema"' has no exported member 'parseCreateMemoryParams'.
src/entities/memory/workers/memoryGraphHandlers.ts(8,3): error TS2305: Module '"@echo-500/schema"' has no exported member 'parseUpdateMemoryParams'.
src/entities/memory/workers/memoryGraphHandlers.ts(9,3): error TS2305: Module '"@echo-500/schema"' has no exported member 'parseMemoryId'.
```

### 根本原因
`packages/schema/src/memory.ts`がシンプル化しすぎて、Worker Handlerで必要なparse関数をexportしていない。

## 現在のmemory.tsの構成

### 現在exportしているもの（必要なもの）
1. **型定義**:
   - `Memory`
   - `GraphDbMemoryNode`
   - `GraphDbMemory`
   - `PlayerCharacterMemory`

2. **GraphDB Parse関数**（実際に使用中）:
   - `parseToGraphDbMemoryNodeList` - memoryRepository.test.tsで使用
   - `parseToGraphDbMemoryList` - playerCharacterGraphHandlers.tsで使用

### 現在exportしていないもの（Worker Handlerで必要）
- `parseCreateMemoryParams`
- `parseUpdateMemoryParams`
- `parseMemoryId`
- `parseLinkMemoryPayload`
- `parseUnlinkMemoryPayload`
- `parseUpdateMemorySortOrder`

## BattleCommandの実装パターンとの比較

### BattleCommandが提供しているparse関数
```typescript
// packages/schema/src/battleCommand.ts
export const parseBattleCommandFormData = (data: unknown): BattleCommandFormData => {
  return v.parse(BattleCommandFormDataSchema, data);
};

export const parseBattleCommandId = (data: unknown): { id: string } => {
  return v.parse(BattleCommandIdPayloadSchema, data);
};

export const parseCheckDuplicateBattleCommandPayload = (data: unknown): { ... } => { ... };
export const parseLinkBattleCommandPayload = (data: unknown) => { ... };
export const parseUnlinkBattleCommandPayload = (data: unknown) => { ... };
export const parseUpdateSortOrderPayload = (data: unknown) => { ... };
```

### BattleCommand Worker Handlerでの使用例
```typescript
// apps/character-sheet/src/entities/battleCommand/workers/battleCommandGraphHandlers.ts
import {
  parseBattleCommandFormData,
  parseBattleCommandId,
  parseCheckDuplicateBattleCommandPayload,
  parseLinkBattleCommandPayload,
  parseUpdateSortOrderPayload,
  parseToGraphDbBattleCommandNodeList,
} from '@echo-500/schema';

{
  type: 'battleCommand:create',
  handler: async (payload: unknown) => {
    const data = parseBattleCommandFormData(payload);
    const id = generateUUID();
    const result = await battleCommandGraphRepository.create({ id, ...data });
    const commands = parseToGraphDbBattleCommandNodeList(result);
    return { data: commands[0] };
  },
}
```

## 修正方針

### 方針A: BattleCommandパターンに完全に合わせる（推奨）
**理由**: 既存コードとの一貫性、保守性の向上

#### 追加するparse関数
```typescript
// packages/schema/src/memory.ts

export const parseCreateMemoryParams = (data: unknown): {
  id: string;
  title: string;
  description: string;
  tags: string[];
} => {
  return v.parse(
    v.object({
      id: v.string(),
      title: v.string(),
      description: v.string(),
      tags: v.array(v.string()),
    }),
    data,
  );
};

export const parseUpdateMemoryParams = (data: unknown): {
  id: string;
  title: string;
  description: string;
  tags: string[];
} => {
  return v.parse(
    v.object({
      id: v.string(),
      title: v.string(),
      description: v.string(),
      tags: v.array(v.string()),
    }),
    data,
  );
};

export const parseMemoryId = (data: unknown): { id: string } => {
  return v.parse(v.object({ id: v.string() }), data);
};

export const parseLinkMemoryPayload = (data: unknown): {
  characterId: string;
  memoryId: string;
  sortOrder: number;
} => {
  return v.parse(
    v.object({
      characterId: v.string(),
      memoryId: v.string(),
      sortOrder: v.number(),
    }),
    data,
  );
};

export const parseUnlinkMemoryPayload = (data: unknown): {
  characterId: string;
  memoryId: string;
} => {
  return v.parse(
    v.object({
      characterId: v.string(),
      memoryId: v.string(),
    }),
    data,
  );
};

export const parseUpdateMemorySortOrder = (data: unknown): {
  characterId: string;
  memoryId: string;
  sortOrder: number;
} => {
  return v.parse(
    v.object({
      characterId: v.string(),
      memoryId: v.string(),
      sortOrder: v.number(),
    }),
    data,
  );
};
```

### 方針B: Worker Handlerで直接v.parseを使う（非推奨）
**理由**: BattleCommandと一貫性がなくなる、型安全性が下がる

#### 変更箇所
```typescript
// apps/character-sheet/src/entities/memory/workers/memoryGraphHandlers.ts
import * as v from 'valibot';

// 各ハンドラーで直接v.parseを使用
{
  type: 'memory:create',
  handler: async (payload: unknown) => {
    const data = v.parse(
      v.object({
        id: v.string(),
        title: v.string(),
        description: v.string(),
        tags: v.array(v.string()),
      }),
      payload,
    );
    // ...
  },
}
```

## 推奨する修正手順

### ステップ1: memory.tsにparse関数を追加
`packages/schema/src/memory.ts`の末尾に上記の6つのparse関数を追加する。

### ステップ2: lintを実行して確認
```bash
cd apps/character-sheet
bun run lint
```

### ステップ3: ユニットテストを実行して回帰確認
```bash
cd packages/graphdb
bun run test src/queries/memoryRepository.test.ts
```

## 修正後のmemory.tsの構成

```
packages/schema/src/memory.ts
├── スキーマ定義
│   ├── MemorySchema
│   ├── GraphDbMemoryNodeOnlySchema
│   ├── GraphDbMemorySchema
│   └── PlayerCharacterMemorySchema
├── 型定義
│   ├── Memory
│   ├── GraphDbMemoryNode
│   ├── GraphDbMemory
│   └── PlayerCharacterMemory
├── GraphDB Parse関数
│   ├── GraphDbMemoryNodeRawSchema (private)
│   ├── GraphDbMemoryRawSchema (private)
│   ├── parseToGraphDbMemoryNodeList ← テストで使用
│   └── parseToGraphDbMemoryList ← Worker Handlerで使用
└── Worker Handler Parse関数（新規追加）
    ├── parseCreateMemoryParams
    ├── parseUpdateMemoryParams
    ├── parseMemoryId
    ├── parseLinkMemoryPayload
    ├── parseUnlinkMemoryPayload
    └── parseUpdateMemorySortOrder
```

## 一貫性確認

### BattleCommandとの対応表
| BattleCommand | Memory | 用途 |
|--------------|--------|------|
| `parseBattleCommandFormData` | `parseCreateMemoryParams` | 作成時のデータパース |
| `parseBattleCommandId` | `parseMemoryId` | ID取得 |
| `parseLinkBattleCommandPayload` | `parseLinkMemoryPayload` | リンク作成 |
| `parseUnlinkBattleCommandPayload` | `parseUnlinkMemoryPayload` | リンク削除 |
| `parseUpdateSortOrderPayload` | `parseUpdateMemorySortOrder` | sortOrder更新 |
| - | `parseUpdateMemoryParams` | 更新用（BattleCommandにはupdate機能なし） |

## 結論

**方針A（BattleCommandパターンに合わせる）を採用する理由:**
1. コードベース全体の一貫性が保たれる
2. 型安全性が保証される
3. 将来的なリファクタリングが容易
4. parse関数は実際に使用されるため、「使われないコード」ではない
5. メンテナンス性が向上する

この方針で進めてよろしいでしょうか？
