import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, SliceNameSpace } from '../../const';
import { UserProcess } from '../../types/state';
import { checkAuthAction, checkFirstAuthAction, fetchFavoriteFilmsAction, loginAction, logoutAction } from '../api-actions';
import { guestData } from '../../const';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: guestData,
  userFavoriteFilms: [],
};

export const userProcess = createSlice({
  name: SliceNameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo = guestData;
      })
      .addCase(checkFirstAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(checkFirstAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo = guestData;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo = guestData;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo = guestData;
        state.userFavoriteFilms = [];
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.userFavoriteFilms = action.payload;
      })
      .addCase(fetchFavoriteFilmsAction.rejected, (state) => {
        state.userFavoriteFilms = [];
      });
  },

});

