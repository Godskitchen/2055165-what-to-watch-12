import { createAsyncThunk } from '@reduxjs/toolkit';
import { Film, Films } from '../types/film';
import { APIRoute } from '../const';
import { loadFilmsList, loadPromoFilm, setFilmsDataLoadingStatus } from './action';
import { AppDispatch } from '../types/state';
import { AxiosInstance } from 'axios';

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
