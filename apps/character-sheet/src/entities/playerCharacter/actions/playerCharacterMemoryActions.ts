import { playerCharacterGraphApi } from '../api/playerCharacterGraphApi';
import type { PlayerCharacterMemory } from '@echo-500/schema';

/**
 * プレイヤーキャラクターのメモリー一覧を取得
 */
export const fetchPlayerCharacterMemories = (
  characterId: string,
): Promise<PlayerCharacterMemory[]> =>
  playerCharacterGraphApi.getMemories(characterId);
