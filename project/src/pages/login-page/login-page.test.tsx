import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createAPI } from '../../services/serverApi';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import LoginPage from './login-page';
import { APIRoute, SliceNameSpace } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import MockAdapter from 'axios-mock-adapter';
import { loginAction } from '../../store/api-actions';
import { redirectToRoute } from '../../store/action';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const history = createBrowserHistory();

describe('Page LoginPage', () => {
  let store: ReturnType<typeof mockStore>;
  let initialState;

  beforeEach(() => {
    initialState = {
      [SliceNameSpace.Data]: {
        isDataUploadingStatus: false,
      },
    };

    store = mockStore(initialState);
  });

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <LoginPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('should enable submit button if user input is valid', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <LoginPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('button', { name: 'Sign in' })).toBeDisabled();

    const loginField = screen.getByLabelText(/Email address/i);
    const passField = screen.getByLabelText(/Password/i);

    fireEvent.blur(loginField);
    fireEvent.blur(passField);
    fireEvent.change(loginField, { target: { value: 'email@test.ru' } });
    fireEvent.change(passField, { target: { value: 'pass123' } });

    expect(screen.getByDisplayValue(/email@test.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/pass123/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Sign in' })).toBeEnabled();
    expect(screen.queryByTestId('error-validation-block')).not.toBeInTheDocument();

  });

  it('should disable submit button if user input is not valid', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <LoginPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('button', { name: 'Sign in' })).toBeDisabled();

    const loginField = screen.getByLabelText(/Email address/i);
    const passField = screen.getByLabelText(/Password/i);

    fireEvent.blur(loginField);
    fireEvent.blur(passField);
    fireEvent.change(loginField, { target: { value: 'email' } });
    fireEvent.change(passField, { target: { value: 'pass' } });

    expect(screen.getByDisplayValue(/email/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/pass/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Sign in' })).toBeDisabled();
    expect(screen.getByTestId('error-validation-block')).toBeInTheDocument();
  });

  it('should dispatch logInAction when user clicked to Sign In button', async () => {

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, 'ok');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <LoginPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    const signInBtn = screen.getByRole('button', { name: 'Sign in' });

    const loginField = screen.getByLabelText(/Email address/i);
    const passField = screen.getByLabelText(/Password/i);

    fireEvent.blur(loginField);
    fireEvent.blur(passField);
    fireEvent.change(loginField, { target: { value: 'email@test.ru' } });
    fireEvent.change(passField, { target: { value: 'pass123' } });

    fireEvent.click(signInBtn);

    await waitFor(() => {
      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type
      ]);
    });
  });
});
