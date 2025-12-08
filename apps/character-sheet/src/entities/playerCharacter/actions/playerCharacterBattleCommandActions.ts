import { playerCharacterGraphApi } from '../api/playerCharacterGraphApi';
import type { PlayerCharacterBattleCommand } from '@echo-500/schema';

/**
 * プレイヤーキャラクターのバトルコマンド一覧を取得
 */
export const fetchPlayerCharacterBattleCommands = (
  characterId: string,
): Promise<PlayerCharacterBattleCommand[]> =>
  playerCharacterGraphApi.getBattleCommands(characterId);
