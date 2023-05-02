import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createAPI } from '../../../services/serverApi';
import { State } from '../../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { fetchFilmAction } from '../../../store/api-actions';
import MockAdapter from 'axios-mock-adapter';
import ErrorScreen from './error-screen';
import Router from 'react-router';


const api = createAPI();
const mockAPI = new MockAdapter(api);
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

describe('Component ErrorScreen', () => {
  const store = mockStore();
  const mockId = '2';

  it('should renders correctly', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: mockId });

    render(
      <Provider store={store}>
        <ErrorScreen />
      </Provider>
    );

    expect(screen.getByText(/Failed to load current film. Please try again later/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Try again');
  });

  it('should dispatch fetchFilmAction by clicking on "try-again" button', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: mockId });

    mockAPI
      .onGet(`/films/${mockId}`)
      .reply(200, 'ok');

    render(
      <Provider store={store}>
        <ErrorScreen />
      </Provider>
    );

    const tryAgainBtn = screen.getByRole('button');
    fireEvent.click(tryAgainBtn);

    await waitFor(() => {
      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        fetchFilmAction.pending.type,
        fetchFilmAction.fulfilled.type
      ]);
    });
  });
});
