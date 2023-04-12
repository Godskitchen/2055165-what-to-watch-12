import { Helmet } from 'react-helmet-async';
import FilmsList from '../../components/film-list/film-list';
import GenresList from '../../components/genres-list/genres-list';
import Logo from '../../components/logo/logo';
import PlayerButton from '../../components/player-button/player-button';
import {CLASSPATH_LOGO_FOOTER, CLASSPATH_LOGO_HEADER, FAVORITE_MOCKS_COUNT, DEFAULT_FILTER, AuthorizationStatus } from '../../const';
import { filterFilmsByGenre } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import { Fragment, useEffect } from 'react';
import { fetchFilmsAction, fetchPromoFilmAction } from '../../store/api-actions';
import UserBlock from '../../components/user-block/user-block';
import GuestBlock from '../../components/guest-block/guest-block';

const MAX_GENRES_COUNT = 10;

export default function MainPage () : JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFilmsAction());
    dispatch(fetchPromoFilmAction());
  }, [dispatch]);

  const promoFilm = useAppSelector((state) => state.promoFilm);

  const {id, name, posterImage, backgroundImage, genre: promoGenre, released} = promoFilm;

  const activeGenre = useAppSelector((state) => state.activeGenre);
  const filmsList = useAppSelector((state) => state.filmsList);
  const maxFilmsCountOnPage = useAppSelector((state) => state.filmsCountOnPage);

  const isFilmsDataLoading = useAppSelector((state) => state.isFilmsDataLoadingStatus);

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const filters = new Set<string>().add(DEFAULT_FILTER);
  filmsList.forEach(({genre}) => filters.add(genre));
  const availableGenres = Array.from(filters).slice(0, MAX_GENRES_COUNT);

  const allFilmsByGenre = filterFilmsByGenre(activeGenre, filmsList);
  const showedFilmsOnPage = allFilmsByGenre.slice(0, Math.min(allFilmsByGenre.length, maxFilmsCountOnPage));

  const isShowButton = allFilmsByGenre.length > showedFilmsOnPage.length;

  return (
    <>
      <Helmet>
        <title>What to Watch. Главная</title>
      </Helmet>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo classPath={CLASSPATH_LOGO_HEADER} />

          { authorizationStatus === AuthorizationStatus.Auth
            ? <UserBlock />
            : <GuestBlock /> }
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
                <PlayerButton filmId={`${id}`}/>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">{FAVORITE_MOCKS_COUNT}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          {
            !isFilmsDataLoading
              ? (
                <Fragment>
                  <GenresList activeGenre={activeGenre} availableGenres={availableGenres} />
                  <FilmsList filmsList={showedFilmsOnPage} />
                  {isShowButton ? <ShowMoreButton /> : ''}
                </Fragment>
              ) : <LoadingSpinner />
          }
        </section>

        <footer className="page-footer">
          <Logo classPath = {CLASSPATH_LOGO_FOOTER} />

          <div className="copyright">
            <p>© 2023 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
