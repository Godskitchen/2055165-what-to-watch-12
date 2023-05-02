import { Route, Routes, Navigate } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import { AppRoute } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import MoviePage from '../../pages/movie-page/movie-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page';
import PrivateRoute from '../private-route/private-route';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthCheckedStatus, getAuthorizationStatus } from '../../store/user-process/user-process-selectors';
import { useEffect } from 'react';
import { checkFirstAuthAction } from '../../store/api-actions';
import LoadingScreen from '../loading-components/loading-screen/loading-screen';

export default function App(): JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(checkFirstAuthAction());
    }

    return () => {isMounted = false;};
  }, [dispatch]);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);

  if (!isAuthChecked) {
    return <LoadingScreen />;
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Main}
          element = {<MainPage />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <MyListPage />
            </PrivateRoute>
          }
        />
        <Route path='/films' element={<Navigate to={AppRoute.Main} replace />} />
        <Route path={AppRoute.Film} element={<Navigate to='overview' replace />} />;
        <Route
          path={`${AppRoute.Film}/overview`}
          element={<MoviePage activeTab='Overview' />}
        />
        <Route
          path={`${AppRoute.Film}/details`}
          element={<MoviePage activeTab='Details' />}
        />
        <Route
          path={`${AppRoute.Film}/reviews`}
          element={<MoviePage activeTab='Reviews' />}
        />

        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <AddReviewPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Player}
          element={<PlayerPage />}
        />
        <Route
          path='*'
          element = {<NotFoundPage />}
        />
      </Routes>
    </HelmetProvider>
  );
}
