import { useAppDispatch } from '../../hooks';
import { showMoreFilms } from '../../store/main-process/main-process';


export default function ShowMoreButton() : JSX.Element {

  const dispatch = useAppDispatch();
  const handleShowMoreBtnClick = () => dispatch(showMoreFilms());

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
