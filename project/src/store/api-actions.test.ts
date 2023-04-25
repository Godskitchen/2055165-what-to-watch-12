import { Action } from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/serverApi';
import {checkAuthAction, fetchFavoriteFilmsAction, fetchFilmAction, fetchFilmsAction, fetchPromoFilmAction, fetchReviewsAction, fetchSimilarFilmsAction, setFilmStatusAction} from './api-actions';
import {APIRoute} from '../const';
import {State} from '../types/state';
import { fakeMovies, fakeReviews, fakeUser } from '../utils/mocks';


describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  describe('checkAuthAction tests', () => {
    it('should authorization status is «auth» when server returns 200', async () => {
      const store = mockStore();
      const userData = {...fakeUser, token: 'secret'};

      mockAPI
        .onGet(APIRoute.Login)
        .reply(200, userData);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkAuthAction());
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type
      ]);
    });

    it('should authorization status is «no-auth» when server returns 401', async () => {
      const store = mockStore();

      mockAPI
        .onGet(APIRoute.Login)
        .reply(401, {error: 'You are not logged in or you do not have permission to this page.'});

      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkAuthAction());
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type
      ]);
    });
  });

  describe('fetchFilmsAction tests', () => {
    it('should dispatch available films when GET /films', async () => {

      const filmsList = [...fakeMovies];
      const store = mockStore();

      mockAPI
        .onGet(APIRoute.FilmsList)
        .reply(200, [filmsList]);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchFilmsAction());
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.fulfilled.type
      ]);
    });
  });

  describe('fetchFilmAction tests', () => {
    it('should rejected when GET /films/{filmId} if film wasn\'t found', async () => {
      const nonExistfilmId = '0';
      const store = mockStore();

      mockAPI
        .onGet(`/films/${nonExistfilmId}`)
        .reply(404);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchFilmAction(`${nonExistfilmId}`));
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFilmAction.pending.type,
        fetchFilmAction.rejected.type
      ]);
    });

    it('should dispatch film when GET /films/{filmId} if film was found', async () => {
      const film = [...fakeMovies][0];
      const filmId = film.id;
      const store = mockStore();

      mockAPI
        .onGet(`/films/${filmId}`)
        .reply(200, {film});

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchFilmAction(`${filmId}`));
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFilmAction.pending.type,
        fetchFilmAction.fulfilled.type
      ]);
    });
  });

  describe('fetchPromoFilmAction tests', () => {
    it('should dispatch promo film when GET /promo', async () => {
      const promoFilm = [...fakeMovies][5];
      const store = mockStore();

      mockAPI
        .onGet(APIRoute.PromoFilm)
        .reply(200, {promoFilm});

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchPromoFilmAction());
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchPromoFilmAction.pending.type,
        fetchPromoFilmAction.fulfilled.type
      ]);
    });
  });

  describe('fetchReviewsAction tests', () => {
    it('should dispatch film reviews when GET /comments/{filmId} if film was found', async () => {
      const film = [...fakeMovies][5];
      const filmId = film.id;
      const reviews = [...fakeReviews];
      const store = mockStore();

      mockAPI
        .onGet(`/comments/${filmId}`)
        .reply(200, reviews);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchReviewsAction(`${filmId}`));
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type
      ]);
    });

    it('should rejected when GET /comments/{filmId} if film wasn\'t found', async () => {
      const nonExistfilmId = '999';
      const store = mockStore();

      mockAPI
        .onGet(`/comments/${nonExistfilmId}`)
        .reply(400, {error: `Film id ${nonExistfilmId} does not exist`});

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchReviewsAction(`${nonExistfilmId}`));
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type
      ]);
    });
  });

  describe('fetchSimilarFilmsAction tests', () => {
    it('should dispatch similar films when GET /films/{filmId}/similar if film was found', async () => {
      const film = [...fakeMovies][4];
      const similarFilms = [...fakeMovies];
      const filmId = film.id;
      const store = mockStore();

      mockAPI
        .onGet(`/films/${filmId}/similar`)
        .reply(200, similarFilms);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchSimilarFilmsAction(`${filmId}`));
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchSimilarFilmsAction.pending.type,
        fetchSimilarFilmsAction.fulfilled.type
      ]);
    });

    it('should rejected when GET /films/{filmId}/similar if film wasn\'t found', async () => {
      const nonExistfilmId = '999';
      const store = mockStore();

      mockAPI
        .onGet(`/films/${nonExistfilmId}/similar`)
        .reply(404);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchSimilarFilmsAction(`${nonExistfilmId}`));
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchSimilarFilmsAction.pending.type,
        fetchSimilarFilmsAction.rejected.type
      ]);
    });
  });

  describe('fetchFavoriteFilmsAction tests', () => {
    it('should dispatch favorite films when GET /favorite if user authorized', async () => {
      const favoritesList = [...fakeMovies];
      const store = mockStore();

      mockAPI
        .onGet(APIRoute.FavoriteFilms)
        .reply(200, favoritesList);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchFavoriteFilmsAction());
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFavoriteFilmsAction.pending.type,
        fetchFavoriteFilmsAction.fulfilled.type
      ]);
    });

    it('should rejected when GET /films/{filmId}/similar if user wasn\'t authorized', async () => {
      const store = mockStore();

      mockAPI
        .onGet(APIRoute.FavoriteFilms)
        .reply(401);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchFavoriteFilmsAction());
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFavoriteFilmsAction.pending.type,
        fetchFavoriteFilmsAction.rejected.type
      ]);
    });
  });

  describe('setFilmStatusAction', () => {

    it('should change favorite status of current film and promo film if they are equal when GET /favorite/{filmId}/{status}', async () => {

      const filmsList = [...fakeMovies];
      const film = filmsList[7];
      const promoFilm = filmsList[7];

      const filmId = film.id;
      const newFavoriteStatus = film.isFavorite ? 0 : 1;

      const store = mockStore();

      const returnedFilm = {...film, isFavorite: !film.isFavorite};

      // const headers = {
      //   'x-token' : 'secret-token'
      // };

      mockAPI
        .onPost(`/favorite/${filmId}/${newFavoriteStatus}`)
        .reply(200, returnedFilm);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(setFilmStatusAction({filmId: `${filmId}`, status: newFavoriteStatus, isPromo: film === promoFilm}));
      await store.dispatch(fetchFavoriteFilmsAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        setFilmStatusAction.pending.type,
        fetchFavoriteFilmsAction.pending.type,
        fetchFavoriteFilmsAction.fulfilled.type,
        setFilmStatusAction.fulfilled.type,
      ]);
    });

  });


});


