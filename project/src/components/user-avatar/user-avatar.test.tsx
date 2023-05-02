import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UserAvatar from './user-avatar';
import { AppRoute, SliceNameSpace } from '../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fakeUser } from '../../utils/mocks';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();


describe('Component UserAVatar', () => {
  const history = createMemoryHistory();

  const userInfo = { ...fakeUser };

  const initialState = {
    [SliceNameSpace.User]: {
      userInfo
    }
  };

  const store = mockStore(initialState);
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserAvatar />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('user-avatar')).toBeInTheDocument();
    expect(screen.getByAltText('User avatar')).toHaveAttribute('src', userInfo.avatarUrl);
  });

  it('should redirect to my-list page url when user clicked to link', () => {
    history.push('/fake');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route
              path={AppRoute.MyList}
              element={<h1>This is my list page</h1>}
            />
            <Route
              path='*'
              element={<UserAvatar />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/This is my list page/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/This is my list page/i)).toBeInTheDocument();
  });
});
