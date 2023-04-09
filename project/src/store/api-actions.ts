import { createAsyncThunk } from '@reduxjs/toolkit';
import { Films } from '../types/film';
import { APIRoute } from '../const';
import { loadFilmsList, setFilmsDataLoadingStatus } from './action';
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
