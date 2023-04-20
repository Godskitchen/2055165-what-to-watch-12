import { createSlice } from '@reduxjs/toolkit';
import { AppData } from '../../types/state';
import { SliceNameSpace } from '../../const';
import { addReviewAction, fetchFilmAction, fetchFilmsAction, fetchPromoFilmAction, fetchReviewsAction, fetchSimilarFilmsAction, setFilmStatusAction } from '../api-actions';

const initialState: AppData = {
  isFilmsDataLoadingStatus: false,
  isDataUploadingStatus: false,
  promoFilm: {
    id: 0,
    name: '',
    posterImage: '',
    previewImage: '',
    backgroundImage: '',
    backgroundColor: '',
    videoLink: '',
    previewVideoLink: '',
    description: '',
    rating: 0,
    scoresCount: 0,
    director: '',
    starring: [],
    runTime: 0,
    genre: '',
    released: 0,
    isFavorite: false,
  },
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
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isFilmsDataLoadingStatus = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.isFilmsDataLoadingStatus = false;
        state.filmsList = action.payload;
      })
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.isFilmsDataLoadingStatus = false;
        state.filmsList = [];
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
      })
      .addCase(fetchFilmAction.pending, (state) => {
        state.isFilmsDataLoadingStatus = true;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.isFilmsDataLoadingStatus = false;
        state.currentFilm = action.payload;
      })
      .addCase(fetchFilmAction.rejected, (state) => {
        state.isFilmsDataLoadingStatus = false;
        state.currentFilm = null;
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
