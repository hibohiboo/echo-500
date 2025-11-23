import { createAsyncThunk } from '@reduxjs/toolkit';
import { generateUUID } from '@echo-500/utility';
import { graphdbWorkerClient } from '@/workers/graphdbWorkerClient';
import { characterGraphApi } from '../api/characterGraphApi';
import type { Character } from '@echo-500/schema';

export const createCharacterAction = createAsyncThunk<
  Character,
  { name: string; description: string }
>('character/create', async (payload) => {
  const newCharacter = await characterGraphApi.create({
    id: generateUUID(),
    name: payload.name,
    description: payload.description,
  });

  await graphdbWorkerClient.save();
  return newCharacter;
});

export const updateCharacterAction = createAsyncThunk<
  Character,
  { id: string; name: string; description: string }
>('character/update', async (payload) => {
  const updatedCharacter = await characterGraphApi.update(payload);

  await graphdbWorkerClient.save();
  return updatedCharacter;
});

export const deleteCharacterAction = createAsyncThunk<string, { id: string }>(
  'character/delete',
  async (payload) => {
    await characterGraphApi.delete(payload.id);

    await graphdbWorkerClient.save();
    return payload.id;
  },
);

export const readCharacterListAction = createAsyncThunk<Character[], void>(
  'character/readList',
  async () => characterGraphApi.getList(),
);
