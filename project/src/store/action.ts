import { createAction } from '@reduxjs/toolkit';
import { Film, Films, Reviews } from '../types/film';
import { AuthorizationStatus } from '../const';
import { UserInfo } from '../types/user-data';

export const changeGenre = createAction<string>('main/changeFilterGenre');

export const resetFilterGenre = createAction('main/resetFilterGenre');

export const showMoreFilms = createAction('main/showMoreFilms');

export const resetFilmsCountOnPage = createAction('main/resetFilmsCountOnPage');

export const setFilmsList = createAction<Films>('data/setFilmsList');

export const setPromoFilm = createAction<Film>('data/setPromoFilm');

export const setFilmsDataLoadingStatus = createAction<boolean>('data/setFilmsDataLoadingStatus');
export const setDataUploadingStatus = createAction<boolean>('data/setDataUploadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setUserInfo = createAction<UserInfo>('user/setUserInfo');

export const redirectToRoute = createAction<string>('app/redirectToRoute');

export const setFilm = createAction<Film | null>('data/setFilm');

export const setFilmReviews = createAction<Reviews>('data/setFilmReviews');

export const setSimilarFilms = createAction<Films>('data/setSimilarFilms');

export const setFavoriteFilms = createAction<Films>('data/setFavoriteFilms');
