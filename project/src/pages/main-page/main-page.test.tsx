import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createAPI } from '../../services/serverApi';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import MainPage from './main-page';
import { fakeMovies, fakeUser } from '../../utils/mocks';
import { AuthorizationStatus, SliceNameSpace, guestData } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { Films } from '../../types/film';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const favFilms: Films = [];
const filmsList = [...fakeMovies];
const promoFilm = [...fakeMovies][5];

const user = { ...fakeUser };
const history = createBrowserHistory();

describe('Page MainPage', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly, user has authorized', () => {

    const initialState = {
      [SliceNameSpace.Data]: {
        isFilmsLoadingStatus: false,
        isFavoriteFilmsLoadingStatus: false,
        loadingError: '',
        filmsList: filmsList,
        promoFilm: promoFilm,
      },
      [SliceNameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userFavoriteFilms: favFilms,
        userInfo: user
      },
      [SliceNameSpace.Main]: {
        activeGenre: 'All genres',
        filmsCountOnPage: 8
      }
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MainPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    //user block
    expect(screen.queryByTestId('sign-in-btn')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign out' })).toBeInTheDocument();
    expect(screen.getByTestId('user-avatar')).toBeInTheDocument();

    //promo film
    expect(screen.getByTestId('bg-image')).toHaveAttribute('src', promoFilm.backgroundImage);
    expect(screen.getByAltText(`${promoFilm.name} poster`)).toHaveAttribute('src', promoFilm.posterImage);
    expect(screen.getByTestId('title')).toHaveTextContent(promoFilm.name);
    expect(screen.getByTestId('genre')).toHaveTextContent(promoFilm.genre);
    expect(screen.getByTestId('year')).toHaveTextContent(`${promoFilm.released}`);

    //available films list
    expect(screen.getByTestId('genreslist')).toBeInTheDocument();
    expect(screen.getByTestId('filmslist')).toBeInTheDocument();

    //available films count more then films showed on page, so the button was rendered
    expect(screen.getByRole('button', { name: 'Show more' })).toBeInTheDocument();
  });

  it('should render correctly, user has not authorized', () => {

    const initialState = {
      [SliceNameSpace.Data]: {
        isFilmsLoadingStatus: false,
        isFavoriteFilmsLoadingStatus: false,
        loadingError: '',
        filmsList: filmsList,
        promoFilm: promoFilm,
      },
      [SliceNameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userFavoriteFilms: favFilms,
        userInfo: { ...guestData }
      },
      [SliceNameSpace.Main]: {
        activeGenre: 'All genres',
        filmsCountOnPage: filmsList.length
      }
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MainPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    //guest block
    expect(screen.getByTestId('sign-in-btn')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Sign out' })).not.toBeInTheDocument();
    expect(screen.queryByTestId('user-avatar')).not.toBeInTheDocument();

    //available films count equals films showed on page, so the button was not rendered
    expect(screen.queryByRole('button', { name: 'Show more' })).not.toBeInTheDocument();
  });
});
