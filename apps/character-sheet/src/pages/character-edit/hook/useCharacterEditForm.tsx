import { useNavigate } from 'react-router';
import { updatePlayerCharacter } from '@/entities/playerCharacter';
import { createAndLinkBattleCommand } from '@/features/playerCharacterBattleCommandManagement';
import {
  createAndLinkMemory,
  updateMemory,
  deleteMemory,
} from '@/features/playerCharacterMemoryManagement/actions/memoryManagementActions';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import {
  setName,
  setIsSubmitting,
  resetForm,
} from '../model/characterEditSlice';
import { useBattleCommands } from './useBattleCommands';
import { useMemorySlots } from './useMemorySlots';
import type { FormEventHandler } from 'react';

export const useCharacterEditForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id: characterId, name, isSubmitting, memorySlots: initialMemorySlots } = useAppSelector((state) => state.characterEdit);
  const memoryModel = useMemorySlots();
  const battleCommandModel = useBattleCommands();

  // 初期メモリーIDを保存
  const initialMemories = initialMemorySlots;
  const initialBattleCommands = battleCommandModel.selectedBattleCommands.map((c) => c.name);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!name.trim() || isSubmitting) return;

    dispatch(setIsSubmitting(true));
    try {
      // 1. キャラクター名を更新
      await dispatch(updatePlayerCharacter(characterId, name));

      // 2. メモリーの更新処理
      const currentMemoryIds = new Set(
        memoryModel.memorySlots.map((m) => m.id),
      );
      const initialMemoryIds = new Set(initialMemories.map((m) => m.id));

      // 削除されたメモリー
      const deletedMemoryIds = [...initialMemoryIds].filter(
        (id) => !currentMemoryIds.has(id),
      );
      await Promise.all(
        deletedMemoryIds.map((memoryId) =>
          dispatch(deleteMemory({ characterId, memoryId })),
        ),
      );

      // 新規追加・更新されたメモリー
      await Promise.all(
        memoryModel.memorySlots.map((memory, index) => {
          const sortOrder = index + 1;

          if (initialMemoryIds.has(memory.id)) {
            // 既存のメモリーを更新
            return dispatch(updateMemory({ characterId, data: memory }));
          }
          // 新規メモリーを作成してリンク
          return dispatch(
            createAndLinkMemory({ characterId, data: memory, sortOrder }),
          );
        }),
      );

      // 3. バトルコマンドの更新処理
      const initialCommandNames = new Set(initialBattleCommands);

      // 新規追加されたコマンド
      const newCommands = battleCommandModel.selectedBattleCommands.filter(
        (c) => !initialCommandNames.has(c.name),
      );

      await Promise.all(
        newCommands.map((command) => {
          const sortOrder =
            battleCommandModel.selectedBattleCommands.indexOf(command) + 1;
          return dispatch(
            createAndLinkBattleCommand(characterId, command, sortOrder),
          );
        }),
      );

      dispatch(resetForm());
      navigate(`/character/${characterId}`);
    } finally {
      dispatch(setIsSubmitting(false));
    }
  };

  const onCancel = () => {
    dispatch(resetForm());
    navigate(`/character/${characterId}`);
  };

  const handleNameChange = (value: string) => {
    dispatch(setName(value));
  };

  return {
    name,
    isSubmitting,
    handleSubmit,
    onCancel,
    handleNameChange,
    ...memoryModel,
    ...battleCommandModel,
  };
};
