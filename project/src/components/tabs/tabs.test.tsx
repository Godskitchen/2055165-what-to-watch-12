import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Tabs from './tabs';
import { fakeMovies, fakeReviews } from '../../utils/mocks';
import { tabNames } from '../../const';


describe('Component Tabs', () => {

  const mockProps = {
    activeTab: tabNames[0],
    film: [...fakeMovies][1],
    reviewsList: [...fakeReviews]
  };

  it('should render correctly "Overview" tab if it\'s active', () => {

    render(
      <MemoryRouter>
        <Tabs {...mockProps} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('film-rating')).toBeInTheDocument();
    expect(screen.getByTestId('description')).toHaveTextContent(mockProps.film.description);
    expect(screen.getByTestId('overview-director')).toHaveTextContent(`Director: ${mockProps.film.director}`);
    expect(screen.getByTestId('overview-starring')).toHaveTextContent(/^Starring/i);
  });

  it('should render correctly "Details" tab if it\'s active', () => {

    render(
      <MemoryRouter>
        <Tabs {...mockProps} activeTab={tabNames[1]} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('details-runtime')).toHaveTextContent('Run Time');
    expect(screen.getByTestId('details-director')).toHaveTextContent(mockProps.film.director);
    expect(screen.getByTestId('details-starring')).toHaveTextContent('Starring');
    expect(screen.getByTestId('details-genre')).toHaveTextContent(mockProps.film.genre);
    expect(screen.getByTestId('details-year')).toHaveTextContent(`${mockProps.film.released}`);
  });

  it('should render correctly "Reviews" tab if it\'s active', () => {

    render(
      <MemoryRouter>
        <Tabs {...mockProps} activeTab={tabNames[2]} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('review').length).toEqual(fakeReviews.length);
  });
});
