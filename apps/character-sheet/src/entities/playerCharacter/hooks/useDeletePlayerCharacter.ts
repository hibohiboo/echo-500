import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import { deletePlayerCharacter } from '../actions/playerCharacterActions';
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

  const submit = useCallback(async () => {
    if (!deletingCharacter) {
      throw new Error('削除対象が選択されていません');
    }
    await dispatch(deletePlayerCharacter(deletingCharacter.id));
  }, [dispatch, deletingCharacter]);

  return {
    isOpen,
    deletingCharacter,
    isDeleting,
    open,
    close,
    submit,
  };
};
