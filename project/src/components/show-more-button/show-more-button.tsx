import { useAppDispatch } from '../../hooks';
import { showMoreFilmsAction } from '../../store/main-process/main-process';


export default function ShowMoreButton(): JSX.Element {

  const dispatch = useAppDispatch();
  const handleShowMoreBtnClick = () => dispatch(showMoreFilmsAction());

  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={handleShowMoreBtnClick}
      >
        Show more
      </button>
    </div>
  );
}
