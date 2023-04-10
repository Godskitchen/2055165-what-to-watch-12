import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { filmsList } from './mocks/films';
import { reviewsList } from './mocks/reviews';
import { store } from './store';
import { fetchFilmsAction } from './store/api-actions';

const PromoFilmInfo = {
  promoFilmTitle: 'The Grand Budapest Hotel',
  promoFilmGenre: 'Drama',
  promoFilmReleaseYear: '2014',
  promoFilmId: '0'
};

store.dispatch(fetchFilmsAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        promoFilmInfo = {PromoFilmInfo}
        filmsList = {filmsList}
        reviewsList = {reviewsList}
      />
    </Provider>
  </React.StrictMode>,
);
