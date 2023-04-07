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

export const tabNames = ['Overview', 'Details', 'Reviews'] as const;

// export const genres = ['All genres', 'Comedies', 'Crime', 'Documentary', 'Dramas', 'Horror', 'Kids & Family', 'Romance', 'Sci-Fi', 'Thrillers'] as const;

export const genres = [
  {filter: 'All genres', name: '' },
  {filter: 'Comedies', name: 'Comedy' },
  {filter: 'Crime', name: 'Crime' },
  {filter: 'Documentary', name: 'Documentary' },
  {filter: 'Dramas', name: 'Drama' },
  {filter: 'Horror', name: 'Horror' },
  {filter: 'Kids & Family', name: 'Kids & Family' },
  {filter: 'Romance', name: 'Romance' },
  {filter: 'Sci-Fi', name: 'Sci-Fi' },
  {filter: 'Thrillers', name: 'Thriller' }
] as const;

const CLASSPATH_LOGO_HEADER = 'logo__link';
const CLASSPATH_LOGO_FOOTER = 'logo__link logo__link--light';

const FAVORITE_MOCKS_COUNT = 4;

export {CLASSPATH_LOGO_FOOTER, CLASSPATH_LOGO_HEADER, FAVORITE_MOCKS_COUNT};
