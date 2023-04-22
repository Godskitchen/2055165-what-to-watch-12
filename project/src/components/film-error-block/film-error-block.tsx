import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { fetchFilmAction } from '../../store/api-actions';
import './film-error-block.css';

export default function FilmErrorBlock() : JSX.Element {

  const dispatch = useAppDispatch();
  const {id} = useParams();

  const handleRetryBtnClick = () => {
    if (id) {
      dispatch(fetchFilmAction(id));
    }
  };

  return (
    <div className='container'>
      <div className='sign-in__message'><p>Failed to load current film. Please try again later</p></div>
      <button className="try-again__btn" onClick={handleRetryBtnClick} >Try again</button>
    </div>
  );
}
