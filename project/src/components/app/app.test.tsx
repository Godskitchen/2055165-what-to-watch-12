import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createAPI } from '../../services/serverApi';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { fakeMovies, fakeReviews, fakeUser } from '../../utils/mocks';
import { AppRoute, AuthorizationStatus, SliceNameSpace } from '../../const';
import { createBrowserHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import Router from 'react-router';
import App from './app';

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

const history = createBrowserHistory();

const film = [...fakeMovies][2];
const promo = [...fakeMovies][1];
const reviews = [...fakeReviews];
const mockId = film.id;

const initialState = {
  [SliceNameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userFavoriteFilms: [],
    userInfo: { ...fakeUser }
  },
  [SliceNameSpace.Data]: {
    isFilmsLoadingStatus: false,
    isFavoriteFilmsLoadingStatus: false,
    isPromoFilmLoadingStatus: false,
    isDataUploadingStatus: false,
    loadingError: '',
    currentFilm: film,
    promoFilm: promo,
    filmReviews: reviews,
    similarFilms: [],
    filmsList: []
  },
  [SliceNameSpace.Main]: {
    activeGenre: 'All genres',
    filmsCountOnPage: 8
  }
};

const store = mockStore(initialState);

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application routing', () => {
  beforeEach(() => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: `${mockId}` });
  });

  it('should render "MainPage" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByTestId('bg-image')).toHaveAttribute('src', promo.backgroundImage);
    expect(screen.getByAltText(`${promo.name} poster`)).toHaveAttribute('src', promo.posterImage);
    expect(screen.getByTestId('title')).toHaveTextContent(promo.name);
    expect(screen.getByTestId('genre')).toHaveTextContent(promo.genre);
    expect(screen.getByTestId('year')).toHaveTextContent(`${promo.released}`);
  });

  it('should render "LoginPage" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('should render "MyListPage" when user navigate to "/mylist"', () => {
    history.push(AppRoute.MyList);

    render(fakeApp);

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByTestId('films-count')).toHaveTextContent(`${0}`);
  });

  it('should redirect to main page when user navigate to "/films"', () => {
    history.push('/films');

    render(fakeApp);

    expect(screen.getByTestId('bg-image')).toHaveAttribute('src', promo.backgroundImage);
    expect(screen.getByAltText(`${promo.name} poster`)).toHaveAttribute('src', promo.posterImage);
    expect(screen.getByTestId('title')).toHaveTextContent(promo.name);
    expect(screen.getByTestId('genre')).toHaveTextContent(promo.genre);
    expect(screen.getByTestId('year')).toHaveTextContent(`${promo.released}`);
  });

  it('should render movie page with "overview" active tab when user navigate to "/films/:id/overview"', () => {
    history.push(`/films/${mockId}/overview`);

    render(fakeApp);

    expect(screen.getByTestId('moviepage-bgimage')).toHaveAttribute('src', film.backgroundImage);
    expect(screen.getByAltText(`${film.name} poster`)).toHaveAttribute('src', film.posterImage);
    expect(screen.getByTestId('moviepage-title')).toHaveTextContent(film.name);
    expect(screen.getByTestId('moviepage-genre')).toHaveTextContent(film.genre);
    expect(screen.getByTestId('moviepage-year')).toHaveTextContent(`${film.released}`);
  });

  it('should render movie page with "details" active tab when user navigate to "/films/:id/details"', () => {
    history.push(`/films/${mockId}/details`);

    render(fakeApp);

    expect(screen.getByTestId('details-runtime')).toHaveTextContent('Run Time');
    expect(screen.getByTestId('details-director')).toHaveTextContent(film.director);
    expect(screen.getByTestId('details-starring')).toHaveTextContent('Starring');
    expect(screen.getByTestId('details-genre')).toHaveTextContent(film.genre);
    expect(screen.getByTestId('details-year')).toHaveTextContent(`${film.released}`);
  });

  it('should render movie page with "reviews" active tab when user navigate to "/films/:id/reviews"', () => {
    history.push(`/films/${mockId}/reviews`);

    render(fakeApp);

    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('review').length).toEqual(reviews.length);
  });
  it('should render add review page when user navigate to "/films/:id/review"', () => {
    history.push(`/films/${mockId}/review`);

    render(fakeApp);

    expect(screen.getByTestId('rating')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Post' })).toBeInTheDocument();
  });

  it('should render player page when user navigate to "/player/:id/"', () => {
    history.push(`/player/${mockId}`);

    render(fakeApp);

    const videoElement = screen.getByTestId('video-element');
    expect(videoElement).toHaveAttribute('src', film.videoLink);
    expect(videoElement).toHaveAttribute('poster', film.backgroundImage);
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Вернуться на главную');
  });
});
