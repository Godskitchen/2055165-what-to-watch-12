import {render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PromoFilm from './promo-film';
import { AuthorizationStatus, SliceNameSpace } from '../../const';
import { fakeMovies, fakeUser } from '../../utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import {Action} from 'redux';
import { State } from '../../types/state';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { createAPI } from '../../services/serverApi';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockPromo = [...fakeMovies][4];
const mockUser = {...fakeUser};

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Component: Promofilm', () => {
  it('should render UserBlock if user has authorized', () => {
    const initialState = {
      [SliceNameSpace.Data]: {
        isPromoFilmLoadingStatus: false,
        promoFilm: mockPromo,
      },
      [SliceNameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: mockUser,
        userFavoriteFilms: [...fakeMovies]
      }
    };

    const store = mockStore(initialState);

    render(
      <Provider store = {store}>
        <MemoryRouter>
          <PromoFilm />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByTestId('sign-in-btn')).not.toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Sign out'})).toBeInTheDocument();
    expect(screen.getByTestId('user-avatar')).toBeInTheDocument();

    expect(screen.getByTestId('bg-image')).toHaveAttribute('src', mockPromo.backgroundImage);
    expect(screen.getByAltText(`${mockPromo.name} poster`)).toHaveAttribute('src', mockPromo.posterImage);
    expect(screen.getByTestId('title')).toHaveTextContent(mockPromo.name);
    expect(screen.getByTestId('genre')).toHaveTextContent(mockPromo.genre);
    expect(screen.getByTestId('year')).toHaveTextContent(`${mockPromo.released}`);


    const buttons = screen.getAllByRole('button');

    //player button
    expect(buttons[0]).toHaveTextContent('Play');

    //myList button
    expect(buttons[1]).toHaveTextContent('My list');
  });

  it('should render GuestBlock if user has not authorized', () => {
    const initialState = {
      [SliceNameSpace.Data]: {
        isPromoFilmLoadingStatus: false,
        promoFilm: mockPromo,
      },
      [SliceNameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: mockUser,
        userFavoriteFilms: [...fakeMovies]
      }
    };

    const store = mockStore(initialState);

    render(
      <Provider store = {store}>
        <MemoryRouter>
          <PromoFilm />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('sign-in-btn')).toBeInTheDocument();
    expect(screen.queryByRole('link', {name: 'Sign out'})).not.toBeInTheDocument();
    expect(screen.queryByTestId('user-avatar')).not.toBeInTheDocument();
  });
});
