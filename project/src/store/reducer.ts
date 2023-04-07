import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, resetFilmsCountOnPage, resetFilmsList, showMoreFilms } from './action';
import { filmsList } from '../mocks/films';

const INITIAL_FILMS_COUNT_ON_PAGE = 8;
const FILMS_COUNT_PER_LOAD = 8;

const initialState = {
  activeGenre: 'All genres',
  filmsCountOnPage: INITIAL_FILMS_COUNT_ON_PAGE,
  filmsList
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      const {activeGenre} = action.payload;
      state.activeGenre = activeGenre;
    })
    .addCase(resetFilmsList, (state) => {
      state.filmsList = filmsList;
    })
    .addCase(showMoreFilms, (state) => {
      state.filmsCountOnPage = state.filmsCountOnPage + FILMS_COUNT_PER_LOAD;
    })
    .addCase(resetFilmsCountOnPage, (state) => {
      state.filmsCountOnPage = INITIAL_FILMS_COUNT_ON_PAGE;
    });
});
