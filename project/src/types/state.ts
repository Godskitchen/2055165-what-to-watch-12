import { AuthorizationStatus } from '../const.js';
import {store} from '../store/index.js';
import { Film, Films, Reviews } from './film.js';
import { UserInfo } from './user-data.js';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userInfo: UserInfo;
};

export type AppData = {
  isFilmsDataLoadingStatus: boolean;
  isDataUploadingStatus: boolean;
  promoFilm: Film;
  filmsList: Films;
  currentFilm: Film | null | undefined;
  filmReviews: Reviews;
  similarFilms: Films;
  userFavoriteFilms: Films;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
