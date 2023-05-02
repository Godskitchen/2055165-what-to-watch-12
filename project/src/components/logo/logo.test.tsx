import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { State } from '../../types/state';
import { Action, Dispatch } from '@reduxjs/toolkit';
import Logo from './logo';
import { resetFilmsCountOnPageAction, resetFilterGenreAction } from '../../store/main-process/main-process';
import { createBrowserHistory } from 'history';
import HistoryRouter from '../history-router/history-router';


const mockStore = configureMockStore<
  State,
  Action<string>,
  Dispatch<Action>
>();

const history = createBrowserHistory();
const store = mockStore();

describe('Component Logo', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Logo classPath='mockPath' />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', AppRoute.Main);
  });

  it('should dispatch resetFilterGenreAction and resetFilmsCountOnPageAction when user clicked to link', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Logo classPath='mockPath' />
        </MemoryRouter>
      </Provider>
    );

    const logoBtn = screen.getByRole('link');
    fireEvent.click(logoBtn);

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      resetFilterGenreAction.type,
      resetFilmsCountOnPageAction.type
    ]);
  });

  it('should redirect to main page when user clicked to link', () => {
    history.push('/fake');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<h1>This is main page</h1>}
            />
            <Route
              path='*'
              element={<Logo classPath='mockPath' />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();

    const logoBtn = screen.getByRole('link');
    fireEvent.click(logoBtn);

    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
