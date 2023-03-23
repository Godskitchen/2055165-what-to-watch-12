import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { filmList } from './mocks/films';
import { reviewList } from './mocks/reviews';

const PromoFilmInfo = {
  promoFilmTitle: 'The Grand Budapest Hotel',
  promoFilmGenre: 'Drama',
  promoFileReleaseYear: '2014',
  promoFilmId: '0'
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      promoFilmTitle = {PromoFilmInfo.promoFilmTitle}
      promoFilmGenre = {PromoFilmInfo.promoFilmGenre}
      promoFilmReleaseYear = {PromoFilmInfo.promoFileReleaseYear}
      promoFilmId = {PromoFilmInfo.promoFilmId}
      filmList = {filmList}
      reviewList = {reviewList}
    />
  </React.StrictMode>,
);
