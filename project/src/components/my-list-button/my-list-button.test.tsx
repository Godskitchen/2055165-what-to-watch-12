import {act, render, screen, waitFor } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import MyListButton from './my-list-button';
import { APIRoute, AppRoute, SliceNameSpace } from '../../const';
import {fakeMovies } from '../../utils/mocks';
import { MockStoreEnhanced, configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createAPI } from '../../services/serverApi';
import { State } from '../../types/state';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { Action } from 'redux';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { checkAuthAction, fetchFavoriteFilmsAction, setFilmStatusAction } from '../../store/api-actions';
import MockAdapter from 'axios-mock-adapter';
import { Route, Routes } from 'react-router-dom';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Component MyListButton', () => {
  const mockPromoFilm = [...fakeMovies][0];
  const mockFilmId = '5';

  const initialState = {
    [SliceNameSpace.User] : {
      userFavoriteFilms: [...fakeMovies]
    },

    [SliceNameSpace.Data] : {
      promoFilm: mockPromoFilm
    }
  };

  let store: MockStoreEnhanced<State, Action<string>, ThunkDispatch<State, typeof api, Action>>;

  beforeEach(() => {store = mockStore(initialState);});

  describe('render tests', () => {
    it('should render favorite films count on button if user has authorized', () => {
      const mockProps = {
        isAuthorized: true,
        isFavorite: true,
        filmId: mockFilmId
      };

      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <MyListButton {...mockProps} />
          </HistoryRouter>
        </Provider>
      );

      expect(screen.getByRole('button')).toBeInTheDocument();
      const filmsCounter = screen.getByTestId('fav-films-counter');
      expect(filmsCounter.textContent).toEqual(`${initialState[SliceNameSpace.User].userFavoriteFilms.length}`);
    });

    it('should render svg symbol "#add"/"in-list" if film isn\'t added to favorite list or it is', () => {
      const mockProps = {
        isAuthorized: true,
        isFavorite: true,
        filmId: mockFilmId
      };

      const {rerender} = render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <MyListButton {...mockProps} />
          </HistoryRouter>
        </Provider>
      );

      //film is added at the moment
      const inListSymbol = screen.getByTestId('in-out-symbol');
      expect(inListSymbol).toBeInTheDocument();
      expect(inListSymbol).toHaveAttribute('xlink:href', '#in-list');

      rerender(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <MyListButton {...mockProps} isFavorite={false} />
          </HistoryRouter>
        </Provider>
      );

      //film isn't added at the moment
      const addSymbol = screen.getByTestId('in-out-symbol');
      expect(addSymbol).toBeInTheDocument();
      expect(addSymbol).toHaveAttribute('xlink:href', '#add');
    });
  });

  describe('Click handler tests', () => {
    it('should dispatch setFilmStatusAction by click on button if user has authorized', async () => {
      const mockFilm = [...fakeMovies][0];

      const mockProps = {
        isAuthorized: true,
        isFavorite: true,
        filmId: `${mockFilm.id}`
      };

      mockAPI
        .onGet(APIRoute.FavoriteFilms)
        .reply(200, 'ok');

      mockAPI
        .onPost(`/favorite/${mockFilm.id}/0`)
        .reply(200, 'ok');

      mockAPI
        .onPost(`/favorite/${mockFilm.id}/1`)
        .reply(200, 'ok');

      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <MyListButton {...mockProps} />
          </HistoryRouter>
        </Provider>
      );

      await waitFor(() => {
        const actions = store.getActions().map(({type}) => type);

        expect(actions).toEqual([
          fetchFavoriteFilmsAction.pending.type,
          fetchFavoriteFilmsAction.fulfilled.type
        ]);
      });

      const addToFavBtn = screen.getByRole('button');

      await userEvent.click(addToFavBtn);

      await waitFor(() => {
        const actions = store.getActions().map(({type}) => type);

        expect(actions).toEqual([
          fetchFavoriteFilmsAction.pending.type,
          fetchFavoriteFilmsAction.fulfilled.type,
          setFilmStatusAction.pending.type,
          fetchFavoriteFilmsAction.pending.type,
          fetchFavoriteFilmsAction.fulfilled.type,
          setFilmStatusAction.fulfilled.type
        ]);
      });
    });

    it('should dispatch checkAuthAction by click on button if user has not authorized and redirect to login page', async () => {
      history.push('/fake');
      const mockFilm = [...fakeMovies][0];

      const mockProps = {
        isAuthorized: false,
        isFavorite: true,
        filmId: `${mockFilm.id}`
      };

      mockAPI
        .onPost(APIRoute.Login)
        .reply(401, 'NO-auth');

      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Routes>
              <Route
                path={AppRoute.Login}
                element={<h1>Login Page</h1>}
              />
              <Route
                path='*'
                element={<MyListButton {...mockProps} />}
              />
            </Routes>
          </HistoryRouter>
        </Provider>
      );


      let actions = store.getActions().map(({type}) => type);
      expect(actions).toEqual([]);

      const addToFavBtn = screen.getByRole('button');

      await act(async () => await userEvent.click(addToFavBtn));

      await waitFor(() => {
        actions = store.getActions().map(({type}) => type);

        expect(actions).toEqual([
          checkAuthAction.pending.type,
          checkAuthAction.rejected.type,
        ]);
      });

      expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
    });
  });
});
