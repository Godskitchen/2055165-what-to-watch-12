import { Helmet } from 'react-helmet-async';
import FilmsList from '../../components/film-list/film-list';
import Logo from '../../components/logo/logo';
import { CLASSPATH_LOGO_FOOTER, CLASSPATH_LOGO_HEADER } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchFavoriteFilmsAction } from '../../store/api-actions';
import UserBlock from '../../components/user-block/user-block';
import { getFavoritesFilms } from '../../store/user-process/user-process-selectors';
import { getFavoriteFilmsLoadingStatus, getNetworkError } from '../../store/app-data/app-data-selectors';
import FavoritesErrorBlock from '../../components/error-components/error-block/favorites-error-block';
import LoadingBlock from '../../components/loading-components/loading-block/loading-block';

export default function MyListPage(): JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchFavoriteFilmsAction());
    }

    return () => { isMounted = false; };
  }, [dispatch]);

  const isFilmsLoading = useAppSelector(getFavoriteFilmsLoadingStatus);
  const isNetworkError = useAppSelector(getNetworkError);
  const favoriteList = useAppSelector(getFavoritesFilms);

  return (
    <div className="user-page">
      <Helmet>
        <title>What to Watch. Избранное</title>
      </Helmet>
      <header className="page-header user-page__head">
        <Logo classPath={CLASSPATH_LOGO_HEADER} />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count" data-testid="films-count">{favoriteList.length}</span></h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        {
          isFilmsLoading
            ? <LoadingBlock />
            : ((isNetworkError && <FavoritesErrorBlock />) ||
              (!isNetworkError && <FilmsList filmsList={favoriteList} />))
        }
      </section>

      <footer className="page-footer">
        <Logo classPath={CLASSPATH_LOGO_FOOTER} />

        <div className="copyright">
          <p>© 2023 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}
