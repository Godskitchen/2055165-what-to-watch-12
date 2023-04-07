import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, resetFilmsList } from './action';
import { filmsList } from '../mocks/films';

const initialState = {
  activeGenre: 'All genres',
  filmsList
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      const {activeGenre} = action.payload;
      state.activeGenre = activeGenre;
    })
    .addCase(resetFilmsList, (state) => {
      state.filmsList = filmsList;
    });
});
