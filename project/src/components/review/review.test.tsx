import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Review from './review';
import { fakeReviews } from '../../utils/mocks';

describe('Component PlayerButton', () => {
  const mockReview = [...fakeReviews][0];
  it('should render correctly', () => {

    render(
      <MemoryRouter>
        <Review review={mockReview} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('comment')).toHaveTextContent(mockReview.comment);
    expect(screen.getByTestId('author')).toHaveTextContent(mockReview.user.name);
    expect(screen.getByTestId('review-date')).toBeInTheDocument();
  });
});
