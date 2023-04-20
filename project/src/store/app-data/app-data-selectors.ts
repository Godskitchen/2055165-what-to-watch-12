import { SliceNameSpace } from '../../const';
import { Film, Films, Reviews } from '../../types/film';
import { State } from '../../types/state';

export const getPromoFilm = (state: State): Film => state[SliceNameSpace.Data].promoFilm;
export const getPromoFilmId = (state: State): number => state[SliceNameSpace.Data].promoFilm.id;

export const getFilmsList = (state: State): Films => state[SliceNameSpace.Data].filmsList;
export const getCurrentFilm = (state: State): Film | null | undefined => state[SliceNameSpace.Data].currentFilm;
export const getFilmReviews = (state: State): Reviews => state[SliceNameSpace.Data].filmReviews;
export const getSimilarFilms = (state: State): Films => state[SliceNameSpace.Data].similarFilms;

export const getFilmsDataLoadingStatus = (state: State): boolean => state[SliceNameSpace.Data].isFilmsDataLoadingStatus;
export const getDataUploadingStatus = (state: State): boolean => state[SliceNameSpace.Data].isDataUploadingStatus;
