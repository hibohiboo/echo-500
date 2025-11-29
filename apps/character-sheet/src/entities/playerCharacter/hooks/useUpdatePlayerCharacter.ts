import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import { updatePlayerCharacter } from '../actions/playerCharacterActions';
import {
  openEditModal,
  closeEditModal,
  setEditName,
} from '../model/playerCharacterSlice';
import type { SerializablePlayerCharacter } from '@echo-500/schema';

/**
 * プレイヤーキャラクター更新機能を管理するhook
 */
export const useUpdatePlayerCharacter = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(
    (state) => state.playerCharacter.isEditModalOpen,
  );
  const editingCharacter = useAppSelector(
    (state) => state.playerCharacter.editingCharacter,
  );
  const name = useAppSelector((state) => state.playerCharacter.editName);
  const isSubmitting = useAppSelector(
    (state) => state.playerCharacter.isSubmitting,
  );

  const open = useCallback(
    (character: SerializablePlayerCharacter) => {
      dispatch(openEditModal(character));
    },
    [dispatch],
  );

  const close = useCallback(() => {
    dispatch(closeEditModal());
  }, [dispatch]);

  const setName = useCallback(
    (value: string) => {
      dispatch(setEditName(value));
    },
    [dispatch],
  );

  const submit = useCallback(async () => {
    if (!editingCharacter) {
      throw new Error('編集対象が選択されていません');
    }
    if (!name.trim()) {
      throw new Error('名前を入力してください');
    }
    await dispatch(updatePlayerCharacter(editingCharacter.id, name));
  }, [dispatch, editingCharacter, name]);

  return {
    isOpen,
    editingCharacter,
    name,
    isSubmitting,
    open,
    close,
    setName,
    submit,
  };
};
