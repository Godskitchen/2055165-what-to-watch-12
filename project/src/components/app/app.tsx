import MainPage from '../../pages/main-page/main-page';

type AppProps = {
  promoFilmTitle: string;
  promoFilmGenre: string;
  promoFilmReleaseYear: string;
}

export default function App({promoFilmTitle, promoFilmGenre, promoFilmReleaseYear} : AppProps): JSX.Element {
  return (
    <MainPage
      promoFilmTitle = {promoFilmTitle}
      promoFilmGenre = {promoFilmGenre}
      promoFilmReleaseYear = {promoFilmReleaseYear}
    />
  );
}
