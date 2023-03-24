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
import DetailsPage from '../../pages/details-page/details-page';
import ReviewsPage from '../../pages/reviews-page/reviews-page';

type AppProps = {
  promoFilmTitle: string;
  promoFilmGenre: string;
  promoFilmReleaseYear: string;
  promoFilmId: string;
  filmList: Films;
  reviewList: Reviews;
}

export default function App({promoFilmTitle, promoFilmGenre, promoFilmReleaseYear, promoFilmId, filmList, reviewList} : AppProps): JSX.Element {
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
                filmList = {filmList}
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
                <MyListPage favouriteList={filmList} />
              </PrivateRoute>
            }
          />
          <Route path='/films' element={<Navigate to={AppRoute.Main}/>} />
          <Route path={AppRoute.Film} element={<MoviePage filmList={filmList} />} />
          <Route path={`${AppRoute.Film}/details`} element={<DetailsPage filmList={filmList}/>} />
          <Route
            path={`${AppRoute.Film}/reviews`}
            element={<ReviewsPage reviewList={reviewList} filmList={filmList}/>}
          />
          <Route
            path={AppRoute.AddReview}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <AddReviewPage filmList={filmList} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Player}
            element={<PlayerPage filmList={filmList} />}
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
