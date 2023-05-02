import { AppData } from '../../types/state';
import { addReviewAction, fetchFavoriteFilmsAction, fetchFilmAction, fetchFilmsAction, fetchPromoFilmAction, fetchReviewsAction, fetchSimilarFilmsAction, loginAction, setFilmStatusAction } from '../api-actions';
import { appData } from './app-data';
import { fakeMovies, fakeReviews } from '../../utils/mocks';
import { LoadError } from '../../const';

const filmsList = [...fakeMovies];
const reviewsList = [...fakeReviews];

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

describe('Reducer app-data', () => {
  it('without additional parameters should return initial state', () => {
    expect(appData.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  describe('loginAction test', () => {
    let testState: AppData;

    beforeEach(() => { testState = { ...initialState }; });
    it('should enable data uploading status if loginAction pending', () => {
      expect(appData.reducer(testState, { type: loginAction.pending.type }))
        .toEqual({ ...testState, isDataUploadingStatus: true });
    });

    it('should disable data uploading status if loginAction fulfilled', () => {
      expect(appData.reducer(testState, { type: loginAction.fulfilled.type }))
        .toEqual({ ...testState, isDataUploadingStatus: false });
    });

    it('should disable data uploading status if loginAction rejected', () => {
      expect(appData.reducer(testState, { type: loginAction.rejected.type }))
        .toEqual({ ...testState, isDataUploadingStatus: false });
    });
  });

  describe('fetchFilmsAction test', () => {
    let testState: AppData;

    beforeEach(() => { testState = { ...initialState }; });

    it('should enable films loading status if fetchFilmsAction pending', () => {
      expect(appData.reducer(testState, { type: fetchFilmsAction.pending.type }))
        .toEqual({ ...testState, isFilmsLoadingStatus: true });
    });

    it('should update available films list if fetchFilmsAction fulfilled', () => {
      expect(appData.reducer(testState, { type: fetchFilmsAction.fulfilled.type, payload: filmsList }))
        .toEqual({ ...testState, isFilmsLoadingStatus: false, loadingError: '', filmsList: filmsList });
    });

    it('should set loadingError flag and reset available films list if fetchFilmsAction rejected', () => {

      const state: AppData = {
        isFilmsLoadingStatus: false,
        isPromoFilmLoadingStatus: false,
        isFavoriteFilmsLoadingStatus: false,
        isDataUploadingStatus: false,
        loadingError: '',
        promoFilm: undefined,
        filmsList: filmsList,
        currentFilm: undefined,
        filmReviews: [],
        similarFilms: [],
      };

      expect(appData.reducer(state, { type: fetchFilmsAction.rejected.type, error: { code: LoadError.NetworkError } }))
        .toEqual({ ...state, isFilmsLoadingStatus: false, loadingError: LoadError.NetworkError, filmsList: [] });

      expect(appData.reducer(state, { type: fetchFilmsAction.rejected.type, error: { code: 'Some_bad_request' } }))
        .toEqual({ ...state, isFilmsLoadingStatus: false, loadingError: LoadError.BadRequest, filmsList: [] });
    });
  });

  describe('fetchPromoFilmAction test', () => {
    let testState: AppData;

    beforeEach(() => { testState = { ...initialState }; });

    it('should enable films loading status if fetchPromoFilmAction pending', () => {
      expect(appData.reducer(testState, { type: fetchPromoFilmAction.pending.type }))
        .toEqual({ ...testState, isPromoFilmLoadingStatus: true });
    });

    it('should update promo film if fetchPromoFilmAction fulfilled', () => {
      expect(appData.reducer(testState, { type: fetchPromoFilmAction.fulfilled.type, payload: filmsList[0] }))
        .toEqual({ ...testState, isPromoFilmLoadingStatus: false, promoFilm: filmsList[0] });
    });

    it('should set to null promo film if fetchPromoFilmAction rejected', () => {
      expect(appData.reducer(testState, { type: fetchPromoFilmAction.rejected.type }))
        .toEqual({ ...testState, isPromoFilmLoadingStatus: false, promoFilm: null });
    });
  });

  describe('fetchFilmAction test', () => {
    let testState: AppData;

    beforeEach(() => { testState = { ...initialState }; });

    it('should enable films loading status if fetchFilmAction pending', () => {
      expect(appData.reducer(testState, { type: fetchFilmAction.pending.type }))
        .toEqual({ ...testState, isFilmsLoadingStatus: true });
    });

    it('should update current film if fetchFilmAction fulfilled', () => {
      expect(appData.reducer(testState, { type: fetchFilmAction.fulfilled.type, payload: filmsList[5] }))
        .toEqual({ ...testState, isFilmsLoadingStatus: false, currentFilm: filmsList[5], loadingError: '' });
    });

    it('should set loadingError flag and set to null current film if fetchFilmAction rejected', () => {
      expect(appData.reducer(testState, { type: fetchFilmAction.rejected.type, error: { code: LoadError.NetworkError } }))
        .toEqual({ ...testState, isFilmsLoadingStatus: false, currentFilm: null, loadingError: LoadError.NetworkError });

      expect(appData.reducer(testState, { type: fetchFilmAction.rejected.type, error: { code: 'Some_bad_request' } }))
        .toEqual({ ...testState, isFilmsLoadingStatus: false, currentFilm: null, loadingError: LoadError.BadRequest });
    });
  });

  describe('fetchReviewsAction test', () => {
    let testState: AppData;

    beforeEach(() => { testState = { ...initialState }; });

    it('should update film reviews if fetchReviewsAction fulfilled', () => {
      expect(appData.reducer(testState, { type: fetchReviewsAction.fulfilled.type, payload: reviewsList }))
        .toEqual({ ...testState, filmReviews: reviewsList });
    });

    it('should reset film reviews if fetchReviewsAction rejected', () => {

      const state: AppData = {
        isFilmsLoadingStatus: false,
        isPromoFilmLoadingStatus: false,
        isFavoriteFilmsLoadingStatus: false,
        isDataUploadingStatus: false,
        loadingError: '',
        promoFilm: undefined,
        filmsList: filmsList,
        currentFilm: undefined,
        filmReviews: reviewsList,
        similarFilms: [],
      };
      expect(appData.reducer(state, { type: fetchReviewsAction.rejected.type }))
        .toEqual({ ...state, filmReviews: [] });
    });
  });

  describe('fetchSimilarFilmsAction test', () => {
    let testState: AppData;

    beforeEach(() => { testState = { ...initialState }; });

    it('should update similar films if fetchSimilarFilmsAction fulfilled', () => {
      expect(appData.reducer(testState, { type: fetchSimilarFilmsAction.fulfilled.type, payload: filmsList }))
        .toEqual({ ...testState, similarFilms: filmsList });
    });

    it('should reset similar films if fetchSimilarFilmsAction rejected', () => {
      const state: AppData = {
        isFilmsLoadingStatus: false,
        isPromoFilmLoadingStatus: false,
        isFavoriteFilmsLoadingStatus: false,
        isDataUploadingStatus: false,
        loadingError: '',
        promoFilm: undefined,
        filmsList: [],
        currentFilm: undefined,
        filmReviews: reviewsList,
        similarFilms: filmsList,
      };

      expect(appData.reducer(state, { type: fetchSimilarFilmsAction.rejected.type }))
        .toEqual({ ...state, similarFilms: [] });
    });
  });

  describe('setFilmStatusAction test', () => {

    it('should update current film and promo film favorite status if they are equal and setFilmStatusAction fulfilled', () => {

      const state: AppData = {
        isFilmsLoadingStatus: false,
        isPromoFilmLoadingStatus: false,
        isFavoriteFilmsLoadingStatus: false,
        isDataUploadingStatus: false,
        loadingError: '',
        promoFilm: filmsList[1],
        filmsList: [],
        currentFilm: filmsList[1],
        filmReviews: reviewsList,
        similarFilms: filmsList,
      };

      const updatedState = appData.reducer(state, { type: setFilmStatusAction.fulfilled.type, payload: { updatedFilm: { ...filmsList[1], isFavorite: !filmsList[1].isFavorite }, isPromo: true } });

      expect(updatedState.currentFilm?.isFavorite).not.toBe(state.currentFilm?.isFavorite);
      expect(updatedState.promoFilm?.isFavorite).not.toBe(state.promoFilm?.isFavorite);
      expect(updatedState.currentFilm).toEqual(updatedState.promoFilm);
      expect(updatedState).toEqual({ ...state, currentFilm: updatedState.currentFilm, promoFilm: updatedState.promoFilm });
    });

    it('should update only current film favorite status if they are not equal and setFilmStatusAction fulfilled', () => {

      const state: AppData = {
        isFilmsLoadingStatus: false,
        isPromoFilmLoadingStatus: false,
        isFavoriteFilmsLoadingStatus: false,
        isDataUploadingStatus: false,
        loadingError: '',
        promoFilm: filmsList[1],
        filmsList: [],
        currentFilm: filmsList[2],
        filmReviews: reviewsList,
        similarFilms: filmsList,
      };

      const updatedState = appData.reducer(state, { type: setFilmStatusAction.fulfilled.type, payload: { updatedFilm: { ...filmsList[2], isFavorite: !filmsList[2].isFavorite }, isPromo: false } });

      expect(updatedState.currentFilm?.isFavorite).not.toBe(state.currentFilm?.isFavorite);
      expect(updatedState.promoFilm?.isFavorite).toEqual(state.promoFilm?.isFavorite);
      expect(updatedState.currentFilm).not.toBe(updatedState.promoFilm);
      expect(updatedState).toEqual({ ...state, currentFilm: updatedState.currentFilm });
    });
  });

  describe('addReviewAction test', () => {
    let testState: AppData;

    beforeEach(() => { testState = { ...initialState }; });

    it('should enable data uploading status if addRewiewAction pending', () => {
      expect(appData.reducer(testState, { type: addReviewAction.pending.type }))
        .toEqual({ ...testState, isDataUploadingStatus: true });
    });

    it('should update film reviews if addReviewAction fulfilled', () => {
      expect(appData.reducer(testState, { type: addReviewAction.fulfilled.type, payload: reviewsList }))
        .toEqual({ ...testState, isDataUploadingStatus: false, filmReviews: reviewsList });
    });

    it('should disable uploading status if addReviewAction rejected', () => {
      expect(appData.reducer(testState, { type: addReviewAction.rejected.type }))
        .toEqual({ ...testState, isDataUploadingStatus: false });
    });
  });

  describe('fetchFavoriteFilmsAction test', () => {
    let testState: AppData;

    beforeEach(() => { testState = { ...initialState }; });

    it('should enable films loading status if fetchFavoriteFilmsAction pending', () => {
      expect(appData.reducer(testState, { type: fetchFavoriteFilmsAction.pending.type }))
        .toEqual({ ...testState, isFavoriteFilmsLoadingStatus: true });
    });

    it('should disable films loading status and unset loadingError flag if fetchFavoriteFilmsAction fulfilled', () => {
      expect(appData.reducer(testState, { type: fetchFavoriteFilmsAction.fulfilled.type }))
        .toEqual({ ...testState, isFavoriteFilmsLoadingStatus: false, loadingError: '' });
    });

    it('should disable films loading status and set loadingError flag if fetchFavoriteFilmsAction rejected', () => {
      expect(appData.reducer(testState, { type: fetchFavoriteFilmsAction.rejected.type, error: { code: LoadError.NetworkError } }))
        .toEqual({ ...testState, isFavoriteFilmsLoadingStatus: false, loadingError: LoadError.NetworkError });

      expect(appData.reducer(testState, { type: fetchFavoriteFilmsAction.rejected.type, error: { code: 'some_bad_request' } }))
        .toEqual({ ...testState, isFavoriteFilmsLoadingStatus: false, loadingError: LoadError.BadRequest });
    });
  });
});
