import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { fetchFilmAction } from '../../store/api-actions';
import './film-loading-error-block.css';

export default function FilmLoadingErrorBlock() : JSX.Element {

  const dispatch = useAppDispatch();
  const {id} = useParams();

  const retryButtonClickHandler = () => {
    if (id) {
      dispatch(fetchFilmAction(id));
    }
  };

  return (
    <div className='container'>
      <div className='sign-in__message'><p>Failed to loading current film. Please try again later</p></div>
      <button className="try-again__btn" onClick={retryButtonClickHandler} >Try again</button>
    </div>
  );
}
