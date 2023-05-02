import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createAPI } from '../../services/serverApi';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import MoviePage from './movie-page';
import { fakeMovies, fakeReviews, fakeUser } from '../../utils/mocks';
import { AuthorizationStatus, SliceNameSpace, guestData, tabNames } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import Router from 'react-router';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn(),
} as object));

const favFilms = [...fakeMovies];
const reviews = [...fakeReviews];
const similarFilms = [...fakeMovies.slice(0, 4)];

const film = [...fakeMovies][5];
const mockId = film.id;

const user = { ...fakeUser };
const history = createBrowserHistory();

const activeTab = tabNames[0];

describe('Page MoviePage', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly, user has authorized', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: `${mockId}` });

    const initialState = {
      [SliceNameSpace.Data]: {
        isFilmsLoadingStatus: false,
        isFavoriteFilmsLoadingStatus: false,
        loadingError: '',
        currentFilm: film,
        filmReviews: reviews,
        similarFilms
      },
      [SliceNameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userFavoriteFilms: favFilms,
        userInfo: user
      }
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MoviePage activeTab={activeTab} />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    //user block
    expect(screen.queryByTestId('sign-in-btn')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign out' })).toBeInTheDocument();
    expect(screen.getByTestId('user-avatar')).toBeInTheDocument();

    expect(screen.getByTestId('moviepage-bgimage')).toHaveAttribute('src', film.backgroundImage);
    expect(screen.getByAltText(`${film.name} poster`)).toHaveAttribute('src', film.posterImage);
    expect(screen.getByTestId('moviepage-title')).toHaveTextContent(film.name);
    expect(screen.getByTestId('moviepage-genre')).toHaveTextContent(film.genre);
    expect(screen.getByTestId('moviepage-year')).toHaveTextContent(`${film.released}`);

    //add review button showed
    expect(screen.getByTestId('add-review-btn')).toHaveTextContent('Add review');

    //tabs navigation
    expect(screen.getByTestId('tabs-navigation')).toBeInTheDocument();
    expect(screen.getByTestId('active-tab')).toHaveTextContent(activeTab);

    //more like this section
    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
    expect(screen.getByTestId('filmslist')).toBeInTheDocument();

  });

  it('should render correctly, user has not authorized', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: `${mockId}` });

    const initialState = {
      [SliceNameSpace.Data]: {
        isFilmsLoadingStatus: false,
        isFavoriteFilmsLoadingStatus: false,
        loadingError: '',
        currentFilm: film,
        filmReviews: reviews,
        similarFilms
      },
      [SliceNameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userFavoriteFilms: [],
        userInfo: { ...guestData }
      }
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MoviePage activeTab={activeTab} />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    //user block
    expect(screen.getByTestId('sign-in-btn')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Sign out' })).not.toBeInTheDocument();
    expect(screen.queryByTestId('user-avatar')).not.toBeInTheDocument();

    //add review button is not showed
    expect(screen.queryByTestId('add-review-btn')).not.toBeInTheDocument();
  });
});
