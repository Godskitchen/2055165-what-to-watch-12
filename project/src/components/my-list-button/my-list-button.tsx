import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkAuthAction, fetchFavoriteFilmsAction, setFilmStatusAction } from '../../store/api-actions';
import { AppRoute } from '../../const';
import { getPromoFilmId } from '../../store/app-data/app-data-selectors';
import { getFavoritesFilmsCount } from '../../store/user-process/user-process-selectors';
import { useEffect } from 'react';

type MyListBtnProps = {
  isAuthorized: boolean;
  isFavorite: boolean;
  filmId: string;
}

export default function MyListButton({isAuthorized, isFavorite, filmId}: MyListBtnProps) : JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchFavoriteFilmsAction());
    }
  }, [isAuthorized, dispatch]);

  const newStatus = isFavorite ? 0 : 1;
  const promoId = useAppSelector(getPromoFilmId);
  const favoritesFilmsCount = useAppSelector(getFavoritesFilmsCount);

  const navigate = useNavigate();

  const onClickHandler = () => {
    if (isAuthorized) {
      dispatch(setFilmStatusAction({filmId, status: newStatus, isPromo: `${promoId}` === filmId}));
    } else {
      dispatch(checkAuthAction());
      navigate(AppRoute.Login);
    }
  };

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={onClickHandler}
    >
      {
        isAuthorized ?
          <svg viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref={isFavorite ? '#in-list' : '#add'}></use>
          </svg> : ''
      }
      <span style={{marginLeft: !isAuthorized ? '10px' : ''}}>My list</span>
      <span className={`film-card__count ${!isAuthorized ? 'visually-hidden' : ''}`}>{favoritesFilmsCount}</span>
    </button>
  );
}
