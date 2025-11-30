import { fetchPlayerCharacters } from '@/entities/playerCharacter';

export const createCharacterListLoader =
  (dispatch: AppDispatch) => async () => {
    const characters = await dispatch(fetchPlayerCharacters());
    return characters;
  };
