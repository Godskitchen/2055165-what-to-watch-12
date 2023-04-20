import { AuthorizationStatus, SliceNameSpace } from '../../const';
import { Films } from '../../types/film';
import { State } from '../../types/state';
import { UserInfo } from '../../types/user-data';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[SliceNameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (state: State): boolean => state[SliceNameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;

export const getFavoritesFilms = (state: State): Films => state[SliceNameSpace.User].userFavoriteFilms;
export const getFavoritesFilmsCount = (state: State): number => state[SliceNameSpace.User].userFavoriteFilms.length;

export const getUserInfo = (state: State): UserInfo => state[SliceNameSpace.User].userInfo;
