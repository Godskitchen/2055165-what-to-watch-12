import {render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter} from 'react-router-dom';
import UserBlock from './user-block';
import { APIRoute, SliceNameSpace } from '../../const';
import {fakeUser} from '../../utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createAPI } from '../../services/serverApi';
import { State } from '../../types/state';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { Action } from 'redux';
import { logoutAction } from '../../store/api-actions';
import { redirectToRoute } from '../../store/action';
import MockAdapter from 'axios-mock-adapter';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Component UserBlock', () => {
  const userInfo = {...fakeUser};

  const initialState = {
    [SliceNameSpace.User] : {
      userInfo
    }
  };

  const store = mockStore(initialState);

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserBlock />
        </MemoryRouter>
      </Provider>
    );

    const signOutbtn = screen.getByRole('link', {name: 'Sign out'});
    expect(signOutbtn).toBeInTheDocument();

    const userAvatar = screen.getByTestId('user-avatar');
    expect(userAvatar).toBeInTheDocument();
  });

  it('should dispatch logoutAction when user clicked to link', async () => {

    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(200, 'ok');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserBlock />
        </MemoryRouter>
      </Provider>
    );

    const signOutbtn = screen.getByRole('link', {name: 'Sign out'});
    fireEvent.click(signOutbtn);

    await waitFor(() => {
      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        logoutAction.pending.type,
        redirectToRoute.type,
        logoutAction.fulfilled.type
      ]);
    });
  });
});

