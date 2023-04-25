import { AuthorizationStatus, guestData } from '../../const';
import { UserProcess } from '../../types/state';
import { checkAuthAction, fetchFavoriteFilmsAction, loginAction, logoutAction } from '../api-actions';
import { fakeMovies, fakeUser } from '../../utils/mocks';
import { userProcess } from './user-process';

const favoritesList = [...fakeMovies];

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: guestData,
  userFavoriteFilms: [],
};

describe('Reducer: user-process', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  let testState: UserProcess;

  beforeEach(() => {testState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userInfo: guestData,
    userFavoriteFilms: [],
  };});

  describe('checkAuthAction test', () => {

    it('should update authorizationStatus to "AUTH" and user information if checkAuthAction fulfilled', () => {
      expect(userProcess.reducer(testState, { type: checkAuthAction.fulfilled.type, payload: fakeUser }))
        .toEqual({...testState, authorizationStatus: AuthorizationStatus.Auth, userInfo: fakeUser});
    });

    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userProcess.reducer(testState, { type: checkAuthAction.rejected.type }))
        .toEqual({...testState, authorizationStatus: AuthorizationStatus.NoAuth});
    });
  });

  describe('loginAction test', () => {

    it('should update authorizationStatus to "AUTH" and user information if loginAction fulfilled', () => {
      expect(userProcess.reducer(testState, { type: loginAction.fulfilled.type, payload: fakeUser }))
        .toEqual({...testState, authorizationStatus: AuthorizationStatus.Auth, userInfo: fakeUser});
    });

    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(userProcess.reducer(testState, { type: checkAuthAction.rejected.type }))
        .toEqual({...testState, authorizationStatus: AuthorizationStatus.NoAuth});
    });
  });

  describe('logoutAction test', () => {

    it('should update authorizationStatus to "NO_AUTH", reset user information and favorite films if logoutAction fulfilled', () => {
      const state: UserProcess = {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: fakeUser,
        userFavoriteFilms: favoritesList
      };

      expect(userProcess.reducer(state, { type: logoutAction.fulfilled.type }))
        .toEqual({...initialState, authorizationStatus: AuthorizationStatus.NoAuth});
    });
  });

  describe('fetchFavoriteFilmsAction test', () => {
    it ('should update user favorite list if fetchFavoriteFilmsAction fulfilled', () => {
      const state: UserProcess = {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: fakeUser,
        userFavoriteFilms: []
      };

      expect(userProcess.reducer(state, { type: fetchFavoriteFilmsAction.fulfilled.type, payload: favoritesList}))
        .toEqual({...state, userFavoriteFilms: favoritesList});
    });

    it ('should reset user favorite list if fetchFavoriteFilmsAction rejected', () => {
      const rejectedFavoriteFilmsActionState = {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: fakeUser,
        userFavoriteFilms: favoritesList
      };

      expect(userProcess.reducer(rejectedFavoriteFilmsActionState, { type: fetchFavoriteFilmsAction.rejected.type }))
        .toEqual({...rejectedFavoriteFilmsActionState, userFavoriteFilms: []});
    });
  });
});
