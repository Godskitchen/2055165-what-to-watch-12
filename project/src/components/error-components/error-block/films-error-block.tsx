import { useAppDispatch } from '../../../hooks';
import '../error-components.css';
import { fetchFilmsAction } from '../../../store/api-actions';


export default function FilmsErrorBlock(): JSX.Element {

  const dispatch = useAppDispatch();

  const handleRetryBtnClick = () => {
    dispatch(fetchFilmsAction());
  };

  return (
    <div className='block-container'>
      <div className='sign-in__message'><p>Failed to load available films. Please try again later</p></div>
      <button className="try-again__btn" onClick={handleRetryBtnClick} >Try again</button>
    </div>
  );
}

