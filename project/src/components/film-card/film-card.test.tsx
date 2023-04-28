import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import FilmCard from './film-card';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

const mockFilm = {
  id: 1,
  name: 'Test Movie',
  previewImage: 'https://via.placeholder.com/150',
  previewVideoLink: 'https://www.example.com/video.mp4',
};

const onCardEnter = jest.fn();
const onCardLeave = jest.fn();

beforeAll(() => {
  window.HTMLMediaElement.prototype.load = jest.fn();
  window.HTMLMediaElement.prototype.play = jest.fn();
});

describe('Component: FilmCard', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <FilmCard
          id={mockFilm.id}
          name={mockFilm.name}
          previewImage={mockFilm.previewImage}
          previewVideoLink={mockFilm.previewVideoLink}
          isActive={false}
          onCardEnter={onCardEnter}
          onCardLeave={onCardLeave}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', `/films/${mockFilm.id}`);
  });

  it('triggers onCardEnter and onCardLeave events', () => {
    render(
      <MemoryRouter>
        <FilmCard
          id={mockFilm.id}
          name={mockFilm.name}
          previewImage={mockFilm.previewImage}
          previewVideoLink={mockFilm.previewVideoLink}
          isActive={false}
          onCardEnter={onCardEnter}
          onCardLeave={onCardLeave}
        />
      </MemoryRouter>
    );

    const filmCard = screen.getByRole('article');

    //user hovers mouse on card
    fireEvent.mouseEnter(filmCard);
    expect(onCardEnter).toHaveBeenCalledTimes(1);

    //user hovers mouse off card
    fireEvent.mouseLeave(filmCard);
    expect(onCardLeave).toHaveBeenCalledTimes(1);
  });

  it('should navigate to film page by click on link', async () => {
    const history = createMemoryHistory();
    history.push('/fake');

    render(
      <MemoryRouter>
        <Routes>
          <Route
            path={`/films/${mockFilm.id}`}
            element={<h1>This is movie page</h1>}
          />
          <Route
            path='*'
            element={
              <FilmCard
                id={mockFilm.id}
                name={mockFilm.name}
                previewImage={mockFilm.previewImage}
                previewVideoLink={mockFilm.previewVideoLink}
                isActive={false}
                onCardEnter={onCardEnter}
                onCardLeave={onCardLeave}
              />
            }
          />
        </Routes>
      </MemoryRouter>);

    expect(screen.queryByText(/This is movie page/i)).not.toBeInTheDocument();

    await act(async () => await userEvent.click(screen.getByRole('link')));

    expect(screen.getByText(/This is movie page/i)).toBeInTheDocument();
  });
});
