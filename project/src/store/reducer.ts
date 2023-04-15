import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, setFilmsList, setPromoFilm, requireAuthorization, resetFilmsCountOnPage, resetFilterGenre, setFilmsDataLoadingStatus, showMoreFilms, setUserInfo, setFilm, setFilmReviews, setSimilarFilms, setFavoriteFilms } from './action';
import { Film, Films, Reviews } from '../types/film';
import { AuthorizationStatus, DEFAULT_FILTER } from '../const';
import { UserInfo } from '../types/user-data';

const INITIAL_FILMS_COUNT_ON_PAGE = 8;
const FILMS_COUNT_PER_LOAD = 8;

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  activeGenre: string;
  filmsCountOnPage: number;
  isFilmsDataLoadingStatus: boolean;
  promoFilm: Film;
  filmsList: Films;
  userInfo: UserInfo;
  currentFilm: Film | null;
  filmReviews: Reviews;
  similarFilms: Films;
  userFavoriteFilms: Films;
}
const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
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
  filmsList: [],
  userInfo: {
    avatarUrl: '',
    email: '',
    id: 0,
    name: '',
  },
  currentFilm: null,
  filmReviews: [],
  similarFilms: [],
  userFavoriteFilms: []
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(changeGenre, (state, action) => {
      state.activeGenre = action.payload;
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
    .addCase(setFilmsList, (state, action) => {
      state.filmsList = action.payload;
    })
    .addCase(setPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(setFilmsDataLoadingStatus, (state, action) => {
      state.isFilmsDataLoadingStatus = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.userInfo = action.payload;
    })
    .addCase(setFilm, (state, action) => {
      state.currentFilm = action.payload;
    })
    .addCase(setFilmReviews, (state, action) => {
      state.filmReviews = action.payload;
    })
    .addCase(setSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(setFavoriteFilms, (state, action) => {
      state.userFavoriteFilms = action.payload;
    });
});
