import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import FilmsList from '../../components/film-list/film-list';
import Logo from '../../components/logo/logo';
import PlayerButton from '../../components/player-button/player-button';
import UserAvatar from '../../components/user-avatar/user-avatar';
import {CLASSPATH_LOGO_FOOTER, CLASSPATH_LOGO_HEADER, FAVORITE_MOCKS_COUNT } from '../../const';
import { Films } from '../../types/film';

type MainPageProps = {
  promoFilmTitle: string;
  promoFilmGenre: string;
  promoFilmReleaseYear: string;
  promoFilmId: string;
  filmsList: Films;
}

export default function MainPage ({promoFilmTitle, promoFilmGenre, promoFilmReleaseYear, filmsList, promoFilmId} : MainPageProps) : JSX.Element {

  return (
    <>
      <Helmet>
        <title>What to Watch. Главная</title>
      </Helmet>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo classPath={CLASSPATH_LOGO_HEADER} />

          <ul className="user-block">
            <li className="user-block__item">
              <UserAvatar />
            </li>
            <li className="user-block__item">
              <Link to='/' className="user-block__link">Sign out</Link>
            </li>
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilmTitle}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilmGenre}</span>
                <span className="film-card__year">{promoFilmReleaseYear}</span>
              </p>

              <div className="film-card__buttons">
                <PlayerButton filmId={promoFilmId}/>
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

          <ul className="catalog__genres-list">
            <li className="catalog__genres-item catalog__genres-item--active">
              <Link to="#" className="catalog__genres-link">All genres</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to="#" className="catalog__genres-link">Comedies</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to="#" className="catalog__genres-link">Crime</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to="#" className="catalog__genres-link">Documentary</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to="#" className="catalog__genres-link">Dramas</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to="#" className="catalog__genres-link">Horror</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to="#" className="catalog__genres-link">Kids & Family</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to="#" className="catalog__genres-link">Romance</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to="#" className="catalog__genres-link">Sci-Fi</Link>
            </li>
            <li className="catalog__genres-item">
              <Link to="#" className="catalog__genres-link">Thrillers</Link>
            </li>
          </ul>

          <FilmsList filmsList={filmsList}/>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <footer className="page-footer">
          <Logo classPath = {CLASSPATH_LOGO_FOOTER} />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
