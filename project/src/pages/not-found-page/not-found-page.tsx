import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import { CLASSPATH_LOGO_FOOTER, CLASSPATH_LOGO_HEADER } from '../../const';

export default function NotFoundPage() : JSX.Element {
  return (
    <div className="user-page">
      <Helmet>
        <title>What to Watch. Page not found</title>
      </Helmet>
      <header className="page-header user-page__head">
        <Logo classPath={CLASSPATH_LOGO_HEADER} />

      </header>

      <div className="user-page__content">
        <h1 className="not-found-message">Page Not Found</h1>
      </div>

      <footer className="page-footer">
        <Logo classPath={CLASSPATH_LOGO_FOOTER} />

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}
