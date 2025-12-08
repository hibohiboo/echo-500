import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import { fetchBattleCommands } from '../actions/battleCommandManagementActions';

/**
 * プレイヤーキャラクターのバトルコマンド管理機能
 * （Entity層の battleCommand と playerCharacter を組み合わせたFeature）
 */
export const useBattleCommandManagement = (characterId: string) => {
  const dispatch = useAppDispatch();
  const commands = useAppSelector(
    (state) => state.battleCommand.commandsByCharacter[characterId] || [],
  );
  const isLoading = useAppSelector((state) => state.battleCommand.isLoading);

  useEffect(() => {
    dispatch(fetchBattleCommands(characterId));
  }, [dispatch, characterId]);

  return {
    commands,
    isLoading,
  };
};
