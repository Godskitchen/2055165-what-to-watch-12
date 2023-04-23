import { SliceNameSpace } from '../../const';
import { State } from '../../types/state';

export const getActiveFilterGenre = (state: State): string => state[SliceNameSpace.Main].activeGenre;
export const getFilmsCountOnPage = (state: State): number => state[SliceNameSpace.Main].filmsCountOnPage;
