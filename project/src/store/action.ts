import { createAction } from '@reduxjs/toolkit';
import { Film, Films } from '../types/film';

export const changeGenre = createAction<{activeGenre: string}>('main/changeFilterGenre');

export const resetFilterGenre = createAction('main/resetFilterGenre');

export const showMoreFilms = createAction('main/showMoreFilms');

export const resetFilmsCountOnPage = createAction('main/resetFilmsCountOnPage');

export const loadFilmsList = createAction<Films>('data/loadFilmsList');

export const loadPromoFilm = createAction<Film>('data/loadPromoFilm');

export const setFilmsDataLoadingStatus = createAction<boolean>('data/setFilmsDataLoadingStatus');
