import { Helmet } from 'react-helmet-async';
import { useParams, Link} from 'react-router-dom';
import Logo from '../../components/logo/logo';
import PlayerButton from '../../components/player-button/player-button';
import UserAvatar from '../../components/user-avatar/user-avatar';
import {CLASSPATH_LOGO_FOOTER, CLASSPATH_LOGO_HEADER, FAVORITE_MOCKS_COUNT, tabNames} from '../../const';
import { Films, Reviews } from '../../types/film';
import Tabs from '../../components/tabs/tabs';
import NotFoundPage from '../not-found-page/not-found-page';
import TabsNavigation from '../../components/tabs-navigation/tabs-navigation';

type MoviePageProps = {
  activeTab: typeof tabNames[number];
  filmsList: Films;
  reviewsList: Reviews;
}

export default function MoviePage({filmsList, reviewsList, activeTab} : MoviePageProps) : JSX.Element {

  const {id} = useParams();
  const film = filmsList.find((movie) => `${movie.id}` === id);

  if (!film || !id) {
    return <NotFoundPage />;
  }

  const {
    name,
    posterImage,
    backgroundImage,
    genre,
    released,
    backgroundColor,
  } = film;

  const reviews = reviewsList.filter((review) => `${review.filmId}` === id);

  return (
    <>
      <Helmet>
        <title>What to Watch. Описание фильма</title>
      </Helmet>
      <section className="film-card film-card--full" style={{backgroundColor: `${backgroundColor}`}}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo classPath={CLASSPATH_LOGO_HEADER} />

            <ul className="user-block">
              <li className="user-block__item">
                <UserAvatar />
              </li>
              <li className="user-block__item">
                <Link to="/" className="user-block__link">Sign out</Link>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayerButton filmId={id}/>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">{FAVORITE_MOCKS_COUNT}</span>
                </button>
                <Link to={`/films/${id}/review`} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <TabsNavigation activeTab={activeTab} id={id} />

              <Tabs activeTab={activeTab} film={film} reviewsList={reviews} />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            <article className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
              </div>
              <h3 className="small-film-card__title">
                <a className="small-film-card__link" href="film-page.html">Fantastic Beasts: The Crimes of Grindelwald</a>
              </h3>
            </article>

            <article className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img src="img/bohemian-rhapsody.jpg" alt="Bohemian Rhapsody" width="280" height="175" />
              </div>
              <h3 className="small-film-card__title">
                <a className="small-film-card__link" href="film-page.html">Bohemian Rhapsody</a>
              </h3>
            </article>

            <article className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img src="img/macbeth.jpg" alt="Macbeth" width="280" height="175" />
              </div>
              <h3 className="small-film-card__title">
                <a className="small-film-card__link" href="film-page.html">Macbeth</a>
              </h3>
            </article>

            <article className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img src="img/aviator.jpg" alt="Aviator" width="280" height="175" />
              </div>
              <h3 className="small-film-card__title">
                <a className="small-film-card__link" href="film-page.html">Aviator</a>
              </h3>
            </article>
          </div>
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

