import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import { AppRoute, CLASSPATH_LOGO_FOOTER, CLASSPATH_LOGO_HEADER } from '../../const';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage(): JSX.Element {

  const navigate = useNavigate();

  const handleNavigateBtnClick = () => {
    navigate(AppRoute.Main);
  };

  return (
    <div className="user-page">
      <Helmet>
        <title>What to Watch. Page not found</title>
      </Helmet>
      <header className="page-header user-page__head">
        <Logo classPath={CLASSPATH_LOGO_HEADER} />
      </header>


      <div className='block-container' style={{ minHeight: '750px' }}>
        <h1 className="not-found-message">Page Not Found</h1>
        <button className="try-again__btn" onClick={handleNavigateBtnClick} >Вернуться на главную</button>
      </div>


      <footer className="page-footer">
        <Logo classPath={CLASSPATH_LOGO_FOOTER} />

        <div className="copyright">
          <p>© 2023 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}
