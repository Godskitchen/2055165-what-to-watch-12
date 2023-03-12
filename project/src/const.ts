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

const CLASSPATH_LOGO_HEADER = 'logo__link';
const CLASSPATH_LOGO_FOOTER = 'logo__link logo__link--light';

export {CLASSPATH_LOGO_FOOTER, CLASSPATH_LOGO_HEADER};
