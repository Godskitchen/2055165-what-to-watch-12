/* eslint-disable @typescript-eslint/no-unused-vars */
import {render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter} from 'react-router-dom';
import UserBlock from './user-block';
import { SliceNameSpace } from '../../const';
import {fakeUser} from '../../utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createAPI } from '../../services/serverApi';
import { State } from '../../types/state';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { Action } from 'redux';
import { logoutAction } from '../../store/api-actions';
import { redirectToRoute } from '../../store/action';
import { redirect } from '../../store/middlewares/redirect';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api), redirect];

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

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserBlock />
        </MemoryRouter>
      </Provider>
    );

    const signOutbtn = screen.getByRole('link', {name: 'Sign out'});
    await userEvent.click(signOutbtn);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      // redirectToRoute.type,
      // logoutAction.fulfilled.type
    ]);

  });
});

