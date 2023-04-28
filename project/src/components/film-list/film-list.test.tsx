import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import FilmsList from './film-list';
import { fakeMovies } from '../../utils/mocks';

const mockFilms = fakeMovies.slice(0, 3);

beforeAll(() => {
  window.HTMLMediaElement.prototype.load = jest.fn();
  window.HTMLMediaElement.prototype.play = jest.fn();
});

describe('Component: FilmsList', () => {

  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <FilmsList filmsList={mockFilms}/>
      </MemoryRouter>
    );

    expect(screen.getByTestId('filmslist')).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveClass('small-film-card');
  });
});

