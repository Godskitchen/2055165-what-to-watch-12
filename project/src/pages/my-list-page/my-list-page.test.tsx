import {render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createAPI } from '../../services/serverApi';
import { State } from '../../types/state';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { Action } from 'redux';
import MyListPage from './my-list-page';
import { fakeMovies, fakeUser } from '../../utils/mocks';
import { LoadError, SliceNameSpace } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const favFilms = [...fakeMovies];
const user = {...fakeUser};
const history = createBrowserHistory();


describe('Page MyListPage', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', () => {
    const initialState = {
      [SliceNameSpace.Data]: {
        isFavoriteFilmsLoadingStatus: false,
        loadingError: '',
      },
      [SliceNameSpace.User]: {
        userFavoriteFilms: favFilms,
        userInfo: user
      }
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MyListPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByTestId('films-count')).toHaveTextContent(`${favFilms.length}`);

    //User block
    expect(screen.getByTestId('user-avatar')).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Sign out'})).toBeInTheDocument();

    //FilmsList
    expect(screen.getByTestId('filmslist')).toBeInTheDocument();
  });

  it('should render LoadingBlock if films list is loading', () => {
    const initialState = {
      [SliceNameSpace.Data]: {
        isFavoriteFilmsLoadingStatus: true,
        loadingError: '',
      },
      [SliceNameSpace.User]: {
        userFavoriteFilms: [],
        userInfo: user
      }
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MyListPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('loading-spinner-block')).toBeInTheDocument();
  });

  it('should render FavoritesErrorBlock if network error was happened', () => {
    const initialState = {
      [SliceNameSpace.Data]: {
        isFavoriteFilmsLoadingStatus: false,
        loadingError: LoadError.NetworkError,
      },
      [SliceNameSpace.User]: {
        userFavoriteFilms: [],
        userInfo: user
      }
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MyListPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Failed to load favorite films. Please try again later/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Try again');
  });
});
