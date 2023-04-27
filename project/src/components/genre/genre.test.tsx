import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Genre from './genre';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();

const genreData = {
  filterName: 'Genrename',
  isActive: false
};

describe('Component: Genre', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <Genre
            filterName={genreData.filterName}
            isActive={genreData.isActive}
          />
        </MemoryRouter>
      </Provider>
    );

    const genreButton = screen.getByRole('link', {name: genreData.filterName });
    expect(genreButton).toBeInTheDocument();
  });

  it('triggers onClick event on genre button and makes it active', () => {

    render(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <Genre
            filterName={genreData.filterName}
            isActive={genreData.isActive}
          />
        </MemoryRouter>
      </Provider>
    );

    const genreButton = screen.getByRole('link', {name: genreData.filterName });

    expect(genreButton).toHaveStyle('pointer-events: auto');
    userEvent.click(genreButton);
    expect(genreButton).toHaveStyle('pointer-events: none');

  });
});
