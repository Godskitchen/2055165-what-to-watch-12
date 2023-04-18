/* eslint-disable no-console */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Film, Films, Reviews } from '../types/film';
import { APIRoute, AppRoute, AuthorizationStatus, guestData } from '../const';
import { setFilmsList, setPromoFilm, setUserInfo, redirectToRoute, requireAuthorization, setFilmsDataLoadingStatus, setFilm, setFilmReviews, setSimilarFilms, setFavoriteFilms, setDataUploadingStatus } from './action';
import { AppDispatch } from '../types/state';
import { AxiosInstance } from 'axios';
import { AuthData, UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/authToken';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {dispatch: AppDispatch; extra: AxiosInstance}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: serverApi}) => {
    dispatch(setFilmsDataLoadingStatus(true));
    const {data} = await serverApi.get<Films>(APIRoute.FilmsList);
    dispatch(setFilmsDataLoadingStatus(false));
    dispatch(setFilmsList(data));
  }
);

export const fetchPromoFilmAction = createAsyncThunk<void, undefined,
{
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/fetchPromoFilm',
  async (_arg, {dispatch, extra: serverApi}) => {
    const {data} = await serverApi.get<Film>(APIRoute.PromoFilm);
    dispatch(setPromoFilm(data));
  }
);

export const fetchFilmAction = createAsyncThunk<void, string,
{
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/fetchFilm',
  async(filmId, {dispatch, extra: serverApi}) => {
    try {
      dispatch(setFilmsDataLoadingStatus(true));
      const {data} = await serverApi.get<Film>(`/films/${filmId}`);
      dispatch(setFilm(data));
      dispatch(setFilmsDataLoadingStatus(false));
    } catch {
      dispatch(setFilm(null));
      dispatch(setFilmsDataLoadingStatus(false));
    }
  }
);

export const fetchReviewsAction = createAsyncThunk<void, string,
{
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async(filmId, {dispatch, extra: serverApi}) => {
    try {
      const {data} = await serverApi.get<Reviews>(`/comments/${filmId}`);
      dispatch(setFilmReviews(data));
    } catch {
      dispatch(setFilmReviews([]));
    }
  }
);

export const fetchSimilarFilmsAction = createAsyncThunk<void, string,
{
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarFilms',
  async(filmId, {dispatch, extra: serverApi}) => {
    try {
      const {data} = await serverApi.get<Films>(`/films/${filmId}/similar`);
      dispatch(setSimilarFilms(data));
    } catch {
      dispatch(setSimilarFilms([]));
    }
  }
);

export const fetchFavoriteFilmsAction = createAsyncThunk<void, undefined,
{
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/fetchFavoriteFilms',
  async(_arg, {dispatch, extra: serverApi}) => {
    try {
      const {data} = await serverApi.get<Films>(APIRoute.FavoriteFilms);
      dispatch(setFavoriteFilms(data));
    } catch {
      dispatch(setFavoriteFilms([]));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData,
{
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: serverApi}) => {
    const {data} = await serverApi.post<UserData>(APIRoute.Login, {email, password});
    const {token, ...userInfo} = data;

    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserInfo(userInfo));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined,
{
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setUserInfo(guestData));
    dispatch(setFavoriteFilms([]));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined,
{
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: serverApi}) => {
    try {
      const {data: {avatarUrl, id, email, name}} = await serverApi.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserInfo({avatarUrl, id, email, name}));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const setFilmStatusAction = createAsyncThunk<void, {filmId: string; status: number; isPromo: boolean},
{
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'user/addToFavorites',
  async ({filmId, status, isPromo}, {dispatch, extra: serverApi}) => {
    const {data} = await serverApi.post<Film>(`/favorite/${filmId}/${status}`);
    dispatch(setFilm(data));
    if (isPromo) {
      dispatch(setPromoFilm(data));
    }
    await dispatch(fetchFavoriteFilmsAction());
  },
);

export const addReviewAction = createAsyncThunk<void, {filmId: string; comment: string; rating: number},
{
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'user/addReview',
  async ({filmId, comment, rating}, {dispatch, extra: serverApi}) => {
    try {
      dispatch(setDataUploadingStatus(true));
      const {data} = await serverApi.post<Reviews>(`/comments/${filmId}`, {comment, rating});
      dispatch(setFilmReviews(data));
      dispatch(setDataUploadingStatus(false));
      dispatch(redirectToRoute(`/films/${filmId}/reviews`));
    } catch {
      dispatch(setDataUploadingStatus(false));
    }
  },
);
