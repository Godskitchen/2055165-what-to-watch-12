import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import FilmsList from '../../components/film-list/film-list';
import Logo from '../../components/logo/logo';
import UserAvatar from '../../components/user-avatar/user-avatar';
import { CLASSPATH_LOGO_FOOTER, CLASSPATH_LOGO_HEADER, FAVORITE_MOCKS_COUNT } from '../../const';
import { Films } from '../../types/film';

type MyListPageProps = {
  favoritesList: Films;
}

export default function MyListPage({favoritesList} : MyListPageProps) : JSX.Element {

  const favList = favoritesList.slice(0, FAVORITE_MOCKS_COUNT);

  return (
    <div className="user-page">
      <Helmet>
        <title>What to Watch. Избранное</title>
      </Helmet>
      <header className="page-header user-page__head">
        <Logo classPath={CLASSPATH_LOGO_HEADER} />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{FAVORITE_MOCKS_COUNT}</span></h1>
        <ul className="user-block">
          <li className="user-block__item">
            <UserAvatar />
          </li>
          <li className="user-block__item">
            <Link to='/' className="user-block__link">Sign out</Link>
          </li>
        </ul>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmsList filmsList={favList} />
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
