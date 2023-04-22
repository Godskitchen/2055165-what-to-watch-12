import { Helmet } from 'react-helmet-async';
import FilmsList from '../../components/film-list/film-list';
import Logo from '../../components/logo/logo';
import { CLASSPATH_LOGO_FOOTER, CLASSPATH_LOGO_HEADER } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchFavoriteFilmsAction } from '../../store/api-actions';
import UserBlock from '../../components/user-block/user-block';
import { getFavoritesFilms } from '../../store/user-process/user-process-selectors';
import { getFilmsDataLoadingStatus, getLoadErrorStatus } from '../../store/app-data/app-data-selectors';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import FavoritesErrorBlock from '../../components/filmlist-error-block/favorites-error-block';

export default function MyListPage() : JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchFavoriteFilmsAction());
    }

    return () => {isMounted = false;};
  }, [dispatch]);

  const isFilmsDataLoading = useAppSelector(getFilmsDataLoadingStatus);
  const isLoadError = useAppSelector(getLoadErrorStatus);
  const favoriteList = useAppSelector(getFavoritesFilms);

  return (
    <div className="user-page">
      <Helmet>
        <title>What to Watch. Избранное</title>
      </Helmet>
      <header className="page-header user-page__head">
        <Logo classPath={CLASSPATH_LOGO_HEADER} />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoriteList.length}</span></h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        {
          isFilmsDataLoading
            ? <LoadingSpinner />
            : ( (isLoadError && <FavoritesErrorBlock />) ||
              (!isLoadError && <FilmsList filmsList={favoriteList} /> ))
        }
      </section>

      <footer className="page-footer">
        <Logo classPath = {CLASSPATH_LOGO_FOOTER} />

        <div className="copyright">
          <p>© 2023 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}
