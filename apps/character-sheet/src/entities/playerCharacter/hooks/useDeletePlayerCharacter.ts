import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import {
  deletePlayerCharacter,
  fetchPlayerCharacters,
} from '../actions/playerCharacterActions';
import {
  openDeleteModal,
  closeDeleteModal,
} from '../model/playerCharacterSlice';
import type { SerializablePlayerCharacter } from '@echo-500/schema';

/**
 * プレイヤーキャラクター削除機能を管理するhook
 */
export const useDeletePlayerCharacter = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(
    (state) => state.playerCharacter.isDeleteModalOpen,
  );
  const deletingCharacter = useAppSelector(
    (state) => state.playerCharacter.deletingCharacter,
  );
  const isDeleting = useAppSelector(
    (state) => state.playerCharacter.isDeleting,
  );

  const open = useCallback(
    (character: SerializablePlayerCharacter) => {
      dispatch(openDeleteModal(character));
    },
    [dispatch],
  );

  const close = useCallback(() => {
    dispatch(closeDeleteModal());
  }, [dispatch]);

  const submit = useCallback(
    async (characterId?: string) => {
      const targetId = characterId ?? deletingCharacter?.id;
      if (!targetId) {
        throw new Error('削除対象が選択されていません');
      }
      await dispatch(deletePlayerCharacter(targetId));
    },
    [dispatch, deletingCharacter],
  );
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('削除してよいですか?');
    if (!confirmed) return;
    await dispatch(deletePlayerCharacter(id));
    await dispatch(fetchPlayerCharacters());
  };
  return {
    isOpen,
    deletingCharacter,
    isDeleting,
    open,
    close,
    submit,
    handleDelete,
  };
};
