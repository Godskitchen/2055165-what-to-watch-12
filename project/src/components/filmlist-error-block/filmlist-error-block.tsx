import { useAppDispatch } from '../../hooks';
import './flimlist-error-block.css';
import { fetchFilmsAction } from '../../store/api-actions';


export default function FilmListErrorBlock() : JSX.Element {

  const dispatch = useAppDispatch();

  const retryButtonClickHandler = () => {
    dispatch(fetchFilmsAction());
  };

  return (
    <div className='btn-container'>
      <div className='sign-in__message'><p>Failed to load available films. Please try again later</p></div>
      <button className="try-again__btn" onClick={retryButtonClickHandler} >Try again</button>
    </div>
  );
}

