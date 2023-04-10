import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, loadFilmsList, resetFilmsCountOnPage, resetFilmsList, resetFilterGenre, setFilmsDataLoadingStatus, showMoreFilms } from './action';
//import { filmsList } from '../mocks/films';
import { Films } from '../types/film';

const INITIAL_FILMS_COUNT_ON_PAGE = 8;
const FILMS_COUNT_PER_LOAD = 8;
const DEFAULT_FILTER = 'All genres';

type InitialState = {
  activeGenre: string;
  filmsCountOnPage: number;
  isFilmsDataLoadingStatus: boolean;
  filmsList: Films;
}
const initialState: InitialState = {
  activeGenre: DEFAULT_FILTER,
  filmsCountOnPage: INITIAL_FILMS_COUNT_ON_PAGE,
  isFilmsDataLoadingStatus: false,
  filmsList: []
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      const {activeGenre} = action.payload;
      state.activeGenre = activeGenre;
    })
    .addCase(resetFilmsList, (state) => {
      state.filmsList = [];
    })
    .addCase(resetFilterGenre, (state) => {
      state.activeGenre = DEFAULT_FILTER;
    })
    .addCase(showMoreFilms, (state) => {
      state.filmsCountOnPage = state.filmsCountOnPage + FILMS_COUNT_PER_LOAD;
    })
    .addCase(resetFilmsCountOnPage, (state) => {
      state.filmsCountOnPage = INITIAL_FILMS_COUNT_ON_PAGE;
    })
    .addCase(loadFilmsList, (state, action) => {
      state.filmsList = action.payload;
    })
    .addCase(setFilmsDataLoadingStatus, (state, action) => {
      state.isFilmsDataLoadingStatus = action.payload;
    });
});
