import { useEffect } from 'react';
import { AuthorizationStatus, CLASSPATH_LOGO_HEADER } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Logo from '../logo/logo';
import { fetchPromoFilmAction } from '../../store/api-actions';
import { getFilmsDataLoadingStatus, getPromoFilm } from '../../store/app-data/app-data-selectors';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import UserBlock from '../user-block/user-block';
import GuestBlock from '../guest-block/guest-block';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';
import PlayerButton from '../player-button/player-button';
import MyListButton from '../my-list-button/my-list-button';

export default function PromoFilm() : JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchPromoFilmAction());
    }

    return () => {isMounted = false;};
  }, [dispatch]);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const promoFilm = useAppSelector(getPromoFilm);
  const isFilmsDataLoading = useAppSelector(getFilmsDataLoadingStatus);

  if (promoFilm === undefined || isFilmsDataLoading) {
    return <LoadingSpinner />;
  }

  if (promoFilm === null) {
    return (
      <section className="film-card" style={{backgroundImage:'linear-gradient(-180deg,#000 0%,#180202 100%)'}}>
        <header className="page-header film-card__head">
          <Logo classPath={CLASSPATH_LOGO_HEADER} />
          {
            isAuthorized
              ? <UserBlock />
              : <GuestBlock />
          }
        </header>
      </section>
    );
  }

  const {id, name, posterImage, backgroundImage, genre: promoGenre, released, isFavorite} = promoFilm;

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={backgroundImage} alt={name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header film-card__head">
        <Logo classPath={CLASSPATH_LOGO_HEADER} />
        {
          isAuthorized
            ? <UserBlock />
            : <GuestBlock />
        }
      </header>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{promoGenre}</span>
              <span className="film-card__year">{released}</span>
            </p>

            <div className="film-card__buttons">
              <PlayerButton filmId={`${id}`} />
              <MyListButton isAuthorized={isAuthorized} isFavorite={isFavorite} filmId={`${id}`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
