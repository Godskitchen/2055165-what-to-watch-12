import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { filmsList } from './mocks/films';
import { reviewsList } from './mocks/reviews';
import { store } from './store';

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
    <Provider store={store}>
      <App
        promoFilmTitle = {PromoFilmInfo.promoFilmTitle}
        promoFilmGenre = {PromoFilmInfo.promoFilmGenre}
        promoFilmReleaseYear = {PromoFilmInfo.promoFileReleaseYear}
        promoFilmId = {PromoFilmInfo.promoFilmId}
        filmsList = {filmsList}
        reviewsList = {reviewsList}
      />
    </Provider>
  </React.StrictMode>,
);
