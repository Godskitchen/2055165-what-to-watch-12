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
    changeFilterGenreAction: (state, action: PayloadAction<string>) => {
      state.activeGenre = action.payload;
    },
    resetFilterGenreAction: (state) => {
      state.activeGenre = DEFAULT_FILTER;
    },
    showMoreFilmsAction: (state) => {
      state.filmsCountOnPage = state.filmsCountOnPage + FILMS_COUNT_PER_LOAD;
    },
    resetFilmsCountOnPageAction: (state) => {
      state.filmsCountOnPage = INITIAL_FILMS_COUNT_ON_PAGE;
    },
  }
});

export const { changeFilterGenreAction, resetFilterGenreAction, resetFilmsCountOnPageAction, showMoreFilmsAction } = mainProcess.actions;


