import { generateUUID } from '@echo-500/utility';
import type { AppDispatch } from '@/app/store';
import { playerCharacterGraphApi } from '../api/playerCharacterGraphApi';
import { playerCharacterRdbApi } from '../api/playerCharacterRdbApi';
import {
  setCharacters,
  addCharacter,
  updateCharacter as updateCharacterState,
  removeCharacter,
  setIsLoading,
  setIsSubmitting,
  setIsDeleting,
  closeCreateModal,
  closeEditModal,
  closeDeleteModal,
} from '../model/playerCharacterSlice';
import type { SerializablePlayerCharacter } from '@echo-500/schema';

/**
 * プレイヤーキャラクター一覧を取得
 */
export const fetchPlayerCharacters = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const characters = await playerCharacterRdbApi.findAll();
    dispatch(setCharacters(characters));
  } catch (error) {
    console.error('Failed to fetch player characters:', error);
    throw error;
  } finally {
    dispatch(setIsLoading(false));
  }
};

/**
 * プレイヤーキャラクターを作成（RDB + GraphDB）
 */
export const createPlayerCharacter =
  (name: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setIsSubmitting(true));

      // 1. IDを生成
      const id = generateUUID();

      // 2. RDBにデータを保存（生成したIDを使用）
      const character = await playerCharacterRdbApi.create(id, { name });

      // 3. GraphDBにノードを作成（同じIDを使用）
      await playerCharacterGraphApi.create(id);

      // 4. Reduxステートを更新
      dispatch(addCharacter(character));
      dispatch(closeCreateModal());
    } catch (error) {
      console.error('Failed to create player character:', error);
      throw error;
    } finally {
      dispatch(setIsSubmitting(false));
    }
  };

/**
 * プレイヤーキャラクターを更新
 */
export const updatePlayerCharacter =
  (id: string, name: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setIsSubmitting(true));

      // RDBのみ更新（GraphDBはIDのみなので更新不要）
      const updatedCharacter = await playerCharacterRdbApi.update(id, { name });

      // Reduxステートを更新
      dispatch(updateCharacterState(updatedCharacter));
      dispatch(closeEditModal());
    } catch (error) {
      console.error('Failed to update player character:', error);
      throw error;
    } finally {
      dispatch(setIsSubmitting(false));
    }
  };

/**
 * プレイヤーキャラクターを削除（RDB + GraphDB）
 */
export const deletePlayerCharacter =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setIsDeleting(true));

      // 1. GraphDBノードを削除（リレーションも自動削除）
      await playerCharacterGraphApi.delete(id);

      // 2. RDBデータを削除
      await playerCharacterRdbApi.delete(id);

      // 3. Reduxステートを更新
      dispatch(removeCharacter(id));
      dispatch(closeDeleteModal());
    } catch (error) {
      console.error('Failed to delete player character:', error);
      throw error;
    } finally {
      dispatch(setIsDeleting(false));
    }
  };

/**
 * IDでプレイヤーキャラクターを取得
 */
export const fetchPlayerCharacterById =
  (id: string) =>
  async (
    dispatch: AppDispatch,
  ): Promise<SerializablePlayerCharacter | null> => {
    try {
      dispatch(setIsLoading(true));
      return await playerCharacterRdbApi.findById(id);
    } catch (error) {
      console.error('Failed to fetch player character:', error);
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  };
