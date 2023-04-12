/* eslint-disable no-console */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Film, Films } from '../types/film';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { loadFilmsList, loadPromoFilm, loadUserAvatarUrl, redirectToRoute, requireAuthorization, setFilmsDataLoadingStatus } from './action';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { AuthData, UserData } from '../types/user-data';
import { saveToken } from '../services/authToken';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {dispatch: AppDispatch; extra: AxiosInstance}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: serverApi}) => {
    dispatch(setFilmsDataLoadingStatus(true));
    const {data} = await serverApi.get<Films>(APIRoute.FilmsList);
    dispatch(setFilmsDataLoadingStatus(false));
    dispatch(loadFilmsList(data));
  }
);

export const fetchPromoFilmAction = createAsyncThunk<void, undefined, {dispatch: AppDispatch; extra: AxiosInstance}>(
  'data/fetchPromoFilm',
  async (_arg, {dispatch, extra: serverApi}) => {
    const {data} = await serverApi.get<Film>(APIRoute.PromoFilm);
    dispatch(loadPromoFilm(data));
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: serverApi}) => {
    const {data} = await serverApi.post<UserData>(APIRoute.Login, {email, password});
    const {token, avatarUrl} = data;

    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(loadUserAvatarUrl(avatarUrl));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: serverApi}) => {
    try {
      const {data: {avatarUrl}} = await serverApi.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(loadUserAvatarUrl(avatarUrl));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);
