import { SliceNameSpace } from '../../const';
import { Film, Films, Reviews } from '../../types/film';
import { State } from '../../types/state';

export const getPromoFilm = (state: State): Film | null | undefined => state[SliceNameSpace.Data].promoFilm;
export const getPromoFilmId = (state: State): number => {
  const promoFilm = state[SliceNameSpace.Data].promoFilm;
  return promoFilm ? promoFilm.id : 0;
};

export const getFilmsList = (state: State): Films => state[SliceNameSpace.Data].filmsList;
export const getCurrentFilm = (state: State): Film | null | undefined => state[SliceNameSpace.Data].currentFilm;
export const getFilmReviews = (state: State): Reviews => state[SliceNameSpace.Data].filmReviews;
export const getSimilarFilms = (state: State): Films => state[SliceNameSpace.Data].similarFilms;

export const getFilmsLoadingStatus = (state: State): boolean => state[SliceNameSpace.Data].isFilmsLoadingStatus;
export const getFavoriteFilmsLoadingStatus = (state: State): boolean => state[SliceNameSpace.Data].isFavoriteFilmsLoadingStatus;
export const getPromoFilmLoadingStatus = (state: State): boolean => state[SliceNameSpace.Data].isPromoFilmLoadingStatus;

export const getDataUploadingStatus = (state: State): boolean => state[SliceNameSpace.Data].isDataUploadingStatus;

export const getLoadErrorStatus = (state: State): boolean => state[SliceNameSpace.Data].hasLoadingError;
