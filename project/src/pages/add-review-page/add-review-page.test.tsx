import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createAPI } from '../../services/serverApi';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import AddReviewPage from './add-review-page';
import { SliceNameSpace } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import MockAdapter from 'axios-mock-adapter';
import { addReviewAction, fetchFilmAction } from '../../store/api-actions';
import { redirectToRoute } from '../../store/action';
import Router from 'react-router';
import { fakeMovies, fakeUser } from '../../utils/mocks';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn(),
} as object));

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const history = createBrowserHistory();
const film = [...fakeMovies][1];
const mockId = `${film.id}`;

describe('Page AddReviewPage', () => {
  let store: ReturnType<typeof mockStore>;
  let initialState;

  beforeEach(() => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: mockId });

    initialState = {
      [SliceNameSpace.Data]: {
        isDataUploadingStatus: false,
        isFilmsLoadingStatus: false,
        loadingError: '',
        currentFilm: film,
      },
      [SliceNameSpace.User]: {
        userInfo: { ...fakeUser },
      }
    };

    store = mockStore(initialState);
  });

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <AddReviewPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('rating')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Post' })).toBeInTheDocument();
  });

  it('should enable submit button if user input is valid', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <AddReviewPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('button', { name: 'Post' })).toBeDisabled();

    const textReviewField = screen.getByPlaceholderText(/Review text/i);

    fireEvent.blur(textReviewField);
    fireEvent.change(textReviewField, { target: { value: 'mock review text more than fifty symbols and less then 400 symbols' } });

    expect(screen.getByDisplayValue(/mock review text more than fifty symbols and less then 400 symbols/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Post' })).toBeEnabled();
    expect(screen.queryByTestId('valid-error')).not.toBeInTheDocument();

  });

  it('should disable submit button if user input is not valid', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <AddReviewPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('button', { name: 'Post' })).toBeDisabled();

    const textReviewField = screen.getByPlaceholderText(/Review text/i);

    fireEvent.blur(textReviewField);
    fireEvent.change(textReviewField, { target: { value: 'too short review' } });

    expect(screen.getByDisplayValue(/too short review/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Post' })).toBeDisabled();
    expect(screen.getByTestId('valid-error')).toBeInTheDocument();
  });

  it('should dispatch logInAction when user clicked to Sign In button', async () => {

    mockAPI
      .onPost(`/comments/${mockId}`)
      .reply(200, 'ok');

    mockAPI
      .onGet(`/films/${mockId}`)
      .reply(200, 'ok');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <AddReviewPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    const textReviewField = screen.getByPlaceholderText(/Review text/i);

    fireEvent.blur(textReviewField);
    fireEvent.change(textReviewField, { target: { value: 'mock review text more than fifty symbols and less then 400 symbols' } });

    const postBtn = screen.getByRole('button', { name: 'Post' });
    fireEvent.click(postBtn);

    await waitFor(() => {
      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        fetchFilmAction.pending.type,
        addReviewAction.pending.type,
        redirectToRoute.type,
        fetchFilmAction.fulfilled.type,
        addReviewAction.fulfilled.type
      ]);
    });
  });
});
