import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, loadFilmsList, loadPromoFilm, resetFilmsCountOnPage, resetFilterGenre, setFilmsDataLoadingStatus, showMoreFilms } from './action';
import { Film, Films } from '../types/film';
import { DEFAULT_FILTER } from '../const';

const INITIAL_FILMS_COUNT_ON_PAGE = 8;
const FILMS_COUNT_PER_LOAD = 8;

type InitialState = {
  activeGenre: string;
  filmsCountOnPage: number;
  isFilmsDataLoadingStatus: boolean;
  promoFilm: Film;
  filmsList: Films;
}
const initialState: InitialState = {
  activeGenre: DEFAULT_FILTER,
  filmsCountOnPage: INITIAL_FILMS_COUNT_ON_PAGE,
  isFilmsDataLoadingStatus: false,
  promoFilm: {
    id: 0,
    name: '',
    posterImage: '',
    previewImage: '',
    backgroundImage: '',
    backgroundColor: '',
    videoLink: '',
    previewVideoLink: '',
    description: '',
    rating: 0,
    scoresCount: 0,
    director: '',
    starring: [],
    runTime: 0,
    genre: '',
    released: 0,
    isFavorite: false,
  },
  filmsList: []
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      const {activeGenre} = action.payload;
      state.activeGenre = activeGenre;
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
    .addCase(loadPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(setFilmsDataLoadingStatus, (state, action) => {
      state.isFilmsDataLoadingStatus = action.payload;
    });
});
