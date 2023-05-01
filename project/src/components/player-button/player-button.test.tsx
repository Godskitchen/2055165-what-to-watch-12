import {act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import PlayerButton from './player-button';

describe('Component PlayerButton', () => {
  const mockFilmId = '1';
  const history = createBrowserHistory();
  it('should render correctly', () => {

    render(
      <MemoryRouter>
        <PlayerButton filmId={mockFilmId} />
      </MemoryRouter>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
  });

  it ('should redirect to player page when user clicked to link', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={`/player/${mockFilmId}`}
            element={<h1>This is player page</h1>}
          />
          <Route
            path='*'
            element={<PlayerButton filmId={mockFilmId} />}
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/This is player page/i)).not.toBeInTheDocument();

    const playerBtn = screen.getByRole('button');
    await act(async () => await userEvent.click(playerBtn));

    expect(screen.getByText(/This is player page/i)).toBeInTheDocument();
  });
});
