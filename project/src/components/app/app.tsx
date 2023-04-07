import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import MoviePage from '../../pages/movie-page/movie-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page';
import PrivateRoute from '../private-route/private-route';
import { Films, Reviews } from '../../types/film';

type AppProps = {
  promoFilmTitle: string;
  promoFilmGenre: string;
  promoFilmReleaseYear: string;
  promoFilmId: string;
  filmsList: Films;
  reviewsList: Reviews;
}

export default function App({promoFilmTitle, promoFilmGenre, promoFilmReleaseYear, promoFilmId, filmsList, reviewsList} : AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element = {
              <MainPage
                promoFilmTitle = {promoFilmTitle}
                promoFilmGenre = {promoFilmGenre}
                promoFilmReleaseYear = {promoFilmReleaseYear}
                promoFilmId = {promoFilmId}
              />
            }
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <MyListPage favoritesList={filmsList} />
              </PrivateRoute>
            }
          />

          <Route path='/films' element={<Navigate to={AppRoute.Main}/>} />
          <Route path={AppRoute.Film} element={<Navigate to='overview' />} />;
          <Route
            path={`${AppRoute.Film}/overview`}
            element={<MoviePage activeTab='Overview' filmsList={filmsList} reviewsList={reviewsList} />}
          />
          <Route
            path={`${AppRoute.Film}/details`}
            element={<MoviePage activeTab='Details' filmsList={filmsList} reviewsList={reviewsList} />}
          />
          <Route
            path={`${AppRoute.Film}/reviews`}
            element={<MoviePage activeTab='Reviews' filmsList={filmsList} reviewsList={reviewsList} />}
          />

          <Route
            path={AppRoute.AddReview}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <AddReviewPage filmsList={filmsList} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Player}
            element={<PlayerPage filmsList={filmsList} />}
          />
          <Route
            path='*'
            element = {<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
