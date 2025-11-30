import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import {
  updateMemorySlot as updateMemorySlotAction,
  addTag as addTagAction,
  removeTag as removeTagAction,
  deleteMemorySlot as deleteMemorySlotAction,
  addMemorySlot as addMemorySlotAction,
} from '../model/characterCreateSlice';
import type { GraphDbMemoryNode } from '@echo-500/schema';

interface UseMemorySlotsProps {
  initialSlots: GraphDbMemoryNode[];
}

export function useMemorySlots(_props: UseMemorySlotsProps) {
  const dispatch = useAppDispatch();
  const memorySlots = useAppSelector(
    (state) => state.characterCreate.memorySlots,
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
    dispatch(addMemorySlotAction());
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
