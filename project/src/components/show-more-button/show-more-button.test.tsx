import {render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ShowMoreButton from './show-more-button';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { State } from '../../types/state';
import { Action, Dispatch } from '@reduxjs/toolkit';
import { showMoreFilmsAction } from '../../store/main-process/main-process';

const mockStore = configureMockStore<
  State,
  Action<string>,
  Dispatch<Action>
>();

describe('Component ShowMoreButton', () => {
  const store = mockStore();
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ShowMoreButton />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('button')).toHaveTextContent('Show more');
  });

  it('should dispatch showMoreFilmsAction when user clicked on button', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ShowMoreButton />
        </MemoryRouter>
      </Provider>
    );

    const showMoreBtn = screen.getByRole('button');
    fireEvent.click(showMoreBtn);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      showMoreFilmsAction.type,
    ]);
  });
});
