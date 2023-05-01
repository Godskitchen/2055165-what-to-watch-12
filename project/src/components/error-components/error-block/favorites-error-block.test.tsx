import {render, screen, waitFor } from '@testing-library/react';
import FavoritesErrorBlock from './favorites-error-block';
import { APIRoute } from '../../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createAPI } from '../../../services/serverApi';
import { State } from '../../../types/state';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { Action } from 'redux';
import userEvent from '@testing-library/user-event';
import { fetchFavoriteFilmsAction } from '../../../store/api-actions';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Component FavoritesErrorBlock', () => {
  const store = mockStore();

  it('should renders correctly', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesErrorBlock />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Failed to load favorite films. Please try again later/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Try again');
  });

  it('should dispatch fetchFavoriteFilmsAction by clicking on "try-again" button', async () => {

    mockAPI
      .onGet(APIRoute.FavoriteFilms)
      .reply(200, 'ok');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesErrorBlock />
        </MemoryRouter>
      </Provider>
    );

    const tryAgainBtn = screen.getByRole('button');
    await userEvent.click(tryAgainBtn);

    await waitFor(() => {
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFavoriteFilmsAction.pending.type,
        fetchFavoriteFilmsAction.fulfilled.type
      ]);
    });
  });
});
