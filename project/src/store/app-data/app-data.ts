import { createSlice } from '@reduxjs/toolkit';
import { AppData } from '../../types/state';
import { LoadError, SliceNameSpace } from '../../const';
import { addReviewAction, fetchFavoriteFilmsAction, fetchFilmAction, fetchFilmsAction, fetchPromoFilmAction, fetchReviewsAction, fetchSimilarFilmsAction, loginAction, setFilmStatusAction } from '../api-actions';

const initialState: AppData = {
  isFilmsLoadingStatus: false,
  isPromoFilmLoadingStatus: false,
  isFavoriteFilmsLoadingStatus: false,
  isDataUploadingStatus: false,
  loadingError: '',
  promoFilm: undefined,
  filmsList: [],
  currentFilm: undefined,
  filmReviews: [],
  similarFilms: [],
};

export const appData = createSlice({
  name: SliceNameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginAction.pending, (state) => {
        state.isDataUploadingStatus = true;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.isDataUploadingStatus = false;
      })
      .addCase(loginAction.rejected, (state) => {
        state.isDataUploadingStatus = false;
      })
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isFilmsLoadingStatus = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.isFilmsLoadingStatus = false;
        state.filmsList = action.payload;
        state.loadingError = '';
      })
      .addCase(fetchFilmsAction.rejected, (state, action) => {
        state.isFilmsLoadingStatus = false;
        state.filmsList = [];
        state.loadingError = (action.error.code === LoadError.NetworkError)
          ? LoadError.NetworkError
          : LoadError.BadRequest;
      })
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.isPromoFilmLoadingStatus = true;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.isPromoFilmLoadingStatus = false;
      })
      .addCase(fetchPromoFilmAction.rejected, (state) => {
        state.promoFilm = null;
        state.isPromoFilmLoadingStatus = false;
      })
      .addCase(fetchFilmAction.pending, (state) => {
        state.isFilmsLoadingStatus = true;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.isFilmsLoadingStatus = false;
        state.currentFilm = action.payload;
        state.loadingError = '';
      })
      .addCase(fetchFilmAction.rejected, (state, action) => {
        state.isFilmsLoadingStatus = false;
        state.currentFilm = null;
        state.loadingError = (action.error.code === LoadError.NetworkError)
          ? LoadError.NetworkError
          : LoadError.BadRequest;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.filmReviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.filmReviews = [];
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(fetchSimilarFilmsAction.rejected, (state) => {
        state.similarFilms = [];
      })
      .addCase(setFilmStatusAction.fulfilled, (state, action) => {
        const { updatedFilm, isPromo } = action.payload;
        state.currentFilm = updatedFilm;
        if (isPromo) {
          state.promoFilm = updatedFilm;
        }
      })
      .addCase(addReviewAction.pending, (state) => {
        state.isDataUploadingStatus = true;
      })
      .addCase(addReviewAction.fulfilled, (state, action) => {
        state.isDataUploadingStatus = false;
        state.filmReviews = action.payload;
      })
      .addCase(addReviewAction.rejected, (state) => {
        state.isDataUploadingStatus = false;
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state) => {
        state.isFavoriteFilmsLoadingStatus = false;
        state.loadingError = '';
      })
      .addCase(fetchFavoriteFilmsAction.rejected, (state, action) => {
        state.isFavoriteFilmsLoadingStatus = false;
        state.loadingError = (action.error.code === LoadError.NetworkError)
          ? LoadError.NetworkError
          : LoadError.BadRequest;
      })
      .addCase(fetchFavoriteFilmsAction.pending, (state) => {
        state.isFavoriteFilmsLoadingStatus = true;
      });
  }
});
