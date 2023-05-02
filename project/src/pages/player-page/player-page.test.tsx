import { fireEvent, render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createAPI } from '../../services/serverApi';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import PlayerPage from './player-page';
import Router from 'react-router';
import { fakeMovies } from '../../utils/mocks';
import { LoadError, SliceNameSpace } from '../../const';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';

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

const mockFilm = [...fakeMovies][2];
const mockId = mockFilm.id;
const history = createMemoryHistory();

describe('Page PlayerPage', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', () => {
    const initialState = {
      [SliceNameSpace.Data]: {
        isfilmsLoadingStatus: false,
        loadingError: '',
        currentFilm: mockFilm
      }
    };

    const store = mockStore(initialState);
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: `${mockId}` });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <PlayerPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    //Video main element
    const videoElement = screen.getByTestId('video-element');
    expect(videoElement).toHaveAttribute('src', mockFilm.videoLink);
    expect(videoElement).toHaveAttribute('poster', mockFilm.backgroundImage);

    //Exit button
    expect(screen.getByRole('button', { name: 'Exit' })).toBeInTheDocument();

    //ProgressBar
    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
    expect(screen.getByText('Toggler')).toBeInTheDocument();

    //Play/Pause button
    expect(screen.getByTestId('play-pause-btn')).toBeInTheDocument();

    //Fullscreen button
    expect(screen.getByTestId('fullscreen-btn')).toBeInTheDocument();
  });

  it('should render LoadingScreen if film is loading', () => {
    const initialState = {
      [SliceNameSpace.Data]: {
        isfilmsLoadingStatus: true,
        loadingError: '',
        currentFilm: undefined
      }
    };

    const store = mockStore(initialState);
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: `${mockId}` });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <PlayerPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('loading-spinner-screen')).toBeInTheDocument();
  });

  it('should render ErrorScreen if network error was happened', () => {
    const initialState = {
      [SliceNameSpace.Data]: {
        isfilmsLoadingStatus: false,
        loadingError: LoadError.NetworkError,
        currentFilm: null
      }
    };

    const store = mockStore(initialState);
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: `${mockId}` });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <PlayerPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Failed to load current film. Please try again later/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Try again');
  });

  it('should render NotFoundPage if film wasn\'t found', () => {
    const initialState = {
      [SliceNameSpace.Data]: {
        isfilmsLoadingStatus: false,
        loadingError: '',
        currentFilm: null
      }
    };

    const store = mockStore(initialState);
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: `${mockId}` });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <PlayerPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Вернуться на главную');
  });

  it('should redirect to film page by clicking on exit button', () => {
    const initialState = {
      [SliceNameSpace.Data]: {
        isfilmsLoadingStatus: false,
        loadingError: '',
        currentFilm: mockFilm
      }
    };

    const store = mockStore(initialState);
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: `${mockId}` });
    history.push('/fake');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={`/films/${mockId}`}
                element={<h1>Film Page</h1>}
              />
              <Route
                path='*'
                element={<PlayerPage />}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Film Page/i)).not.toBeInTheDocument();
    const exitButton = screen.getByRole('button', { name: 'Exit' });
    fireEvent.click(exitButton);
    expect(screen.getByText(/Film Page/i)).toBeInTheDocument();
  });
});
