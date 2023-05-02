import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GenresList from './genres-list';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { SliceNameSpace } from '../../const';

const mockGenres = ['All genres', 'Comedy', 'Drama', 'Thriller'];

const initialState = {
  [SliceNameSpace.Main]: {
    activeGenre: 'All genres'
  }
};

const mockStore = configureMockStore()(initialState);

describe('Component: Genrelist', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <GenresList availableGenres={mockGenres} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('genreslist')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')[1]).toHaveTextContent(mockGenres[1]);
  });
});


