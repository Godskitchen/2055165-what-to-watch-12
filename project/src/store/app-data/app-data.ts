import { createSlice } from '@reduxjs/toolkit';
import { AppData } from '../../types/state';
import { SliceNameSpace } from '../../const';
import { addReviewAction, fetchFilmAction, fetchFilmsAction, fetchPromoFilmAction, fetchReviewsAction, fetchSimilarFilmsAction, loginAction, setFilmStatusAction } from '../api-actions';

const initialState: AppData = {
  isFilmsDataLoadingStatus: false,
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
        state.isFilmsDataLoadingStatus = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.isFilmsDataLoadingStatus = false;
        state.filmsList = action.payload;
        state.hasLoadingError = false;
      })
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.isFilmsDataLoadingStatus = false;
        state.filmsList = [];
        state.hasLoadingError = true;
      })
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.isFilmsDataLoadingStatus = true;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.isFilmsDataLoadingStatus = false;
      })
      .addCase(fetchPromoFilmAction.rejected, (state) => {
        state.promoFilm = null;
        state.isFilmsDataLoadingStatus = false;
      })
      .addCase(fetchFilmAction.pending, (state) => {
        state.isFilmsDataLoadingStatus = true;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.isFilmsDataLoadingStatus = false;
        state.currentFilm = action.payload;
        state.hasLoadingError = false;
      })
      .addCase(fetchFilmAction.rejected, (state) => {
        state.isFilmsDataLoadingStatus = false;
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
      });
  }
});
