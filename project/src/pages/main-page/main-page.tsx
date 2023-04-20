/* eslint-disable @typescript-eslint/no-unused-vars */
import { Helmet } from 'react-helmet-async';
import FilmsList from '../../components/film-list/film-list';
import GenresList from '../../components/genres-list/genres-list';
import Logo from '../../components/logo/logo';
import {CLASSPATH_LOGO_FOOTER, DEFAULT_FILTER } from '../../const';
import { filterFilmsByGenre } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import { Fragment, useEffect } from 'react';
import { checkAuthAction, fetchFilmsAction } from '../../store/api-actions';
import { getFilmsDataLoadingStatus, getFilmsList, getUploadErrorStatus} from '../../store/app-data/app-data-selectors';
import { getActiveFilterGenre, getFilmsCountOnPage } from '../../store/main-process/main-process-selectors';
import PromoFilm from '../../components/promo-film/promo-film';
import FilmListLoadingErrorBlock from '../../components/filmlist-loading-error-block/filmlist-loading-error-block';

const MAX_GENRES_COUNT = 10;

export default function MainPage () : JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
    dispatch(fetchFilmsAction());
  }, [dispatch]);

  const isUploadError = useAppSelector(getUploadErrorStatus);
  const activeGenre = useAppSelector(getActiveFilterGenre);
  const filmsList = useAppSelector(getFilmsList);
  const maxFilmsCountOnPage = useAppSelector(getFilmsCountOnPage);

  const isFilmsDataLoading = useAppSelector(getFilmsDataLoadingStatus);

  const filters = new Set<string>().add(DEFAULT_FILTER);
  filmsList.forEach(({genre}) => filters.add(genre));
  const availableGenres = Array.from(filters).slice(0, MAX_GENRES_COUNT);

  const allFilmsByGenre = filterFilmsByGenre(activeGenre, filmsList);
  const showedFilmsOnPage = allFilmsByGenre.slice(0, Math.min(allFilmsByGenre.length, maxFilmsCountOnPage));

  const isShowButton = allFilmsByGenre.length > showedFilmsOnPage.length;

  return (
    <Fragment>
      <Helmet>
        <title>What to Watch. Главная</title>
      </Helmet>

      <PromoFilm />

      <div className="page-content">
        <section className="catalog" style={{minHeight: '485px'}}>
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          {
            isFilmsDataLoading
              ? <LoadingSpinner />
              : ( (isUploadError && <FilmListLoadingErrorBlock />) ||
                  (!isUploadError &&
                  <Fragment>
                    <GenresList availableGenres={availableGenres} />
                    <FilmsList filmsList={showedFilmsOnPage} />
                    {isShowButton ? <ShowMoreButton /> : ''}
                  </Fragment>) )
          }
        </section>

        <footer className="page-footer">
          <Logo classPath = {CLASSPATH_LOGO_FOOTER} />

          <div className="copyright">
            <p>© 2023 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </Fragment>
  );
}
