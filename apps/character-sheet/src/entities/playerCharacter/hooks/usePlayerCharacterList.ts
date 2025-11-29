import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import { fetchPlayerCharacters } from '../actions/playerCharacterActions';

/**
 * プレイヤーキャラクター一覧を取得・管理するhook
 */
export const usePlayerCharacterList = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(
    (state) => state.playerCharacter.characters,
  );
  const isLoading = useAppSelector((state) => state.playerCharacter.isLoading);

  useEffect(() => {
    dispatch(fetchPlayerCharacters());
  }, [dispatch]);

  return {
    characters,
    isLoading,
  };
};
