import { createAsyncThunk } from '@reduxjs/toolkit';
import { Film, Films, Reviews } from '../types/film';
import { APIRoute, AppRoute } from '../const';
import {redirectToRoute} from './action';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { AuthData, UserData, UserInfo } from '../types/user-data';
import { dropToken, saveToken } from '../services/authToken';
import { toast } from 'react-toastify';

export const fetchFilmsAction = createAsyncThunk<Films, undefined, {extra: AxiosInstance}>(
  'data/fetchFilms',
  async (_arg, { extra: serverApi}) => {
    const {data} = await serverApi.get<Films>(APIRoute.FilmsList);
    return data;
  }
);

export const fetchPromoFilmAction = createAsyncThunk<Film, undefined,
{
  extra: AxiosInstance;
}>(
  'data/fetchPromoFilm',
  async (_arg, { extra: serverApi}) => {
    try {
      const {data} = await serverApi.get<Film>(APIRoute.PromoFilm);
      return data;
    } catch {
      toast.error('Failed to load promo film. Please try again later.');
      throw new Error();
    }
  }
);

export const fetchFilmAction = createAsyncThunk<Film, string,
{
  extra: AxiosInstance;
}>(
  'data/fetchFilm',
  async(filmId, {extra: serverApi}) => {
    const {data} = await serverApi.get<Film>(`/films/${filmId}`);
    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<Reviews, string,
{
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async(filmId, { extra: serverApi}) => {
    try {
      const {data} = await serverApi.get<Reviews>(`/comments/${filmId}`);
      return data;
    } catch {
      toast.error('Failed to load reviews. Please try again later.');
      throw new Error();
    }
  }
);

export const fetchSimilarFilmsAction = createAsyncThunk<Films, string,
{
  extra: AxiosInstance;
}>(
  'data/fetchSimilarFilms',
  async(filmId, {extra: serverApi}) => {
    try {
      const {data} = await serverApi.get<Films>(`/films/${filmId}/similar`);
      return data;
    } catch {
      toast.error('Failed to load similar films. Please try again later.');
      throw new Error();
    }
  }
);

export const fetchFavoriteFilmsAction = createAsyncThunk<Films, undefined,
{
  extra: AxiosInstance;
}>(
  'user/fetchUseFavoriteFilms',
  async(_arg, { extra: serverApi}) => {
    try {
      const {data} = await serverApi.get<Films>(APIRoute.FavoriteFilms);
      return data;
    } catch {
      toast.error('Failed to load favorite films. Please try again later.');
      throw new Error();
    }
  }
);

export const loginAction = createAsyncThunk<UserInfo, AuthData,
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: serverApi}) => {
    try {
      const {data} = await serverApi.post<UserData>(APIRoute.Login, {email, password});
      const {token, ...userInfo} = data;

      saveToken(token);
      dispatch(redirectToRoute(AppRoute.Main));

      return userInfo;
    } catch {
      toast.error('Service isn\'t available. Please, try again later');
      throw new Error();
    }
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
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const checkAuthAction = createAsyncThunk<UserInfo, undefined,
{
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: serverApi}) => {
    const {data} = await serverApi.get<UserData>(APIRoute.Login);
    const {token, ...userInfo} = data;
    return userInfo;
  },
);

export const setFilmStatusAction = createAsyncThunk<{updatedFilm: Film; isPromo: boolean}, {filmId: string; status: number; isPromo: boolean},
{
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'user/addToFavorites',
  async ({filmId, status, isPromo}, {dispatch, extra: serverApi}) => {
    try {
      const {data} = await serverApi.post<Film>(`/favorite/${filmId}/${status}`);
      await dispatch(fetchFavoriteFilmsAction());
      return {updatedFilm: data, isPromo};
    } catch {
      toast.error('Service isn\'t available. Please, try again later');
      throw new Error();
    }
  },
);

export const addReviewAction = createAsyncThunk<Reviews, {filmId: string; comment: string; rating: number},
{
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'user/addReview',
  async ({filmId, comment, rating}, {dispatch, extra: serverApi}) => {
    try {
      const {data} = await serverApi.post<Reviews>(`/comments/${filmId}`, {comment, rating});
      dispatch(redirectToRoute(`/films/${filmId}/reviews`));
      return data;
    } catch {
      toast.error('Service isn\'t available. Please, try again later');
      throw new Error();
    }
  },
);

