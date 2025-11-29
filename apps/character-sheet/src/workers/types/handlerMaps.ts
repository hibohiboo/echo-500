import type { BattleCommandGraphHandlerMap } from '@/entities/battleCommand/workers/battleCommandGraphHandlers';
import type { PlayerCharacterGraphHandlerMap } from '@/entities/playerCharacter/workers/playerCharacterGraphHandlers';
import type { PlayerCharacterRdbHandlerMap } from '@/entities/playerCharacter/workers/playerCharacterRdbHandlers';

/**
 * 全てのGraphDBハンドラーマップを統合した型
 * graphdbWorkerClient.request メソッドで型推論を有効にするために使用
 */
export type GlobalGraphHandlerMap = PlayerCharacterGraphHandlerMap &
  BattleCommandGraphHandlerMap;

/**
 * 全てのRDBハンドラーマップを統合した型
 * dbWorkerClient.request メソッドで型推論を有効にするために使用
 */
export type GlobalRdbHandlerMap = PlayerCharacterRdbHandlerMap;

/**
 * RDB + GraphDB統合ハンドラーマップ
 */
export type GlobalHandlerMap = GlobalRdbHandlerMap & GlobalGraphHandlerMap;
