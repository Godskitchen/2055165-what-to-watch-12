import { render, screen } from '@testing-library/react';
// import thunk from 'redux-thunk';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Genre from './genre';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
// import userEvent from '@testing-library/user-event';
// import { State } from '../../types/state';
// import { Action, AnyAction, Dispatch } from '@reduxjs/toolkit';
// import { resetFilmsCountOnPageAction } from '../../store/main-process/main-process';
// import { changeFilterGenreAction } from '../../store/main-process/main-process';

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

  it('should be active if prop isActive equals "true"', () => {
    render(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <Genre
            filterName={genreData.filterName}
            isActive
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(genreData.filterName)).toBeInTheDocument();
    expect(screen.getByRole('listitem')).toHaveClass('catalog__genres-item--active');
  });

  it('shouldn\'t be active if prop isActive equals "false"', () => {
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

    expect(screen.getByText(genreData.filterName)).toBeInTheDocument();
    expect(screen.getByRole('listitem')).not.toHaveClass('catalog__genres-item--active');
  });

  // it('triggers onClick event on genre button and makes it active', () => {
  //   const middlewares = [thunk];

  //   const mStore = configureMockStore<
  //   State,
  //   Action<string>,
  //   Dispatch<AnyAction>
  // >(middlewares);

  //   const store = mStore();

  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <Genre
  //           filterName={genreData.filterName}
  //           isActive={genreData.isActive}
  //         />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const genreButton = screen.getByRole('link', {name: genreData.filterName });

  //   userEvent.click(genreButton);

  //   const actions = store.getActions().map(({type}) => type);

  //   expect(actions).toEqual([
  //     resetFilmsCountOnPageAction.type,
  //     changeFilterGenreAction.type
  //   ]);

  //   // expect(mockDispatch).toHaveBeenCalledWith(resetFilmsCountOnPageAction());
  //   // expect(mockDispatch).toHaveBeenCalledWith(changeFilterGenreAction(genreData.filterName));


  // });
});
