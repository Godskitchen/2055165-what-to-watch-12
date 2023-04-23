import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_FILTER, SliceNameSpace } from '../../const';
import { MainProcess } from '../../types/state';

const INITIAL_FILMS_COUNT_ON_PAGE = 8;
const FILMS_COUNT_PER_LOAD = 8;

const initialState: MainProcess = {
  activeGenre: DEFAULT_FILTER,
  filmsCountOnPage: INITIAL_FILMS_COUNT_ON_PAGE,
};

export const mainProcess = createSlice({
  name: SliceNameSpace.Main,
  initialState,
  reducers: {
    changeGenre: (state, action: PayloadAction<string>) => {
      state.activeGenre = action.payload;
    },
    resetFilterGenre: (state) => {
      state.activeGenre = DEFAULT_FILTER;
    },
    showMoreFilms: (state) => {
      state.filmsCountOnPage = state.filmsCountOnPage + FILMS_COUNT_PER_LOAD;
    },
    resetFilmsCountOnPage: (state) => {
      state.filmsCountOnPage = INITIAL_FILMS_COUNT_ON_PAGE;
    },
  }
});

export const {changeGenre, resetFilterGenre, resetFilmsCountOnPage, showMoreFilms} = mainProcess.actions;


