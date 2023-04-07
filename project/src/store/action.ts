import { createAction } from '@reduxjs/toolkit';

export const changeGenre = createAction<{activeGenre: string}>('changeGenre');

export const resetFilmsList = createAction('resetFilmsList');

export const showMoreFilms = createAction('showMoreFilms');

export const resetFilmsCountOnPage = createAction('resetFilmsCountOnPage');
