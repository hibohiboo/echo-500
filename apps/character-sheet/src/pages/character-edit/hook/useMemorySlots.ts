import { generateUUID } from '@echo-500/utility';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import {
  updateMemorySlot as updateMemorySlotAction,
  addTag as addTagAction,
  removeTag as removeTagAction,
  deleteMemorySlot as deleteMemorySlotAction,
  addMemorySlot as addMemorySlotAction,
} from '../model/characterEditSlice';
import type { GraphDbMemoryNode } from '@echo-500/schema';

export function useMemorySlots() {
  const dispatch = useAppDispatch();
  const memorySlots = useAppSelector(
    (state) => state.characterEdit.memorySlots,
  );

  const updateMemorySlot = (
    id: string,
    field: keyof GraphDbMemoryNode,
    value: string | string[],
  ) => {
    dispatch(updateMemorySlotAction({ id, field, value }));
  };

  const addTag = (id: string, tag: string) => {
    dispatch(addTagAction({ id, tag }));
  };

  const removeTag = (id: string, tagIndex: number) => {
    dispatch(removeTagAction({ id, tagIndex }));
  };

  const deleteMemorySlot = (id: string) => {
    dispatch(deleteMemorySlotAction(id));
  };

  const addMemorySlot = () => {
    dispatch(
      addMemorySlotAction({
        id: generateUUID(),
        title: '',
        description: '',
        tags: [],
      }),
    );
  };

  return {
    memorySlots,
    updateMemorySlot,
    addTag,
    removeTag,
    deleteMemorySlot,
    addMemorySlot,
  };
}
