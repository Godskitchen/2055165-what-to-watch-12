import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ReviewList from './review-list';
import { fakeReviews } from '../../utils/mocks';

describe('Component ReviewList', () => {
  const reviews = [...fakeReviews];

  it('should render correctly', () => {

    render(
      <MemoryRouter>
        <ReviewList reviewsList={reviews} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('review').length).toEqual(reviews.length);

  });
});
