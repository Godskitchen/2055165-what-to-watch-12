import { AuthorizationStatus } from '../const.js';
import {store} from '../store/index.js';
import { Film, Films, Reviews } from './film.js';
import { UserInfo } from './user-data.js';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userInfo: UserInfo;
  userFavoriteFilms: Films;
};

export type AppData = {
  isFilmsDataLoadingStatus: boolean;
  isDataUploadingStatus: boolean;
  dataUploadingError: string;
  promoFilm: Film | null | undefined;
  filmsList: Films;
  currentFilm: Film | null | undefined;
  filmReviews: Reviews;
  similarFilms: Films;
}

export type MainProcess = {
  activeGenre: string;
  filmsCountOnPage: number;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
