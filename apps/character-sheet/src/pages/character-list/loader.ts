import { fetchPlayerCharacters } from '@/entities/playerCharacter';

export const createCharacterListLoader =
  (dispatch: AppDispatch) => async () => {
    console.log('bef');
    const characters = await dispatch(fetchPlayerCharacters());
    console.log('af', characters);
    return characters;
  };
