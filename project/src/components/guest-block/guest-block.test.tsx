import {act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import GuestBlock from './guest-block';
import { AppRoute } from '../../const';


describe('Component GuestBlock', () => {
  const history = createMemoryHistory();
  it('should render correctly', () => {

    render(
      <MemoryRouter>
        <GuestBlock />
      </MemoryRouter>
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    const signInBtn = screen.getByTestId('sign-in-btn');
    expect(signInBtn.textContent).toEqual('Sign in');
  });

  it('should redirect to login page url when user clicked to link', async () => {
    history.push('/fake');

    render(
      <MemoryRouter>
        <Routes>
          <Route
            path={AppRoute.Login}
            element={<h1>This is login page</h1>}
          />
          <Route
            path='*'
            element={<GuestBlock />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText(/This is login page/i)).not.toBeInTheDocument();

    await act(async () => await userEvent.click(screen.getByRole('link')));

    expect(screen.getByText(/This is login page/i)).toBeInTheDocument();
  });
});
