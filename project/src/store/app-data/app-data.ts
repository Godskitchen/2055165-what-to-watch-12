import { createSlice } from '@reduxjs/toolkit';
import { AppData } from '../../types/state';
import { SliceNameSpace } from '../../const';
import { addReviewAction, fetchFavoriteFilmsAction, fetchFilmAction, fetchFilmsAction, fetchPromoFilmAction, fetchReviewsAction, fetchSimilarFilmsAction, loginAction, setFilmStatusAction } from '../api-actions';

const initialState: AppData = {
  isFilmsLoadingStatus: false,
  isPromoFilmLoadingStatus: false,
  isFavoriteFilmsLoadingStatus: false,
  isDataUploadingStatus: false,
  hasLoadingError: false,
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
        state.hasLoadingError = false;
      })
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.isFilmsLoadingStatus = false;
        state.filmsList = [];
        state.hasLoadingError = true;
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
        state.hasLoadingError = false;
      })
      .addCase(fetchFilmAction.rejected, (state) => {
        state.isFilmsLoadingStatus = false;
        state.currentFilm = null;
        state.hasLoadingError = true;
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
        const {updatedFilm, isPromo} = action.payload;
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
        state.hasLoadingError = false;
      })
      .addCase(fetchFavoriteFilmsAction.rejected, (state) => {
        state.isFavoriteFilmsLoadingStatus = false;
        state.hasLoadingError = true;
      })
      .addCase(fetchFavoriteFilmsAction.pending, (state) => {
        state.isFavoriteFilmsLoadingStatus = true;
      });
  }
});
