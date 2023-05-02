import { useAppDispatch } from '../../../hooks';
import '../error-components.css';
import { fetchFavoriteFilmsAction } from '../../../store/api-actions';

export default function FavoritesErrorBlock(): JSX.Element {

  const dispatch = useAppDispatch();

  const handleRetryBtnClick = () => {
    dispatch(fetchFavoriteFilmsAction());
  };

  return (
    <div className='block-container'>
      <div className='sign-in__message'><p>Failed to load favorite films. Please try again later</p></div>
      <button className="try-again__btn" onClick={handleRetryBtnClick} >Try again</button>
    </div>
  );
}

