import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import { createPlayerCharacter } from '../actions/playerCharacterActions';
import {
  openCreateModal,
  closeCreateModal,
  setCreateName,
} from '../model/playerCharacterSlice';

/**
 * プレイヤーキャラクター作成機能を管理するhook
 */
export const useCreatePlayerCharacter = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(
    (state) => state.playerCharacter.isCreateModalOpen,
  );
  const name = useAppSelector((state) => state.playerCharacter.createName);
  const isSubmitting = useAppSelector(
    (state) => state.playerCharacter.isSubmitting,
  );

  const open = useCallback(() => {
    dispatch(openCreateModal());
  }, [dispatch]);

  const close = useCallback(() => {
    dispatch(closeCreateModal());
  }, [dispatch]);

  const setName = useCallback(
    (value: string) => {
      dispatch(setCreateName(value));
    },
    [dispatch],
  );

  const submit = useCallback(async () => {
    if (!name.trim()) {
      throw new Error('名前を入力してください');
    }
    await dispatch(createPlayerCharacter(name));
  }, [dispatch, name]);

  return {
    isOpen,
    name,
    isSubmitting,
    open,
    close,
    setName,
    submit,
  };
};
