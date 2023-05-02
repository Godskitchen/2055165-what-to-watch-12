import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import { fetchFilmAction } from '../../../store/api-actions';
import '../error-components.css';


export default function ErrorScreen(): JSX.Element {

  const dispatch = useAppDispatch();
  const { id } = useParams();

  const handleRetryBtnClick = () => {
    if (id) {
      dispatch(fetchFilmAction(id));
    }
  };

  return (
    <div className='screen-container'>
      <div className='sign-in__message'><p>Failed to load current film. Please try again later</p></div>
      <button className="try-again__btn" onClick={handleRetryBtnClick} >Try again</button>
    </div>
  );
}
