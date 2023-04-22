import { useAppDispatch } from '../../hooks';
import './flimlist-error-block.css';
import { fetchFavoriteFilmsAction } from '../../store/api-actions';


export default function FavoritesErrorBlock() : JSX.Element {

  const dispatch = useAppDispatch();

  const retryButtonClickHandler = () => {
    dispatch(fetchFavoriteFilmsAction());
  };

  return (
    <div className='btn-container'>
      <div className='sign-in__message'><p>Failed to load favorite films. Please try again later</p></div>
      <button className="try-again__btn" onClick={retryButtonClickHandler} >Try again</button>
    </div>
  );
}

