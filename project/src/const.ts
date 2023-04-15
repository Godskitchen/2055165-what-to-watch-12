export enum AppRoute {
  Main = '/',
  Login = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  FilmsList = '/films',
  PromoFilm = '/promo',
  FavoriteFilms = '/favorite',
  Login = '/login',
  Logout = '/logout'
}

export const tabNames = ['Overview', 'Details', 'Reviews'] as const;

export const CLASSPATH_LOGO_HEADER = 'logo__link';
export const CLASSPATH_LOGO_FOOTER = 'logo__link logo__link--light';

export const DEFAULT_FILTER = 'All genres';

export const FAVORITE_MOCKS_COUNT = 4;

export const guestData = {
  avatarUrl: '',
  email: '',
  id: 0,
  name: '',
};


