import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/serverApi';
import { addReviewAction, checkAuthAction, checkFirstAuthAction, fetchFavoriteFilmsAction, fetchFilmAction, fetchFilmsAction, fetchPromoFilmAction, fetchReviewsAction, fetchSimilarFilmsAction, loginAction, logoutAction, setFilmStatusAction, } from './api-actions';
import { APIRoute } from '../const';
import { State } from '../types/state';
import { fakeMovies, fakeReviews, fakeUser } from '../utils/mocks';
import { redirectToRoute } from './action';
import { AuthData } from '../types/user-data';


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
      const userData = { ...fakeUser, token: 'secret' };

      mockAPI
        .onGet(APIRoute.Login)
        .reply(200, userData);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkAuthAction());
      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type
      ]);
    });

    it('should authorization status is «no-auth» when server returns 401', async () => {
      const store = mockStore();

      mockAPI
        .onGet(APIRoute.Login)
        .reply(401, { error: 'You are not logged in or you do not have permission to this page.' });

      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkAuthAction());
      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type
      ]);
    });
  });

  describe('checkFirstAuthAction tests', () => {
    it('should authorization status is «auth» when server returns 200', async () => {
      const store = mockStore();
      const userData = { ...fakeUser, token: 'secret' };

      mockAPI
        .onGet(APIRoute.Login)
        .reply(200, userData);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkFirstAuthAction());
      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        checkFirstAuthAction.pending.type,
        checkFirstAuthAction.fulfilled.type
      ]);
    });

    it('should authorization status is «no-auth» when server returns 401', async () => {
      const store = mockStore();

      mockAPI
        .onGet(APIRoute.Login)
        .reply(401, { error: 'You are not logged in or you do not have permission to this page.' });

      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkFirstAuthAction());
      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        checkFirstAuthAction.pending.type,
        checkFirstAuthAction.rejected.type
      ]);
    });
  });

  describe('loginAction tests', () => {
    it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
      const fakeLoginData: AuthData = { login: 'test@test.ru', password: '123456a' };

      mockAPI
        .onPost(APIRoute.Login)
        .reply(200, { ...fakeUser, token: 'secret' });


      const store = mockStore();
      Storage.prototype.setItem = jest.fn();

      await store.dispatch(loginAction(fakeLoginData));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type
      ]);

      expect(Storage.prototype.setItem).toBeCalledTimes(1);
      expect(Storage.prototype.setItem).toBeCalledWith('wtw-token', 'secret');
    });

    it('should rejected authorization when POST /login with bad request', async () => {
      const fakeLoginData: AuthData = { login: 'wrongname', password: '12' };

      mockAPI
        .onPost(APIRoute.Login)
        .reply(400);


      const store = mockStore();

      await store.dispatch(loginAction(fakeLoginData));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type
      ]);
    });
  });

  describe('logoutAction tests', () => {
    it('should dispatch Logout and RedirectToRoute when Delete /logout', async () => {
      mockAPI
        .onDelete(APIRoute.Logout)
        .reply(204);

      const store = mockStore();
      Storage.prototype.removeItem = jest.fn();

      await store.dispatch(logoutAction());

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        logoutAction.pending.type,
        redirectToRoute.type,
        logoutAction.fulfilled.type
      ]);

      expect(Storage.prototype.removeItem).toBeCalledTimes(1);
      expect(Storage.prototype.removeItem).toBeCalledWith('wtw-token');
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
      const actions = store.getActions().map(({ type }) => type);

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
      const actions = store.getActions().map(({ type }) => type);

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
        .reply(200, { film });

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchFilmAction(`${filmId}`));
      const actions = store.getActions().map(({ type }) => type);

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
        .reply(200, { promoFilm });

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchPromoFilmAction());
      const actions = store.getActions().map(({ type }) => type);

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
      const actions = store.getActions().map(({ type }) => type);

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
        .reply(400, { error: `Film id ${nonExistfilmId} does not exist` });

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchReviewsAction(`${nonExistfilmId}`));
      const actions = store.getActions().map(({ type }) => type);

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
      const actions = store.getActions().map(({ type }) => type);

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
      const actions = store.getActions().map(({ type }) => type);

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
      const actions = store.getActions().map(({ type }) => type);

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
      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        fetchFavoriteFilmsAction.pending.type,
        fetchFavoriteFilmsAction.rejected.type
      ]);
    });
  });

  describe('setFilmStatusAction test', () => {

    it('should change favorite status of current film and promo film if they are equal when POST /favorite/{filmId}/{status}', async () => {

      const filmsList = [...fakeMovies];
      const film = filmsList[7];
      const promoFilm = filmsList[7];

      const filmId = film.id;
      const newFavoriteStatus = film.isFavorite ? 0 : 1;

      const store = mockStore();

      const returnedFilm = { ...film, isFavorite: !film.isFavorite };

      mockAPI
        .onPost(`/favorite/${filmId}/${newFavoriteStatus}`)
        .reply(200, returnedFilm);

      mockAPI
        .onGet(APIRoute.FavoriteFilms)
        .reply(200, filmsList);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(setFilmStatusAction({ filmId: `${filmId}`, status: newFavoriteStatus, isPromo: filmId === promoFilm.id }));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        setFilmStatusAction.pending.type,
        fetchFavoriteFilmsAction.pending.type,
        fetchFavoriteFilmsAction.fulfilled.type,
        setFilmStatusAction.fulfilled.type,
      ]);
    });

    it('should rejected when POST /favorite/{filmId}/{status} if user wasn\'t authorized', async () => {

      const filmsList = [...fakeMovies];
      const film = filmsList[7];
      const promoFilm = filmsList[6];

      const filmId = film.id;
      const newFavoriteStatus = film.isFavorite ? 0 : 1;

      const store = mockStore();

      mockAPI
        .onPost(`/favorite/${filmId}/${newFavoriteStatus}`)
        .reply(401, { error: 'You are not logged in or you do not have permission to this page.' });

      expect(store.getActions()).toEqual([]);

      await store.dispatch(setFilmStatusAction({ filmId: `${filmId}`, status: newFavoriteStatus, isPromo: filmId === promoFilm.id }));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        setFilmStatusAction.pending.type,
        setFilmStatusAction.rejected.type,
      ]);
    });
  });

  describe('addReviewAction test', () => {

    it('should dispatch updated reviews and RedirectToRoute when POST /comments/{filmId}', async () => {
      const film = [...fakeMovies][5];
      const filmId = film.id;

      const fakeReview = {
        comment: 'fake comment',
        rating: 5
      };

      const returnedReviews = [...fakeReviews];

      const store = mockStore();

      mockAPI
        .onPost(`/comments/${filmId}`)
        .reply(200, returnedReviews);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(addReviewAction({ filmId: `${filmId}`, comment: fakeReview.comment, rating: fakeReview.rating }));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        addReviewAction.pending.type,
        redirectToRoute.type,
        addReviewAction.fulfilled.type
      ]);
    });

    it('should rejected when POST /comments/{filmId} if film wasn\'t found', async () => {
      const nonExistingId = '999';

      const fakeReview = {
        comment: 'fake comment',
        rating: 5
      };

      const store = mockStore();

      mockAPI
        .onPost(`/comments/${nonExistingId}`)
        .reply(400, { error: `Film id ${nonExistingId} does not exist` });

      expect(store.getActions()).toEqual([]);

      await store.dispatch(addReviewAction({ filmId: `${nonExistingId}`, comment: fakeReview.comment, rating: fakeReview.rating }));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        addReviewAction.pending.type,
        addReviewAction.rejected.type
      ]);
    });

    it('should rejected when POST /comments/{filmId} if user wasn\'t authorized', async () => {
      const film = [...fakeMovies][5];
      const filmId = film.id;

      const fakeReview = {
        comment: 'fake comment',
        rating: 5
      };

      const store = mockStore();

      mockAPI
        .onPost(`/comments/${filmId}`)
        .reply(401, { error: 'You are not logged in or you do not have permission to this page.' });

      expect(store.getActions()).toEqual([]);

      await store.dispatch(addReviewAction({ filmId: `${filmId}`, comment: fakeReview.comment, rating: fakeReview.rating }));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        addReviewAction.pending.type,
        addReviewAction.rejected.type
      ]);
    });
  });
});


