import {render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import AddReviewButton from './add-review-button';
import { MemoryRouter, Route, Routes } from 'react-router-dom';


describe('Component: AddReviewButton', () => {
  const history = createMemoryHistory();
  const testFilmId = '1';

  it('should render correctly', () => {

    render(
      <MemoryRouter>
        <AddReviewButton filmId={testFilmId} />
      </MemoryRouter>
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    const reviewBtn = screen.getByTestId('add-review-btn');
    expect(reviewBtn.textContent).toEqual('Add review');
  });

  it('should redirect to add review page url when user clicked to link', async () => {
    history.push('/fake');

    render(
      <MemoryRouter>
        <Routes>
          <Route
            path={`/films/${testFilmId}/review`}
            element={<h1>This is add review page</h1>}
          />
          <Route
            path='*'
            element={<AddReviewButton filmId={testFilmId} />}
          />
        </Routes>
      </MemoryRouter>);

    expect(screen.queryByText(/This is add review page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/This is add review page/i)).toBeInTheDocument();
  });
});
